import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { usePokemonContext } from '../context/PokemonContext';
import tw from 'twrnc';
import { fetchPokemonList } from '@api/pokemon';
import { HomeScreenProps } from 'src/types/navigation';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { pokemons, updatePokemons, selectPokemon } = usePokemonContext();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetchPokemonList();
        console.log(response);

        updatePokemons(response.results);
      } catch (error) {
        console.error('Error loading Pokémon list: ', error);
      }
    };

    fetchPokemons();
  }, [updatePokemons]);

  return (
    <View style={tw`flex-1 bg-red-100 px-4 pt-8`}>
      <Text style={tw`text-lg font-bold mb-4 text-black`}>Pokemon List</Text>
      <FlatList
        data={pokemons}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              selectPokemon(item);
              navigation.navigate('PokemonDetailsScreen', { url: item.url });
            }}
            style={tw`p-4 bg-white rounded-lg mb-2 shadow`}
          >
            <Text style={tw`text-black`}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;
