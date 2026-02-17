
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from './src/pages/Home'
import Lista from './src/pages/Lista'
import CriarLista from './src/pages/CriarLista'


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator intialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="CriarLista" component={CriarLista} />
        <Stack.Screen name="Lista" component={Lista}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}



