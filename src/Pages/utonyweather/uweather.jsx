import { useState, useEffect } from 'react';
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
            const latestData = cachedData[latestKey];
    
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
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
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
                setPrompt(false); // End prompt state
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
      

    return (
        <div className='weather-app h-screen w-auto place-content-center grid border-2 border-indigo-500 rounded' id='target'>
            {data && (
                <div>
                    <h1>Weather for {data.resolvedAddress}</h1>
                    <p>Temperature: {data.days[0].temp}°C</p>
                    {/* Add more weather details here */}
                </div>
            )}
        </div>
    );
};

export default UWeather;