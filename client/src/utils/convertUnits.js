export function convertTemperature(temperature, unit){
  if (unit === "C") {
    return ((temperature - 32) * 5 / 9).toFixed(1);
  }
  return temperature;
}