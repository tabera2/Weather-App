import { convertTemperature } from "../utils/convertUnits";

function WeatherCard({weather, unit}){
    return(
        <div>
            <h2>Current Weather</h2>
            <p>
                Temperature: {weather.current.temperature_2m}
                {convertTemperature(
                weather.current.temperature_2m,
                temperatureUnit
                )}°{temperatureUnit}
            </p>

            <p>
                Feels like: {weather.current.apparent_temperature}
                {weather.current_units.temperature_2m}
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