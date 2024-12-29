import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import LocationForm from './locationForm';
import './uweather.css';

const UWeather = () => {
    const [data, setData] = useState(null);
    const [prompt, setPrompt] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

 
    return (
        <motion.div initial="start"
        animate="end"
        variants={gradientVariants}
        transition={{ duration: 5, yoyo: Infinity }} // Infinite gradient animation
        style={{ minHeight: '100vh' }}

        className='h-auto w-auto' 
        id='target'>
            {data && (
                <div id="weather-app" className='grid grid-col-2 gap-5 relative top-10 mt-10' >
                    <div className="temp-con grid grid-rows-3 grid-cols-2 justify-self-center bg-gray-100 gap-5 p-14 shadow-md rounded-lg">
                        <h1 className="avg-temp col-span-2 text-6xl">{toCelsius(data.days[0].feelslike)}°</h1>
                        <div className="location col-span-3"> {data.resolvedAddress}</div>
                        <div className="high-temp"> High {toCelsius(data.days[0].tempmax)}° </div>
                        <div className="low-temp"> Low {toCelsius(data.days[0].tempmin)}° </div>
                    </div>

                    <div className="hourly-forecast grid grid-rows-1 justify-self-center bg-gray-100 gap-3 p-4 m-6 shadow-md rounded-lg">
                        <div className="desc"> Hourly Forecast </div>
                        <ul className="flex space-x-4 overflow-x-scroll">
                            {data.days[0].hours.map((hour, index) => (
                            <li key={index} className=" bg-gray-100 p-4 rounded-md">
                                <p className=''>{hour.datetime}</p>
                                <p className='italic'>{hour.temp}°F</p>
                                <p className=''>{hour.feelslike}°F</p>
                                <p className=''>{hour.conditions}</p>
                            </li>
                            ))}
                        </ul>
                    </div>

                    <div className="daily-forecast grid grid-rows-1 justify-self-center bg-gray-100 p-3 mt-2 mb-8 mx-5 shadow-md rounded-lg">
                        <div className="desc"> Daily Forecast </div>

                        <ul className=" max-h-96 overflow-y-scroll">
                            {data.days.map((day, index) => (
                                <li key={index} className=" bg-gray-100 p-4 rounded-md">
                                    <p className='inline-block bold'>{day.datetime}</p>
                                    <p className='inline-block italic'>{day.temp}°F</p>
                                    <p className='inline-block'>{day.feelslike}°F</p>
                                    <p className='inline-block'>{day.conditions}</p>
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