import {FaSun, FaCloudRain, FaCloud, FaRegSnowflake} from 'react-icons/fa';

function WeeklyForecast({weather}){
    return (
        <>
            <div className='text-blue-800 mt-10'>
                <div className='flex items-center justify-start'>
                    <p>Weekly Forecast</p>
                </div>
                <hr className='my-3' />
                <div className='flex flex-row items-center justify-between'>
                    {weather.forecast.day.map((day, i) => (
                        <div className='flex flex-col items-center' key={day}>
                            <p className='font-light text-sm'>{day}</p>
                            <FaCloud size={30} className='my-2' />
                            <p>{(weather.forecast.mean_temp[i]).toFixed(1)}°C</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default WeeklyForecast;