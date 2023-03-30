import { useForm } from "react-hook-form";
import axios from "axios";
import "./symptom.css";
import { URL } from "../App";
import handleErrors from '../errorComponent'
import { useToasts } from 'react-toast-notifications';

function CreateSymptom() {
  const { addToast } = useToasts();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    data.symptomName=data.symptomName.trim()
    if(data.symptomName==="")
    return addToast("symptom name can't be null", { appearance: 'error',autoDismissTimeout: 1000  });
    data.symptomName =data.symptomName.charAt(0).toUpperCase() + data.symptomName.slice(1);
    const token = localStorage.getItem('jwt');
    // Set the default headers for all requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log(data)
    axios
      .post(`${URL}/symptomApp/create-symptom-master`, data)
      .then((response) => {
        console.log(response)
        addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  })
        
      reset()
      })
      .catch((error) => {
        handleErrors(error, addToast);
      });
  };return (
    <div className="mt-5">

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-6 mb-3">
        <label>Symptom Name:</label>
        <input
          type="text"
          className="form-control"
          {...register("symptomName", { required: true })}
        />
         {errors.symptom && <p className="text-danger">This field is required</p>}
        
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