import React, { useState, useEffect } from "react";
import axios from "../services/axios";
import { useData } from "../../components/JobDataContext";
import CustomSelect from "../components/custom-select";

const MetabaseQuestion = () => {
  const [iframeUrl, setIframeUrl] = useState("");
  const { questionId } = useData();
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [updateData, setUpdateData] = useState([]);

  useEffect(() => {
    setSelectedUnit(null);
  }, [questionId]);

  useEffect(() => {
    if (questionId) {
      axios.getWithCallback(`client-dashboard/questionId/${questionId}`, (data) => {
        setIframeUrl(data.iframeUrl);
      });
    }
  }, [questionId, updateData]);

  useEffect(() => {
    const availableUnits = [
      { value: 1, label: "Minute" },
      { value: 2, label: "Hour" },
      { value: 3, label: "Day" },
      { value: 4, label: "Week" },
      { value: 5, label: "Month" },
      { value: 6, label: "Quarter" },
      { value: 7, label: "Year" },
    ];
    setUnits(availableUnits);
  }, [questionId]);

  const handleUnitSelect = (selectedOption) => {
    if (!selectedOption) {
      console.error("Expected selected option but got:", selectedOption);
      return;
    }
    if (selectedOption.text !== "Select Unit") {
      setSelectedUnit(selectedOption);
    }
  };

  useEffect(() => {
    if (selectedUnit && questionId) {
      axios.put(`client-dashboard/${questionId}/updatequeryunit`, { unit: selectedUnit.text.toLowerCase() })
        .then((response) => {
          setUpdateData(response.data);
        })
        .catch(error => {
          console.error("Error updating query unit:", error);
        });
    }
  }, [selectedUnit, questionId]);

  return (
    <div>
      <div style={{ width: "25%" }}>
        <CustomSelect
          options={units}
          label="Unit"
          callback={handleUnitSelect}
        />
      </div>
      {iframeUrl && (
        <iframe
          src={iframeUrl}
          width="100%"
          height="800px"
          frameBorder="0"
          allowTransparency="true"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default MetabaseQuestion;