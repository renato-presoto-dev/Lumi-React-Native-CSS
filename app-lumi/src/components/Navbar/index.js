import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './styles';

export default function Navbar() {
  const navigation = useNavigation();
  const route = useRoute();

  // Função para verificar se a rota está ativa e aplicar o estilo rosa
  const isActive = (routeName) => route.name === routeName;

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        
        {/* Botão Home (Calendário) */}
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.icon, isActive('Home') && styles.activeText]}>📅</Text>
          <Text style={[styles.label, isActive('Home') && styles.activeText]}>Calendário</Text>
        </TouchableOpacity>

        {/* Botão Statistic */}
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Statistic')}
        >
          <Text style={[styles.icon, isActive('Statistic') && styles.activeText]}>📊</Text>
          <Text style={[styles.label, isActive('Statistic') && styles.activeText]}>Estatísticas</Text>
        </TouchableOpacity>

        {/* Espaço central para o FAB */}
        <View style={styles.centerSpace} />

        {/* Botão Learn (substituindo o "Premium" da referência pelo seu conteúdo educativo) */}
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Learn')}
        >
          <Text style={[styles.icon, isActive('Learn') && styles.activeText]}>📖</Text>
          <Text style={[styles.label, isActive('Learn') && styles.activeText]}>Aprender</Text>
        </TouchableOpacity>

        {/* Botão Config */}
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => navigation.navigate('Config')}
        >
          <View>
            <Text style={[styles.icon, isActive('Config') && styles.activeText]}>⚙️</Text>
            <View style={styles.notificationDot} />
          </View>
          <Text style={[styles.label, isActive('Config') && styles.activeText]}>Ajustes</Text>
        </TouchableOpacity>

      </View>

      {/* Botão Central (FAB) - Pode levar para Question ou Welcome */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Question')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}