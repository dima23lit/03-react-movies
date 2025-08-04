import axios from "axios";
import { type Movie } from "../types/movie"


export interface ArticlesHttpResponse {
  results: Movie[];
}

const myKey = import.meta.env.VITE_API_KEY;

const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';

export async function fetchMovies(query: string): Promise<ArticlesHttpResponse>{
    const { data } = await axios.get<ArticlesHttpResponse>(url, {
    params: {
        method: 'GET',
        query: query
    },
    headers: {
        Authorization: `Bearer ${myKey}`,
        accept: 'application/json'
  }
    }) 
    
    return data
}

