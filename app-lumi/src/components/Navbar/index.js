import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export default function Navbar({ activeRoute, onNavigate }) {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {/* Botão Calendário */}
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Calendario')}>
          <Text style={[styles.icon, activeRoute === 'Calendario' && styles.activeText]}>📅</Text>
          <Text style={[styles.label, activeRoute === 'Calendario' && styles.activeText]}>Calendário</Text>
        </TouchableOpacity>

        {/* Botão Estatísticas */}
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Estatisticas')}>
          <Text style={styles.icon}>📊</Text>
          <Text style={styles.label}>Estatísticas</Text>
        </TouchableOpacity>

        {/* Espaço reservado para o botão central flutuante */}
        <View style={styles.centerSpace} />

        {/* Botão Premium */}
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Premium')}>
          <Text style={styles.icon}>👑</Text>
          <Text style={styles.label}>Premium</Text>
        </TouchableOpacity>

        {/* Botão Definições */}
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate('Definicoes')}>
          <View>
            <Text style={styles.icon}>⚙️</Text>
            <View style={styles.notificationDot} />
          </View>
          <Text style={styles.label}>Definições</Text>
        </TouchableOpacity>
      </View>

      {/* Botão Central Redondo (Gota/Plus) */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}