import { useState, useRef, useEffect } from 'react'
import './form.css';

function LocationForm({ fetchData, fetchWeatherByCoordinates, convertCoordinates }) {
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
        setLoading(true);
    }

    const useCoordsData = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;

                await fetchWeatherByCoordinates(latitude, longitude);

                await convertCoordinates(latitude, longitude)
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
          setLoading(true)

        }

        if (loading) {
            return (
                <div className="bg-blue-50 place-items-center relative grid w-full h-full">
                    <span className="absolute top-1/3  spinner"></span>
                    <div className="plead-message"> Please hold on this may take a while...</div>
                </div>
            )
        }

    
    return (
        <div className=' place-self-center relative top-[15%] grid'>
            <div className="form-container grid w-full border-2 shadow-2xl rounded-xl backdrop-blur-sm">

                <h1 className="text-teal-300 text-3xl text-justify p-5"> Enter Location </h1>
                <form onSubmit={handleSubmit} className='grid row-auto gap-2'>
                    <input className='mx-3 p-3 rounded-xl shadow-md text-gray-400 text-xl' type="text" placeholder="City" value={city} 
                    onChange={(e) => setCity(e.target.value)} />
                    
                    <input className='mx-3 p-3 rounded-xl shadow-md text-gray-400 text-xl' type="text" placeholder="Country" value={country} 
                    onChange={(e) => setCountry(e.target.value)} />
                    
                    <button className='mx-3 my-3 p-2 bg-teal-700 rounded-md text-white' type="submit" onClick={onButnTouch}> Enter </button>

                </form>

                <button className='mx-3 my-3 p-2 bg-teal-700 rounded drop-shadow-lg text-white' onClick={useCoordsData}>Use Location</button>
            </div>
        </div>
    );
    }

export default LocationForm;