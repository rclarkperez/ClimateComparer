import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { firestore } from '../components/Firebase';
import { addDoc, collection } from '@firebase/firestore';
import { statesUSA } from '../constants/statesUSA';
import axios from "axios";




const Add = () => {
    //React code to update DB *******************
    const [reactCity, setCity]        = useState('');
    const [reactState, setState]      = useState('');
    const [reactResult, setResult]    = useState(''); //includes all climate data 
    const [koppenClimate, setkoppenClimate] = useState('')

    const history = useNavigate();


    const addClimate = async (reactCity, reactState, reactResult) => {
        const ref = collection(firestore, "cityClimate")

        let data = {
            city: reactCity,
            state: reactState,
            result: reactResult
        }
        console.log(data.city, data.state)

        if (!data.city == '' && !data.state == '' && !data.result == '') {

            await addDoc(ref, data)
            .then(() => {
                alert("Data Successfully Submitted");
            })
            .catch((error) => {
                alert(error("Error adding document: ", error));
            });    
        }
    };
    const getKoppenClimate = async () => {
        //grab lat and lon
            let city = reactCity
            let state = ''
            let country = reactState

            if (reactCity == ''){
                return
            }
            if (statesUSA.includes(reactState)){
                state = reactState
                country = 'us'
            }

            // console.log(currentCity, currentState)

            const baseURL1 = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=2&appid=3dd6b4b0643fe807a69521e6f5cd399a`
            
            await axios.get(baseURL1).then(async(response)=> {
                // console.log(response)
                const lat =  response.data[0].lat
                const lon = response.data[0].lon
                const first_res = response
                // console.log('lat: ', lat,'lon: ', lon)


            // get koppen climate type
            const baseURL2 = `http://climateapi.scottpinkelman.com/api/v1/location/${lat}/${lon}`
            axios.get(baseURL2).then(async(response)=> {
                // console.log("2nd response", response)
                const koppen = response.data.return_values[0].zone_description
                setkoppenClimate(koppen)
                console.log(koppen)
                });

            })
    }


    useEffect(() => {
        addClimate(reactCity, reactState, reactResult)
        getKoppenClimate()

    }, [reactCity, reactState, reactResult])

    //UI for Microservice to fetch city Climate data constructed by partner in JS *********** 
    async function sendData() {
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;

        const data = {
            city: city,
            state: state
        };
       
        const response = await fetch("http://localhost:3001/weather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
       

        const result = await response.json();
        setState(state)
        setCity(city)
        setResult(result)

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
            <input type="text" id="city"  placeholder="Enter city" required/>
            <input type="text" id="state" placeholder="Enter state(US)/Country" required/>
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
