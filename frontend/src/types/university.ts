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
}

export interface UniversityWithDetails extends University {
  overview?: {
    description?: string;
    rankings?: {
      hec?: number;
      qs?: number;
      local?: number;
    };
  };
  programs: {
    id: string;
    name: string;
    degree: string;
    faculty: string;
    duration: string;
    creditHours: number;
    description: string;
    requirements: string[];
    careerProspects: string[];
  }[];
  fees: {
    program: string;
    semester: number;
    tuition: number;
    admission: number;
    total: number;
    year: number;
  }[];
  admissions: {
    deadlines: {
      fall?: string;
      spring?: string;
    };
    requirements: {
      undergraduate: string[];
      graduate: string[];
    };
    tests: string[];
    meritCriteria: string;
  };
  campusLife: {
    facilities: string[];
    societies: string[];
    events: string[];
  };
  placements: {
    statistics: {
      placementRate?: string;
      averageSalary?: string;
      topEmployers?: string[];
    };
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    admissionsOffice: string;
  };
  news: {
    id: string;
    title: string;
    date: string;
    summary: string;
    url: string;
  }[];
  updatedAt: string;
}
