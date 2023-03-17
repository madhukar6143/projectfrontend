import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Disease() {
  const [diseases, setData] = useState([]);
    useEffect(() => {
      (async () => {
       let result= await axios.get('http://localhost:5000/symptomApp/get-disease')
       setData(result.data)
      }
      )()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    
    
    // empty dependency array to run effect only once on mount

  return (
    <div>
     <table  style={{ border: '1px solid black', borderCollapse: 'collapse' }} >
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '5px' }} >Disease ID</th>
          <th style={{ border: '1px solid black', padding: '5px' }}>Disease Name</th>
        </tr>
      </thead>
      <tbody>
        {diseases.map((disease) => (
          <tr key={disease.disease_id}>
            <td style={{ border: '1px solid black', padding: '5px' }}>{disease.disease_id}</td>
            <td style={{ border: '1px solid black', padding: '5px' }}>{disease.disease_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default Disease;
