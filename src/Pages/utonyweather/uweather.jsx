import { useState } from 'react';
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
            const response = await fetch(`https://weather-api-server-lijsxz23x-tonys-projects.vercel.app/api/weather?city=${city}&country=${country}`);

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
            <div className='weather-app h-screen'>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className='weather-app h-screen'>
            {data && (
                <div>
                    <h1>Weather for {data.city}, {data.country}</h1>
                    <p>Temperature: {data.temperature}°C</p>
                    {/* Add more weather details here */}
                </div>
            )}
        </div>
    );
};

export default UWeather;