import React, { useState } from "react";
import { View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar.','Abr.','Mai.','Jun.','Jul.','Ago.','Set.','Out.','Nov.','Dez.'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
  dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sáb.'], // O erro diz que este cara sumiu
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt-br';

export default function MyCalendar({ onPeriodSelect }) {
  const [range, setRange] = useState({});

  const onDayPress = (day) => {
    const dateString = day.dateString;
    const keys = Object.keys(range);
    let newRange = {};

    // Lógica de seleção (Início / Fim)
    if (keys.length === 0 || (range[keys[0]]?.startingDay && range[keys[keys.length - 1]]?.endingDay)) {
      newRange = {
        [dateString]: { startingDay: true, color: '#50cebb', textColor: 'white' }
      };
    } else {
      const startDate = keys[0];
      const endDate = dateString;

      if (endDate < startDate) {
        newRange = { [dateString]: { startingDay: true, color: '#50cebb', textColor: 'white' } };
      } else {
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
    
    // Notifica o componente pai enviando o objeto de datas e os limites
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
    <View>
      <Calendar
        markingType={'period'}
        onDayPress={onDayPress}
        markedDates={range}
        theme={{
          todayTextColor: '#50cebb',
          arrowColor: '#50cebb',
        }}
      />
    </View>
  );
}