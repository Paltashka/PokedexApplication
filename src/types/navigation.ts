import { NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'

export type RootStackParamList = {
  HomeScreen: undefined;
  PokemonDetailsScreen: { url: string };
};
export interface HomeScreenProps {
  navigation: NavigationProp<RootStackParamList, 'HomeScreen'>; 
}

export type RootStackScreenProps = NativeStackNavigationProp<RootStackParamList>
