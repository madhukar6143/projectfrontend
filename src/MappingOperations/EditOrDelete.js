import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import "./InsertDisease.css";
import { URL } from "../App";

function EditOrDelete() {
  const { addToast } = useToasts();
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [symptoms, setData] = useState([]);
  const [mappedData, setMappedData] = useState([]);

  useEffect(() => {
    getSymptoms();
    getMappedData()
  }, []);
  
  const getMappedData = async () => {
     let result= await axios.get(`${URL}/mappedtable/get-mapped-table`)
     setMappedData(result.data)
  }
  const getSymptoms = async () => {
    let result = await axios.get(`${URL}/symptomApp/get-symptoms`);
    setData(result.data);
  };
  
  const onSubmit = async (data) => {
    console.log(data,symptoms,mappedData)
    reset();
  };

  return (
    <div>
 

 {mappedData.map((item) =>
  <div>
    <p>Disease ID: {item.disease_id}</p>
    <span>Symptom IDs:</span>
    <ul>
      {item.symptom_ids.map((symptom_id) =>
        <span key={symptom_id}>{symptom_id}</span>
      )}
    </ul>
  </div>
)}
    <form onSubmit={handleSubmit(onSubmit)}>
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
</div>

  );
}

export default EditOrDelete
