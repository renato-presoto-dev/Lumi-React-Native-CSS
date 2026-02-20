import React, { useState } from "react";
import { View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

// Configuração de Localidade (FORA do componente para evitar erros de renderização)
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Set.','Out.','Nov.','Dez.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function MyCalendar({ onPeriodSelect }) {
  const [range, setRange] = useState({});

  const onDayPress = (day) => {
    const dateString = day.dateString;
    const keys = Object.keys(range);
    let newRange = {};

    // Se não há seleção ou se já existe um período fechado, inicia nova seleção
    if (keys.length === 0 || (range[keys[0]]?.startingDay && range[keys[keys.length - 1]]?.endingDay)) {
      newRange = {
        [dateString]: { startingDay: true, color: '#50cebb', textColor: 'white' }
      };
    } 
    else {
      const startDate = keys[0];
      const endDate = dateString;

      if (endDate < startDate) {
        // Se clicar em data anterior, reseta o início para a nova data
        newRange = { [dateString]: { startingDay: true, color: '#50cebb', textColor: 'white' } };
      } else {
        // Preenche o intervalo entre início e fim
        let current = new Date(startDate);
        const end = new Date(endDate);
        
        while (current <= end) {
          const date = current.toISOString().split('T')[0];
          newRange[date] = {
            color: '#70d7c7',
            textColor: 'white',
            ...(date === startDate && { startingDay: true }),
            ...(date === endDate && { endingDay: true }),
          };
          current.setDate(current.getDate() + 1);
        }
      }
    }

    setRange(newRange);
    
    // Comunica ao componente pai os dados selecionados
    if (onPeriodSelect) {
      const selectedKeys = Object.keys(newRange);
      onPeriodSelect({
        markedDates: newRange,
        start: selectedKeys[0],
        end: selectedKeys[selectedKeys.length - 1]
      });
    }
  };

  return (
    <View style={{ borderRadius: 10, overflow: 'hidden' }}>
      <Calendar
        markingType={'period'}
        onDayPress={onDayPress}
        markedDates={range}
        theme={{
          todayTextColor: '#50cebb',
          arrowColor: '#50cebb',
          selectedDayBackgroundColor: '#50cebb',
        }}
      />
    </View>
  );
}