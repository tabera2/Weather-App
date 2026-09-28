import { useState } from 'react'
import './App.css'
import LocationSearch from "./components/LocationSearch";

function App() {
  const [location, setLocation] = useState("");
  const handleSearch = (location) => {
    setLocation(location);
    console.log("Searching weather for:", location);
  };

  return (
    <main>
      <h1>Windy</h1>

      <LocationSearch onSearch={handleSearch} />
      {location && <p>Searching for: {location}</p>}
    </main>
    
  );
}

export default App
