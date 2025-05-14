import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { Doctor } from './src/services/api';
import './src/i18n';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './src/components/LanguageSwitcher';
import { View, ActivityIndicator } from 'react-native';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import DiagnosisScreen from './src/screens/DiagnosisScreen';
import DoctorsScreen from './src/screens/DoctorsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ChatScreen from './src/screens/ChatScreen';
import AppointmentScreen from './src/screens/AppointmentScreen';

export type RootTabParamList = {
  Home: undefined;
  Diagnosis: undefined;
  Doctors: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  Appointment: { doctor: Doctor };
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  const { t, i18n } = useTranslation();
  
  if (!i18n.isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Diagnosis':
              iconName = focused ? 'medical' : 'medical-outline';
              break;
            case 'Doctors':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Chat':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: t('common.home') }}
      />
      <Tab.Screen 
        name="Diagnosis" 
        component={DiagnosisScreen}
        options={{ title: t('common.diagnosis') }}
      />
      <Tab.Screen 
        name="Doctors" 
        component={DoctorsScreen}
        options={{ title: t('common.doctors') }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{ title: t('common.chat') }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: t('common.profile') }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeI18n = async () => {
      try {
        await i18n.isInitialized;
        setIsReady(true);
      } catch (error) {
        console.error('Error initializing i18n:', error);
        setIsReady(true); // Still set ready to show app even if i18n fails
      }
    };

    initializeI18n();
  }, [i18n]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ 
              headerShown: false,
              headerRight: () => <LanguageSwitcher />
            }}
          />
          <Stack.Screen
            name="Appointment"
            component={AppointmentScreen}
            options={{ 
              title: t('appointment.book'),
              headerRight: () => <LanguageSwitcher />
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
