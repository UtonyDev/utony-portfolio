import { useState } from 'react';
import LocationForm from './locationForm';
import './uweather.css';

const UWeather = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let jsonData;

    // Function to fetch weather data
    const fetchData = async (city, country) => {
        try {
            setLoading(true); // Set loading state to true before fetching
            const response = await fetch(`http://localhost:3000/api/weather?city=${city}&country=${country}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {console.log('Network response was okay');}

            jsonData = await response.json();
            setData(jsonData); // Store the fetched data in the state
            console.log(jsonData);
            console.log(jsonData.address);

        } catch (err) {
            console.error("Error fetching weather data:", err);
            setError(err.message); // Handle error

        } finally {
            setLoading(false); // End loading state
        }
    };

    if (loading) {
        return (
            <div className='weather-app h-screen' id='target'>
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