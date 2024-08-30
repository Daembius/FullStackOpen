# Exercise 2.20: Data for Countries, Step 3

This project is part of the Full Stack Open course, focusing on fetching and displaying country data along with current weather information for the capital city.

## Features

- Search for countries by name
- Display detailed information about a selected country
- Show current weather data for the capital city of the selected country

## API Usage

### Country Data

Country data is fetched from the REST Countries API: https://restcountries.com

### Weather Data

Weather data is obtained from the OpenWeatherMap API.

#### API Call

While the OpenWeatherMap documentation (https://openweathermap.org/api/one-call-3) suggests using GPS coordinates, this project uses a simpler approach that allows querying by city name.

API Endpoint: `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`

Documentation: https://openweathermap.org/current#name

## Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root directory based on `.env.example`
4. Add your OpenWeatherMap API key to the `.env` file:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
   You can obtain an API key from: https://home.openweathermap.org/api_keys

## Running the Application

1. Start the development server with `npm run dev`
2. Open your browser and navigate to `http://localhost:5173` (or the port specified in your console)

## Note for Contributors

- The `.env` file is ignored by Git to keep the API key secure. Always use environment variables for sensitive information.
- If you're deploying this application, make sure to set up the environment variables on your hosting platform.

## Technologies Used

- React
- Vite
- Axios for API calls

## Future Improvements

- Add error handling for API calls
- Implement caching for API responses to reduce unnecessary calls
- Enhance the UI with a more polished design
