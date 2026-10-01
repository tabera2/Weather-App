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

function App() {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [temperatureUnit, setTemperatureUnit] = useState("F");
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
  console.log(weatherResult);
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

          console.log("Latitude:", latitude);
          console.log("Longitude: ", longitude);
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
    setError("");

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

    console.log("Date range weather:", dateWeather);
    console.log("Date range weather:", savedSearch);

  } catch (error) {
    setError(error.message);
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
    <main>
      <div className="unit-toggle">
      <button
        onClick={() =>{
            if(temperatureUnit === "F"){
              setTemperatureUnit("C")
            }else{
              setTemperatureUnit("F")
            }
        }}
          >
        °{temperatureUnit}
      </button>
    </div>
      <h1>Windy</h1>
      <p>Real-time weather information for any location.</p>

      <LocationSearch onSearch={handleSearch} onUseLocation={handleUseLocation} />
      {loading && <p>Loading weather...</p>}
      {error && <p>{error}</p>}
      {location && (
        <div>
          <h2>{location.name}</h2>

          <p>{location.state && `${location.state},`}
            {location.country}
          </p>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
      {weather && (
        <WeatherCard
          weather={weather}
          temperatureUnit={temperatureUnit}
        />
      )}
      {weather && <Forecast weather={weather}
        temperatureUnit={temperatureUnit}
      />}
      <DateSearch onSearch={handleDateSearch}/>
      <SearchHistory 
      searches={searchHistory}
      onDelete={handleDeleteSearch}
      onUpdate={handleUpdateSearch}
       />
       <button onClick={()=> exportToJSON(searchHistory)}>Export JSON</button>
       <button onClick={()=> exportToCSV(searchHistory)}>Export CSV</button>
    </main>
  );
}

export default App
