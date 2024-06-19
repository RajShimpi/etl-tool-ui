import React, { useState, useEffect, useRef } from "react";
import axios from "../../modules/services/axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const IOTDashboard = () => {
  const [deviceData, setDeviceData] = useState({});
  const [next, setNext]=useState(true)
  const sliderRefs = useRef([]);

  useEffect(() => {
    const deviceIds = [
      "127.0.0.1",
      "44:51:94:e5:f9:3e",
      "44:51:94:e5:f9:3e-1",
      "44:51:94:e5:f9:3e-2",
      "44:51:94:e5:f9:3e-3",
      "44:51:94:e5:f9:3e-4",
      "44:51:94:e5:f9:3e-5",
      "44:51:94:e5:f9:3e-6",
      "44:51:94:e5:f9:3e-7",
      "44:51:94:e5:f9:3e-8",
    ];
    const questionIds = [128, 147, 146, 167]; // by Humidity 147, by Pressure 146, by Temperature 128 by wind speed 167

    Promise.all(
      questionIds.map((questionId) =>
        axios
          .post(`client-dashboard/question/${questionId}`, { deviceIds })
          .then((response) => ({
            questionId,
            deviceUrls: response.data.deviceUrls,
          }))
          .catch((error) => ({
            questionId,
            error: error.message,
          }))
      )
    )
      .then((responses) => {
        const newData = {};
        responses.forEach((response) => {
          const { questionId, deviceUrls, error } = response;
          if (error) {
            console.error(
              `Error fetching data for question ${questionId}: ${error}`
            );
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
        setNext(false)
      })
      .catch((error) => {
        console.error(error)
      });
  }, []);

  useEffect(() => {
    sliderRefs.current = Array.from({
      length: Object.keys(deviceData).length,
    }).map(() => React.createRef());
    setNext(false)
  }, [deviceData, next]);

  const handleSliderNext = (index) => {
    setNext(false)
    if (sliderRefs.current[index] && sliderRefs.current[index].current) {
      sliderRefs.current[index].current.slickNext();
      
    }
  };

  const handleSliderPrev = (index) => {
    setNext(false)
    if (sliderRefs.current[index] && sliderRefs.current[index].current) {
      sliderRefs.current[index].current.slickPrev();
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div>
        {Object.entries(deviceData).map(([deviceId, deviceEntries], index) => (
          <div key={deviceId} style={{marginBottom: "20px"}}>
            <div style={{marginBottom: "10px",display: "flex",justifyContent: "space-between",zIndex: "10",position: "absolute",marginTop: "180px",width: "95%",}}>
              <button onClick={() => handleSliderPrev(index)} style={ {backgroundColor: "#ffffff",border: "1px solid #ccc",borderRadius: "50%",width: "40px",height: "40px",display: "flex",alignItems: "center",justifyContent: "center",cursor: "pointer",transition: "background-color 0.3s ease",}}>
                <KeyboardDoubleArrowLeftIcon />
              </button>
              <button onClick={() => handleSliderNext(index)} style={ {backgroundColor: "#ffffff",border: "1px solid #ccc",borderRadius: "50%",width: "40px",height: "40px",display: "flex",alignItems: "center",justifyContent: "center",cursor: "pointer",transition: "background-color 0.3s ease",}}>
                <KeyboardDoubleArrowRightIcon />
              </button>
            </div>
            <Slider ref={sliderRefs.current[index]} {...sliderSettings}>
              {deviceEntries.map((entry, entryIndex) => (
                <div
                  key={`${deviceId}-${entry.questionId}-${entryIndex}`}
                  style={{
                    padding: "0 10px",
                    position: "relative",
                  }}
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
            </Slider>
          </div>
        ))}
      </div>
    </>
  );
};

export default IOTDashboard;
