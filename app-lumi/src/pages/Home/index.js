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

// Importando os estilos separados
import { styles } from './styles';

export default function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [loading, setLoading] = useState(false);

  // Função para salvar os dados do ciclo no Firebase
  const handleSaveCycle = async () => {
    if (!selectedPeriod) {
      Alert.alert("Atenção", "Por favor, selecione o início do seu ciclo no calendário.");
      return;
    }

    setLoading(true);
    try {
      // Criamos uma coleção específica para ciclos
      await addDoc(collection(db, "user_cycles"), {
        menstrual: {
          start: selectedPeriod.menstrual.start,
          end: selectedPeriod.menstrual.end,
        },
        fertile: {
          start: selectedPeriod.fertile.start,
          end: selectedPeriod.fertile.end,
          peakDay: selectedPeriod.fertile.peak,
        },
        createdAt: serverTimestamp(),
      });

      Alert.alert(
        "Ciclo Registrado", 
        "As previsões para seu período menstrual e fértil foram salvas com sucesso!"
      );
      
      // Limpa a seleção após salvar para evitar duplicidade acidental
      setSelectedPeriod(null); 
    } catch (error) {
      console.error("Erro ao salvar no Firestore:", error);
      Alert.alert("Erro", "Não foi possível salvar os dados. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>LumiApp</Text>
        <Text style={styles.subtitle}>
          Toque no primeiro dia da sua última menstruação para projetar seu ciclo:
        </Text>

        <MyCalendar onPeriodSelect={(period) => setSelectedPeriod(period)} />

        {/* Exibição informativa dos dados calculados */}
        {selectedPeriod && (
          <View style={styles.infoBox}>
            <Text style={[styles.infoText, { color: '#b71c1c', marginBottom: 8 }]}>
              <Text style={{ fontWeight: 'bold' }}>🩸 Período Menstrual:</Text>{"\n"}
              {selectedPeriod.menstrual.start} até {selectedPeriod.menstrual.end}
            </Text>
            
            <View style={{ height: 1, backgroundColor: '#eee', marginVertical: 10 }} />
            
            <Text style={[styles.infoText, { color: '#0288d1' }]}>
              <Text style={{ fontWeight: 'bold' }}>✨ Janela Fértil:</Text>{"\n"}
              {selectedPeriod.fertile.start} até {selectedPeriod.fertile.end}
            </Text>
            
            <Text style={[styles.infoText, { color: '#01579b', marginTop: 5, fontSize: 14 }]}>
              <Text style={{ fontWeight: 'bold' }}>🎯 Dia mais fértil:</Text> {selectedPeriod.fertile.peak}
            </Text>
          </View>
        )}

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSaveCycle}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Salvar Dados do Ciclo</Text>
          )}
        </TouchableOpacity>
        
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#999', fontSize: 12 }}>
          Cálculos baseados em um ciclo médio de 28 dias.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}