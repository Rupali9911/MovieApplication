// MovieDetailsScreen.js
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const MovieDetailsScreen = ({route}) => {
  const {movie} = route.params;
  console.log(`https://image.tmdb.org/t/p/w500/${movie.poster_path}`);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}}
          style={styles.poster}
        />
        <Text style={styles.title}>Title: {movie.title}</Text>
        <Text style={styles.data}>Release Date: {movie.release_date}</Text>
        <Text style={styles.data}>Popularity: {movie.popularity}</Text>
        <Text style={styles.data}>
          Genres:
          {movie.genre_ids.map((id, index) => (
            <Text key={index}>{` ${id} `}</Text>
          ))}
        </Text>
        <Text style={styles.overview}>Overview: {movie.overview}</Text>
      </View>
    </ScrollView>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  poster: {
    width: '100%',
    height: 500,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0818A8',
  },
  data: {
    fontSize: 16,
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    marginBottom: 12,
  },
});
