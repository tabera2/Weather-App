import { useState } from 'react'
import './App.css'
import LocationSearch from "./components/LocationSearch";
import { getCoordinates, getCurrentWeather, getLocation} from './services/weatherApi';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';


function App() {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <main>
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
      {weather && <WeatherCard weather={weather}/>}
      {weather && <Forecast weather={weather}/>}
    </main>
  );
}

export default App
