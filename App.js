import SliderContextProvider from './src/context/SliderContext';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation';

export default function App() {
  return (
    <NavigationContainer>
      <SliderContextProvider>
        <RootNavigator />
      </SliderContextProvider>
    </NavigationContainer>
  );
}


