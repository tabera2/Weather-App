export function exportToJSON(searches){
  const jsonData = JSON.stringify(searches, null, 2);

  const blob = new Blob(
    [jsonData],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "windy-weather-history.json";

  link.click();
  URL.revokeObjectURL(url);
}

export function exportToCSV(searches){
  const headers = [
    "Location",
    "Country",
    "Date",
    "High Temperature",
    "Low Temperature",
    "Weather Code"
  ];

  const rows = [];

  searches.forEach((search) =>{
    search.weather_data.time.forEach((date, index) =>{
      rows.push([
        search.location_name,
        search.country,
        date,
        search.weather_data.temperature_2m_max[index],
        search.weather_data.temperature_2m_min[index],
        search.weather_data.weather_code[index]
      ]);
    });
  });

  const csvRows = [
    headers,
    ...rows
  ];

  const csvContent = csvRows
    .map((row) =>
      row
        .map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob(
    [csvContent],
    { type: "text/csv;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "windy-weather-history.csv";
  link.click();
  URL.revokeObjectURL(url);
}
