import {getWeatherCondition} from "../utils/weatherCode"
//import { getWeatherCondition } from "../utils/weatherCode";

function Forecast({weather}) {
  return (
    <div>
      <h2>5-Day Forecast</h2>

      <div>
        {weather.daily.time.map((date, index) => {
          const condition = getWeatherCondition(
            weather.daily.weather_code[index]
          );

          return (
            <div key={date}>
              <h3>{date}</h3>

              <p>
                {condition.icon} {condition.description}
              </p>

              <p>
                High: {weather.daily.temperature_2m_max[index]}
                {weather.daily_units.temperature_2m_max}
              </p>

              <p>
                Low: {weather.daily.temperature_2m_min[index]}
                {weather.daily_units.temperature_2m_min}
              </p>

              <p>
                Rain: {weather.daily.precipitation_probability_max[index]}
                {weather.daily_units.precipitation_probability_max}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;