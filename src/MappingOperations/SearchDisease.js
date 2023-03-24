import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useToasts } from 'react-toast-notifications';
import { URL } from "../App";

import './SymptomSelector.css'; // import the CSS file

const SymptomSelector = () => {
    
const [symptoms, setData] = useState([]);
 
useEffect(() => {
  getSymptoms();
}, []);

  const getSymptoms = async () => {
    let result = await axios.get(`${URL}/symptomApp/get-symptoms`);
    
    setData(result.data);
  };
  const { addToast } = useToasts();
  const { register, reset,handleSubmit } = useForm();
  
  const onSubmit = async(data) => {
 
    const selectedSymptoms = Object.keys(data.symptoms)
      .filter((key) => data.symptoms[key])
      .map((key) => parseInt(key.replace('symptoms.', '')));

      axios.post(`${URL}/search/search-disease`, selectedSymptoms)
      .then((response) => {
        addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  })
      })
      .catch((error) => {
        addToast(error.message, { appearance: 'error',autoDismissTimeout: 1000  })
      });
      reset()
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      
    <h1 className="text-warning"> Select Symptoms to know Disease</h1>
    <div className="row">
        {symptoms.map((symptom) => (
          <div className="col-sm-6 col-md-4" key={symptom.symptom_id}>
            <label className="d-flex align-items-center">
              <input
                type="checkbox"
                {...register(`symptoms.${symptom.symptom_id}`)}
        
              />
              <span>{symptom.symptom_id}</span>
              <span>{symptom.symptom}</span>
            </label>
          </div>
        ))}
        </div>
      <button type="submit">Submit</button>
    </form>

   
    </>
  );
};

export default SymptomSelector;
