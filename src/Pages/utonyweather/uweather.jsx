import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import LocationForm from './locationForm';
import { FaUndo } from 'react-icons/fa';
import axios from "axios";
import './uweather.css';
import { e } from 'mathjs';
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';

const UWeather = () => {
    const [data, setData] = useState(null);
    const [prompt, setPrompt] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [indexval, setIndexval] = useState(0);
    const [address, setAddress] = useState('');
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [holdResult, setHoldResult] = useState('');
    const [chosenIndex, setChosenIndex] = useState(0);

    const API_KEY = '124d73669936416ea36f14503e262e7d'; // Replace with your OpenCage API key


    const InputValChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) { // Fetch suggestions only if query length > 2
            try {
                const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                    params: {
                        q: value,
                        key: API_KEY,
                        limit: 5, 
                        language: "en",
                    },
                });

                const results = response.data.results.map((result) => result.formatted);
                setHoldResult(results);
                setSuggestions(results);
            
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
            
        } else {
            setSuggestions([]);
        }
    }

    const unformatLocation = (index) => {
        const chosenList = holdResult[index];
        console.log(chosenList);

       const splitData = chosenList.split(',');
       console.log(splitData)

       const newcity = splitData[0];
       const newcountry = splitData[1];
       console.log(newcity && newcountry);

       fetchData(newcity, newcountry);

    }

    const resetData = () => {
        localStorage.removeItem('weatherCache');
        window.location.reload()
    }

    useEffect(() => {
        // Retrieve the weather cache object from localStorage
        const weatherCacheKey = 'weatherCache';
        const cachedData = JSON.parse(localStorage.getItem(weatherCacheKey)) || {}; // Use empty object if no data is present
    
        console.log('Cached data:', cachedData);
    
        // Check if there is any data in the cache
        if (Object.keys(cachedData).length > 0) {
            const latestKey = Object.keys(cachedData)[Object.keys(cachedData).length - 1]; // Get the last added key
            let latestData = cachedData[latestKey];
    
            setData(latestData); // Use the most recent cached data for rendering
            console.log('Using cached data from weatherCache:', latestData);
        } else {
            // No cached data, show the location prompt
            setPrompt(true);
        }
    }, []); // Run only once during the initial render

    const iconBasePath = '/GWeatherIcons/';
    useEffect(() => {
        if (data) {
            console.log('Data available outside fetchData:', data);
    
            if (data.days && data.days[0]?.hours) {

                const timeinData = data.days[0].hours[23].datetime;
                const date = new Date(timeinData * 1000);
    
                const realTime = new Date();
                console.log(realTime);
    
                const realHour = realTime.getHours();
                console.log(realHour);
                    
                const parts = data.resolvedAddress.split(",");
                const coordinates = parts.every(part => !isNaN(part) && part.trim() !== "");
                if (coordinates ) {
                    const resolvedAddress = localStorage.getItem("resolvedAddress");
                console.log("Resolved Address:", resolvedAddress);
                    console.log(data.resolvedAddress)
                    console.log("coords address:", address);
                    setAddress(resolvedAddress)
                } else {
                    console.log('use entered address');
                    setAddress(data.resolvedAddress);
                }

                const currentvalue = data.days[0].hours[realHour].temp;
                console.log(currentvalue)                
                console.log(toCelsius(currentvalue));

                // Extract the hour
                const hour = date.getHours();
                console.log('Hour:', hour);
                console.log(`${iconBasePath}${data.days[7].icon}.png`);
    
                console.log(data.days[0].datetime);
                const hourInfo = document.querySelectorAll('.hour-info');

                hourInfo[realHour].scrollIntoView({
                    behavior: 'instant',
                    block: 'nearest', // Ensures vertical alignment doesn't change
                    inline: 'start'  }); 
                    
                hourInfo[realHour].classList.add('text-teal-500')
    
                // Update the state
                setIndexval(realHour);
            } else {
                console.log('Data structure incomplete or missing days/hours');
            }
        } else {
            console.log('Data is not yet available');
        }
    }, [data]); // Re-run the effect whenever 'data' changes

    
    // Function to fetch weather data
    const fetchData = async (city, country) => {
        const cacheKey = `${city}:${country}`;
        const weatherCacheKey = 'weatherCache';
    
        // Retrieve the cache object from localStorage
        const cachedData = JSON.parse(localStorage.getItem(weatherCacheKey)) || {};
    
        console.log('Cache key:', cacheKey);
    
        // Check if data for the given city-country pair exists in the cache
        if (cachedData[cacheKey]) {
            const jsonCachedData = cachedData[cacheKey]; // Access cached data
            setData(jsonCachedData); // Set the state to cached data
            console.log('Using cached weather data:', jsonCachedData);
        } else {
            console.log('Data not found in cache... fetching from server');
            if (chosenIndex) {
            setPrompt(true); 
        } else {setPrompt(false)}// Show prompt while fetching
            try {
                const response = await fetch(`https://utony-weather-server.onrender.com/api/weather?city=${city}&country=${country}`);
                setLoading(true);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const jsonData = await response.json();
                const storedData = [];
                localStorage.setItem(storedData, jsonData);
                console.log('new stored data', storedData)
                // Update the cache object with new data
                cachedData[cacheKey] = jsonData;
                localStorage.setItem(weatherCacheKey, JSON.stringify(cachedData)); // Save the updated cache to localStorage
    
                setData(jsonData); // Set the fetched data to state
                console.log('Fetched data from server:', jsonData);
                
            } catch (err) {
                console.error('Error fetching weather data:', err);
                setError(err.message); // Handle network error
            } finally {
                setPrompt(false); // End prompt state
                setLoading(false);

            }
        }
    };

    const convertCoordinates = async (latitude, longitude) => {
        const apiKey = '124d73669936416ea36f14503e262e7d';  // Replace with your OpenCage API key

        const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
            const city = `${data.results[0].components._normalized_city}, ${data.results[0].components.state},`;
            const country = `${data.results[0].components.country}`;
            const resolvedAddress = `${city}${country}`;
            localStorage.setItem("resolvedAddress", resolvedAddress);
            setAddress(resolvedAddress)

            console.log(resolvedAddress)
            } else {
            console.log('No results found.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const fetchWeatherByCoordinates = async (latitude, longitude) => {
        const cacheKey = `${latitude}:${longitude}`;
        const weatherCacheKey = 'weatherCache';
    
        // Retrieve the cache object from localStorage
        const cachedData = JSON.parse(localStorage.getItem(weatherCacheKey)) || {};
    
        console.log('Cache key:', cacheKey);
    
        // Check if data for the given coordinate pair exists in the cache
        if (cachedData[cacheKey]) {
            const jsonCachedData = cachedData[cacheKey]; // Access cached data
            setData(jsonCachedData); // Set the state to cached data
            console.log('Using cached weather data:', jsonCachedData);
        } else {
            console.log('Data not found in cache... fetching from server');
            setPrompt(true); // Show prompt while fetching

            try {
                const response = await fetch(`https://utony-weather-server.onrender.com/api/weather?latitude=${latitude}&longitude=${longitude}`);
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    setLoading(true);
                    console.log("response ok loading...");
                }
    
                const jsonData = await response.json();
                // Update the cache object with new data
                cachedData[cacheKey] = jsonData;
                localStorage.setItem(weatherCacheKey, JSON.stringify(cachedData)); // Save the updated cache to localStorage
    
                setData(jsonData); // Set the fetched data to state
                console.log('Fetched data from server:', jsonData);
            } catch (err) {
                console.error('Error fetching weather data:', err);
                setError(err.message); // Handle network error
            } finally {
                setPrompt(false);
                setLoading(false) // End prompt state
            }
        }
    }

    if (prompt) {
        return (
            <div className='weather-app h-screen backdrop-blur-sm' id='target'>
                <LocationForm fetchData={fetchData} fetchWeatherByCoordinates={fetchWeatherByCoordinates} 
                convertCoordinates={convertCoordinates}/>
            </div>
        );
    }

    if (error) {
        return (
            <div className='weather-app h-screen'>
                <p>Error: {error}</p>
            </div>
        );
    }
      
    const gradientVariants = {
        start: { background: 'linear-gradient(to right, aliceblue, white)' },
        end: { background: 'linear-gradient(to right, white, aliceblue)' },
    };

    const toCelsius = (fahrenheit) => {
       const celsius = Math.round((fahrenheit - 32) * (5 / 9));
       
        return celsius;
    }

    const hourMinFormat = (fullTime) => {
        const formattedTime = fullTime.slice(0, -3);
        return formattedTime;
    }

    const formatDay = (numDay) => {
        const day = new Date(numDay);
       const realDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(day);
        return realDay;
    }
    
    return (
        <motion.div initial="start"
        animate="end"
        variants={gradientVariants}
        transition={{ duration: 5, yoyo: Infinity }} // Infinite gradient animation
        style={{ minHeight: '100vh' }}

        className='h-auto w-auto' 
        id='target'>
            {data && (
                <div id="weather-app" className='grid justify-items-center grid-rows-1 grid-col-2 gap-5 relative top-4 mt-10 ' >
                    <div className="search z-50 sticky top-12 grid grid-auto w-full">
                        <input type="search" value={query} className='search-icon bg-teal-100 justify-self-center w-11/12 row-span-auto p-3 ring-1 text-md ring-teal-900 rounded-full' name="place" id="place" onChange={InputValChange} placeholder={address} />
                    {suggestions.length > 0 && (
                        <ul className=' absolute justify-self-center w-11/12 top-12 backdrop-blur-md text-zinc-800 ring-1 ring-teal-900 shadow-teal-100 rounded-md overflow-y-auto'>
                            {suggestions.map((suggestion, index) => (
                                <li key={index} className='p-1 border-b-2 border-teal-600 text-zinc-800' onClick={
                                     () => {
                                        setQuery(suggestion);
                                        setSuggestions([]);
                                        setChosenIndex(index);
                                        unformatLocation(index);
                                        console.log();
                                        setCity();

                                        }
                                    }> {suggestion} </li>
                            ))}
                        </ul>
                    )}
                    </div>

                    <div className="temp-con grid grid-auto justify-self-center w-11/12 px-7 py-5 backdrop-blur-sm gap-5 shadow-md rounded-lg z-40">
                        <h1 className="avg-temp col-span-2 text-teal-900 font-600 text-7xl lining- leading-snug
                        ">{toCelsius(data.days[0].hours[indexval].temp)}°</h1>
                        <div className="conditions text-s relative top-1/4 place-self-center ms-6">{data.days[0].hours[indexval].conditions} 
                            <img src={`${iconBasePath}${data.days[0].hours[indexval].icon}.png`} alt="" className="src size-10" />
                        </div>
                        <div className="feelslike col-span-3 text-teal-600 line-clamp-2 text-sm"> Feels like: {toCelsius(data.days[0].hours[indexval].feelslike)}°C</div>

                        <div className="high-temp"> <h2 className='text-teal-600'>High</h2> {toCelsius(data.days[0].tempmax)}°C </div>
                        <div className="low-temp"> <h2 className='text-teal-600'>Low</h2> {toCelsius(data.days[0].tempmin)}°C </div>
                        <button  className="text-teal-600 bg-transparent px-1  text-sm py-1 place-self-end rounded w-fit" onClick={resetData}> < FaUndo className='reset'/> </button>

                    </div>

                    <div className="hourly-forecast grid grid-rows-1 justify-self-center w-11/12 p-4 bg-gray-100 gap-3 shadow-md rounded-lg">
                        <div className="desc  text-teal-600 bold"> Hourly Forecast </div>
                        <ul className="flex xtra-sm:space-x-0 space-x-4 overflow-x-auto whitespace-nowrap">
                            {data.days[0].hours.map((hour, index) => (
                            <li key={index} className="hour-info bg-gray-100 p-4 rounded-md">
                                <p className='py-1'>{hourMinFormat(hour.datetime)}</p>
                                <p className='py-1 text-teal-600 bold'>{toCelsius(hour.temp)}°C</p>
                                <p className='py-1'><img src={`${iconBasePath}${hour.icon}.png`} alt="" className="src size-6" /></p>
                            </li>
                            ))}
                        </ul>
                    </div>

                    <div className="daily-forecast grid grid-rows-1 w-11/12 bg-gray-100 p-3 mt-1 mb-14 mx-3 shadow-md rounded-lg">
                        <div className="desc  text-teal-600 bold"> Daily Forecast </div>

                        <ul className=" max-h-96 overflow-y-scroll">
                            {data.days.map((day, index) => (
                                <li key={index} className="grid grid-flow-col bg-gray-100 p-4 rounded-md">
                                    <p className='inline-block bold'>{formatDay(day.datetime)}</p>
                                    <span className="dayInfo justify-self-end ">
                                    <p className='inline-block italic text-teal-600 px-2'>{toCelsius(day.temp)}°C</p>
                                    <p className='inline-block px-2'>{toCelsius(day.feelslike)}°C</p>
                                    <p className="inline-block "><img src={`${iconBasePath}${day.icon}.png`} alt="" className="src size-5" /> </p>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="element-widgets">

                    </div>


                </div>
            )}
        </motion.div>
    );
};

export default UWeather;