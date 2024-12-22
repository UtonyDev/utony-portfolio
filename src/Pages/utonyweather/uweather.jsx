import React, { useState, useEffect } from 'react';
import LocationForm from './locationForm';
import './uweather.css';

const UWeather = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

 // Function to fetch weather data
 const fetchData = async (city, country) => {
    try {
        setLoading(true); // Set loading state to true before fetching
        const response = await fetch(`http://localhost:3001/api/weather?city=${city}&country=${country}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setData(jsonData); // Store the fetched data in the state

    } catch (err) {
        console.error("Error fetching weather data:", err);
        setError(err.message); // Handle error

    } finally {
        setLoading(false); // End loading state
    }
};

if (loading) {
    return (
        <div className='weather-app h-screen'>
            <LocationForm fetchData={fetchData} /> 
        </div>
    );
}

if (error) {
    return (
        <div className='weather-app'>
            <p>Error: {error}</p>
        </div>
    );
}
    // Render the fetched weather data
    return (
        <div className='weather-app h-screen font-bold text-blue-600 mb-4"'>
            <h1>Weather Data</h1>
            {data && (
                <div>
                    <h2>{data.address}</h2>
                    <p>Temperature: {data.currentConditions.temp}°C</p>
                    <p>Weather: {data.currentConditions.conditions}</p>
                    {/* You can display other weather information as needed */}
                </div>
            )}
        </div>
    );
};

export default UWeather;
