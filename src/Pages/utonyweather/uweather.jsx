import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import LocationForm from './locationForm';
import './uweather.css';
import { e } from 'mathjs';

const UWeather = () => {
    const [data, setData] = useState(null);
    const [prompt, setPrompt] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [indexval, setIndexval] = useState(0);
    const [dayDate, setDayDate] = useState('');

    useEffect(() => {
        // Retrieve the weather cache object from localStorage
        const weatherCacheKey = 'weatherCache';
        const cachedData = JSON.parse(localStorage.getItem(weatherCacheKey)) || {}; // Use empty object if no data is present
    
        console.log('Cached data:', cachedData);
    
        // Check if there is any data in the cache
        if (Object.keys(cachedData).length > 0) {
            // Optional: You can handle the most recent data or specific logic to pick data
            const latestKey = Object.keys(cachedData)[Object.keys(cachedData).length - 1]; // Get the last added key
            let latestData = cachedData[latestKey];
    
            setData(latestData); // Use the most recent cached data for rendering
            console.log('Using cached data from weatherCache:', latestData);
        } else {
            // No cached data, show the location prompt
            setPrompt(true);
        }
    }, []); // Run only once during the initial render
    
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
            setPrompt(true); // Show prompt while fetching
            try {
                const response = await fetch(`https://utony-weather-server.onrender.com/api/weather?city=${city}&country=${country}`);
                setLoading(true);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const jsonData = await response.json();
                setLoading(true);
                const storedData =[];
                localStorage.setItem(storedData, jsonData);
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
            <div className='weather-app h-screen' id='target'>
                <LocationForm fetchData={fetchData} fetchWeatherByCoordinates={fetchWeatherByCoordinates} />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="grid place-content-center">
                <span className=""> loading... </span>
            </div>
        )
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
       const celsius = ((fahrenheit - 32) * (5 / 9)).toFixed(0);
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

    let date = new Date();
    const storedData = [];
    const jsonData = localStorage.getItem(storedData)
    const iconBasePath = '/GWeatherIcons/';
    
    const currentTime = new Date().getTime();
    // Convert currentTime to seconds (as JSON uses seconds in datetimeEpoch)
    const currentEpoch = Math.floor(currentTime / 1000);


    return (
        <motion.div initial="start"
        animate="end"
        variants={gradientVariants}
        transition={{ duration: 5, yoyo: Infinity }} // Infinite gradient animation
        style={{ minHeight: '100vh' }}

        className='h-auto w-auto' 
        id='target'>
            {data && (
                <div id="weather-app" className='grid grid-col-2 gap-2 relative top-10 mt-10 ' >

                    <div className="temp-con w-10/12 grid grid-auto justify-self-center bg-gray-100 gap-5 px-20 py-6 shadow-md rounded-lg">
                        <h1 className="avg-temp col-span-2 text-teal-900 font-600 text-7xl lining- leading-snug
                        ">{toCelsius(data.days[1].hours[indexval].temp)}°</h1>
                        <div className="conditions text-s ">{data.days[1].hours[indexval].conditions} 
                            <img src={`${iconBasePath}${data.days[1].hours[indexval].icon}.png`} alt="" className="src size-10" />
                        </div>
                        <div className="location col-span-3 text-teal-600 line-clamp-1"> {data.resolvedAddress}</div>

                        <div className="high-temp"> <h2 className='text-teal-600'>High</h2> {toCelsius(data.days[1].tempmax)}° </div>
                        <div className="low-temp"> <h2 className='text-teal-600'>Low</h2> {toCelsius(data.days[1].tempmin)}° </div>
                    </div>

                    <div className="hourly-forecast grid grid-rows-1 justify-self-center bg-gray-100 gap-3 p-4 m-6 shadow-md rounded-lg">
                        <div className="desc  text-teal-600 bold"> Hourly Forecast </div>
                        <ul className="flex space-x-4 overflow-x-scroll">
                            {data.days[0].hours.map((hour, index) => (
                            <li key={index} className=" bg-gray-100 p-4 rounded-md">
                                <p className=''>{hourMinFormat(hour.datetime)}</p>
                                <p className='italic text-teal-600 bold'>{toCelsius(hour.temp)}°C</p>
                                <p className=''>{toCelsius(hour.feelslike)}°F</p>
                                <p className=''>{hour.conditions}</p>
                                <p className=""><img src={`${iconBasePath}${hour.icon}.png`} alt="" className="src size-10" /></p>
                            </li>
                            ))}
                        </ul>
                    </div>

                    <div className="daily-forecast grid grid-rows-1 bg-gray-100 p-3 mt-2 mb-14 mx-5 shadow-md rounded-lg">
                        <div className="desc  text-teal-600 bold"> Daily Forecast </div>

                        <ul className=" max-h-96 overflow-y-scroll">
                            {data.days.map((day, index) => (
                                <li key={index} className="bg-gray-100 p-4 rounded-md">
                                    <p className='inline-block bold pe-16'>{formatDay(day.datetime)}</p>
                                    <p className='inline-block italic text-teal-600 align-self-end pe-4'>{toCelsius(day.temp)}°C</p>
                                    <p className='inline-block align-self-end pe-4'>{toCelsius(day.feelslike)}°C</p>
                                    <p className="inline-block align-self-end pe-1"><img src={`${iconBasePath}${day.icon}.png`} alt="" className="src size-5" /> </p>
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