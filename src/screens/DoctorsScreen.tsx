import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button, Chip, Avatar, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootTabParamList, RootStackParamList } from '../../App';
import { api, Doctor } from '../services/api';
import LanguageSwitcher from '../components/LanguageSwitcher';

type DoctorsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Doctors'>,
  NativeStackScreenProps<RootStackParamList>
>;

const specialties = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedist',
  'Neurologist',
  'Psychiatrist',
  'Gynecologist',
  'Ophthalmologist',
  'ENT Specialist',
];

const DoctorsScreen: React.FC<DoctorsScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    searchDoctors();
  }, [searchQuery, selectedSpecialty]);

  const searchDoctors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await api.searchDoctors(searchQuery, selectedSpecialty || undefined);
      setDoctors(results);
    } catch (err) {
      setError('Failed to fetch doctors. Please try again.');
      console.error('Error searching doctors:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookAppointment = (doctor: Doctor) => {
    navigation.navigate('Appointment', { doctor });
  };

  const handleCallDoctor = (phone: string) => {
    // Implement phone call logic
    console.log('Call doctor at:', phone);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LanguageSwitcher />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search doctors..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.specialtiesContainer}
          contentContainerStyle={styles.specialtiesContent}
        >
          {specialties.map((specialty) => (
            <Chip
              key={specialty}
              selected={selectedSpecialty === specialty}
              onPress={() => setSelectedSpecialty(
                selectedSpecialty === specialty ? null : specialty
              )}
              style={[
                styles.chip,
                selectedSpecialty === specialty && styles.selectedChip
              ]}
              textStyle={selectedSpecialty === specialty ? styles.selectedChipText : undefined}
              showSelectedCheck={false}
              mode="outlined"
            >
              {specialty}
            </Chip>
          ))}
        </ScrollView>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2196F3" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Paragraph style={styles.errorText}>{error}</Paragraph>
          </View>
        ) : (
          <View style={styles.doctorsContainer}>
            {doctors.map((doctor) => (
              <Card key={doctor.id} style={styles.doctorCard}>
                <Card.Content>
                  <View style={styles.doctorHeader}>
                    <Avatar.Image
                      size={60}
                      source={{ uri: doctor.image }}
                      style={styles.avatar}
                    />
                    <View style={styles.doctorInfo}>
                      <Title style={styles.doctorName}>Dr. {doctor.name}</Title>
                      <Paragraph style={styles.specialization}>
                        {doctor.specialization}
                      </Paragraph>
                      <View style={styles.ratingContainer}>
                        <IconButton
                          icon="star"
                          size={16}
                          iconColor="#FFD700"
                          style={styles.ratingIcon}
                        />
                        <Paragraph style={styles.rating}>
                          {doctor.rating} ⭐
                        </Paragraph>
                      </View>
                    </View>
                  </View>

                  <View style={styles.detailsContainer}>
                    <View style={styles.detailRow}>
                      <IconButton
                        icon="map-marker"
                        size={20}
                        iconColor="#666"
                        style={styles.detailIcon}
                      />
                      <Paragraph style={styles.detailText}>
                        {doctor.address}
                      </Paragraph>
                    </View>
                    <View style={styles.detailRow}>
                      <IconButton
                        icon="clock-outline"
                        size={20}
                        iconColor="#666"
                        style={styles.detailIcon}
                      />
                      <Paragraph style={styles.detailText}>
                        {doctor.experience} experience
                      </Paragraph>
                    </View>
                    <View style={styles.detailRow}>
                      <IconButton
                        icon="translate"
                        size={20}
                        iconColor="#666"
                        style={styles.detailIcon}
                      />
                      <Paragraph style={styles.detailText}>
                        {doctor.languages.join(', ')}
                      </Paragraph>
                    </View>
                  </View>

                  <View style={styles.insuranceContainer}>
                    <Paragraph style={styles.insuranceTitle}>Accepted Insurance:</Paragraph>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {doctor.insurance.map((ins, index) => (
                        <Chip key={index} style={styles.insuranceChip}>
                          {ins}
                        </Chip>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={styles.actionsContainer}>
                    <Button
                      mode="contained"
                      onPress={() => handleBookAppointment(doctor)}
                      style={styles.bookButton}
                      icon="calendar"
                    >
                      Book Appointment
                    </Button>
                    <IconButton
                      icon="phone"
                      size={24}
                      onPress={() => handleCallDoctor(doctor.phone)}
                      style={styles.callButton}
                    />
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 10,
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingTop: 8,
  },
  searchBar: {
    elevation: 2,
    borderRadius: 8,
  },
  specialtiesContainer: {
    marginBottom: 16,
  },
  specialtiesContent: {
    paddingHorizontal: 16,
  },
  chip: {
    marginRight: 8,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
  },
  doctorsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  doctorCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  doctorHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  specialization: {
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    margin: 0,
    marginRight: 4,
  },
  rating: {
    color: '#666',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    margin: 0,
    marginRight: 8,
  },
  detailText: {
    color: '#666',
  },
  insuranceContainer: {
    marginBottom: 16,
  },
  insuranceTitle: {
    marginBottom: 8,
    color: '#666',
  },
  insuranceChip: {
    marginRight: 8,
    backgroundColor: '#E3F2FD',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 8,
  },
  callButton: {
    backgroundColor: '#E3F2FD',
    margin: 0,
  },
});

export default DoctorsScreen; 