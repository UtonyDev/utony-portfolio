import { useState, useEffect } from 'react';
import LocationForm from './locationForm';
import './uweather.css';

const UWeather = () => {
    const [data, setData] = useState(null);
    const [prompt, setPrompt] = useState(false); // Default to `false` to prevent showing the prompt initially
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if any data exists in localStorage during the initial render
        const keys = Object.keys(localStorage);
        console.log(keys);
        console.log(keys.length);

        if (keys.length > 0) {
            try {
                // Retrieve the most recent data in localStorage (optional logic can be added to handle multiple keys)
                const latestKey = keys[keys.length]; // Example: Get the last added key
                console.log(latestKey);
                const cachedData = JSON.parse(localStorage.getItem(latestKey));

                setData(cachedData); // Use cached data for rendering
                console.log('Using cached data from localStorage:', cachedData);


            } catch (err) {
                console.error('Error parsing cached data:', err);
            }
        } else {
            // No cached data, show the location prompt
            setPrompt(true);
        }
    }, []); // Run only once during the initial render

    // Function to fetch weather data
    const fetchData = async (city, country) => {
        const cacheKey = `${city}:${country}`;
        const cachedWeather = localStorage.getItem(cacheKey);

        console.log(cacheKey);

        // Check if data exists in localStorage
        if (cachedWeather) {
            const jsonCachedData = JSON.parse(cachedWeather); // Parse cached data
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
                localStorage.setItem(cacheKey, JSON.stringify(jsonData)); // Store fetched data in cache
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
        const cachedWeather = localStorage.getItem(cacheKey);

        console.log(cacheKey);

        // Check if data exists in localStorage
        if (cachedWeather) {
            const jsonCachedData = JSON.parse(cachedWeather); // Parse cached data
            setData(jsonCachedData); // Set the state to cached data
            console.log('Using cached weather data:', jsonCachedData);
        } else {
            console.log('Data not found in cache... fetching from server');
            setPrompt(true); // Show prompt while fetching
        try {
            const response = await fetch(`https://utony-weather-server.onrender.com/api/weather?latitude=${latitude}&longitude=${longitude}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const jsonData = await response.json();
            localStorage.setItem(cacheKey, JSON.stringify(jsonData)); // Store fetched data in cache
            setData(jsonData); // Set the fetched data to state
            console.log('Fetched data from server:', jsonData);
        } catch (err) {
            console.error('Error fetching weather data:', err);
            setError(err.message); // Handle network error
        } finally {
            setPrompt(false); // End prompt state
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