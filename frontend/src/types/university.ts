export interface University {
  id: string;
  name: string;
  shortName: string;
  city: string;
  province: string;
  established: number;
  type: 'public' | 'private';
  logo: string;
  website: string;
  ranking?: {
    hec?: number;
    qs?: number;
    local?: number;
  };
  programs: Program[];
  fees: FeeStructure[];
  admissions: AdmissionInfo;
  contact: ContactInfo;
  facilities: string[];
  accreditations: string[];
}

export interface Program {
  id: string;
  name: string;
  degree: 'undergraduate' | 'graduate' | 'postgraduate';
  faculty: string;
  duration: string;
  creditHours: number;
  description: string;
  requirements: string[];
  career_prospects: string[];
}

export interface FeeStructure {
  program: string;
  semester: number;
  tuition: number;
  admission: number;
  security: number;
  other: number;
  total: number;
  year: number;
}

export interface AdmissionInfo {
  deadlines: {
    fall: string;
    spring?: string;
  };
  requirements: {
    [key: string]: string[];
  };
  tests: string[];
  merit_criteria: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  admissions_office: string;
}
