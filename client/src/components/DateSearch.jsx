import {useState} from "react";

function DateSearch({ onSearch }) {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) =>{
    event.preventDefault();
    setError("");
     if (!location.trim() || !startDate || !endDate) {
    setError("Please enter a location, start date, and end date.");
    return;
    } 
      if (endDate < startDate) {
    setError("End date cannot be before start date.");
    return;
    }
    onSearch(location.trim(), startDate, endDate);
  };

  return (
    <div>
      <h2>Weather by Date Range</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Location</label>

          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter a city"
          />
        </div>

        <div>
          <label>Start Date</label>

          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>

        <div>
          <label>End Date</label>

          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">
          Get Weather
        </button>
      </form>
    </div>
  );
}

export default DateSearch;