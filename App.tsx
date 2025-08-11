import MainNavigation from '@navigation/MainNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { PokemonProvider } from './src/context/PokemonContext';
import tw from 'twrnc';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PokemonProvider>
      <View style={tw`flex-1 bg-white`}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <SafeAreaView style={tw`flex-1 mb-0 pb-0`}>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </SafeAreaView>
      </View>
    </PokemonProvider>
  );
}

export default App;
