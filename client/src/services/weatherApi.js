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
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=5&timezone=auto`);
    if(!response.ok){
        throw new Error("Weather data not available.");
    }
    const data = await response.json();
    return data;
}

export async function getLocation(latitude, longitude) {
  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );

  if (!response.ok){
    throw new Error("Unable to determine your location.");
  }

  const data = await response.json();
  console.log("reverse geocoding: ", data);
  return {
    name: data.city || data.locality,
    state: data.principalSubdivision,
    country: data.countryName,
    latitude: latitude,
    longitude: longitude,
  };
}

export async function getWeatherByDate(
  latitude,
  longitude,
  startDate,
  endDate
) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
  );

  if (!response.ok) {
    throw new Error("Unable to retrieve weather for this date range.");
  }
  const data = await response.json();
  return data;
}