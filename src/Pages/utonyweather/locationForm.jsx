import { useState, useRef, useEffect } from 'react'
import './form.css';

function LocationForm({ fetchData }) {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if city and country are not empty
        if (!city || !country) {
            alert("Please enter both city and country");
            return;
        }

        fetchData(city, country);
    }

    return (
        <div>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input className='cityInput' type="text" placeholder="City" value={city} 
                onChange={(e) => setCity(e.target.value)} />
                
                <input country='countryInput' type="text" placeholder="Country" value={country} 
                onChange={(e) => setCountry(e.target.value)} />
                
                <button type="submit">Get Weather</button>
            </form>
        </div>
    );
    }

export default LocationForm;