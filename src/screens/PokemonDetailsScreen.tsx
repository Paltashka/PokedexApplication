import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { PokemonDetails, usePokemonContext } from '../context/PokemonContext';
import tw from 'twrnc';
import { fetchPokemonDetails } from '@api/pokemon';
import { StackNavigationProp } from '@react-navigation/stack';
import Pedometer from 'react-native-pedometer';
import { request, PERMISSIONS } from 'react-native-permissions';

const PokemonDetailsScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) => {
  const { selectedPokemon } = usePokemonContext();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null,
  );
  const [steps, setSteps] = useState(0);
  const [powerLevel, setPowerLevel] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetailsAndPermission = async () => {
      try {
        if (selectedPokemon) {
          const response = await fetchPokemonDetails(selectedPokemon.url);
          setPokemonDetails(response);
        }

        await requestPermission();
      } catch (error) {
        console.log('Error fetching Pokemon details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailsAndPermission();
  }, [selectedPokemon]);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
      if (result === 'granted') {
        startTrackingSteps();
      } else {
        console.log('Permission denied');
      }
    } else if (Platform.OS === 'ios') {
      startTrackingSteps();
    }
  };

  const startTrackingSteps = () => {
    Pedometer.startPedometerUpdates(result => {
      const newSteps = result.numberOfSteps;
      setSteps(newSteps);
      setPowerLevel(Math.floor(newSteps / 100));
    });
  };

  useEffect(() => {
    return () => {
      Pedometer.stopPedometerUpdates();
    };
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!pokemonDetails) {
    return <Text style={tw`text-black`}>No Pokemon details available</Text>;
  }

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={tw`flex-1 bg-red-100 p-4 items-center`}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleBack}
        style={tw`bg-[#f7f7f7] rounded-full p-4 absolute top-9 left-3 z-10 border border-gray-300`}
      >
        <Text style={tw`text-black`}>Back</Text>
      </TouchableOpacity>
      <Image
        source={{ uri: pokemonDetails.sprites.front_default }}
        style={tw`w-50 h-50`}
      />
      <Text style={tw`mb-2 text-bold text-lg text-black`}>
        Name: {pokemonDetails.name}
      </Text>
      <Text style={tw`mb-2 text-bold text-lg text-black`}>
        Type: {pokemonDetails.types.map(type => type.type.name).join(', ')}
      </Text>
      <Text style={tw`mb-2 text-bold text-lg text-black`}>Кроки: {steps}</Text>
      <Text style={tw`mb-2 text-bold text-lg text-black`}>
        Рівень потужності покемона: {powerLevel}
      </Text>
    </View>
  );
};

export default PokemonDetailsScreen;
