import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, List, Switch, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MedicalRecord {
  id: string;
  date: string;
  condition: string;
  doctor: string;
  notes: string;
}

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    date: '2024-03-15',
    condition: 'Regular Health Checkup',
    doctor: 'Dr. Rajesh Patel',
    notes: 'Blood pressure: 120/80, Blood sugar: 95 mg/dL, All vitals normal. Recommended regular exercise and balanced diet.',
  },
  {
    id: '2',
    date: '2024-02-20',
    condition: 'Seasonal Flu',
    doctor: 'Dr. Ketan Desai',
    notes: 'Prescribed Paracetamol 500mg, Vitamin C supplements. Recommended rest and increased fluid intake.',
  },
  {
    id: '3',
    date: '2024-01-10',
    condition: 'Dental Checkup',
    doctor: 'Dr. Suresh Joshi',
    notes: 'Regular cleaning done. No cavities found. Recommended to continue good oral hygiene practices.',
  },
  {
    id: '4',
    date: '2023-12-05',
    condition: 'Eye Examination',
    doctor: 'Dr. Rakesh Mehta',
    notes: 'Vision: 6/6 both eyes. No signs of eye strain. Recommended to take regular breaks from screen time.',
  },
  {
    id: '5',
    date: '2023-11-15',
    condition: 'Vaccination Update',
    doctor: 'Dr. Vikram Shah',
    notes: 'Updated Tetanus and Flu shots. Next vaccination due in 6 months.',
  }
];

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    age: '28',
    bloodGroup: 'O+',
    allergies: 'None',
    emergencyContact: 'Jane Doe (Spouse) - 123-456-7890',
  });

  const [avatarUrl, setAvatarUrl] = useState('https://avatar.iran.liara.run/public/30');
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const generateNewAvatar = () => {
    const randomId = Math.floor(Math.random() * 100);
    setAvatarUrl(`https://avatar.iran.liara.run/public/${randomId}`);
  };

  useEffect(() => {
    generateNewAvatar();
  }, []);

  const handleSaveProfile = () => {
    // Here we would integrate with a backend to save user information
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.profileCard}>
          <Card.Content>
            <View style={styles.profileHeader}>
              <Image
                source={{ uri: avatarUrl }}
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Title>{userInfo.name}</Title>
                <Paragraph>Patient ID: #12345</Paragraph>
                <Button 
                  mode="text" 
                  onPress={generateNewAvatar}
                  style={styles.changeAvatarButton}
                >
                  Change Avatar
                </Button>
              </View>
            </View>

            {isEditing ? (
              <>
                <TextInput
                  label="Name"
                  value={userInfo.name}
                  onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
                  style={styles.input}
                />
                <TextInput
                  label="Age"
                  value={userInfo.age}
                  onChangeText={(text) => setUserInfo({ ...userInfo, age: text })}
                  style={styles.input}
                  keyboardType="numeric"
                />
                <TextInput
                  label="Blood Group"
                  value={userInfo.bloodGroup}
                  onChangeText={(text) => setUserInfo({ ...userInfo, bloodGroup: text })}
                  style={styles.input}
                />
                <TextInput
                  label="Allergies"
                  value={userInfo.allergies}
                  onChangeText={(text) => setUserInfo({ ...userInfo, allergies: text })}
                  style={styles.input}
                />
                <TextInput
                  label="Emergency Contact"
                  value={userInfo.emergencyContact}
                  onChangeText={(text) => setUserInfo({ ...userInfo, emergencyContact: text })}
                  style={styles.input}
                />
                <Button mode="contained" onPress={handleSaveProfile} style={styles.button}>
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <List.Item
                  title="Age"
                  description={userInfo.age}
                  left={props => <List.Icon {...props} icon="calendar" />}
                />
                <List.Item
                  title="Blood Group"
                  description={userInfo.bloodGroup}
                  left={props => <List.Icon {...props} icon="blood-bag" />}
                />
                <List.Item
                  title="Allergies"
                  description={userInfo.allergies}
                  left={props => <List.Icon {...props} icon="alert" />}
                />
                <List.Item
                  title="Emergency Contact"
                  description={userInfo.emergencyContact}
                  left={props => <List.Icon {...props} icon="phone" />}
                />
                <Button mode="outlined" onPress={() => setIsEditing(true)} style={styles.button}>
                  Edit Profile
                </Button>
              </>
            )}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Medical History</Title>
            {mockMedicalRecords.map((record) => (
              <View key={record.id}>
                <List.Item
                  title={record.condition}
                  description={`Date: ${record.date}\nDoctor: ${record.doctor}\n${record.notes}`}
                  left={props => <List.Icon {...props} icon="medical-bag" />}
                />
                <Divider />
              </View>
            ))}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Settings</Title>
            <List.Item
              title="Notifications"
              right={() => (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                />
              )}
            />
            <List.Item
              title="Dark Mode"
              right={() => (
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                />
              )}
            />
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={() => {/* Handle logout */}}
          style={[styles.button, styles.logoutButton]}
          buttonColor="#FF4444"
        >
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    margin: 20,
    marginTop: 24,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 24,
  },
  profileInfo: {
    flex: 1,
  },
  input: {
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    marginTop: 12,
    borderRadius: 8,
  },
  card: {
    margin: 20,
    marginTop: 12,
    borderRadius: 12,
    elevation: 4,
  },
  logoutButton: {
    margin: 20,
    marginTop: 12,
    marginBottom: 24,
    borderRadius: 8,
  },
  changeAvatarButton: {
    marginTop: 12,
  },
});

export default ProfileScreen; 