import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./symptom.css";
import { useToasts } from 'react-toast-notifications';
import { URL } from "../App";
import handleErrors from '../errorComponent'

function EditOrDeleteSymptom() 
{
  const { addToast } = useToasts();
  const [Symptoms, setData] = useState([]);
  let [editedSymptomName, setEditSymptom] = useState({
    status: false,
    id: 0
})
let { register, handleSubmit, setValue,formState:{errors}} = useForm()

useEffect(() => {
  getSymptoms();  
}, []);

  const getSymptoms = async () => {
    let result = await axios.get(`${URL}/symptomApp/get-symptoms`);
    setData(result.data);
  };

  const deleteSymptom = async (id) => {
    try{
    let response= await axios.delete(`${URL}/symptomApp/delete-symptom-master/${id}`)
    addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  });
     getSymptoms()
    }catch (error) 
    {
      handleErrors(error, addToast);
      }
    
  }    

 const editSymptom = (Symptom) => {

  setEditSymptom({ ...editedSymptomName, status: true, id: Symptom.symptom_id })
  setValue("symptomName", Symptom.symptom)
  setValue("symptom_id",Symptom.symptom_id)
}

const cancelAction =() =>
{
  setEditSymptom({ ...editedSymptomName, status: false })
}

const saveUserById = async (modifiedUser) => {
  try{
  let response=  await axios.put(`${URL}/symptomApp/update-symptom-master`, modifiedUser)
    setEditSymptom({ ...editedSymptomName, status: false })
    addToast(response.data.message, { appearance: 'success',autoDismissTimeout: 1000  });
    getSymptoms()
  }
  catch(error)
  {
    handleErrors(error, addToast);
  }
}

  // empty dependency array to run effect only once on mount


  return (

    <div>



      {Symptoms.length !== 0 &&
                <form onSubmit={handleSubmit(saveUserById)}>
                    <table className="table bg-light">
                        <thead>
                            <tr>
                                <th>Symptom ID</th>
                                <th>Symptom Name</th>
                                <th> Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                Symptoms.map((Symptom) => <tr key={Symptom.symptom_id}>
                                  
                                  <td>{Symptom.symptom_id}</td>
                                    <td>
                                        {editedSymptomName.status === true && editedSymptomName.id === Symptom.symptom_id ?
                                        <>
                                            <input type="text"  {...register("symptomName",{ 
                                                // check username is empty
                                               required: "Symptom required.",
                                               //minimum lentgh of username
                                               }
                                            )}  />
                                            {errors.username && <p>{errors.username.message}</p>}
                                            </>
                                             :
                                            <> {Symptom.symptom}</>
                                        }


                                    </td>
                                    <td>
                                        {editedSymptomName.status === true && editedSymptomName.id === Symptom.symptom_id ?

                                             <>
                                            <input type="submit" className="btn btn-success" value="Save" /> 
                                            <button type="button" className="btn btn-warning m-1" onClick={() => cancelAction()}>Cancel</button>
                                            </>
                                            :
                                            <>
                                                <button type="button" className="btn btn-warning m-1" onClick={() => editSymptom(Symptom)}>Edit</button>
                                                <button type="button" className="btn btn-danger m-1" onClick={() => deleteSymptom(Symptom.symptom_id)}>x</button>
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


export default EditOrDeleteSymptom
