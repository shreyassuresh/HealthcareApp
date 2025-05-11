import axios from 'axios';

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  availability: string;
  image: string;
  education: string[];
  languages: string[];
  insurance: string[];
  address: string;
  phone: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const doctorsList: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Patel',
    specialization: 'General Physician',
    experience: '15 years',
    rating: 4.8,
    availability: 'Mon-Fri, 9AM-5PM',
    image: 'https://avatar.iran.liara.run/public/1',
    education: ['MBBS - BJ Medical College, Ahmedabad', 'MD - Civil Hospital, Ahmedabad'],
    languages: ['English', 'Gujarati', 'Hindi'],
    insurance: ['Star Health', 'ICICI Lombard', 'HDFC Ergo'],
    address: '123 Alkapuri Society, Race Course Road, Vadodara - 390007',
    phone: '+91 98765 43210'
  },
  {
    id: '2',
    name: 'Dr. Vikram Shah',
    specialization: 'Cardiologist',
    experience: '12 years',
    rating: 4.9,
    availability: 'Mon-Thu, 8AM-4PM',
    image: 'https://avatar.iran.liara.run/public/2',
    education: ['MBBS - M.S. University, Vadodara', 'DM Cardiology - Sterling Hospital, Ahmedabad'],
    languages: ['English', 'Gujarati', 'Hindi'],
    insurance: ['Star Health', 'ICICI Lombard', 'HDFC Ergo'],
    address: '456 Gotri Road, Near Gotri Circle, Vadodara - 390021',
    phone: '+91 98765 43211'
  },
  {
    id: '3',
    name: 'Dr. Harshad Mehta',
    specialization: 'Dermatologist',
    experience: '10 years',
    rating: 4.7,
    availability: 'Tue-Sat, 10AM-6PM',
    image: 'https://avatar.iran.liara.run/public/3',
    education: ['MBBS - Government Medical College, Surat', 'MD Dermatology - Civil Hospital, Ahmedabad'],
    languages: ['English', 'Gujarati', 'Hindi'],
    insurance: ['Star Health', 'ICICI Lombard', 'HDFC Ergo'],
    address: '789 Fatehgunj, Near Navlakhi Ground, Vadodara - 390002',
    phone: '+91 98765 43212'
  },
  {
    id: '4',
    name: 'Dr. Ketan Desai',
    specialization: 'Pediatrician',
    experience: '18 years',
    rating: 4.9,
    availability: 'Mon-Fri, 8AM-6PM',
    image: 'https://avatar.iran.liara.run/public/4',
    education: ['MBBS - M.S. University, Vadodara', 'MD Pediatrics - BJ Medical College, Ahmedabad'],
    languages: ['English', 'Gujarati', 'Hindi'],
    insurance: ['Star Health', 'ICICI Lombard', 'HDFC Ergo'],
    address: '321 Alkapuri, Near Race Course, Vadodara - 390007',
    phone: '+91 98765 43213'
  },
  {
    id: '5',
    name: 'Dr. Parthiv Joshi',
    specialization: 'Orthopedist',
    experience: '14 years',
    rating: 4.8,
    availability: 'Mon-Thu, 9AM-5PM',
    image: 'https://avatar.iran.liara.run/public/5',
    education: ['MBBS - Government Medical College, Vadodara', 'MS Orthopedics - Civil Hospital, Ahmedabad'],
    languages: ['English', 'Gujarati', 'Hindi'],
    insurance: ['Star Health', 'ICICI Lombard', 'HDFC Ergo'],
    address: '654 Gotri Road, Near Gotri Circle, Vadodara - 390021',
    phone: '+91 98765 43214'
  },
  {
    id: '6',
    name: 'Dr. Nilesh Trivedi',
    specialization: 'Neurologist',
    experience: '16 years',
    rating: 4.9,
    availability: 'Mon-Fri, 8AM-4PM',
    image: 'https://avatar.iran.liara.run/public/6',
    education: ['MBBS - M.S. University, Vadodara', 'DM Neurology - Sterling Hospital, Ahmedabad'],
    languages: ['English', 'Gujarati', 'Hindi'],
    insurance: ['Star Health', 'ICICI Lombard', 'HDFC Ergo'],
    address: '987 Alkapuri, Near Race Course, Vadodara - 390007',
    phone: '+91 98765 43215'
  },
  {
    id: '7',
    name: 'Dr. Amit Shah',
    specialization: 'Psychiatrist',
    experience: '13 years',
    rating: 4.7,
    availability: 'Mon-Fri, 10AM-7PM',
    image: 'https://avatar.iran.liara.run/public/7',
    education: ['MBBS - Government Medical College, Vadodara', 'MD Psychiatry - Civil Hospital, Ahmedabad'],
    languages: ['English', 'Gujarati', 'Hindi'],
    insurance: ['Star Health', 'ICICI Lombard', 'HDFC Ergo'],
    address: '147 Fatehgunj, Near Navlakhi Ground, Vadodara - 390002',
    phone: '+91 98765 43216'
  },
  {
    id: '8',
    name: 'Dr. Dinesh Patel',
    specialization: 'Gynecologist',
    experience: '15 years',
    rating: 4.8,
    availability: 'Mon-Thu, 9AM-5PM',
    image: 'https://avatar.iran.liara.run/public/8',
    education: ['MBBS - M.S. University, Vadodara', 'MD Gynecology - BJ Medical College, Ahmedabad'],
    languages: ['English', 'Gujarati', 'Hindi'],
    insurance: ['Star Health', 'ICICI Lombard', 'HDFC Ergo'],
    address: '258 Gotri Road, Near Gotri Circle, Vadodara - 390021',
    phone: '+91 98765 43217'
  },
  {
    id: '9',
    name: 'Dr. Rakesh Mehta',
    specialization: 'Ophthalmologist',
    experience: '11 years',
    rating: 4.9,
    availability: 'Tue-Sat, 9AM-5PM',
    image: 'https://avatar.iran.liara.run/public/9',
    education: ['MBBS - Government Medical College, Vadodara', 'MS Ophthalmology - Civil Hospital, Ahmedabad'],
    languages: ['English', 'Gujarati', 'Hindi'],
    insurance: ['Star Health', 'ICICI Lombard', 'HDFC Ergo'],
    address: '369 Alkapuri, Near Race Course, Vadodara - 390007',
    phone: '+91 98765 43218'
  },
  {
    id: '10',
    name: 'Dr. Suresh Joshi',
    specialization: 'ENT Specialist',
    experience: '12 years',
    rating: 4.7,
    availability: 'Mon-Fri, 8AM-6PM',
    image: 'https://avatar.iran.liara.run/public/10',
    education: ['MBBS - M.S. University, Vadodara', 'MS ENT - Sterling Hospital, Ahmedabad'],
    languages: ['English', 'Gujarati', 'Hindi'],
    insurance: ['Star Health', 'ICICI Lombard', 'HDFC Ergo'],
    address: '741 Fatehgunj, Near Navlakhi Ground, Vadodara - 390002',
    phone: '+91 98765 43219'
  }
];

export const api = {
  // Doctor-related API calls
  async searchDoctors(query: string, specialty?: string): Promise<Doctor[]> {
    // Simulate API delay
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));

    return doctorsList.filter(doctor => {
      const matchesQuery = query === '' || 
        doctor.name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(query.toLowerCase());
      
      const matchesSpecialty = !specialty || doctor.specialization === specialty;

      return matchesQuery && matchesSpecialty;
    });
  },

  // Chatbot API calls
  async getChatbotResponse(messages: ChatMessage[]): Promise<string> {
    // Placeholder implementation
    return "This feature is currently under maintenance.";
  },
}; 