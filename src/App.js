import './App.css';

import { useState, useEffect, useContext } from 'react';

import SearchBar from './components/SearchBar.js';
import CurrentDisplay from './components/CurrentDisplay';
import WeeklyDisplay from './components/WeeklyDisplay';
import HourlyDisplay from './components/HourlyDisplay';
import getUrl from './services/weatherApi';
import FavoritesMenu from './components/Favorites'
import { X } from 'react-bootstrap-icons';
import UserLocDisplay from './components/userLocDisplay';
import WeatherContext from './contexts/WeatherContext';
import Conditions from './components/Conditions';
import MapDisplay from './components/MapDisplay';

function App() {

  const [searchParam, setSearchParam] = useState(null);
  // const [dataType, setDataType] = useState(null);
  const [weather, setWeather] = useState(null);
  const [hourlyFcast, setHourlyFcast] = useState(null);
  const [dailyFcast, setDailyFcast] = useState(null);
  const ctx = useContext(WeatherContext)

  // get data upon search submit
  const getSearchData = (searchInputs) => {
    setSearchParam(searchInputs);
    // setDataType('weather');
  }

  // useEffect(() => {
  //   getUrl(dataType, searchParam);
  // }, [searchParam]);

  useEffect(
    () => {
      const fetchUrlData = async () =>
        searchParam ? await getUrl(searchParam)
          .then((res) => {
            setWeather(res.current);
            setHourlyFcast(res.hourly);
            setDailyFcast(res.daily)
          }) : null;
      fetchUrlData()
    }
    , [searchParam])
    
  return (
    <div className='App'>
      <div className="bg-gradient-to-r from-blue-400 to-cyan-600 p-10">

        <div className='mx-auto max-w-screen-md h-fit flex'>
          <SearchBar onSubmit={getSearchData} />
        </div>
        
        <div className='mx-0 flex flex-row justify-center w-full'>
          <p className='w-2/5'> </p>
          <UserLocDisplay onClick={getSearchData} />
          <FavoritesMenu onSelect={getSearchData} selectedLocation={searchParam} />

        </div>

        {/* below components only show when search returns weather data */}
        {weather && !ctx.error && !ctx.loading ? (
          <div>
            <div className='mx-auto max-w-screen-md h-fit shadow-xl p-10 bg-white bg-opacity-75 mt-10'>
              <CurrentDisplay weather={weather} searchParam={searchParam} getSearchData={getSearchData} />
            </div>
            <div className='mx-auto max-w-screen-md h-fit shadow-xl p-10 bg-white bg-opacity-75 mt-10'>
              <HourlyDisplay weather={hourlyFcast} />
              <WeeklyDisplay weather={dailyFcast}/>
            </div>
            <div className='mx-auto max-w-screen-md h-fit shadow-xl p-10 bg-white bg-opacity-75 mt-10'>
              <MapDisplay searchParam={searchParam} />
            </div>
          </div>
        ) : (
        <div className='mx-auto max-w-screen-md h-fit flex-col justify-center'>
          <Conditions error={ctx.error} loading={ctx.loading} />
        </div>
        )
        
        }
      </div>
    </div>
  );
}

export default App;
