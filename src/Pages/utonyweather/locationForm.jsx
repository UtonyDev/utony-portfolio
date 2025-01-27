import { useState, useRef, useEffect } from 'react'
import './form.css';
import { unit } from 'mathjs';

function LocationForm({ fetchData, convertCoordinates, checkCountry }) {
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

    const getUserCoordinates = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;

                await convertCoordinates(latitude, longitude)
                
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
                <div className="bg-slate-50 place-items-center relative grid w-full h-full">
                    <span className="absolute top-1/3  spinner"></span>
                    <div className="plead-message"> Please hold on this may take a while...</div>
                </div>
            )
        }

    
    return (
        <div className='bg-white place-content-center relative top-[15%] grid'>
<div className="form-container grid w-auto border-2 shadow-lg rounded-xl py-2 gap-2">
    <img src="/icons8-location-24.png" alt="location icon" className='block place-self-center'/>
    <label className="text-[#0a0a0a] place-self-center text-2xl flex items-center gap-2">
        Enter Location
    </label>

    <form onSubmit={handleSubmit} className="grid row-auto gap-2">
        <div className="relative mx-3">
            <input
                className=" p-3 rounded-xl border bg-neutral-100 border-zinc-200 outline-none focus:bg-gray-50 text-gray-500 text-lg"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
        </div>

        <div className="relative mx-3">
            <input
                className=" p-3 rounded-xl border bg-neutral-100 border-zinc-200 outline-none focus:bg-gray-50 text-gray-500 text-lg"
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
        </div>

        <button className="mx-3 p-3 bg-teal-600 rounded-md text-zinc-50 text-lg hover:bg-teal-700 active:opacity-70 shadow-md hover:shadow-lg" type="submit">
            Submit Location
        </button>
    </form>

    <hr className="border border-zinc-300 my-4 w-[90%] place-self-center" />

    <button className="mx-3 p-3 bg-teal-600 rounded-md text-zinc-50 text-lg hover:bg-teal-700 active:opacity-70 shadow-md hover:shadow-lg" onClick={getUserCoordinates}>
        Auto-Detect Location
    </button>
</div>
        </div>
    );
    }

export default LocationForm;