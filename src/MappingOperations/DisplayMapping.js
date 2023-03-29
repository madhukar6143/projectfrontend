import React, { useState, useEffect } from "react";
import axios from "axios";
import './DisplayMapping.css'
import { URL } from "../App";


function DisplayMapping() {
   
    const [data, setData] = useState([]);

    useEffect(() => {
        getMappedData();
      }, []);
    
      const getMappedData = async () => {
        const token = localStorage.getItem('jwt');
// Set the default headers for all requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let result = await axios.get(`${URL}/mappedtable/disease-symptoms`);
        console.log(result)
        setData(result.data);
      };

  return (
    <div>
    <h2>Diseases and Symptoms</h2>
    <table>
      <thead>
        <tr>
          <th>Disease </th>
          <th>Symptoms</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (

           
          <tr key={item.diseaseName}>
            <td>{item.diseaseName}</td>
            <td>{item.symptoms.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

    
export default DisplayMapping
