import { PersonPlus } from 'react-bootstrap-icons';
import { FaArrowUp, FaArrowDown, FaThermometer, FaWind, FaWater } from 'react-icons/fa';
import { FaSun, FaCloudRain, FaCloud, FaRegSnowflake, FaThunderstorm } from 'react-icons/fa';
import UnitsSelector from './UnitsSelector';
import {useState} from 'react'

function CurrentDisplay({ weather, searchParam,  getSearchData}) {
    const [isMetric, setIsMetric]  = useState(true)  
  
    return (
        <>
            <div className="flex flex-row w-full justify-center text-blue-800 pt-10">
                <div>
                    <div className='text-center'>
                        <h1 className="text-xl font-semibold">{weather.name}</h1>
                        <p className='font-light text-sm'>{weather.description}</p>
                    </div>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-x-10 sm:pb-4'>
                        <div className='flex flex-col sm:flex-row align-center items-center py-10'>
                            {/* <FaSun size={100} /> */}
                            <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} />
                            <div className='ml-5'>
                                <p className='pt-5 font-light text-center text-9xl whitespace-nowrap flex flex-row'>
                                    {(weather.temp).toFixed(1)}
                                    
                                    <UnitsSelector searchParam={searchParam} getSearchData={getSearchData} setIsMetric={setIsMetric}/>
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row sm:flex-col sm:pb-4 gap-y-3'>
                            <div className='flex flex-row'>
                                <div className='flex items-center gap-x-2 mr-4'>
                                    <FaArrowUp />
                                    <p className='font-light whitespace-nowrap'>High: {(weather.temp_max).toFixed(1)} {isMetric ? '°C' : '°F'}</p>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <FaArrowDown />
                                    <p className='font-light whitespace-nowrap'>Low: {(weather.temp_min).toFixed(1)} { isMetric ? '°C' : '°F'}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <FaThermometer />
                                <p className='font-light whitespace-nowrap'>Feels like {(weather.feels_like).toFixed(1)} {isMetric ? '°C' : '°F'}</p>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <FaWind />
                                <p className='font-light whitespace-nowrap'>Wind {(weather.speed).toFixed(1)} {isMetric ? 'm/s' : 'ft/s'}</p>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <FaWater />
                                <p className='font-light whitespace-nowrap'>Humidity: {(weather.humidity).toFixed(1)}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CurrentDisplay;