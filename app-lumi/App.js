
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/pages/Home';
import Config from './src/pages/Config';
import Learn from './src/pages/Learn';
import Question from './src/pages/Question';
import Statistic from './src/pages/Statistic';
import Welcome from './src/pages/Welcome';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator intialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Config" component={Config} options={{headerShown:false}}/>
        <Stack.Screen name="Learn" component={Learn} options={{headerShown:false}}/>
        <Stack.Screen name="Question" component={Question} options={{headerShown:false}}/>
        <Stack.Screen name="Statistic" component={Statistic} options={{headerShown:false}}/>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}



