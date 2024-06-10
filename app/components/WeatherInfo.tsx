import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Divider } from 'react-native-elements';

export default function WeatherInfo({ weather }) {
  if (!weather) return null;

  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.cityName}>{weather.name}</Card.Title>
      <Card.Divider />
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Temperature:</Text>
          <Text style={styles.infoValue}>{weather.main.temp}°C</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Humidity:</Text>
          <Text style={styles.infoValue}>{weather.main.humidity}%</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Condition:</Text>
          <Text style={styles.infoValue}>{weather.weather[0].description}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#FEFCF3',
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: '98%',
    alignSelf: 'center',
    marginHorizontal: 'auto',
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#005b96',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  infoLabel: {
    fontSize: 18,
    color: '#ed3572',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 18,
    color: '#555',
  },
  divider: {
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
});
