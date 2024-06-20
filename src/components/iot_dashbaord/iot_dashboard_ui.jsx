import React, { useState, useEffect, useRef } from "react";
import axios from "../../modules/services/axios";
import CustomSelect from "../../modules/components/custom-select";

const IOTDashboard = () => {
  const [deviceData, setDeviceData] = useState({});
  const [selectedDeviceId, setSelectedDeviceId] = useState([]);
  const [data, setdata] = useState([]);
  const sliderRefs = useRef([]);

  useEffect(() => {
    setSelectedDeviceId([]);
    setDeviceData([]);
  }, [data]);

  const deviceIds = [
    { value: 1, label: "127.0.0.1" },
    { value: 2, label: "44:51:94:e5:f9:3e-1" },
    { value: 3, label: "44:51:94:e5:f9:3e-2" },
    { value: 4, label: "44:51:94:e5:f9:3e-3" },
    { value: 5, label: "44:51:94:e5:f9:3e-4" },
    { value: 6, label: "44:51:94:e5:f9:3e-5" },
    { value: 7, label: "44:51:94:e5:f9:3e-6" },
    { value: 8, label: "44:51:94:e5:f9:3e-7" },
    { value: 9, label: "44:51:94:e5:f9:3e-8" },
    { value: 10, label: "44:51:94:e5:f9:3e" },
  ];

  useEffect(() => {
    const deviceId = deviceIds.map((x) => ({ value: x.value, label: x.label }));
    setdata(deviceId);
  }, []);

  useEffect(() => {
    const fetchDeviceData = async () => {
      const deviceIdsToFetch = selectedDeviceId ? [selectedDeviceId.text] : deviceIds.map((device) => device.text);
      const questionIds = [128, 147, 146, 167]; // by Humidity 147, by Pressure 146, by Temperature 128, by wind speed 167

      try {
        const responses = await Promise.all(
          questionIds.map((questionId) =>
            axios
              .post(`client-dashboard/question/${questionId}`, { deviceIds: deviceIdsToFetch })
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
  }, [selectedDeviceId]);

  useEffect(() => {
    sliderRefs.current = Array.from({
      length: Object.keys(deviceData).length,
    }).map(() => React.createRef());
  }, [deviceData]);

  const handledeviceSelect = (selectedData) => {
    if (!selectedData) {
      console.error("Expected selected data but got:", selectedData);
      return;
    }
    setSelectedDeviceId(selectedData);
  };

  const getGridTemplateColumns = () => {
    const itemCount = deviceData[selectedDeviceId.text]?.length || 0;
    if (itemCount >= 7) return "repeat(3, 1fr)";
    if (itemCount === 5|| itemCount ===6 ) return "repeat(3, 1fr)";
    if (itemCount === 4) return "repeat(2, 1fr)";
    if (itemCount <= 3) return "repeat(3, 1fr)";
    return "repeat(1, 1fr)";
  };

  return (
    <>
      <div>
        <div style={{ width: "30%" }}>
          <CustomSelect options={data} label="Device" callback={handledeviceSelect} />
        </div>
        {selectedDeviceId && (
          <div style={{ display: "grid", gridTemplateColumns: getGridTemplateColumns(), gap: "10px" }}>
            {deviceData[selectedDeviceId.text] &&
              deviceData[selectedDeviceId.text].map((entry, entryIndex) => (
                <div
                  key={`${selectedDeviceId.text}-${entry.questionId}-${entryIndex}`}
                  style={{ padding: "0 10px", position: "relative" }}
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
        )}
      </div>
    </>
  );
};

export default IOTDashboard;
