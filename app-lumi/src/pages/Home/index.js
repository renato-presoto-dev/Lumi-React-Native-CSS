import Learn from '../Learn';
import Statistic from '../Statistic';
import Config from '../Config';
import { View, Text } from 'react-native';
import styles from './styles'


export default function Home ({navigation}) {

    function navigateLearn(){
        navigation.navigate("Learn")
    }
    function navigateStatistic(){
        navigation.navigate("Statistic")
    }
    function navigateConfig(){
        navigation.navigate("Config")
    }
    function navigateHome(){
        navigation.navigate("Home")
    }
    
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Esta é a Home</Text>

        </View>
    );
}