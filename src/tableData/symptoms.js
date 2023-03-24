import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Symptoms() {
    const [Symptoms, setData] = useState([]);
    useEffect(() => {
      (async () => {
       let result= await axios.get(`${URL}/symptomApp/get-symptoms`)
       setData(result.data)
      }
      )()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
  
    
    // empty dependency array to run effect only once on mount

  return (
    <div>
      <table  style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '5px' }}>Symptom ID</th>
          <th style={{ border: '1px solid black', padding: '5px' }}>Symptom Name</th>
        </tr>
      </thead>
      <tbody>
        {Symptoms.map((symptom) => (
          <tr key={symptom.symptom_id}>
            <td style={{ border: '1px solid black', padding: '5px' }}>{symptom.symptom_id}</td>
            <td style={{ border: '1px solid black', padding: '5px' }}>{symptom.symptom}</td>
          </tr>
        ))}
      </tbody>
    </table>
      
    </div>
  );
}

export default Symptoms
