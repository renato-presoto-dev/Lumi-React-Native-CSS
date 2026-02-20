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

export default function MyCalendar({ onDaySelect, markedDates, selectedDay }) {
  return (
    <View style={{ borderRadius: 15, overflow: 'hidden', elevation: 5, backgroundColor: '#fff' }}>
      <Calendar
        markingType={'custom'} // Mudamos para custom para ter controle total
        onDayPress={(day) => onDaySelect(day.dateString)}
        markedDates={{
          ...markedDates,
          [selectedDay]: {
            ...(markedDates[selectedDay] || {}),
            customStyles: {
              container: {
                backgroundColor: '#d81b60',
                borderRadius: 20,
                elevation: 4,
                zIndex: 99
              },
              text: {
                color: '#ffffff',
                fontWeight: 'bold',
              },
            },
          }
        }}
        theme={{
          todayTextColor: '#d81b60',
          arrowColor: '#d81b60',
          dotColor: '#01579b',
        }}
      />
    </View>
  );
}