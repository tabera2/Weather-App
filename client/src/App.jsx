import { useState } from 'react'
import './App.css'
import LocationSearch from "./components/LocationSearch";
import { getCoordinates } from './services/weatherApi';

function App() {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");


  const handleSearch = async (searchTerm) => {
    try {
      setError("");
      const result = await getCoordinates(searchTerm);
      setLocation(result);
      console.log(result);
    } catch (error) {
      setLocation(null);
      setError(error.message);
    }
  };

  return (
    <main>
      <h1>Windy</h1>
      <p>Real-time weather information for any location.</p>

      <LocationSearch onSearch={handleSearch} />
      {error && <p>{error}</p>}
      {location && (
        <div>
          <h2>{location.name}</h2>
          <p>{location.country}</p>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </main>
  );
}

export default App
