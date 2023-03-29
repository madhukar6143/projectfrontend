import React, { useState, useEffect } from "react";
import axios from "axios";
import './DisplayMapping.css'
import { URL } from "../App";


function Display() {
   
    const [data, setData] = useState([]);

    useEffect(() => {
        getMappedData();
      }, []);
    
      const getMappedData = async () => {
        const token = localStorage.getItem('jwt');
// Set the default headers for all requests
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        let result = await axios.get(`${URL}/mappedtable/get-mapped-table`);
        setData(result.data);
      };

  return (
    <div>
    <h2>Diseases and Symptoms</h2>
    <table>
      <thead>
        <tr>
          <th>Disease ID</th>
          <th>Symptom IDs</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.disease_id}>
            <td>{item.disease_id}</td>
            <td>{item.symptom_ids.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

    
export default Display

