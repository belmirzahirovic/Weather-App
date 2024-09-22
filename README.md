# Weather App

A React Native weather application that provides current weather information and a 5-day forecast for cities worldwide.

## Features

- **Current Weather**: Get real-time weather data for any city.
- **5-Day Forecast**: View a 5-day weather forecast for the selected city.
- **Favorites**: Save and manage your favorite cities for quick access.
- **Detailed Information**: Access additional weather details such as sunrise/sunset times, wind speed, pressure, and more.
- **User-Friendly Interface**: Clean and intuitive design with a beautiful background image.

## Technologies Used

- React Native
- Expo
- Axios for API requests
- AsyncStorage for local data persistence
- OpenWeatherMap API for weather data

## Getting Started

### Prerequisites

- Node.js (v12 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or if you're using yarn:
   ```
   yarn install
   ```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```
   API_KEY=your_api_key_here
   ```

4. Start the Expo development server:
   ```
   npx expo start
   ```

5. Use the Expo Go app on your mobile device to scan the QR code and run the app, or use an Android/iOS simulator.

## Usage

1. Enter a city name in the input field.
2. Tap "Get Weather" to fetch current weather and forecast data.
3. Add cities to your favorites list for quick access.
4. View detailed weather information and the 5-day forecast.
5. Remove cities from your favorites as needed.

## Project Structure

- `App.js`: Main application component
- `HomeScreen.tsx`: Primary screen containing the weather app functionality
- `WeatherInfo.tsx`: Component for displaying current weather information
- `assets/`: Contains images and other static assets
- `components/`: Reusable React components

## Acknowledgements

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
