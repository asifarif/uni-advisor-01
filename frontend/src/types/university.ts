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

export interface UniversityWithDetails {
  id: string;
  name: string;
  shortName: string;
  city: string;
  province: string;
  established: number;
  type: "private" | "public";
  logo: string;
  website: string;
  overview: {
    description: string;
    rankings: {
      hec: number;
      local: number;
      qs?: number;
    };
  };
  contact: {
    email: string;
    phone: string;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
  };
  admissions: {
    open: boolean;
    deadline?: string;
  };
  scholarships: {
    available: boolean;
    types: string[];
  };
  createdAt: string;
  updatedAt: string;
}