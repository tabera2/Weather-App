export function convertTemperature(temperature, unit) {
  if (unit === "F") {
    return ((temperature * 9) / 5 + 32).toFixed(1);
  }
  return temperature;
}