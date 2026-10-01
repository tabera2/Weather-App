import { convertTemperature } from "../utils/convertUnits";
import { getWeatherCondition } from "../utils/weatherCode";

function WeatherCard({weather, unit}){
    const condition = getWeatherCondition(weather.current.weather_code);

    return(
        <div>
            <h2>Current Weather</h2>
            <p>
                {condition.icon} {condition.description}
            </p>
            <p>
                Temperature: {" "}
                {convertTemperature(
                weather.current.temperature_2m,
                unit
                )}°{unit}
            </p>

            <p>
                Feels like: {" "}
                {convertTemperature(
                weather.current.temperature_2m,
                unit
                )}°{unit}
            </p>

            <p>
                Feels like: {weather.current.apparent_temperature}
                {weather.current_units.apparent_temperature}
            </p>

            <p>
                Precipitation: {weather.current.precipitation}
                {weather.current_units.precipitation}
            </p>

            <p>
                Wind speed: {weather.current.wind_speed_10m}
                {weather.current_units.wind_speed_10m}
            </p>


        </div>
    );
}

export default WeatherCard;