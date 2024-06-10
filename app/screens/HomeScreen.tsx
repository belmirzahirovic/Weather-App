import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, Keyboard, ImageBackground, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeatherInfo from '../components/WeatherInfo';

const API_KEY = 'ada297b40d5e0621b42a1c7e4c220739';

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesJson = await AsyncStorage.getItem('favorites');
      if (favoritesJson) {
        setFavorites(JSON.parse(favoritesJson));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  };

  const fetchWeather = async (cityName: string) => {
    if (!cityName) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: cityName,
          units: 'metric',
          appid: API_KEY,
        },
      });
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: cityName,
          units: 'metric',
          appid: API_KEY,
        },
      });
      setForecast(forecastResponse.data);

      Keyboard.dismiss();
    } catch (error) {
      Alert.alert('Error', 'Could not fetch weather data');
    }
  };

  const handleAddFavorite = () => {
    if (!favorites.includes(city)) {
      const newFavorites = [...favorites, city];
      saveFavorites(newFavorites);
      Alert.alert('Added to Favorites', `${city} has been added to your favorites.`);
      Keyboard.dismiss();
    }
  };

  const handleRemoveFavorite = (cityToRemove: string) => {
    const newFavorites = favorites.filter(fav => fav !== cityToRemove);
    saveFavorites(newFavorites);
    Alert.alert('Removed from Favorites', `${cityToRemove} has been removed from your favorites.`);
  };

  const handleCityClick = (selectedCity: string) => {
    fetchWeather(selectedCity);
  };

  const formatDate = (dt_txt) => {
    const date = new Date(dt_txt);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `${days[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
  };

  const filteredForecasts = forecast ? forecast.list.filter((item) =>
    item.dt_txt.includes('12:00:00')
  ) : [];

  return (
    <ImageBackground
      source={require('../../assets/images/background2.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Weather App</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={city}
            onChangeText={setCity}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => fetchWeather(city)}>
              <Text style={styles.buttonText}>Get Weather</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAddFavorite}>
              <Text style={styles.buttonText}>Add to Favorites</Text>
            </TouchableOpacity>
          </View>
          {weather && <WeatherInfo weather={weather} />}
          {forecast && (
            <View style={styles.forecastContainer}>
              <Text style={styles.forecastTitle}>5-Day Forecast</Text>
              {filteredForecasts.map((item) => (
                <View key={item.dt_txt} style={styles.forecastItem}>
                  <Text style={styles.forecastDate}>{formatDate(item.dt_txt)}</Text>
                  <View style={styles.forecastDetails}>
                    <View style={styles.forecastRow}>
                      <Text style={styles.forecastLabel}>Temperature:</Text>
                      <Text style={styles.forecastValue}>{item.main.temp}°C</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.forecastRow}>
                      <Text style={styles.forecastLabel}>Humidity:</Text>
                      <Text style={styles.forecastValue}>{item.main.humidity}%</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.forecastRow}>
                      <Text style={styles.forecastLabel}>Condition:</Text>
                      <Text style={styles.forecastValue}>{item.weather[0].description}</Text>
                    </View>
                  </View>
                </View>
              ))}
              {weather && (
                <View style={styles.additionalInfoContainer}>
                  <View style={styles.additionalInfoItem}>
                    <Text style={styles.additionalInfoTitle}>Sunrise</Text>
                    <Text style={styles.additionalInfoValue}>{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</Text>
                  </View>
                  <View style={styles.additionalInfoItem}>
                    <Text style={styles.additionalInfoTitle}>Sunset</Text>
                    <Text style={styles.additionalInfoValue}>{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</Text>
                  </View>
                  <View style={styles.additionalInfoItem}>
                    <Text style={styles.additionalInfoTitle}>Wind</Text>
                    <Text style={styles.additionalInfoValue}>{weather.wind.speed} m/s, {weather.wind.deg}°</Text>
                  </View>
                  <View style={styles.additionalInfoItem}>
                    <Text style={styles.additionalInfoTitle}>Pressure</Text>
                    <Text style={styles.additionalInfoValue}>{weather.main.pressure} hPa</Text>
                  </View>
                  <View style={styles.additionalInfoItem}>
                    <Text style={styles.additionalInfoTitle}>Feels Like</Text>
                    <Text style={styles.additionalInfoValue}>{weather.main.feels_like}°C</Text>
                  </View>
                  <View style={styles.additionalInfoItem}>
                    <Text style={styles.additionalInfoTitle}>Visibility</Text>
                    <Text style={styles.additionalInfoValue}>{weather.visibility / 1000} km</Text>
                  </View>
                  <View style={[styles.additionalInfoItem, styles.cloudinessContainer]}>
                    <Text style={styles.additionalInfoTitle}>Cloudiness</Text>
                    <Text style={styles.additionalInfoValue}>{weather.clouds.all}%</Text>
                  </View>
                </View>
              )}
            </View>
          )}
          <Text style={styles.favoritesTitle}>Favorites:</Text>
          {favorites.map((fav, index) => (
            <TouchableOpacity key={index} style={styles.favoriteContainer} onPress={() => handleCityClick(fav)}>
              <View>
                <Text style={styles.favorite}>{fav}</Text>
              </View>
              <TouchableOpacity onPress={() => handleRemoveFavorite(fav)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#005b96',
    paddingTop: 80,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 30,
    backgroundColor: '#FEFCF3',
    width: '98%',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '98%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#ed3572',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  favoritesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#005b96',
    marginBottom: 5,
    textAlign: 'center',
  },
  favoriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FEFCF3',
    borderRadius: 5,
    marginTop: 1,
  },
  favorite: {
    fontSize: 18,
  },
  removeButton: {
    color: 'red',
  },
  forecastContainer: {
    marginBottom: 20,
  },
  forecastTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#005b96',
    marginTop: 30,
  },
  forecastItem: {
    backgroundColor: '#FEFCF3',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  forecastDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005b96',
    marginBottom: 10,
    textAlign: 'center',
  },
  forecastDetails: {
    alignItems: 'center',
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  forecastLabel: {
    fontWeight: 'bold',
    color: '#ed3572',
  },
  forecastValue: {
    color: '#333',
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    width: '100%',
    marginVertical: 5,
  },
  additionalInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  additionalInfoItem: {
    alignItems: 'center',
    backgroundColor: '#FEFCF3',
    borderRadius: 10,
    padding: 15,
    width: '48%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  cloudinessContainer: {
    width: '98%',
  },
  additionalInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005b96',
    marginBottom: 5,
  },
  additionalInfoValue: {
    fontSize: 16,
    color: '#333',
  },
});
