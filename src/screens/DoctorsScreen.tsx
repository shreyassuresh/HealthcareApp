import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button, Chip, Avatar, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootTabParamList, RootStackParamList } from '../../App';
import { api, Doctor } from '../services/api';

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
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
        >
          {specialties.map((specialty) => (
            <Chip
              key={specialty}
              selected={selectedSpecialty === specialty}
              onPress={() => setSelectedSpecialty(
                selectedSpecialty === specialty ? null : specialty
              )}
              style={styles.chip}
            >
              {specialty}
            </Chip>
          ))}
        </ScrollView>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Paragraph style={styles.errorText}>{error}</Paragraph>
            <Button mode="contained" onPress={searchDoctors}>
              Retry
            </Button>
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
                      <Title>{doctor.name}</Title>
                      <Paragraph>{doctor.specialization}</Paragraph>
                      <Paragraph>Experience: {doctor.experience}</Paragraph>
                      <Paragraph>Rating: {doctor.rating} ⭐</Paragraph>
                    </View>
                  </View>

                  <View style={styles.detailsContainer}>
                    <Paragraph style={styles.detailText}>
                      <IconButton icon="map-marker" size={16} /> {doctor.address}
                    </Paragraph>
                    <Paragraph style={styles.detailText}>
                      <IconButton icon="phone" size={16} /> {doctor.phone}
                    </Paragraph>
                  </View>

                  <View style={styles.tagsContainer}>
                    {doctor.languages.map((language, index) => (
                      <Chip key={index} style={styles.tagChip}>
                        {language}
                      </Chip>
                    ))}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  searchBar: {
    elevation: 4,
    borderRadius: 12,
  },
  specialtiesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  chip: {
    marginRight: 12,
    marginBottom: 8,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  errorContainer: {
    padding: 40,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    fontSize: 16,
  },
  doctorsContainer: {
    padding: 20,
    paddingTop: 8,
  },
  doctorCard: {
    marginBottom: 20,
    elevation: 4,
    borderRadius: 12,
  },
  doctorHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    marginRight: 20,
  },
  doctorInfo: {
    flex: 1,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tagChip: {
    margin: 6,
  },
  insuranceContainer: {
    marginBottom: 20,
  },
  insuranceTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
    fontSize: 16,
  },
  insuranceChip: {
    margin: 6,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  bookButton: {
    flex: 1,
    marginRight: 12,
    borderRadius: 8,
  },
  callButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
});

export default DoctorsScreen; 