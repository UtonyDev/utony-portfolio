import { useState, useRef, useEffect } from 'react'
import './form.css';
import { useLoaderData, useLocation } from 'react-router-dom';

function LocationForm({ fetchData, fetchWeatherByCoordinates }) {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if city and country are not empty
        if (!city || !country) {
            alert("Please enter both city and country");
            return;
        }

        fetchData(city, country);
    }

    const useCoordsData = () => {
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
        <div className=' place-content-center grid'>
            <div className="form-container m-5 grid border-2 shadow-2xl rounded">

                <h1><span className="text-teal-300 text-3xl text-justify"> Enter Location </span></h1>
                <form onSubmit={handleSubmit} className='grid grid-rows-3 gap-2'>
                    <input className='mx-3 p-2' type="text" placeholder="City" value={city} 
                    onChange={(e) => setCity(e.target.value)} />
                    
                    <input className='mx-3 p-2' type="text" placeholder="Country" value={country} 
                    onChange={(e) => setCountry(e.target.value)} />
                    
                    <button className='mx-3 my-3 p-2 bg-teal-700 rounded text-white' type="submit"> Enter </button>

                </form>

                <button className='mx-3 my-3 p-2 bg-teal-700 rounded text-white' onClick={useCoordsData}>Use Location</button>
            </div>
        </div>
    );
    }

export default LocationForm;