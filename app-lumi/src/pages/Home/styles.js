import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        height:'100%',
        width:'100%'
    },
    text:{
        
        color:"black"
    },
    calendarWrapper: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden', // Para manter as bordas arredondadas no calendário
    elevation: 4,      // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

});

export default styles