import axios from "axios";

const API_KEY = 'd5c54a92b47f0f9c49fa254decc1ac92';
const BASE_URL= `https://api.openweathermap.org/data/2.5`;

const getUrl = (dataType, searchParams) => {
    const formatUrl = new URL(BASE_URL + "/" + dataType);
    formatUrl.search = new URLSearchParams({ ...searchParams, appid: API_KEY, units: 'metric' });
    return fetch(formatUrl).then((response) => response.json());
};

// format fields extracted from current weather data:
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

// format fields extracted from forecast weather data
const formatForecastWeather = (data) => {

    let weeklyTemp = {};
    var days = []
    var weekly_temps = []

    // group forecast data into days
    const dailyData = data.list.reduce((days, row) => {
        const date = row.dt_txt.split(' ')[0];
        days[date] = [...(days[date] ? days[date]: []), row];
        return days
      }, {});

    // get today's weather data
    const date = new Date().toISOString().substring(0, 10);
    const hourlyTemp = dailyData[date].map(hour => hour.main.temp);
    const hours = dailyData[date].map(hour => hour.dt_txt);
      
    // get daily mean temperature of next 5 days (excluding today)
    for (const day in dailyData) {
      if (day != date) {
        var count = 0;
        var temp_sum = 0;
        for (const hour in dailyData[day]) {
          temp_sum += dailyData[day][hour]['main']['temp'];
          count ++;
        }
        var mean_daily_temp = temp_sum / count;
        days.push(day);
        weekly_temps.push(mean_daily_temp);
      }
    }
    weeklyTemp['day'] = days;
    weeklyTemp['mean_temp'] = weekly_temps;
    return weeklyTemp;
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
  
    return { "current": {...getCurrentWeather}, "forecast": {...getForecastWeather}}
  };
  
export default getWeatherData;