import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import MyCalendar from '../../components/MyCalendar';
import { db } from '../../services/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Importando os estilos
import { styles } from './styles';

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSaveAppointment = async () => {
    if (!selectedPeriod || !selectedPeriod.end) {
      Alert.alert("Atenção", "Por favor, selecione um período completo.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "appointments"), {
        startDate: selectedPeriod.start,
        endDate: selectedPeriod.end,
        createdAt: serverTimestamp(),
        status: 'pending' 
      });

      Alert.alert("Sucesso!", "Agendamento realizado!");
      setSelectedPeriod(null); 
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao salvar no Firebase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>LumiApp</Text>
        <Text style={styles.subtitle}>Escolha as datas para seu agendamento:</Text>

        <MyCalendar onPeriodSelect={(period) => setSelectedPeriod(period)} />

        {selectedPeriod && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              <Text style={{ fontWeight: 'bold' }}>De:</Text> {selectedPeriod.start}
            </Text>
            {selectedPeriod.end && (
              <Text style={styles.infoText}>
                <Text style={{ fontWeight: 'bold' }}>Até:</Text> {selectedPeriod.end}
              </Text>
            )}
          </View>
        )}

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSaveAppointment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Confirmar Período</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}