import { useState } from 'react'
import css from './App.module.css'
import SearchBar from '../SearchBar/SearchBar'
import { fetchMovies } from '../../src/services/movieService'
import { type Movie } from '../../src/types/movie'
import { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'

export default function App() {
  
  const [isError, setIsError] = useState(false);
  const [movie, setMovie] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuery = async (data: string) => {
    try {
      setIsLoading(true);
      setIsError(false)
      console.log(data)
      const response = await fetchMovies(data);
      setIsLoading(false);
      setMovie(response.results)
    } catch {
      setIsError(true)
    }
  }

  const selectMovie = (value: Movie): void => {
    console.log(value)
  }

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleQuery} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <MovieGrid movies={movie} onSelect={selectMovie}/>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  )
}
