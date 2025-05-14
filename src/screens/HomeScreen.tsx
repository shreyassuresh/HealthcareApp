import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootTabParamList } from '../../App';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const features = [
    {
      title: t('common.quickDiagnosis'),
      description: t('common.diagnosisDesc'),
      icon: 'medical',
      screen: 'Diagnosis' as const,
    },
    {
      title: t('common.findDoctors'),
      description: t('common.doctorsDesc'),
      icon: 'people',
      screen: 'Doctors' as const,
    },
    {
      title: t('common.healthChat'),
      description: t('common.chatDesc'),
      icon: 'chatbubbles',
      screen: 'Chat' as const,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Image 
            source={require('../../assets/app-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <LanguageSwitcher />
        </View>
        <Title style={styles.welcomeText}>{t('common.welcome')}</Title>
        <Paragraph style={styles.subtitle}>
          {t('common.subtitle')}
        </Paragraph>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <Card
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate(feature.screen)}
            >
              <Card.Content>
                <Title style={styles.featureTitle}>{feature.title}</Title>
                <Paragraph>{feature.description}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate(feature.screen)}
                >
                  {t('common.getStarted')}
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </View>

        <Card style={styles.emergencyCard}>
          <Card.Content>
            <Title style={styles.emergencyTitle}>{t('common.emergency')}</Title>
            <Paragraph>{t('common.emergencyDesc')}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              buttonColor="#FF4444"
              onPress={() => {/* Handle emergency */}}
            >
              {t('common.callEmergency')}
            </Button>
          </Card.Actions>
        </Card>
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
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
    paddingTop: 8,
  },
  logo: {
    width: 80,
    height: 80,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  featuresContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 12,
  },
  featureTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  emergencyCard: {
    margin: 16,
    backgroundColor: '#FFE5E5',
    borderRadius: 12,
  },
  emergencyTitle: {
    color: '#FF4444',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 