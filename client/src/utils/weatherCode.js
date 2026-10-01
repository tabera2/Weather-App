export function getWeatherCondition(code) {
  if (code === 0){
    return {
      description: "Clear sky",
      icon: "☀️",
    };
  }

  if (code === 1 || code === 2){
    return {
      description: "Partly cloudy",
      icon: "🌤️",
    };
  }

  if (code === 3){
    return {
      description: "Overcast",
      icon: "☁️",
    };
  }

  if (code === 45 || code === 48){
    return {
      description: "Foggy",
      icon: "☁️",
    };
  }

  if (code >= 51 && code <= 57){
    return {
      description: "Drizzle",
      icon: "🌦️",
    };
  }

  if (code >= 61 && code <= 67){
    return {
      description: "Rain",
      icon: "🌧️",
    };
  }

  if (code >= 71 && code <= 77){
    return {
      description: "Snow",
      icon: "❄️",
    };
  }

  if (code >= 80 && code <= 82){
    return {
      description: "Rain showers",
      icon: "🌧️",
    };
  }

  if (code >= 85 && code <= 86){
    return {
      description: "Snow showers",
      icon: "🌨️",
    };
  }

  if (code >= 95){
    return {
      description: "Thunderstorm",
      icon: "⛈️",
    };
  }

  return {
    description: "Unknown",
    icon: "🌡️",
  };
}

export function getWeatherColor(code) {
  // Clear
  if (code === 0) {
    return "bg-amber-50 border-amber-200";
  }

  // Mainly clear / partly cloudy
  if (code === 1 || code === 2) {
    return "bg-sky-50 border-sky-200";
  }

  // Overcast
  if (code === 3) {
    return "bg-slate-100 border-slate-200";
  }

  // Fog
  if (code === 45 || code === 48) {
    return "bg-gray-100 border-gray-300";
  }

  // Drizzle
  if (code >= 51 && code <= 57) {
    return "bg-cyan-50 border-cyan-200";
  }

  // Rain
  if (
    (code >= 61 && code <= 67) ||
    (code >= 80 && code <= 82)
  ) {
    return "bg-blue-100 border-blue-200";
  }

  // Snow
  if (
    (code >= 71 && code <= 77) ||
    (code >= 85 && code <= 86)
  ) {
    return "bg-indigo-50 border-indigo-200";
  }

  // Thunderstorm
  if (code >= 95 && code <= 99) {
    return "bg-violet-100 border-violet-300";
  }

  return "bg-white";
}