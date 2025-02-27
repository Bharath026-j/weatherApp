import React, { useRef } from 'react'
import { FaBeer } from "react-icons/fa"
import { IoSearch } from "react-icons/io5";
import { MdOutlineWindPower } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import './weather.css'
import sun from '../assets/sun.png'
import cloudy from '../assets/cloudy.png'
import storm from '../assets/storm.png'
import { useState } from 'react';
import { useEffect } from 'react';
import { DefaultContext } from 'react-icons';




const weather = () => {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false);

    const search = async (city)=>{
            try {
                const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e0c89876e9d6d0c17f59b1d2bdfb31ad`
                console.log('fetching');
                
                const response = await fetch(url);
                console.log('response');
                
                const data = await response.json();
                console.log('loading');
                console.log(data);
                console.log('fetching data');
                
                
                setWeatherData({
                    humidity: data.main.humidity,
                    temperature: data.main.temp,
                    location: data.name,
                    wind: data.wind.speed,
                })
                console.log('done');
                
            } catch (error) {
                console.log('error occur');
                
            }
    }
    useEffect(()=>{
        search('chennai');
    },[])
    
    return (
    <>
        <div className="weather">
        <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <button onClick={()=>search(inputRef.current.value)} ><IoSearch/> </button>
        </div>
        {weatherData ? (
                    weatherData.temperature < 18 ? (
                        <img src={cloudy} alt="" className="WeatherIcon" />
                    ) : (
                        <img src={sun} alt="" className="WeatherIcon" />
                    )
                ) : (
                    <p>Loading...</p>
                )}
        <p className="temperature">{Math.floor(weatherData.temperature)}°C</p>
        <p className="cityName">{weatherData.location}</p>
        <div className="WeatherData">
            <div className="col">
                <div className="image">
                    <WiHumidity className='image1'/>
                </div>
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <div className="image">
                <MdOutlineWindPower className='image1'/>
                </div>
                <div>
                    <p>{weatherData.wind} km/h</p>
                    <span>Wind Speed</span>
                </div>
                </div>
                </div>
                </div>
    </>
    )
}

export default weather