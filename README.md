# Windy

Windy is a full-stack weather application that allows users to search for current weather conditions, view a five-day forecast, explore locations on an interactive map, search weather by date range, save and manage weather searches, and export saved weather data.

The application was developed by **Tsiyon Abera** as part of the Product Manager Accelerator Software Engineering assessment.

## Features

- Search for weather by city or location
- Use the browser's geolocation feature to retrieve weather for the user's current location
- View current weather conditions including:
  - Temperature
  - Feels-like temperature
  - Precipitation
  - Wind speed
  - Weather condition
- View a five-day weather forecast
- Toggle temperatures between Celsius and Fahrenheit
- Search for weather using a location and date range
- Save date-range weather searches
- Edit previously saved searches
- Delete saved searches
- Persist saved weather data in a database
- Export saved weather data as CSV or JSON
- View searched locations on an interactive map
- View additional OpenStreetMap location information
- Responsive interface for desktop, tablet, and mobile devices
- Validation and error handling for invalid locations and date ranges

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- shadcn/ui

### Backend and Database

- Supabase
- PostgreSQL

### APIs and External Services

- **Open-Meteo Forecast API** — current weather, weather forecasts, and date-range weather data
- **Open-Meteo Geocoding API** — converts location searches into latitude and longitude coordinates
- **BigDataCloud Reverse Geocoding API** — determines a location name from the user's geographic coordinates
- **OpenStreetMap / Nominatim** — additional geographic and location information
- **Leaflet / React Leaflet** — interactive map visualization using OpenStreetMap map data

## CRUD Functionality

Windy supports full CRUD operations for saved date-range weather searches.

**Create:** Users can search for weather by location and date range and save the resulting weather data.

**Read:** Saved searches are retrieved from Supabase and displayed in the Saved Weather section.

**Update:** Users can edit the location or dates of an existing search. Windy retrieves updated weather information and saves the new data to the database.

**Delete:** Users can permanently delete saved weather searches.

## Installation

### 1. Clone the repository

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd <YOUR-REPOSITORY-NAME>
```

If the React application is inside a `client` directory:

```bash
cd client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the client project directory.

Add the Supabase environment variables used by the application:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Do not commit the `.env` file or private credentials to GitHub.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## Production Build

To create a production build:

```bash
npm run build
```

The production files will be generated in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

## How to Use Windy

### Search Weather

Enter a city or location into the main search field and select **Search**. Windy displays the resolved location, current conditions, five-day forecast, and interactive map.

Select **Use My Location** to use browser geolocation instead.

### Change Temperature Units

Use the °C / °F toggle in the header to switch displayed temperatures between Celsius and Fahrenheit.

### Search by Date Range

Enter a location, start date, and end date in the **Weather by Date Range** section and select **Search & Save**.

The weather data is retrieved and saved to the database.

### Manage Saved Weather

The **Saved Weather** section allows users to:

- View saved searches
- Edit an existing search
- Delete an existing search

Changes persist through Supabase.

### Export Data

Saved weather information can be exported as:

- CSV
- JSON

## Map Integration

Windy includes an interactive map powered by Leaflet and OpenStreetMap. The latitude and longitude obtained from a weather search are used to center the map and identify the searched location.

The application also integrates OpenStreetMap-based location data as an additional external data source.

## Error Handling

Windy handles common errors including:

- Invalid or unknown locations
- Missing date-range fields
- End dates occurring before start dates
- Geolocation failures
- Weather API failures
- External location API failures

Errors are displayed to the user without crashing the application.

## Responsive Design

The interface is designed to adapt across desktop, tablet, and mobile screen sizes using Tailwind CSS responsive utilities.

Desktop layouts make use of multi-column weather, map, and forecast views, while smaller screens automatically stack content for improved readability.

## Product Manager Accelerator

The Product Manager Accelerator Program supports product management professionals at different stages of their careers, from students pursuing entry-level opportunities to experienced product leaders.

Its programs focus on product management, AI product management, leadership, interview preparation, and career development.

Programs and resources include PMA Pro, AI PM Bootcamp, PMA Power Skills, PMA Leader, resume reviews, and free product-management training resources.

Product Manager Accelerator: https://www.pmaccelerator.io/

## Author

**Tsiyon Abera**

Software Engineer