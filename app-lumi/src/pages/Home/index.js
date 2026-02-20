import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator, 
  SafeAreaView, 
  ScrollView 
} from 'react-native';
import MyCalendar from '../../components/MyCalendar';
import { db } from '../../services/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { styles } from './styles';

export default function Home() {
  // Função para pegar a data de hoje formatada como YYYY-MM-DD
  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Inicializa o estado com a data de hoje
  const [selectedDay, setSelectedDay] = useState(getTodayString()); 
  const [startDate, setStartDate] = useState(null); 
  const [allCycles, setAllCycles] = useState([]); 
  const [loading, setLoading] = useState(false);

  const addDays = (dateStr, days) => {
    const date = new Date(dateStr + 'T00:00:00');
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  const generatePredictions = (startStr, endStr) => {
    const predictions = [];
    const diff = Math.round((new Date(endStr) - new Date(startStr)) / (1000 * 60 * 60 * 24));
    const duration = diff > 0 ? diff : 5;

    for (let i = 0; i < 4; i++) {
      const cycleStart = addDays(startStr, i * 28);
      const cycleEnd = addDays(cycleStart, duration);
      predictions.push({
        type: i === 0 ? 'real' : 'prediction',
        menstrual: { start: cycleStart, end: cycleEnd },
        fertile: {
          start: addDays(cycleStart, 10),
          end: addDays(cycleStart, 15),
          peak: addDays(cycleStart, 13)
        }
      });
    }
    return predictions;
  };

 const getMarkings = () => {
  let marks = {};

  allCycles.forEach((cycle) => {
    const isPred = cycle.type === 'prediction';
    const mCol = isPred ? '#ffebee' : '#ffcdd2';
    const fCol = isPred ? '#f1f8ff' : '#e1f5fe';

    // Marcação Menstrual
    let d = new Date(cycle.menstrual.start + 'T00:00:00');
    const dEnd = new Date(cycle.menstrual.end + 'T00:00:00');
    while (d <= dEnd) {
      const s = d.toISOString().split('T')[0];
      marks[s] = {
        customStyles: {
          container: { backgroundColor: mCol, borderRadius: 0 }, // Quadrado para parecer período
          text: { color: isPred ? '#ef9a9a' : '#b71c1c' }
        }
      };
      d.setDate(d.getDate() + 1);
    }

    // Marcação Fértil
    let f = new Date(cycle.fertile.start + 'T00:00:00');
    const fEnd = new Date(cycle.fertile.end + 'T00:00:00');
    while (f <= fEnd) {
      const s = f.toISOString().split('T')[0];
      marks[s] = {
        customStyles: {
          container: { backgroundColor: fCol, borderRadius: 0 },
          text: { color: isPred ? '#81d4fa' : '#0288d1' }
        },
        ...(s === cycle.fertile.peak && { marked: true, dotColor: '#01579b' })
      };
      f.setDate(f.getDate() + 1);
    }
  });

  // Se houver data de início mas ainda não terminou o ciclo, destaca o início
  if (startDate && !allCycles.length) {
    marks[startDate] = {
      customStyles: {
        container: { backgroundColor: '#ffcdd2', borderRadius: 0 },
        text: { color: '#b71c1c' }
      }
    };
  }

  return marks;
};

  const handleAction = async () => {
    if (!selectedDay) {
      Alert.alert("Aviso", "Selecione um dia no calendário.");
      return;
    }

    if (!startDate) {
      setStartDate(selectedDay);
      return;
    }

    if (selectedDay <= startDate) {
      Alert.alert("Erro", "A data de fim deve ser posterior ao início.");
      return;
    }

    setLoading(true);
    try {
      const predictions = generatePredictions(startDate, selectedDay);
      await addDoc(collection(db, "user_cycles_history"), {
        baseCycle: predictions[0],
        predictions: predictions.slice(1),
        createdAt: serverTimestamp()
      });

      setAllCycles(predictions);
      setStartDate(null);
      setSelectedDay(getTodayString()); // Após salvar, volta o destaque para hoje
      Alert.alert("Sucesso", "Ciclo registrado!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Meu Ciclo</Text>
        <Text style={styles.subtitle}>
          {!startDate ? "Confirme o início da menstruação" : "Confirme o fim da menstruação"}
        </Text>

        <MyCalendar 
          onDaySelect={setSelectedDay} 
          markedDates={getMarkings()} 
          selectedDay={selectedDay}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.roundButton, loading && styles.buttonDisabled]} 
            onPress={handleAction}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ fontSize: 32 }}>{!startDate ? "💧" : "🚫"}</Text>}
          </TouchableOpacity>
          <Text style={styles.buttonLabel}>
            {!startDate ? "Confirmar Início" : "Confirmar Fim"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}