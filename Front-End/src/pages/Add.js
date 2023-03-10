import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const PORT = process.env.PORT || 3003;


const Add = () => {

    //React code to update DB*******************
    const [reactCity, setCity]        = useState('');
    const [reactState, setState]      = useState('');
    const [reactResult, setResult]    = useState(''); //includes all climate data 
    const history = useNavigate();


    const addClimate = async () => {
        const newCityClimate = {reactCity, reactState, reactResult};
        const response = await fetch(PORT || 'https://fierce-badlands-48978.herokuapp.com', {
            method: 'post',
            body: JSON.stringify(newCityClimate),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the City Climate!");
        } else {
            alert(`Failed to add cityClimate, status code = ${response.status}`);
        }
        history.push("/");
    };


    //UI for Microservice to fetch city Climate data*********** 
    async function sendData() {
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;

        const data = {
            city: city,
            state: state
        };
        setState(state)
        setCity(city)


        const response = await fetch("http://localhost:3001/weather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        setResult(result)
        // console.log("Result:", reactCity, reactState, reactResult)

        // Clear any existing table
        const resultDiv = document.getElementById("result");
        while (resultDiv.firstChild) {
            resultDiv.removeChild(resultDiv.firstChild);
        }

        // Create a new table element
        const table = document.createElement("table");
        resultDiv.appendChild(table);

        // Create the header row
        const headerRow = document.createElement("tr");
        table.appendChild(headerRow);
        const keys = Object.keys(result);
        const monthNames = Object.keys(result[keys[0]]);
        monthNames.unshift(""); // Add an empty cell for the first column
        monthNames.forEach(monthName => {
            const headerCell = document.createElement("th");
            headerCell.textContent = monthName;
            headerRow.appendChild(headerCell);
        });

        // Create the data rows
        keys.forEach(key => {
            const dataRow = document.createElement("tr");
            table.appendChild(dataRow);
            const rowData = result[key];
            const dataValues = Object.values(rowData);
            dataValues.unshift(key); // Add the month name to the first column
            dataValues.forEach(dataValue => {
                const dataCell = document.createElement("td");
                dataCell.textContent = dataValue;
                dataRow.appendChild(dataCell);
            });
        });
        
    }

    return (
   
        <div>
            <input type="text" id="city" placeholder="Enter city"/>
            <input type="text" id="state" placeholder="Enter state"/>
            <button onClick={sendData}>Submit</button>
            <div id="result"></div>
        </div>
      );
    };

   
export default Add;

// Styling
const container = {
    width: 500,
    margin: '50px auto'
  }
