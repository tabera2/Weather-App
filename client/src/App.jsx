import { useEffect, useState } from 'react'
import './App.css'
import LocationSearch from "./components/LocationSearch";
import { getCoordinates, 
  getCurrentWeather, 
  getLocation, 
  getWeatherByDate,
} from './services/weatherApi';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import DateSearch from './components/DateSearch';
import { saveWeatherSearch, getWeatherSearches, deleteWeatherSearch, updateWeatherSearch} from "./services/weatherDatabase";
import SearchHistory from './components/SearchHistory';
import { exportToJSON, exportToCSV } from './utils/exportWeather';
import {Switch} from "@/components/ui/switch"
import { Button } from "@/components/ui/button";
import About from "./components/About";
import LocationMap from "./components/LocationMap";

function App() {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [unit, setUnit] = useState("C");
  const [dateSearchError, setDateSearchError] = useState("");
  const loadSearchHistory = async () =>{
  try {
    const searches = await getWeatherSearches();

    setSearchHistory(searches);
  } catch (error) {
    setError(error.message);
  }
};
useEffect(() =>{
  loadSearchHistory();
}, []);

  const handleSearch = async (searchTerm) => {
    try {
      setLoading(true);
      setError("");
      // location name to coordinates
      const result = await getCoordinates(searchTerm);

      setLocation(result);
      //console.log(result);

      //get weather info using coordinates
      await fetchWeather(
        result.latitude,
        result.longitude
      );
    } catch (error) {
      setLocation(null);
      setWeather(null)
      setError(error.message);
    } finally{
      setLoading(false);
    }
  };

const fetchWeather = async (latitude, longitude) => {
    const weatherResult = await getCurrentWeather(
      latitude,
      longitude
  );
  setWeather(weatherResult);
  //console.log(weatherResult);
};

  const handleUseLocation =() =>{
    setLoading(true);
    if(!navigator.geolocation){
      setLoading(false);
      setError("Geolocation is not working");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async(position) => {
        try{
          setError("");
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const locationResult = await getLocation(latitude, longitude);
          setLocation(locationResult);

          //console.log("Latitude:", latitude);
          //console.log("Longitude: ", longitude);
          //console.log("cit")
          await fetchWeather(latitude, longitude);
        }
        catch(error){
          setWeather(null);
          setWeather(null);
          setError(error.message);
        }finally{
          setLoading(false);
        }
      }
    )
  }

  const handleDateSearch = async (searchTerm, startDate, endDate) =>{
  try {
    setLoading(true);
    setDateSearchError("");

    // Validate location and get coordinates
    const result = await getCoordinates(searchTerm);

    // Retrieve weather for selected dates
    const dateWeather = await getWeatherByDate(
      result.latitude,
      result.longitude,
      startDate,
      endDate
    );

    const savedSearch = await saveWeatherSearch({
      location_name: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
      start_date: startDate,
      end_date: endDate,
      weather_data: dateWeather.daily,
  });
  await loadSearchHistory();

    //console.log("Date range weather:", dateWeather);
    //console.log("Date range weather:", savedSearch);

  } catch (error) {
    setDateSearchError(error.message);
  } finally {
    setLoading(false);
  }
};

const handleDeleteSearch = async (id) =>{
  try {
    setError("");
    await deleteWeatherSearch(id);
    await loadSearchHistory();
  } catch (error) {
    setError(error.message);
  }
};

const handleUpdateSearch = async (
  id,
  searchTerm,
  startDate,
  endDate
) =>{
  try {
    setLoading(true);
    setError("");

    const result = await getCoordinates(searchTerm);
    const dateWeather = await getWeatherByDate(
      result.latitude,
      result.longitude,
      startDate,
      endDate
    );

    await updateWeatherSearch(id, {
      location_name: result.name,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
      start_date: startDate,
      end_date: endDate,
      weather_data: dateWeather.daily,
    });

    // Refresh history
    await loadSearchHistory();

  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen bg-sky-50/50 text-foreground">
    <header className="border-b bg-sky-600 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Windy
          </h1>
          <p className="mt-1 text-sm text-sky-100">
            Weather at a glance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className={unit === "C" ? "font-semibold" : "text-sky-200"}>
            °C
          </span>

          <Switch
            checked={unit === "F"}
            onCheckedChange={(checked) => {
              setUnit(checked ? "F" : "C");
            }}
          />

          <span className={unit === "F" ? "font-semibold" : "text-sky-200"}>
            °F
          </span>
        </div>
      </div>
     </header>

      <div className="mx-auto max-w-7xl space-y-10 px-6 py-10 lg:px-8">
        <LocationSearch onSearch={handleSearch} onUseLocation={handleUseLocation} />
        {loading && <p>Loading weather...</p>}
        {error && <p>{error}</p>}
        {location && (
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {location.name}
            </h2>

            <p className="text-sm text-muted-foreground">
              {location.state && `${location.state}, `}
              {location.country}
            </p>
          </div>
        )}
        {weather && location && (
        <div className="grid gap-6 lg:grid-cols-2">
          <WeatherCard
            weather={weather}
            unit={unit}
          />

          <LocationMap
            location={location}
          />
        </div>
      )}

      {weather && (
        <Forecast
          weather={weather}
          unit={unit}
        />
      )}
        <DateSearch 
        onSearch={handleDateSearch}
        apiError={dateSearchError}
        />
        <SearchHistory 
        searches={searchHistory}
        onDelete={handleDeleteSearch}
        onUpdate={handleUpdateSearch}
        unit={unit}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-medium">
              Export Weather Data
            </h3>

            <p className="text-sm text-muted-foreground">
              Download your saved weather searches.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => exportToJSON(searchHistory)}
              disabled={searchHistory.length === 0}
            >
              Export JSON
            </Button>

            <Button
              variant="outline"
              onClick={() => exportToCSV(searchHistory)}
              disabled={searchHistory.length === 0}
            >
              Export CSV
            </Button>
          </div>
        </div>
          <About />
      </div>
    </main>
  );
}

export default App
