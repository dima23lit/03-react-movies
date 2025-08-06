import axios from "axios";
import { type Movie } from "../types/movie"


export interface MoviesHttpResponse {
  results: Movie[],
  page: number, 
  total_pages: number
}

const myKey = import.meta.env.VITE_API_KEY;

if (!myKey) {
  throw new Error("VITE_API_KEY is not defined in the environment variables.");
}

const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';

export async function fetchMovies(query: string): Promise<MoviesHttpResponse>{
    const { data } = await axios.get<MoviesHttpResponse>(url, {
    params: {
        query: query
    },
    headers: {
        Authorization: `Bearer ${myKey}`,
        Accept: 'application/json'
  }
    }) 
    
    return data
}
