export const SITE_CONFIG = {
  name: 'PakUni Advisor',
  description: 'AI-powered guidance for Pakistani university admissions',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/images/og-image.png',
};

export const PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Islamabad Capital Territory',
  'Azad Kashmir',
  'Gilgit-Baltistan',
];

export const PROGRAM_CATEGORIES = [
  'Engineering',
  'Computer Science',
  'Business Administration',
  'Medicine',
  'Social Sciences',
  'Arts & Humanities',
  'Natural Sciences',
  'Law',
];

export const UNIVERSITY_TYPES = ['public', 'private'] as const;
export const DEGREE_LEVELS = ['undergraduate', 'graduate', 'postgraduate'] as const;
