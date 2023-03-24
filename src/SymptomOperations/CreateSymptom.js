import { useForm } from "react-hook-form";
import axios from "axios";
import "./symptom.css";
import { URL } from "../App";


import { useToasts } from 'react-toast-notifications';

function CreateSymptom() {
  const { addToast } = useToasts();
  
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {

    axios
      .post(`${URL}/symptomApp/create-symptom-master`, data)
      .then((response) => {
        addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  })
      })
      .catch((error) => {if (error.message === "Request failed with status code 409") {
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
      }});
      reset()
  };return (
    <div className="mt-5">

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-6 mb-3">
        <label>Symptom Name:</label>
        <input
          type="text"
          className="form-control"
          {...register("symptom", { required: true })}
        />
        
      </div>
      <div className="col-md-12 text-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>

    </form>
    
    </div>
  );
}      

export default CreateSymptom;