import { useState, useRef, useEffect } from 'react'
import './form.css';
import { useLoaderData, useLocation } from 'react-router-dom';

function LocationForm({ fetchData, fetchWeatherByCoordinates }) {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if city and country are not empty
        if (!city || !country) {
            alert("Please enter both city and country");
            return;
        }

        fetchData(city, country);
    }

    const useCoordsData = (latitude, longitude) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;

                await fetchWeatherByCoordinates(latitude, longitude);
                setLatitude(latitude);
                setLongitude(longitude);

                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
              },
              (error) => {
                console.error("Error getting location:", error.message);
              }
            );
          } else {
            console.error("Geolocation is not supported by this browser.");
          }
        }
    
    return (
        <div className='w-auto place-content-center grid border-2 border-indigo-500 rounded'>
            <h1><span className="gb gtxt p-5"> Enter Location </span></h1>
            <form onSubmit={handleSubmit} className='grid grid-rows-4 gap-2'>
                <input className='mx-3 p-2' type="text" placeholder="City" value={city} 
                onChange={(e) => setCity(e.target.value)} />
                
                <input className='mx-3 p-2' type="text" placeholder="Country" value={country} 
                onChange={(e) => setCountry(e.target.value)} />
                
                <button className='mx-3 my-3 p-2 bg-teal-900' type="submit"> Enter </button>

            </form>

            <button className='mx-3 my-3 p-2 bg-teal-900' onClick={useCoordsData}>Use Location</button>

        </div>
    );
    }

export default LocationForm;