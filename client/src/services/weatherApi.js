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