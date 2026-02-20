import React, { useState } from "react";
import { View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales['pt-br'] = {

  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],

  monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Set.','Out.','Nov.','Dez.'],

  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],

  dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'],

  today: 'Hoje'

};

LocaleConfig.defaultLocale = 'pt-br';

export default function MyCalendar({ onPeriodSelect }) {
  const [markedDates, setMarkedDates] = useState({});

  const calculateFertilePeriod = (startDateString) => {
    const start = new Date(startDateString + 'T00:00:00');
    let markings = {};

    // 1. Marcar Período Fértil (Janela de 6 dias: do 10º ao 15º dia)
    // O dia mais fértil (ovulação) será o 14º dia
    for (let i = 9; i <= 14; i++) {
      let fertileDay = new Date(start);
      fertileDay.setDate(start.getDate() + i);
      const dateStr = fertileDay.toISOString().split('T')[0];
      
      markings[dateStr] = {
        color: '#e1f5fe', // Azul claro para período fértil
        textColor: '#0288d1',
        ...(i === 13 && { 
            marked: true, 
            dotColor: '#0288d1', 
            customAbbreviation: 'Dia Mais Fértil' // Metadado para o banco
        })
      };
    }
    return markings;
  };

  const onDayPress = (day) => {
    const startDate = day.dateString;
    const duration = 5; // Duração padrão da menstruação para o cálculo
    let newMarkings = {};

    // 2. Marcar Período Menstrual (ex: 5 dias a partir do clique)
    for (let i = 0; i < duration; i++) {
      let cycleDay = new Date(startDate + 'T00:00:00');
      cycleDay.setDate(cycleDay.getDate() + i);
      const dateStr = cycleDay.toISOString().split('T')[0];
      
      newMarkings[dateStr] = {
        color: '#ffcdd2', // Vermelho claro para menstruação
        textColor: '#b71c1c',
        startingDay: i === 0,
        endingDay: i === duration - 1,
      };
    }

    // 3. Adicionar Período Fértil automático
    const fertileMarkings = calculateFertilePeriod(startDate);
    const finalMarkings = { ...fertileMarkings, ...newMarkings };

    setMarkedDates(finalMarkings);

    // Enviar dados estruturados para a Home salvar no banco
    if (onPeriodSelect) {
      const fertileDays = Object.keys(fertileMarkings);
      onPeriodSelect({
        menstrual: { start: startDate, end: Object.keys(newMarkings).pop() },
        fertile: { 
            start: fertileDays[0], 
            end: fertileDays[fertileDays.length - 1],
            peak: fertileDays[4] // O 14º dia (índice 4 na nossa iteração 9-14)
        },
        rawMarkings: finalMarkings
      });
    }
  };

  return (
    <View style={{ borderRadius: 10, overflow: 'hidden' }}>
      <Calendar
        markingType={'period'}
        onDayPress={onDayPress}
        markedDates={markedDates}
        theme={{
          todayTextColor: '#f06292',
          arrowColor: '#f06292',
        }}
      />
    </View>
  );
}