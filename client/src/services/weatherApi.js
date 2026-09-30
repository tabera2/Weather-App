export async function getCoordinates(location){
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      location
    )}&count=1&language=en&format=json`
    );

    if(!response.ok){
        throw new Error("Unable to search for location.");
    }

    const data = await response.json();
    if(!data.results || data.results.length === 0){
        throw new Error("Location is not location.");
    }

    return data.results[0];
}

export async function getCurrentWeather(latitude, longitude){
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m`);
    if(!response.ok){
        throw new Error("Weather data not available.");
    }
    const data = await response.json();
    return data;
}