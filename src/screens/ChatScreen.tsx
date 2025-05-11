import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, List, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const defaultQuestions = [
  {
    question: "What are the common symptoms of COVID-19?",
    answer: "Common symptoms include fever, dry cough, fatigue, loss of taste or smell, sore throat, headache, and difficulty breathing. If you experience these symptoms, please consult a doctor immediately."
  },
  {
    question: "How can I maintain a healthy lifestyle?",
    answer: "Maintain a balanced diet, exercise regularly (30 minutes daily), get 7-8 hours of sleep, stay hydrated, avoid smoking and excessive alcohol, and manage stress through meditation or yoga."
  },
  {
    question: "When should I get a health checkup?",
    answer: "Adults should get a complete health checkup annually. If you're over 40, have chronic conditions, or a family history of diseases, you might need more frequent checkups. Consult your doctor for personalized advice."
  },
  {
    question: "What are the warning signs of a heart attack?",
    answer: "Warning signs include chest pain or discomfort, shortness of breath, pain in the jaw, neck, or back, nausea, lightheadedness, and cold sweats. If you experience these symptoms, seek emergency medical help immediately."
  },
  {
    question: "How can I manage stress and anxiety?",
    answer: "Practice deep breathing exercises, regular physical activity, maintain a healthy sleep schedule, limit caffeine and alcohol, try meditation or yoga, and consider talking to a mental health professional if needed."
  },
  {
    question: "What vaccinations do I need?",
    answer: "Essential vaccinations include COVID-19, Flu, Tetanus, Hepatitis B, and MMR. Additional vaccines may be needed based on your age, health conditions, and travel plans. Consult your doctor for a personalized vaccination schedule."
  },
  {
    question: "How can I improve my sleep quality?",
    answer: "Maintain a regular sleep schedule, create a comfortable sleep environment, avoid screens before bed, limit caffeine and alcohol, exercise regularly but not before bedtime, and practice relaxation techniques."
  },
  {
    question: "What are the benefits of regular exercise?",
    answer: "Regular exercise helps maintain healthy weight, reduces risk of chronic diseases, improves mental health, strengthens bones and muscles, increases energy levels, and promotes better sleep."
  }
];

const ChatScreen = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm a healthcare assistant. For specific medical advice, please consult a doctor. You can ask me about general health topics, symptoms, or preventive care.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuestionPress = (question: string, answer: string) => {
    // Add question as user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Add answer as bot message
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: answer,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Common Health Questions</Title>
            {defaultQuestions.map((item, index) => (
              <React.Fragment key={index}>
                <List.Item
                  title={item.question}
                  onPress={() => handleQuestionPress(item.question, item.answer)}
                  left={props => <List.Icon {...props} icon="help-circle" />}
                />
                <Divider />
              </React.Fragment>
            ))}
          </Card.Content>
        </Card>

        <View style={styles.chatContainer}>
          {messages.map((message) => (
            <Card
              key={message.id}
              style={[
                styles.messageCard,
                message.isUser ? styles.userMessage : styles.botMessage
              ]}
            >
              <Card.Content>
                <Paragraph>{message.text}</Paragraph>
                <Paragraph style={styles.timestamp}>
                  {message.timestamp.toLocaleTimeString()}
                </Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your health question..."
          style={styles.input}
          multiline
        />
        <Button
          mode="contained"
          onPress={handleSend}
          style={styles.sendButton}
        >
          Send
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    marginBottom: 8,
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  messageCard: {
    marginBottom: 12,
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#E3F2FD',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  sendButton: {
    justifyContent: 'center',
  },
});

export default ChatScreen; 