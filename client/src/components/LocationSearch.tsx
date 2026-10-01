import { useState } from "react";

function LocationSearch({onSearch, onUseLocation}){
    const [input, setInput] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!input.trim()){
            return;
        }

        onSearch(input.trim());
    };

    return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city, ZIP code, or location"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />

      <button type="submit">Search</button>
      <button type="button" onClick={onUseLocation}>
        Use MY Location
      </button>
    </form>
  );
}

export default LocationSearch;