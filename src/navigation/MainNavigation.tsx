import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import HomeScreen from '@screens/HomeScreen';
import PokemonDetailsScreen from '@screens/PokemonDetailsScreen';
import { RootStackParamList } from 'src/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="PokemonDetailsScreen"
        component={PokemonDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
