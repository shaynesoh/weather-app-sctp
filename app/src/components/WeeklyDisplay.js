import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./WeeklyDisplay.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
 
const WeeklyDisplay = ({ data }) => {
  const dayInAWeek = new Date().getDay();

  const currentWeek = [
    ...WEEK_DAYS.slice(dayInAWeek, dayInAWeek.length),
    ...WEEK_DAYS.slice(0, dayInAWeek),
  ];
  console.log(currentWeek);

  return (
    <div className="forecast">
      <label className="title">7 days Forest(click for details)</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, index) => {
          return (
            <AccordionItem key={index}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                      className="icon-small"
                      alt="weather"
                    />
                    <label className="day">{currentWeek[index]} </label>
                    <label className="description">
                      {item.weather[0].description}
                    </label>
                    <label className="min-max">
                      {Math.round(item.main.temp_min)} °C /
                      {Math.round(item.main.temp_max)} °C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure:</label>
                    <label>{item.main.pressure}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity:</label>
                    <label>{item.main.humidity}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds:</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind speed:</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Sea level:</label>
                    <label>{item.main.sea_level}m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels like:</label>
                    <label>{item.main.feels_like}°C</label>
                  </div>
                </div>
              </AccordionItemPanel>{" "}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default WeeklyDisplay;