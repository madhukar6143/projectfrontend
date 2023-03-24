import { useForm } from "react-hook-form";
import axios from "axios";
import "./disease.css";
import { URL } from "../App";
import { useToasts } from 'react-toast-notifications';
import React, { useState, useEffect } from "react";
import handleErrors from '../errorComponent'


function CreateDisease() {
  const { addToast } = useToasts();
  const [symptoms, setData] = useState([]);
  const [display,setDisplay]=useState(false)
  const [diseaseName,setDiseaseName]=useState('')
  const [diseaseId,setId]=useState('')
  
  const {
    register,
    handleSubmit,
    reset
  } = useForm();
  useEffect(() => {
    getSymptoms();
  }, []);
 

  const getSymptoms = async () => {
    let result = await axios.get(`${URL}/symptomApp/get-symptoms`);
    setData(result.data);
  };

  const onSubmit = (data) => {
   let input ={disease_name:data.disease_name}
   setDiseaseName(data.disease_name)
   setId(data.disease_id)
    axios
    .post(`${URL}/diseaseApp/create-disease-master`,input)
    .then((response) => {
      addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  });
    })
    .catch((error) => {
      handleErrors(error, addToast);
      });
};

  

  const onSubmitSymptoms = async (data) => {
 
    const selectedSymptoms = Object.keys(data.symptoms)
      .filter((key) => data.symptoms[key])
      .map((symptom) => parseInt(symptom)); // Convert string array to integer array
    let input = {
      disease_id:diseaseId,
      disease_name:diseaseName,
      symptom: selectedSymptoms,
    };
    axios
      .post(`${URL}/mappedtable/create-disease`, input)
      .then((response) => {
        addToast(response.data.message, {
          appearance: "success",
          autoDismissTimeout: 1000,
        });
      })
      .catch((error) => {

        if (error.message === "Request failed with status code 409") {
          addToast(error.response.data.message, {
            appearance: "error",
            autoDismissTimeout: 1000,
          });
        } else if (error.message === "Request failed with status code 500") {
          addToast("Internal server error", {
            appearance: "error",
            autoDismissTimeout: 1000,
          });
        } else {
          addToast(error.message, {
            appearance: "error",
            autoDismissTimeout: 1000,
          });
        }
      });
    reset();
  };

  return (
    <div className="mt-5" >

{!display && (
    <form onSubmit={handleSubmit(onSubmit)} >
      
      <div className="col-md-6 mb-3">
        <label className="text-center">Enter Disease Name:</label>
        <input
          type="text"
          className="form-control"
          {...register("disease_name", { required: true })}
        />
      </div>
      <div className="col-md-12 text-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
    )}
    </div>

  );
}

export default CreateDisease;


/*
//{!diseaseName && (
    <form onSubmit={handleSubmit(onSubmit)} className="row">
      <div className="col-md-6 mb-3">
        <label>Disease ID:</label>
        <input
          type="text"
          className="form-control"
          {...register("disease_id")}
        />
      </div>
      <div className="col-md-6 mb-3">
        <label>Disease Name:</label>
        <input
          type="text"
          className="form-control"
          {...register("disease_name", { required: true })}
        />
      </div>
      <div className="col-md-12 text-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
     )}
     */

     /*
     import { useForm } from "react-hook-form";
import axios from "axios";
import "./disease.css";
import { URL } from "../App";
import { useToasts } from 'react-toast-notifications';
import React, { useState, useEffect } from "react";


function CreateDisease() {
  const { addToast } = useToasts();
  const [symptoms, setData] = useState([]);
  let diseaseName='';
  
  const {
    register,
    handleSubmit,
    reset
  } = useForm();
  useEffect(() => {
    getSymptoms();
  }, []);
 

  const getSymptoms = async () => {
    let result = await axios.get(`${URL}/symptomApp/get-symptoms`);
    setData(result.data);
  };

  const onSubmit = async(data) => {
    console.log("data",data.disease_name)
    await setDiseaseName(data.disease_name)
    console.log("disease",diseaseName)
   let input ={name:data.disease_name}
   console.log("inut",input)
    axios
    .post(`${URL}/mappedtable/check-disease`,input)
    .then((response) => {
      if(response.status===2000)
      {
          
      }
    })
    .catch((error) => {
        console.log("error", error);

        if (error.message === "Request failed with status code 409") {
          addToast(error.response.data.message, {
            appearance: "error",
            autoDismissTimeout: 1000,
          });
        } else if (error.message === "Request failed with status code 500") {
          addToast("Internal server error", {
            appearance: "error",
            autoDismissTimeout: 1000,
          });
        } else {
          addToast(error.message, {
            appearance: "error",
            autoDismissTimeout: 1000,
          });
        }
      });
  reset();
};

  

  const onSubmitSymptoms = async (data) => {
    const selectedSymptoms = Object.keys(data.symptoms)
      .filter((key) => data.symptoms[key])
      .map((symptom) => parseInt(symptom)); // Convert string array to integer array
    let input = {
      disease_name: diseaseName,
      symptoms: selectedSymptoms,
    };
    axios
      .post(`${URL}/mappedtable/create-disease`, input)
      .then((response) => {
        addToast(response.data.message, {
          appearance: "success",
          autoDismissTimeout: 1000,
        });
      })
      .catch((error) => {
        console.log("error", error);

        if (error.message === "Request failed with status code 409") {
          addToast(error.response.data.message, {
            appearance: "error",
            autoDismissTimeout: 1000,
          });
        } else if (error.message === "Request failed with status code 500") {
          addToast("Internal server error", {
            appearance: "error",
            autoDismissTimeout: 1000,
          });
        } else {
          addToast(error.message, {
            appearance: "error",
            autoDismissTimeout: 1000,
          });
        }
      });
    reset();
  };

  return (
    <div>


{!diseaseName && (
    <form onSubmit={handleSubmit(onSubmit)} className="row">
      <div className="col-md-6 mb-3">
        <label>Disease ID:</label>
        <input
          type="text"
          className="form-control"
          {...register("disease_id")}
        />
      </div>
      <div className="col-md-6 mb-3">
        <label>Disease Name:</label>
        <input
          type="text"
          className="form-control"
          {...register("disease_name", { required: true })}
        />
      </div>
      <div className="col-md-12 text-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
    )}

{diseaseName && (
        <form onSubmit={handleSubmit(onSubmitSymptoms)}>
         
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
         <button type="submit" >
           Submit
         </button>
       </form>
           )}
       </div>
  );
}

export default CreateDisease;


/*
//{!diseaseName && (
    <form onSubmit={handleSubmit(onSubmit)} className="row">
      <div className="col-md-6 mb-3">
        <label>Disease ID:</label>
        <input
          type="text"
          className="form-control"
          {...register("disease_id")}
        />
      </div>
      <div className="col-md-6 mb-3">
        <label>Disease Name:</label>
        <input
          type="text"
          className="form-control"
          {...register("disease_name", { required: true })}
        />
      </div>
      <div className="col-md-12 text-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
     )}
     */