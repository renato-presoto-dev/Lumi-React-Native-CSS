import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import MyCalendar from '../../components/MyCalendar';

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const handlePeriodSelection = (periodData) => {
    // periodData contém: markedDates, start e end
    setSelectedPeriod(periodData);
    console.log("Início:", periodData.start);
    console.log("Fim:", periodData.end);
  };

  const confirmSelection = () => {
    if (selectedPeriod) {
      Alert.alert("Período Confirmado", `De ${selectedPeriod.start} até ${selectedPeriod.end}`);
    } else {
      Alert.alert("Aviso", "Por favor, selecione um período no calendário.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>
        Agende seu atendimento:
      </Text>

      <MyCalendar onPeriodSelect={handlePeriodSelection} />

      <View style={{ marginTop: 20 }}>
        {selectedPeriod && (
          <Text style={{ marginBottom: 10 }}>
            Selecionado: {selectedPeriod.start} até {selectedPeriod.end}
          </Text>
        )}
        <Button title="Confirmar Agendamento" onPress={confirmSelection} color="#50cebb" />
      </View>
    </View>
  );
}