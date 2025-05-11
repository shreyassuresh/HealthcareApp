import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, Chip, List, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Symptom {
  id: string;
  name: string;
  selected: boolean;
}

interface DiagnosisResult {
  condition: string;
  severity: 'Low' | 'Medium' | 'High';
  recommendation: string;
  doctorType?: string;
  selfCare?: string[];
  medications?: string[];
}

const commonSymptoms: Symptom[] = [
  { id: '1', name: 'Fever', selected: false },
  { id: '2', name: 'Cough', selected: false },
  { id: '3', name: 'Headache', selected: false },
  { id: '4', name: 'Sore Throat', selected: false },
  { id: '5', name: 'Body Pain', selected: false },
  { id: '6', name: 'Nausea', selected: false },
  { id: '7', name: 'Dizziness', selected: false },
  { id: '8', name: 'Fatigue', selected: false },
  { id: '9', name: 'Loss of Appetite', selected: false },
  { id: '10', name: 'Shortness of Breath', selected: false },
];

const diagnosisDatabase: { [key: string]: DiagnosisResult } = {
  'fever_cough': {
    condition: 'Common Cold/Upper Respiratory Infection',
    severity: 'Low',
    recommendation: 'Self-care recommended',
    selfCare: [
      'Rest and stay hydrated',
      'Take warm fluids',
      'Use steam inhalation',
      'Gargle with warm salt water'
    ],
    medications: [
      'Paracetamol 500mg for fever',
      'Vitamin C supplements',
      'Over-the-counter cough syrup if needed'
    ]
  },
  'fever_headache': {
    condition: 'Possible Viral Infection',
    severity: 'Medium',
    recommendation: 'Consult a General Physician',
    doctorType: 'General Physician',
    selfCare: [
      'Rest in a dark room',
      'Stay hydrated',
      'Apply cold compress'
    ],
    medications: [
      'Paracetamol 500mg',
      'Multivitamins'
    ]
  },
  'shortness_breath': {
    condition: 'Respiratory Issue',
    severity: 'High',
    recommendation: 'Immediate medical attention required',
    doctorType: 'Pulmonologist',
    selfCare: [
      'Sit in an upright position',
      'Try to stay calm',
      'Avoid physical exertion'
    ]
  }
};

const DiagnosisScreen = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>(commonSymptoms);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const toggleSymptom = (id: string) => {
    setSymptoms(symptoms.map(symptom => 
      symptom.id === id ? { ...symptom, selected: !symptom.selected } : symptom
    ));
  };

  const getDiagnosis = () => {
    const selectedSymptoms = symptoms
      .filter(s => s.selected)
      .map(s => s.name.toLowerCase().replace(' ', '_'))
      .join('_');

    const result = diagnosisDatabase[selectedSymptoms] || {
      condition: 'Multiple Symptoms',
      severity: 'Medium',
      recommendation: 'Consult a General Physician',
      doctorType: 'General Physician',
      selfCare: [
        'Rest and stay hydrated',
        'Monitor symptoms',
        'Keep track of temperature if fever present'
      ]
    };

    setDiagnosisResult(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Select Your Symptoms</Title>
            <View style={styles.symptomsContainer}>
              {symptoms.map((symptom) => (
                <Chip
                  key={symptom.id}
                  selected={symptom.selected}
                  onPress={() => toggleSymptom(symptom.id)}
                  style={[
                    styles.chip,
                    symptom.selected && styles.selectedChip
                  ]}
                  textStyle={symptom.selected ? styles.selectedChipText : undefined}
                  showSelectedCheck={false}
                  mode="outlined"
                >
                  {symptom.name}
                </Chip>
              ))}
            </View>

            <TextInput
              label="Additional Notes"
              value={additionalNotes}
              onChangeText={setAdditionalNotes}
              multiline
              numberOfLines={3}
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={getDiagnosis}
              style={styles.button}
            >
              Get Diagnosis
            </Button>
          </Card.Content>
        </Card>

        {diagnosisResult && (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Diagnosis Result</Title>
              <View style={styles.resultContainer}>
                <List.Item
                  title="Condition"
                  description={diagnosisResult.condition}
                  left={props => <List.Icon {...props} icon="medical-bag" />}
                />
                <Divider />
                <List.Item
                  title="Severity"
                  description={diagnosisResult.severity}
                  left={props => <List.Icon {...props} icon="alert" />}
                />
                <Divider />
                <List.Item
                  title="Recommendation"
                  description={diagnosisResult.recommendation}
                  left={props => <List.Icon {...props} icon="stethoscope" />}
                />

                {diagnosisResult.doctorType && (
                  <>
                    <Divider />
                    <List.Item
                      title="Recommended Doctor"
                      description={diagnosisResult.doctorType}
                      left={props => <List.Icon {...props} icon="doctor" />}
                    />
                  </>
                )}

                {diagnosisResult.selfCare && (
                  <>
                    <Divider />
                    <List.Item
                      title="Self-Care Instructions"
                      description={diagnosisResult.selfCare.join('\n')}
                      left={props => <List.Icon {...props} icon="home" />}
                    />
                  </>
                )}

                {diagnosisResult.medications && (
                  <>
                    <Divider />
                    <List.Item
                      title="Recommended Medications"
                      description={diagnosisResult.medications.join('\n')}
                      left={props => <List.Icon {...props} icon="pill" />}
                    />
                  </>
                )}
              </View>

              <Button
                mode="contained"
                onPress={() => {/* Navigate to doctors list */}}
                style={styles.button}
              >
                Find Recommended Doctor
              </Button>
            </Card.Content>
          </Card>
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
  card: {
    margin: 20,
    marginTop: 24,
    borderRadius: 12,
    elevation: 4,
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16,
  },
  chip: {
    margin: 6,
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
  input: {
    marginVertical: 16,
    borderRadius: 8,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
  resultContainer: {
    marginVertical: 16,
  },
});

export default DiagnosisScreen; 