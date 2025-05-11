import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from '../../App';

type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const features = [
    {
      title: 'Quick Diagnosis',
      description: 'Check your symptoms and get instant medical advice',
      icon: 'medical',
      screen: 'Diagnosis' as const,
    },
    {
      title: 'Find Doctors',
      description: 'Search for specialists near you',
      icon: 'people',
      screen: 'Doctors' as const,
    },
    {
      title: 'Health Chat',
      description: 'Get answers to your health questions',
      icon: 'chatbubbles',
      screen: 'Chat' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/app-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Title style={styles.welcomeText}>Welcome to HealthCare</Title>
          <Paragraph style={styles.subtitle}>
            Your personal health companion
          </Paragraph>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <Card
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate(feature.screen)}
            >
              <Card.Content>
                <Title>{feature.title}</Title>
                <Paragraph>{feature.description}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate(feature.screen)}
                >
                  Get Started
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </View>

        <Card style={styles.emergencyCard}>
          <Card.Content>
            <Title style={styles.emergencyTitle}>Emergency?</Title>
            <Paragraph>Need immediate medical attention?</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              buttonColor="#FF4444"
              onPress={() => {/* Handle emergency */}}
            >
              Call Emergency
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  welcomeText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    fontSize: 16,
  },
  featuresContainer: {
    padding: 20,
    paddingTop: 24,
  },
  card: {
    marginBottom: 20,
    elevation: 4,
    borderRadius: 12,
  },
  emergencyCard: {
    margin: 20,
    marginTop: 8,
    backgroundColor: '#FFE5E5',
    borderRadius: 12,
  },
  emergencyTitle: {
    color: '#FF4444',
    fontSize: 20,
  },
});

export default HomeScreen; 