import { convertTemperature } from "../utils/convertUnits";
import { getWeatherCondition } from "../utils/weatherCode";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

function WeatherCard({ weather, unit }) {
  const condition = getWeatherCondition(weather.current.weather_code);

    return (
  <Card className="border-sky-200 bg-gradient-to-br from-sky-100 to-blue-50">
    <CardContent>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <span className="text-5xl">
              {condition.icon}
            </span>

            <div>
              <p className="text-4xl font-bold">
                {convertTemperature(
                  weather.current.temperature_2m,
                  unit
                )}
                °{unit}
              </p>

              <p className="text-muted-foreground">
                {condition.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div>
            <p className="text-sm text-muted-foreground">
              Feels like
            </p>

            <p className="font-medium">
              {convertTemperature(
                weather.current.apparent_temperature,
                unit
              )}
              °{unit}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Precipitation
            </p>

            <p className="font-medium">
              {weather.current.precipitation}
              {weather.current_units.precipitation}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Wind
            </p>

            <p className="font-medium">
              {weather.current.wind_speed_10m}{" "}
              {weather.current_units.wind_speed_10m}
            </p>
          </div>

        </div>
      </div>
    </CardContent>
  </Card>
);
}

export default WeatherCard;