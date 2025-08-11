import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{ type: { name: string } }>;
}

interface PokemonContextProps {
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
  updatePokemons: (pokemonList: Pokemon[]) => void;
  selectPokemon: (pokemon: Pokemon) => void;
}

const PokemonContext = createContext<PokemonContextProps | null>(null);

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const updatePokemons = (pokemonList: Pokemon[]) => {
    setPokemons(pokemonList);
  };

  const selectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <PokemonContext.Provider
      value={{ pokemons, selectedPokemon, updatePokemons, selectPokemon }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = (): PokemonContextProps => {
  const context = useContext(PokemonContext);
  if (context === null) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};
