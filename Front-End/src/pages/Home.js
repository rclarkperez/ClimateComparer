import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom';
import { firestore } from '../components/Firebase';
import { collection, addDoc, getDocs, query, where, onSnapshot } from "firebase/firestore";
import { statesUSA } from "../constants/statesUSA";
import axios from "axios";
// import Map from "../components/Map";
import { createClient } from 'pexels';



const Home = () => {
    const [climate, setClimate] = useState([]) //list taken from firebase DB
    const [currentCity, setcurrentCity] = useState('')
    const [currentState, setcurrentState] = useState('')
    const [currentCityClimateTD, setcurrentCityClimate] = useState([])
    const [currentCityClimateTR, setcurrentCityValues] = useState([])
    const [koppenClimate, setkoppenClimate] = useState('')
    const [koppenToggle, setkoppenToggle] = useState(true)
    const [cityPhotoURL, setcityPhotoURL] = useState('')
    
    const similarCities = []
    




    // const [WinterHigh, setWinterHigh] = useState([])
    // const [WinterLow, setWinterLow] = useState([])

    // const [springHigh, setSpringHigh] = useState([])
    // const [springLow, setSpringLow] = useState([])

    // const [SummerHigh, setSummerHigh] = useState([])
    // const [SummerLow, setSummerLow] = useState([])

    // const [FallHigh, setFallHigh] = useState([])
    // const [FallLow, setFallrLow] = useState([])





    const change = async (event) => {
        setcurrentCity(event.target.value)
        DisplayData()

    }

    //get all climates from firebase db
      const FetchClimates = async () => {
        await getDocs(collection(firestore, "cityClimate"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs 
                    .map((doc) => ({...doc.data(), id: doc.id}));
                setClimate(newData)
                // console.log("new data: ", newData)

            })
    }

    const DisplayData =  async() => {
        for (let i =0; i<=climate.length-1; i++){
            //if value is found, iterate though object and create a table 
            if(climate[i].city == currentCity){
                // console.log('success!', climate[i].result)
                setcurrentState(climate[i].state)
                sendData()
                for (const [key, value] of Object.entries(climate[i].result)) {
                    // console.log('key:', key, 'value:', value);
                    for (const [somekey, somevalue] of Object.entries(value)) {
                        // console.log("table data: ", somekey, somevalue)
                    }
                    // if (key == 'Average high °F (°C)'){
                    //     console.log('test', value.Jan)
                    //     // setWinterHigh()
                    //     // setSpringHigh()
                    //     // setSummerHigh()
                    //     // setFallHigh()
                    // }


                    currentCityClimateTD.push(key)
                    currentCityClimateTR.push(value)
                }
            }
            else{
                // console.log('failure')
            }
            }
    }

    const getKoppenClimate = async (koppencity, koppenstate) => {
        //grab lat and lon
            let city = koppencity
            let state = ''
            let country = koppenstate

            if (currentCity == ''){
                return
            }
            if (statesUSA.includes(currentState)){
                state = currentState
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
                if (koppenToggle){
                    return setkoppenClimate(koppen)
                }
                // console.log(koppen)
                });

            })
    }
    
    const cityImage = async () => {
        const pexelClient = createClient('Q5168KkkeznackGWl9pB9HhJbQmnPBnow24iTNaBjX1cPXA945RiDhNq');
        const query = `${currentCity + ',  '+ currentState}`;

        pexelClient.photos.search({ query, per_page: 1 }).then(photos => {
            const PhotoURL = photos.photos[0].src.original
            setcityPhotoURL(PhotoURL)
        });

    }

        //UI for Microservice to fetch city Climate data constructed by partner in JS *********** 
        async function sendData() {
        
            const data = {
                city: currentCity,
                state: currentState
            };
           
            const response = await fetch("http://localhost:3001/weather", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
           
    
            const result = await response.json();
    
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

        const findSimilar =  async(similarCity, similarState) => {


            console.log(koppenToggle, similarCity)
            setkoppenToggle(false)
            for (let i =0; i<=climate.length-1; i++){
                let city = climate[i].city
                let state = ''
                let country = climate[i].state


                // console.log(climate[i].city )

                //extract and compare all climate types
                if (statesUSA.includes(city)){
                    state = climate[i].state
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
                    let koppen = response.data.return_values[0].zone_description
                    console.log("koppen: ", koppen, "koppenClimate:", koppenClimate)
                    if (koppen == koppenClimate){
                        similarCities.push(climate[i].city)
                    }
                    });

                })
            }
            console.log("similarCities: ", similarCities)
            setkoppenToggle(true)
            
        }

    
      // Start the fetch operation as soon as
    // the page loads
    useEffect(() => {
        FetchClimates();
        DisplayData();
        cityImage();
        getKoppenClimate(currentCity,currentState);
        
        
    }, [currentCity, currentCityClimateTD, currentCityClimateTR, currentState, koppenClimate, cityPhotoURL, koppenToggle])
    
    
    return (
    <>
        <section id='about'>
        <h3>About</h3>
        <p>Random Latin filler words...</p>
    </section>

    <section id='get-started'>
        <h3>Get Started!</h3>
        <p>Random Latin filler words....</p>

        <div className="column" id="left-column">   
            <div>
                ****Map Goes Here****
                <div id="map" ></div>
            </div>
        </div>

        <p>Select a city and country and get started!</p>

        <select
        onChange={((event) => setcurrentCity(event.target.value))}
        >
        <option>City</option>
        {climate.map((obj) =>(
            <option
                className="item"
                key = {obj.id}
                >
                    {obj.city}
            </option>
        ))}
        </select>
        <br/>
        <br/>


        <div>See Climate Data Here:
            <p>City: {currentCity + ',  '+ currentState} </p> 
            <p>Climate Type: {koppenClimate}</p> 

            <button 
            disabled ={currentCity == ''}
            onClick={() => findSimilar(currentCity, currentState)}
            > Find Cities with Similar Climates!</button>
            <div>{similarCities.length ==0? '': similarCities}</div>

            <p>
                <img alt='' style={currentCity ==''? {}: { objectFit: 'cover', width: '100vh', height: '60vh'}} src = {cityPhotoURL}></img>
            </p>

        </div>
 
        <br/>
        

         <div>
            <div id="result"></div>
        </div> 

        <br/>
    </section>
  </>
);
}

export default Home;
