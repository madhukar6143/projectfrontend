import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./disease.css";
import { useToasts } from 'react-toast-notifications';
import { URL } from "../App";
import handleErrors from '../errorComponent'
import { confirmAlert } from 'react-confirm-alert';  
import 'react-confirm-alert/src/react-confirm-alert.css'; 

function EditOrDeleteDisease() 
{
  const { addToast } = useToasts();
  const [Diseases, setData] = useState([]);
  let [editedDiseaseName, setEditDisease] = useState({
    status: false,
    id: 0
})
let { register, handleSubmit, setValue,formState:{errors}} = useForm()

useEffect(() => {
  getDiseases();
   
}, []);

  const getDiseases = async () => {
    try{
      const token = localStorage.getItem('jwt');
// Set the default headers for all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      let result = await axios.get(`${URL}/diseaseApp/get-disease-master`);
      setData(result.data);
      }
      catch(error)
      {
        handleErrors(error, addToast);
      }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteDisease(id)
            // Handle delete logic here
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }; 

  const deleteDisease = async (id) => {
    try{
      const token = localStorage.getItem('jwt');
// Set the default headers for all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    let response= await axios.delete(`${URL}/diseaseApp/delete-disease-master/${id}`)
    addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  });
     getDiseases()
    }
    catch(error)
    {
      handleErrors(error, addToast);
    }

 }

 const editDisease = (Disease) => {

  setEditDisease({ ...editedDiseaseName, status: true, id: Disease.disease_id })
  setValue("disease_name", Disease.disease_name)
  setValue("disease_id",Disease.disease_id)
}

const cancelAction =() =>
{
  setEditDisease({ ...editedDiseaseName, status: false })
}

const saveUserById = async (modifiedUser) => {
  try{
    const token = localStorage.getItem('jwt');
// Set the default headers for all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  let response=  await axios.put(`${URL}/diseaseApp/update-disease-master`, modifiedUser)
    setEditDisease({ ...editedDiseaseName, status: false })
    addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  });
    getDiseases()
  }
  catch(error)
  {
    handleErrors(error, addToast);
    cancelAction()
    }
}

  // empty dependency array to run effect only once on mount


  return (

    <div className="mt-5">



      {Diseases.length !== 0 &&
      
                <form onSubmit={handleSubmit(saveUserById)}>
                  <label className="text-center">update and Delete:</label>
                    <table className="table bg-light">
                        <thead>
                            <tr>
                            <th>Serial Number</th>
                                <th>Disease Name</th>
                                <th>Symptoms</th>
                                <th> Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                Diseases.map((Disease,index) => <tr key={Disease.disease_id}>
                                  
                                  <td>{index + 1}</td>
                                    <td>
                                        {editedDiseaseName.status === true && editedDiseaseName.id === Disease.disease_id ?
                                        <>
                                            <input type="text"  {...register("disease_name",{ 
                                                // check username is empty
                                               required: "username required.",
                                               //minimum lentgh of username
                                              minLength: 
                                              {
                                                value: 6,
                                                message: 'minimum length should be 6' // JS only: <p>error message</p> TS only support string
                                              }
                                               }
                                            )}  />
                                            {errors.username && <p>{errors.username.message}</p>}
                                            </>
                                             :
                                            <> {Disease.disease_name}</>
                                        }


                                    </td>
                                    <td>
                                        {editedDiseaseName.status === true && editedDiseaseName.id === Disease.disease_id ?

                                             <>
                                            <input type="submit" className="btn btn-success" value="Save" /> 
                                            <button type="button" className="btn btn-warning m-1" onClick={() => cancelAction()}>Cancel</button>
                                            </>
                                            :
                                            <>
                                                <button type="button" className="btn btn-warning m-1" onClick={() => editDisease(Disease)}>Edit</button>
                                                <button type="button" className="btn btn-danger m-1" onClick={() => handleDelete(Disease.disease_id)}>x</button>
                                            </>
                                        }


                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </form>
}




    </div>
  );
}


export default EditOrDeleteDisease
