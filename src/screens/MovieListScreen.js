// MovieListScreen.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MovieListScreen = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchMovies(1);
  }, []);

  const loadMoreMovies = () => {
    if (movies?.length !== totalResult) {
      // setPage(prevPage => prevPage + 1);
      const newPage = page + 1;
      fetchMovies(newPage);
    }
  };

  const fetchMovies = page => {
    try {
      setLoading(true);
      console.log('api call', page);
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=9365e9a3ef7d19cdd57a3d218b5b85d0&page=${page}`,
        )
        .then(res => {
          setLoading(false);
          setMovies(prevMovies => [...prevMovies, ...res.data.results]);
          setTotalResult(res.data?.total_results);
          setPage(res.data?.page);
        })
        .catch(err => {
          setLoading(false);
          setError(true)
        });
    } catch (error) {
      setLoading(false);
      setError(true)
      console.error('Error fetching movies:', error);
    }
  };

  const renderMovieItem = ({item}) => (
    <View style={styles.movieItem} key={item?.id}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.releaseDate}>Release Date: {item.release_date}</Text>
      <Text style={styles.overview}>{item.overview}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('MovieDetails', {movie: item})}
        style={styles.button}>
        <Text style={{color: '#FFF'}}>VIEW DETAILS</Text>
      </TouchableOpacity>
    </View>
  );

  return loading && page === 1 && !error? (
    <ActivityIndicator
      size={'large'}
      color={'#0818A8'}
      style={styles.indicator}
    />
  ) : movies.length > 0 ? (
    <>
      <View style={styles.container}>
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item, index) => index}
          contentContainerStyle={styles.listContainer}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
        />
      </View>
    </>
  ): 
  <Text style={styles.indicator}>No Data Found</Text>
};

export default MovieListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  movieItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  releaseDate: {
    marginBottom: 8,
  },
  overview: {
    marginBottom: 12,
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#0818A8',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
  },
});
