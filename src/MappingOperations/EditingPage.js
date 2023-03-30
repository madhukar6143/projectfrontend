import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { URL } from "../App";
import handleErrors from '../errorComponent'
import { useToasts } from 'react-toast-notifications';
import { useNavigate } from 'react-router-dom';

function EditingPage() {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const location = useLocation();
  const disease = location.state.item;

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptoms, setData] = useState([]);

  useEffect(() => {
    getSymptoms();
  }, []);

  useEffect(() => {
    // Set the selectedSymptoms state based on the symptoms in the disease
    const diseaseSymptoms = disease.symptoms.map((s) => s.symptomName);
    setSelectedSymptoms(diseaseSymptoms);
  }, [disease]);

  const getSymptoms = async () => {
    const token = localStorage.getItem("jwt");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    let result = await axios.get(`${URL}/symptomApp/get-symptoms`);
    setData(result.data);
  };

  const handleSymptomChange = (symptomName, checked) => {
    setSelectedSymptoms((prevSelected) => {
      if (checked) {
        // Add the selected symptom to the list
        return [...prevSelected, symptomName];
      } else {
        // Remove the selected symptom from the list
        return prevSelected.filter((s) => s !== symptomName);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      // Find the IDs of the selected symptoms
      const selectedSymptomsIds = symptoms
        .filter((s) => selectedSymptoms.includes(s.symptom))
        .map((s) => s.symptom_id);
      // Update the disease with the selected symptoms
      const updatedDisease = { ...disease, symptoms: selectedSymptomsIds };
      const result = await axios.put(`${URL}/mappedtable/edit-mapped-disease`,updatedDisease);
      addToast(result.data.message, {
        appearance: "success",
        autoDismissTimeout: 1000,
      });
      
      setTimeout(() => {
        navigate("/mapped");
      }, 3000);
    
    } catch (error) {
      handleErrors(error, addToast);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit symptoms for {disease.diseaseName}</h2>
      <div className="row">
      {symptoms.map((symptom) => (
            <div className="col-sm-6 col-md-4" key={symptom.symptom_id}>
                <label className="d-flex align-items-center">
      
          <input
            type="checkbox"
            id={symptom.symptom_id}
            name={symptom.symptom}
            checked={selectedSymptoms.includes(symptom.symptom)}
            onChange={(e) =>
              handleSymptomChange(symptom.symptom, e.target.checked)
            }
            />
            <span className="normal">{symptom.symptom}</span>
          </label>
        </div>
      ))}



          </div>


      <button type="submit">Submit</button>
    </form>
  );
}

export default EditingPage;
