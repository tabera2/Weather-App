import { getWeatherCondition, getWeatherColor} from "../utils/weatherCode";
import { convertTemperature } from "../utils/convertUnits";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

function Forecast({ weather, unit }) {
  return (
  <section>
        <div className="mb-4">
        <h2 className="text-xl font-semibold">
            5-Day Forecast
        </h2>

        <p className="text-sm text-muted-foreground">
            Weather outlook for the next five days
        </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {weather.daily.time.map((date, index) => {
                const weatherCode = weather.daily.weather_code[index];
                const condition = getWeatherCondition(weatherCode);
                const weatherColor = getWeatherColor(weatherCode);
                return (
                    <Card
                    key={date}
                    className={`${weatherColor} transition-all hover:-translate-y-1 hover:shadow-md`}
                    >
                    <CardContent className="flex flex-col items-center gap-3 py-5 text-center">

                    <div>
                        <p className="font-medium">
                        {index === 0
                            ? "Today"
                            : new Date(date + "T00:00:00").toLocaleDateString(
                                "en-US",
                                { weekday: "short" }
                            )}
                        </p>

                        <p className="text-xs text-muted-foreground">
                        {new Date(date + "T00:00:00").toLocaleDateString(
                            "en-US",
                            {
                            month: "short",
                            day: "numeric",
                            }
                        )}
                        </p>
                    </div>

                    <span className="text-4xl">
                        {condition.icon}
                    </span>

                    <p className="text-sm text-muted-foreground">
                        {condition.description}
                    </p>

                    <div className="flex items-center gap-2">
                        <span className="font-semibold">
                        {convertTemperature(
                            weather.daily.temperature_2m_max[index],
                            unit
                        )}
                        °
                        </span>

                        <span className="text-muted-foreground">
                        {convertTemperature(
                            weather.daily.temperature_2m_min[index],
                            unit
                        )}
                        °
                        </span>
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Rain{" "}
                        {weather.daily.precipitation_probability_max[index]}
                        {weather.daily_units.precipitation_probability_max}
                    </p>

                    </CardContent>
                </Card>
                );
            })}
        </div>
  </section>
);
}

export default Forecast;