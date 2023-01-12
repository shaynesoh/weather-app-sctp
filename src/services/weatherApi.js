import axios from "axios";

const API_KEY = 'd5c54a92b47f0f9c49fa254decc1ac92';
const BASE_URL= `https://api.openweathermap.org/data/2.5`;

const getUrl = (dataType, searchParams) => {
    const formatUrl = new URL(BASE_URL + "/" + dataType);
    formatUrl.search = new URLSearchParams({ ...searchParams, appid: API_KEY, units: 'metric' });
    return fetch(formatUrl).then((response) => response.json());
};

// fields extracted from current weather data:
// `weather?lat=${lat}&lon=${lon}&APPID=${myKey}&units=${myUnits}`
const formatCurrentWeather = (data) => {
    let {
        name,
        coord: {
            lat,
            lon
        },
        main: {
            feels_like,
            temp,
            temp_min,
            temp_max,
            humidity
        },
        wind: {
            speed
        },
        weather: {
            0: {
                description,
                icon
            }
        }
    } = data;
    return {name, lat, lon, feels_like, temp, temp_min, temp_max, humidity, speed, description, icon};
}

// fields extracted from forecast weather data
// `forecast?lat=${lat}&lon=${lon}&APPID=${myKey}&units=${myUnits}`
const formatForecastWeather = (data) => {
    let {list} = data;
    // group forecast data into days
    const dailyData = data.list.reduce((days, row) => {
        const date = row.dt_txt.split(' ')[0];
        days[date] = [...(days[date] ? days[date]: []), row];
        return days
      }, {});

    console.log(dailyData);
  };


// gets current weather and then forecast weather based on lat and lon from current weather data
const getWeatherData = async(searchParams) => {
    const getCurrentWeather = await getUrl(
      "weather",
      searchParams,
    ).then(formatCurrentWeather);
  
    const { lat, lon } = getCurrentWeather;
  
    const getForecastWeather = await getUrl(
      "forecast", {
      lat,
      lon,
    }).then(formatForecastWeather);
  
    return { ...getCurrentWeather, ...getForecastWeather };
  };
  
export default getWeatherData;