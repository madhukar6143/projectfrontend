import { useForm } from "react-hook-form";
import axios from "axios";
import "./disease.css";
import { URL } from "../App";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import handleErrors from "../errorComponent";

function CreateDisease() {
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [symptoms, setData] = useState([]);

  useEffect(() => {
    getSymptoms();
  }, []);
  const getSymptoms = async () => {
    const token = localStorage.getItem("jwt");
    // Set the default headers for all requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    let result = await axios.get(`${URL}/symptomApp/get-symptoms`);
    setData(result.data);
  };

  const onSubmit = async(data) => {
    try {
      console.log(data)
      let diseaseName = data.disease_name.trim();
      if (diseaseName === "")
        return addToast("disease name can't be null", {
          appearance: "error",
          autoDismissTimeout: 1000,
        });

      diseaseName = diseaseName.charAt(0).toUpperCase() + diseaseName.slice(1);
      const token = localStorage.getItem("jwt");
      // Set the default headers for all requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.post(`${URL}/diseaseApp/search-disease`, {disease_name: diseaseName});

      const selectedSymptoms = Object.keys(data.symptoms)
      .filter((key) => data.symptoms[key])
      .map((symptom) => parseInt(symptom)); // Convert string array to integer array
    if (selectedSymptoms.length === 0)
      return addToast("please select aleast one symptom", {
        appearance: "error",
        autoDismissTimeout: 1000,
      });
      const response = await axios.post(
        `${URL}/search/search-disease`,
        selectedSymptoms
      );
      if (response.data.message === "No disease found with such symptoms") {
        let input = {
          disease_name: diseaseName,
          symptom: selectedSymptoms,
        };
        console.log(input)
        const result = await axios.post(
          `${URL}/mappedtable/create-disease`,
          input
        );
        addToast(result.data.message, {
          appearance: "success",
          autoDismissTimeout: 1000,
        });
      
        reset();
      } else {
        addToast(
          `${response.data.message} has same symptoms please select other symtoms`,
          { appearance: "error", autoDismissTimeout: 1000 }
        );
      }
      
    } catch (error) {
      handleErrors(error, addToast);
    }
  };

  return (
    <>
    <h1 className="text-success"> Create New Disease</h1>
      <form  className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-6 mb-3">
          <label className="text-center">Enter Disease Name:</label>
          <input
            type="text"
            className="form-control"
            {...register("disease_name", {
              required: true,
            })}
          />
          {errors.disease_name && (
            <p className="text-danger">This field is required</p>
          )}
        </div>
        <div className="h5">Select relavent symptoms</div>
        <div className="row">
          {symptoms.map((symptom) => (
            <div className="col-sm-6 col-md-4" key={symptom.symptom_id}>
              <label className="d-flex align-items-center">
                <input
                  type="checkbox"
                  {...register(`symptoms.${symptom.symptom_id}`)}
                  className="mr-2"
                />
                <span className="normal">{symptom.symptom}</span>
              </label>
            </div>
          ))}
        </div>

        <div className="col-md-12 text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
   
    </>
  );
}

export default CreateDisease;
