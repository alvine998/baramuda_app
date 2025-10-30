import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLOR } from '../../utils/Color';

interface EventScreenProps {
  navigation: any;
}

type EventItem = {
  id: string;
  title: string;
  date: string; // ISO date string (YYYY-MM-DD)
};

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

const getMonthMatrix = (year: number, monthIndex: number) => {
  const firstDay = new Date(year, monthIndex, 1);
  const startDay = firstDay.getDay(); // 0-6 (Sun-Sat)
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const matrix: Array<Array<{ d: number | null; iso: string | null }>> = [];
  let week: Array<{ d: number | null; iso: string | null }> = [];

  // Fill leading blanks
  for (let i = 0; i < startDay; i++) week.push({ d: null, iso: null });

  for (let day = 1; day <= daysInMonth; day++) {
    const iso = `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
    week.push({ d: day, iso });
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }
  // Trailing blanks
  if (week.length) {
    while (week.length < 7) week.push({ d: null, iso: null });
    matrix.push(week);
  }
  return matrix;
};

const WEEKDAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export default function Event({ navigation }: EventScreenProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = React.useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = React.useState<number>(today.getFullYear());
  const [selectedDate, setSelectedDate] = React.useState<string>(`${today.getFullYear()}-${pad2(today.getMonth() + 1)}-${pad2(today.getDate())}`);

  // Sample events (replace with API later)
  const [events] = React.useState<EventItem[]>([
    { id: '1', title: 'Rapat Koordinasi', date: `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-05` },
    { id: '2', title: 'Pelatihan Relawan', date: `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-12` },
    { id: '3', title: 'Aksi Sosial', date: `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-12` },
    { id: '4', title: 'Kunjungan Lapangan', date: `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-21` },
  ]);

  const matrix = React.useMemo(() => getMonthMatrix(currentYear, currentMonth), [currentYear, currentMonth]);
  const monthLabel = new Date(currentYear, currentMonth, 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  const eventsByDate = React.useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const e of events) {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date)!.push(e);
    }
    return map;
  }, [events]);

  const selectedEvents = eventsByDate.get(selectedDate) || [];

  const goPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: normalize(20),
          paddingTop: normalize(50),
          paddingBottom: normalize(16),
          backgroundColor: COLOR.SECONDARY,
          borderBottomLeftRadius: normalize(20),
          borderBottomRightRadius: normalize(20),
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: normalize(40),
              height: normalize(40),
              borderRadius: normalize(20),
              backgroundColor: COLOR.PRIMARY,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="arrow-left" size={normalize(16)} color={COLOR.SECONDARY} solid />
          </TouchableOpacity>

          <Text style={{ fontSize: normalize(18), fontWeight: 'bold', color: COLOR.PRIMARY }}>Kalender Kegiatan</Text>

          <View style={{ width: normalize(40) }} />
        </View>
      </View>

      {/* Month Navigator */}
      <View style={{ paddingHorizontal: normalize(20), paddingTop: normalize(20) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={goPrevMonth} style={{ padding: normalize(8) }}>
            <Icon name="chevron-left" size={normalize(16)} color={COLOR.PRIMARY} solid />
          </TouchableOpacity>
          <Text style={{ fontSize: normalize(18), fontWeight: '700', color: COLOR.PRIMARY }}>{monthLabel}</Text>
          <TouchableOpacity onPress={goNextMonth} style={{ padding: normalize(8) }}>
            <Icon name="chevron-right" size={normalize(16)} color={COLOR.PRIMARY} solid />
          </TouchableOpacity>
        </View>

        {/* Weekdays */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: normalize(12) }}>
          {WEEKDAYS.map((wd) => (
            <Text key={wd} style={{ width: `${100 / 7}%`, textAlign: 'center', color: COLOR.DARK_GRAY, fontWeight: '600' }}>{wd}</Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={{ marginTop: normalize(8) }}>
          {matrix.map((week, i) => (
            <View key={`w-${i}`} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: normalize(6) }}>
              {week.map((cell, j) => {
                const hasEvent = !!(cell.iso && eventsByDate.has(cell.iso));
                const isSelected = cell.iso === selectedDate;
                return (
                  <TouchableOpacity
                    key={`d-${i}-${j}`}
                    onPress={() => cell.iso && setSelectedDate(cell.iso)}
                    disabled={!cell.d}
                    style={{
                      width: `${100 / 7}%`,
                      aspectRatio: 1,
                      borderRadius: normalize(10),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: isSelected ? COLOR.PRIMARY : 'transparent',
                    }}
                  >
                    <Text style={{ color: isSelected ? COLOR.SECONDARY : COLOR.PRIMARY, fontWeight: '600' }}>{cell.d ?? ''}</Text>
                    {hasEvent && (
                      <View
                        style={{
                          marginTop: normalize(3),
                          width: normalize(6),
                          height: normalize(6),
                          borderRadius: normalize(3),
                          backgroundColor: isSelected ? COLOR.SECONDARY : COLOR.PRIMARY,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>

      {/* Selected Day Events */}
      <View style={{ paddingHorizontal: normalize(20), paddingVertical: normalize(20) }}>
        <Text style={{ fontSize: normalize(16), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(10) }}>
          Kegiatan pada {new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </Text>

        {selectedEvents.length === 0 ? (
          <Text style={{ color: COLOR.GRAY, fontSize: normalize(14) }}>Tidak ada kegiatan.</Text>
        ) : (
          selectedEvents.map((e) => (
            <View
              key={e.id}
              style={{
                backgroundColor: COLOR.WHITE,
                borderRadius: normalize(12),
                padding: normalize(16),
                marginBottom: normalize(12),
                borderWidth: 1,
                borderColor: COLOR.SECONDARY,
              }}
            >
              <Text style={{ fontSize: normalize(15), fontWeight: '700', color: COLOR.PRIMARY, marginBottom: normalize(6) }}>{e.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="calendar-alt" size={normalize(12)} color={COLOR.DARK_GRAY} solid style={{ marginRight: normalize(6) }} />
                <Text style={{ color: COLOR.DARK_GRAY, fontSize: normalize(12) }}>{e.date}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}


