import { useState, useRef, useEffect } from 'react'
import './form.css';
import { FaBackspace, FaUndo } from 'react-icons/fa';
import { index } from 'mathjs';

function DaysInfoPage( {data, toCelsius, dayIndex, onPageUpdate} ) {
    const [indexval, setIndexval] = useState(0);

    const iconBasePath = '/GWeatherIcons/';

    useEffect(() => {
        const timezone = data.timezone;
        console.log(timezone);
    
        const currentTime = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            hour: "2-digit",
            hour12: false // Use 24-hour format, set to true for 12-hour format
        }).format(new Date());
    
        function parseCurrentTime(time) {
            if (time.charAt(0) == 0) {
                console.log('yes theres a zero in front');
                const parsedTime = time.slice(1);
                return parsedTime;
            } else {
                return time;
            }
        }
    
        const currentHour = parseCurrentTime(currentTime);
    
        console.log(currentHour);
        setIndexval(currentHour);
    
    }, [data])

    function defaultPage() {
        onPageUpdate(false);
    }

    return (
        <>
        <div className="dayname relative top-10" onClick={defaultPage}> <FaBackspace/> </div>
        <div className="temp-con grid grid-auto justify-self-center relative top-10 w-11/12 px-7 py-5 backdrop-blur-sm gap-5 shadow-sm rounded-lg z-40">
        <h1 className="avg-temp col-span-2 text-teal-900 font-600 text-7xl lining- leading-snug
                        ">{toCelsius(data.days[dayIndex].temp)}°</h1>
                        <div className="conditions text-s relative top-1/4 place-self-center ms-6">{data.days[0].hours[indexval].conditions} 
                            <img src={`${iconBasePath}${data.days[dayIndex].icon}.png`} alt="" className="src size-10" />
                        </div>
                        <div className="feelslike col-span-3 text-teal-600 line-clamp-2 text-sm"> Feels like: {toCelsius(data.days[dayIndex].feelslike)}°C</div>

                        <div className="high-temp"> <h2 className='text-teal-600'>High</h2> {toCelsius(data.days[dayIndex].tempmax)}°C </div>
                        <div className="low-temp"> <h2 className='text-teal-600'>Low</h2> {toCelsius(data.days[dayIndex].tempmin)}°C </div>

                        
                        <button  className="text-teal-600 bg-transparent px-1  text-sm py-1 place-self-end rounded w-fit"
                        > < FaUndo className='reset'/> </button>
        </div>
        <div className="daytext relative top-12"> {data.days[dayIndex].datetime}</div>
        </>
    );
    
} 

export default DaysInfoPage;