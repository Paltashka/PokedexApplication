import axios from "axios";
import { API_URL } from '@env'

interface PokemonAPIResponse {
  results: { name: string; url: string }[];
}


export const fetchPokemonList = async (): Promise<PokemonAPIResponse> => {
  try {
    const response = await axios.get<PokemonAPIResponse>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    throw error;
  }
};
export const fetchPokemonDetails= async (url:string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    throw error;
  }
};