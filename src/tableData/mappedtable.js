import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Mappedtable() {


    const [mappedData, setData] = useState([]);
    useEffect(() => {
      (async () => {
       let result= await axios.get('http://localhost:5000/symptomApp/get-mapped-table')
       setData(result.data)
      }
      )()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return (
        <table  style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid black', padding: '5px' }}>Disease ID</th>
          <th style={{ border: '1px solid black', padding: '5px' }}>Symptom Ids</th>
        </tr>
      </thead>
      <tbody>
        {mappedData.map((mappedData) => (
          <tr key={mappedData.disease_id}>
            <td style={{ border: '1px solid black', padding: '5px' }}>{mappedData.disease_id}</td>
            <td style={{ border: '1px solid black', padding: '5px' }}>{mappedData.symptom_ids.join(', ')}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
    )
}

export default Mappedtable
