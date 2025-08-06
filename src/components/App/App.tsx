import { useState } from 'react'
import css from './App.module.css'
import SearchBar from '../SearchBar/SearchBar'
import { fetchMovies } from '../../services/movieService'
import { type Movie } from '../../types/movie'
import { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loader from '../Loader/Loader'
import MovieModal from '../MovieModal/MovieModal'
import toast from 'react-hot-toast';

export default function App() {
  
  const [isError, setIsError] = useState(false);
  const [movie, setMovie] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<null | Movie>(null);

  const handleQuery = async (data: string) => {
    try {
      setIsLoading(true);
      setIsError(false)
      console.log(data)
      const response = await fetchMovies(data);
      setIsLoading(false);
      setMovie(response.results)

      if (response.results.length === 0) {
      toast('Sorry, but nothing found. Please, repeat the request.');
    }
    } catch {
      setIsError(true)
      setIsLoading(false)
    }
  }
  
  const selectMovie = (value: Movie | null): void => {
    setSelectedMovie(value)
    console.log(value)
  }

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleQuery} />
      {isLoading && <Loader />}
      {!isLoading && isError && <ErrorMessage />}
      <MovieGrid movies={movie} onSelect={selectMovie} />
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => selectMovie(null)}/>
        }
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  )
}
