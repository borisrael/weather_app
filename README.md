A responsive weather application built with React.js that provides real-time weather information for any city worldwide. 
On first load, the app automatically detects the user's current location via the browser's Geolocation API and displays live weather data instantly. 
Users can also search for any city using the search bar, which overrides the current location data with the new city's results. 
The app displays key weather details including temperature, humidity, wind speed, and a feels-like reading, alongside a 5-day forecast shown horizontally inside the weather card.
Built with a clean component-based architecture, the project is structured around reusable components including SearchBar, WeatherCard, ForecastCard, and a ThemeToggle that switches the entire interface between light and dark mode.
Temperatures can be toggled between Celsius and Fahrenheit directly on the weather card.
All weather data is fetched in real time from the OpenWeatherMap API using Axios, with the API key securely stored in environment variables. 
The app is deployed live on Vercel with continuous deployment connected to GitHub.
