import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../App";
import "./disease.css";

function DisplayDisease() {
    const [Diseases, setData] = useState([]);

    useEffect(() => {
        getDiseases();
      }, []);
    
      const getDiseases = async () => {
        let result = await axios.get(`${URL}/diseaseApp/get-disease-master`);
        setData(result.data);
      };
    return (
        <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Disease ID
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Disease Name
            </th>
          </tr>
        </thead>
        <tbody>
          {Diseases.map((Disease) => (
            <tr key={Disease.disease_id}>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {Disease.disease_id}
              </td>
              <td style={{ border: "1px solid black", padding: "5px" }}>
                {Disease.disease_name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}

export default DisplayDisease
