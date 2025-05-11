import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Chip, List, Divider, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { RouteProp } from '@react-navigation/native';
import type { Doctor } from '../services/api';

type AppointmentScreenProps = {
  route: RouteProp<{
    Appointment: {
      doctor: Doctor;
    };
  }, 'Appointment'>;
};

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
];

const AppointmentScreen: React.FC<AppointmentScreenProps> = ({ route }) => {
  const { doctor } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationMode, setConsultationMode] = useState<'online' | 'offline'>('offline');
  const [symptoms, setSymptoms] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleBookAppointment = () => {
    // Here you would typically make an API call to book the appointment
    console.log({
      doctor,
      date: selectedDate,
      time: selectedTime,
      mode: consultationMode,
      symptoms
    });
    
    // Show success message
    setShowSnackbar(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Book Appointment</Title>
            <Paragraph style={styles.doctorName}>Dr. {doctor.name}</Paragraph>
            <Paragraph style={styles.specialization}>{doctor.specialization}</Paragraph>

            <View style={styles.section}>
              <Title style={styles.sectionTitle}>Select Date</Title>
              <Button
                mode="outlined"
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}
              >
                {selectedDate.toLocaleDateString()}
              </Button>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            <View style={styles.section}>
              <Title style={styles.sectionTitle}>Select Time</Title>
              <View style={styles.timeSlotsContainer}>
                {timeSlots.map((time) => (
                  <Chip
                    key={time}
                    selected={selectedTime === time}
                    onPress={() => setSelectedTime(time)}
                    style={[
                      styles.timeChip,
                      selectedTime === time && styles.selectedChip
                    ]}
                    textStyle={selectedTime === time ? styles.selectedChipText : undefined}
                    showSelectedCheck={false}
                    mode="outlined"
                  >
                    {time}
                  </Chip>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Title style={styles.sectionTitle}>Consultation Mode</Title>
              <View style={styles.modeContainer}>
                <Chip
                  selected={consultationMode === 'online'}
                  onPress={() => setConsultationMode('online')}
                  style={[
                    styles.modeChip,
                    consultationMode === 'online' && styles.selectedChip
                  ]}
                  textStyle={consultationMode === 'online' ? styles.selectedChipText : undefined}
                  showSelectedCheck={false}
                  mode="outlined"
                >
                  Online
                </Chip>
                <Chip
                  selected={consultationMode === 'offline'}
                  onPress={() => setConsultationMode('offline')}
                  style={[
                    styles.modeChip,
                    consultationMode === 'offline' && styles.selectedChip
                  ]}
                  textStyle={consultationMode === 'offline' ? styles.selectedChipText : undefined}
                  showSelectedCheck={false}
                  mode="outlined"
                >
                  Offline
                </Chip>
              </View>
            </View>

            <View style={styles.section}>
              <Title style={styles.sectionTitle}>Symptoms</Title>
              <TextInput
                multiline
                numberOfLines={4}
                value={symptoms}
                onChangeText={setSymptoms}
                placeholder="Describe your symptoms..."
                style={styles.symptomsInput}
              />
            </View>

            <Button
              mode="contained"
              onPress={handleBookAppointment}
              style={styles.bookButton}
              disabled={!selectedTime}
            >
              Book Appointment
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setShowSnackbar(false),
        }}
        style={styles.snackbar}
      >
        Appointment booked successfully!
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 20,
    marginTop: 24,
    borderRadius: 12,
    elevation: 4,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  specialization: {
    color: '#666',
    marginBottom: 24,
    fontSize: 16,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  dateButton: {
    marginTop: 12,
    borderRadius: 8,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  timeChip: {
    margin: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modeChip: {
    marginRight: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedChip: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },
  selectedChipText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modeContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  symptomsInput: {
    marginTop: 12,
    borderRadius: 8,
  },
  bookButton: {
    marginTop: 32,
    marginBottom: 12,
    borderRadius: 8,
  },
  snackbar: {
    backgroundColor: '#4CAF50',
    marginBottom: 16,
  },
});

export default AppointmentScreen; 