import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import "./InsertDisease.css";
import { URL } from "../App";
import handleErrors from '../errorComponent'

function InsertDisease() {

  const { addToast } = useToasts();
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [symptoms, setData] = useState([]);
  const [FilteredData, setFilterData] = useState([]);

  useEffect(() => {
    getSymptoms();
    FilterDisease();
  }, []);

  const getSymptoms = async () => {
    const token = localStorage.getItem('jwt');
// Set the default headers for all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let result = await axios.get(
      `${URL}/symptomApp/get-symptoms`
    );
    setData(result.data);
  };
  const FilterDisease = async () => {
    const token = localStorage.getItem('jwt');
// Set the default headers for all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    let result = await axios.get(
      `${URL}/mappedtable/remaining-disease`
    );
    setFilterData(result.data.payload);
  };

 

    const onSubmit = async (data) => {
      const selectedDisease = data.selectedOption;
      const selectedSymptoms = Object.keys(data.symptoms).filter(
        (key) => data.symptoms[key]
      ).map(symptom => parseInt(symptom)); // Convert string array to integer array
    
      let input = {
        disease_id: selectedDisease,
        symptom: selectedSymptoms,
      };
      const token = localStorage.getItem('jwt');
      // Set the default headers for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios
      .post(`${URL}/mappedtable/create-disease`, input)
      .then((response) => {
        addToast(response.data.message, {
          appearance: "success",
          autoDismissTimeout: 1000,
        });
      })
      .catch((error) => 
      handleErrors(error, addToast)
      );
    reset();
  };

  return (
    <div>
  {FilteredData.length === 0 ? (
     <p className="no-disease-message">No new diseases</p>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
     < h1 className="text-success" >Select Disease and Assign Symptoms</h1>
      <label>
        Choose a Disease:
        <select {...register("selectedOption")}>
          {FilteredData.map((Disease) => (
            <option key={Disease.disease_id} value={Disease.disease_id}>
              {Disease.disease_name}
            </option>
          ))}
        </select>
      </label>
      <div className="row">
        {symptoms.map((symptom) => (
          <div className="col-sm-6 col-md-4" key={symptom.symptom_id}>
            <label className="d-flex align-items-center">
              <input
                type="checkbox"
                {...register(`symptoms.${symptom.symptom_id}`)}
                className="mr-2"
              />
              <span>{symptom.symptom}</span>
            </label>
          </div>
        ))}
      </div>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  )}
</div>

  );
}

export default InsertDisease;
