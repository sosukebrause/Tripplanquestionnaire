export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'category-selection' | 'text' | 'duration' | 'number' | 'group-size';
  options?: string[];
  categories?: string[];
}

export const questions: Question[] = [
  {
    id: 'destination',
    text: 'What is your pickup or destination area?',
    type: 'multiple-choice',
    options: [
      'Tokyo',
      'Osaka & Kyoto',
      'Other'
    ]
  },
  {
    id: 'specific-places',
    text: 'Are there any specific places you definitely want to visit? (Optional)',
    type: 'text'
  },
  {
    id: 'activities',
    text: 'What activities or experiences are you interested in?',
    type: 'category-selection',
    categories: [
      'Cultural Immersion',
      'Shopping',
      'Food & Dining',
      'Temples & Shrines',
      'Nightlife',
      'Nature & Scenery',
      'Family Activities',
      'Relaxation & Wellness'
    ]
  },
  {
    id: 'duration-per-stop',
    text: 'How long would you typically like to spend at each location?',
    type: 'multiple-choice',
    options: [
      '30 minutes - Quick visit',
      '1 hour - Standard visit',
      '1.5-2 hours - Extended visit',
      '2+ hours - In-depth experience',
      'Flexible - Varies by location'
    ]
  },
  {
    id: 'total-duration',
    text: 'How many hours would you like your chauffeur service for?',
    type: 'multiple-choice',
    options: [
      '4 hours - Half day',
      '8 hours - Full day',
      '12 hours - Extended day',
      'Multiple days',
      'Not sure yet'
    ]
  },
  {
    id: 'group-size',
    text: 'How many people will be traveling?',
    type: 'group-size'
  },
  {
    id: 'special-requirements',
    text: 'Do you have any special requirements or preferences? (Optional)',
    type: 'text'
  }
];