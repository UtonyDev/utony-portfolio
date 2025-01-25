import { useState, useRef, useEffect } from 'react'
import './form.css';

function DaysInfoPage( {
    data, defaultTempUnit, tempSymbol, dayIndex, 
    onPageUpdate, getPhaseInfo, getPhaseType, 
    bttmAlign, UVLevel, baroPercent, toKiloM, 
    bearingConversion, getHumidityTxtColor, 
    getHumidityColor, getHumidityBGColor, 
    precipType, hourMinFormat
} ) {

    const [indexHour, setIndexHour] = useState(0);
    const pageRef = useRef([]);
    const hourInfoRef = useRef([]);
    const hourTimeRef = useRef([]);

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
        setIndexHour(currentHour);
    
    }, [data])

    function defaultPage() {
        onPageUpdate(false);
    }

    const showCurrentHour = () => {
        if (hourInfoRef.current.length > 0) {
            const indexHour = new Date().getHours(); // Replace with your logic for the current hour
            hourInfoRef.current[indexHour]?.scrollIntoView({
                behavior: 'instant',
                block: 'nearest',
                inline: 'start',
            });
            pageRef.current.scrollIntoView(
                {
                    behavior: 'instant',
                    block: 'center',
                }
            )

            if (hourTimeRef.current[indexHour]) {
                hourTimeRef.current[indexHour].textContent = 'Now';
                hourTimeRef.current[indexHour].style.color = '#0d9488';
            }
        }
    };
    useEffect(() => {showCurrentHour()}, [data]);

    const dates = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    };

    const formatFullDay = (numDay) => {
        const day = new Date(numDay);
        const realDate = new Intl.DateTimeFormat('en-US', dates).format(day);
        return realDate;
    };

    return (
        <div className='weather-app top-5'>
            <div className="dayname mt-12" 
            onClick={() => {defaultPage()}}
            ref={pageRef}
            > 
                <img src='/back-button.png' alt="" srcSet="" /> 
            </div>

            <div className="day-weather top-0 grid grid-cols-1 row-auto justify-items-center h-full gap-5">
                <div className="daytext relative text-teal-900 text-2xl leading-snug"> {formatFullDay(data.days[dayIndex].datetime)}</div>

                <div className="temp-con grid grid-auto justify-self-center relative w-11/12 px-7 py-5 backdrop-blur-sm gap-5 shadow-sm rounded-lg z-40">
                    <h1 className="avg-temp col-span-2 text-teal-900 text-7xl leading-snug">{defaultTempUnit(data.days[dayIndex].hours[indexHour].temp)}°</h1>
                    <div className="conditions text-s relative top-1/4 place-self-center ms-6">{data.days[dayIndex].hours[indexHour].conditions} 
                        <img src={`${iconBasePath}${data.days[dayIndex].hours[indexHour].icon}.png`} alt="" className="src size-10" />
                    </div>

                    <div className="feelslike col-span-3 text-teal-600 line-clamp-2 text-sm"> Feels like: {defaultTempUnit(data.days[dayIndex].hours[indexHour].feelslike)}°C</div>

                    <div className="high-temp"> <h2 className='text-teal-600'>High</h2> {defaultTempUnit(data.days[dayIndex].tempmax)}°{tempSymbol} </div>
                    <div className="low-temp"> <h2 className='text-teal-600'>Low</h2> {defaultTempUnit(data.days[dayIndex].tempmin)}°{tempSymbol} </div>
                </div>

                <div className="hourly-forecast grid grid-rows-1 justify-self-center w-11/12 p-2 cards mt-4 align-middle bg-[#F4F9FF] gap-3 shadow-md rounded-lg">
                        <div className="desc text-xl font-medium text-teal-600"> Hourly Forecast </div>
                        <ul className="flex xtra-sm:space-x-0 space-x-4 overflow-x-auto whitespace-nowrap">
                            {data.days[0].hours.map((hour, index) => (
                            <li 
                            key={index} 
                            className="hour-info bg-sky-100 p-2 rounded-md" 
                            style={{marginInlineEnd: '0.5em'}}
                            ref={(el) => (hourInfoRef.current[index] = el)}>
                                <p 
                                    className='py-1 hour-time text-zinc-500'
                                    ref={(el) => (hourTimeRef.current[index] = el)}>{hourMinFormat(hour.datetime)}</p>
                                <p className='py-1 text-teal-600 bold'>{defaultTempUnit(hour.temp)}°{tempSymbol}</p>
                                <p className='py-1 text-zinc-500'><img src={`${iconBasePath}${hour.icon}.png`} alt="" className="src size-6" /></p>
                                <p className='py-1 text-zinc-500'> {data.days[0].hours[indexHour].precipprob}% </p>                        
                                
                            </li>
                            ))}
                        </ul>
                    </div>


                <div className="conditions justify-self-center w-11/12">
                    <div className="desc text-xl text-teal-600 font-medium py-2"> Conditions </div>
                    <div className="weather-elements flex flex-wrap w-full justify-between">

                        <div className="card-column flex-1/4 basis-[44vw]  max-w-1/5">
                            <div className="precip cards mt-4 p-2 align-middle bg-[#F4F9FF] border w-full h-fit rounded-lg drop-shadow-sm">
                                <div className="desc text-xl font-meduim text-teal-600">Precipitaion</div>
                                <p className='px-2 py-3 text-3xl font-medium text-blue-500'> {Math.round(data.days[dayIndex].precipprob)}% </p> 
                                <p className="raininfo my-2 text-blue-900">Chance of rain</p>
                                <hr className='my-2 text-zinc-700' />                  
                                <p className='py-1 font-medium text-zinc-700'> {precipType(data.days[dayIndex].preciptype, data.days[dayIndex].precip, data.days[dayIndex].snow, data.days[dayIndex].snowdepth)} </p> 
                            </div>
                            <div className="wind cards mt-4 p-2 align-middle bg-[#F4F9FF] relative border w-full h-fit rounded-lg drop-shadow-sm">
                                <div className="desc text-xl font-medium text-teal-600 bold">Wind</div>

                                <div className="compass grid">
                                    <div className="north justify-self-center text-zinc-500">N</div>
                                    <div className="east justify-self-end relative top-full text-zinc-500">E</div>
                                    <div 
                                    className="arrow justify-self-center text-4xl"
                                    >
                                        <img src="/compass.png" alt="" srcSet="" className='w-6 h-6 '
                                        style={{
                                            transform: `rotate(${data.days[dayIndex].winddir}deg)`,
                                            }}/>
                                        
                                    </div>
                                    <div className="west relative bottom-full text-zinc-500">W</div>
                                    <div className="south justify-self-center text-zinc-500">S</div>
                                </div>
                                <p className='py-1 text-zinc-700'> {bearingConversion(data.days[dayIndex].winddir)} </p>
                                <hr className='my-2 text-zinc-400' />
                                <p className='py-1 text-teal-500'> 
                                    <span className="speed text-2xl font-semibold"> {toKiloM(data.days[dayIndex].windspeed)} </span>
                                    km/h
                                </p>
                            </div>
                            <div className="visible relative border w-full h-fit cards mt-4 px-2 py-5 align-middle bg-[#F4F9FF] rounded-lg drop-shadow-sm">
                                <div className="desc text-xl font-medium text-teal-600">Visibility</div>

                                <img src="/horizon.png" alt="" className="s m-4" />
                                <p className='py-1 text-zinc-500'> <img src="/visibility.png" alt="" className='me-1 inline-block'/>
                                    {toKiloM(data.days[dayIndex].visibility)} km
                                </p>
                                <p className='py-1  text-zinc-500'> <img src="/cloud-cover.png" alt="" className="me-1 inline-block" />
                                    {data.days[dayIndex].cloudcover} %
                                </p>                                                
                            </div>
                        </div>

                        <div className="card-column flex-1/4 basis-[44vw] max-w-1/5">
                            <div className="humid cards mt-4 p-2 align-middle bg-[#F4F9FF] border w-full h-fit rounded-lg drop-shadow-sm" >
                                <div className="desc text-xl font-medium  text-teal-600 bold"> Humidity </div>
                                <div className="ms-4 mt-4 text-sm text-zinc-400">100</div>
                                <p className={`auto grid border-xl border-zinc-200 shadow-lg relative px-6 h-20 w-fit m-1 rounded-full overflow-hidden`}
                                style={{
                                    backgroundColor: getHumidityColor((data.days[dayIndex].humidity))
                                }}>
                                <span 
                                        className={`level absolute left-0 top-full transform -translate-y-full w-full px-6 rounded-lg`}
                                        style={{
                                            height: `${(data.days[dayIndex].humidity)}%`,
                                            backgroundColor: getHumidityBGColor((data.days[dayIndex].humidity))
                                            }}>
                                        <span className={`humid text-xl px-0 py-1 w-full font-bold absolute left-[15%] top-3/4 transform -translate-y-full`}
                                        style={{
                                            color: getHumidityTxtColor((data.days[dayIndex].humidity))
                                        }}>
                                        {Math.round(data.days[dayIndex].humidity)}%</span>
                                    </span>
                                </p> <div className="ms-6 mb-4 text-sm text-zinc-400"> 0 </div>
                                <p className='py-1 inline'> 
                                    <span className="dew inline-block border rounded-full p-1 text-center text-green-700 bg-green-300"> 
                                    {Math.round(defaultTempUnit(data.days[dayIndex].dew))}°</span> <span className="wr text-zinc-500 inline-block">Dew point</span>  </p>                       
                            </div>
                            <div className="pressure cards mt-4 p-2 align-middle bg-[#F4F9FF] border w-full h-fit rounded-lg drop-shadow-sm">
                                <div className="desc text-xl font-medium text-teal-600"> Pressure </div>

                                <div className="p_ring  relative bg w-16 h-16 grid place-items-center m-2 rounded-full">
                                    <span className="block absolute z-20 bottom-0 top-[80%] left-[25%] right-0 h-1/4 w-1/2 cards mt-4 align-middle bg-[#F4F9FF] rounded-full " aria-hidden="true"></span>
                                    <div className="progress absolute w-full h-full rounded-full"
                                    style={{
                                        background: `conic-gradient(
                                        from 150deg,
                                        #0ea5e9 20%,
                                        #0ea5e9 ${baroPercent(data.days[dayIndex].pressure)}%,
                                        #bae6fd 50%,
                                        #bae6fd 100%
                                        )`,
                                        mask: `radial-gradient(circle, transparent 55%, black 55%)`,
                                    }} 
                                    
                                    ></div>
                                </div>
                                <span className="h z-30 relative bottom-4 ms-3 text-xs text-zinc-400">low</span>
                                <span className="l z-30 relative bottom-4 ms-4 text-xs text-zinc-400">high</span>
                                <p className='py-1 text-zinc-500'> 
                                    <span className="pval font-semibold text-2xl">{data.days[dayIndex].pressure}</span> mb 
                                </p>
                            </div>
                            <div className="solar border w-full cards mt-4 p-2 align-middle bg-[#F4F9FF] relative h-fit rounded-lg drop-shadow-sm">
                                <div className="desc text-xl font-medium text-teal-600 bold">UV Index</div>

                                <div className="uvmeter relative h-fit">
                                <div className="ms-8 relative top-3 text-sm text-zinc-400">11+</div>
                                    <div className="currentUV absolute bottom-1 left-1 text-zinc-400"
                                    style={{
                                            height: `${UVLevel(data.days[dayIndex].uvindex)}%`,
                                            bottom: `${bttmAlign(UVLevel(data.days[dayIndex].uvindex))}px`
                                        }}> {data.days[dayIndex].uvindex} </div>

                                    <div className="sun relative w-16 h-16 m-3 bg-amber-400 rounded-full overflow-clip">
                                        <div className="lev absolute bottom-0  bg-red-600 w-full" 
                                        style={{
                                            height: `${UVLevel(data.days[dayIndex].uvindex)}%`,
                                        }}></div>
                                    </div>
                                <div className="ms-10 relative bottom-3 text-sm text-zinc-400">0</div>
                                </div>

                                <p className='py-1 text-zinc-500 '> <img src="/sunrays.png" alt="" className="ray inline-block text-zinc-500" /> {data.days[dayIndex].solarradiation} W/m² </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="phases grid row-auto grid-cols-2 col-span-2 border w-full h-fit p-2 cards mt-8 align-middle bg-[#F4F9FF] relative bottom-[2%] rounded-lg drop-shadow-sm">
                        <div className="desc text-xl col-span-2 font-medium text-teal-600 bold"> Astro </div>
                        
                        <div className="sun-phase col-span-1 row-span-2">
                            <div className="sunrise ">
                                <h1 className=' text-teal-500'> Sunrise </h1>
                                <p className='py-1 text-zinc-500'> {hourMinFormat(data.days[dayIndex].sunrise)} </p>
                            </div>
                            <div className="sunset ">
                                <h1 className=' text-teal-500'> Sunset </h1>
                                <p className='py-1 text-zinc-500'> {hourMinFormat(data.days[dayIndex].sunset)} </p>
                            </div> 
                        </div>

                        <div className="moon row-span-2 mx-10">
                            <div className=" text-teal-500"> Moon </div>
                            <img src={`/moon-phases/${getPhaseType(data.days[dayIndex].moonphase)}.png`} alt="" srcSet="" />
                            <h1 className="moon-info text-zinc-500"> {getPhaseInfo(data.days[dayIndex].moonphase)} </h1>

                        </div>
                                    
                    </div>
                        
                </div>
            </div>
        </div>
    );
    
} 

export default DaysInfoPage;