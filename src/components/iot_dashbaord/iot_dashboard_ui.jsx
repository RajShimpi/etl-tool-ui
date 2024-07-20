import React, { useState, useEffect, useRef } from "react";
import axios from "../../modules/services/axios";
import SelectReact from "../../modules/components/select-react";

const IOTDashboard = () => {
  const [deviceData, setDeviceData] = useState({});
  const [selectedDeviceIds, setSelectedDeviceIds] = useState([]);
  const [deviceId, setDeviceId] = useState([]);
  const sliderRefs = useRef([]);

  useEffect(() => {
    setSelectedDeviceIds([]);   
    setDeviceData({});  
  }, [deviceId]);

  useEffect(() => {
    axios.getWithCallback(`/client-dashboard/field/values`, (data => {
      setDeviceId(data.map((device) => ({ value: device.id, label: device.device_id })))
    }))
  }, []);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const questionIds = [128, 147, 146, 167]; // by Humidity 147, by Pressure 146, by Temperature 128, by Wind speed 167

        const responses = await Promise.all(
          questionIds.map((questionId) =>
            axios
              .post(`client-dashboard/question/${questionId}`, { deviceIds: selectedDeviceIds.map(device => device.label) })
              .then((response) => ({
                questionId,
                deviceUrls: response.data.deviceUrls,
              }))
              .catch((error) => ({
                questionId,
                error: error.message,
              }))
          )
        );

        const newData = {};
        responses.forEach((response) => {
          const { questionId, deviceUrls, error } = response;
          if (error) {
            console.error(`Error fetching data for question ${questionId}: ${error}`);
          } else {
            Object.entries(deviceUrls).forEach(([deviceId, url]) => {
              if (!newData[deviceId]) {
                newData[deviceId] = [];
              }
              newData[deviceId].push({ questionId, url });
            });
          }
        });

        setDeviceData(newData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeviceData();
  }, [selectedDeviceIds]);

  useEffect(() => {
    sliderRefs.current = Array.from({
      length: Object.keys(deviceData).length,
    }).map(() => React.createRef());
  }, [deviceData]);

  const handleDeviceSelect = (selectedDevices) => {
    setSelectedDeviceIds(selectedDevices || []);
  };

  return (
    <>
      <div>
        <div style={{ width: "30%", marginBottom: "20px" }}>
          <SelectReact options={deviceId} label="Device" callback={handleDeviceSelect} multiple={true} />
        </div>
        {selectedDeviceIds.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {selectedDeviceIds.map((selectedDevice) => (
              <div key={selectedDevice.value} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px", textAlign: "center", fontWeight: "bold", fontSize: "16px" }}>
                  Device: {selectedDevice.label}
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {deviceData[selectedDevice.label] &&
                    deviceData[selectedDevice.label].map((entry, entryIndex) => (
                      <div
                        key={`${selectedDevice.label}-${entry.questionId}-${entryIndex}`}
                        style={{ flexGrow: 1, minWidth: "250px", padding: "0 10px", position: "relative" }}
                      >
                        <iframe
                          src={entry.url}
                          width="100%"
                          height="400px"
                          frameBorder="0"
                          allowTransparency="true"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default IOTDashboard;
