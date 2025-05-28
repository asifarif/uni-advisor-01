import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Type for Supabase admissions table response
export interface SupabaseAdmissionRow {
  id: string;
  university_id: string;
  addate: string;
  deadline: string;
  details?: {
    requirements: {
      undergraduate: string[];
      graduate: string[];
    };
    tests: string[];
    meritCriteria?: string;
  };
  universities: { name: string }[] | null;
}

// Type for Supabase universities table response
export interface SupabaseUniversityRow {
  id: string;
  name: string;
  shortname: string;
  city: string;
  province: string;
  established: number;
  type: string;
  logo: string;
  website?: string;
overview?: {
    description?: string;
    rankings?: { hec: number; local: number; qs?: number };
  };
  fees?: string | { program?: string; semester?: string; type?: string; total?: number }[];
  campuslife?: { facilities?: string[] | string; societies?: string[] | string; events?: string[] | string };
  placements?: any;
  contact?: { address?: string; phone?: string; email?: string; admissionsOffice?: string };
  news?: any;
  updatedat?: string;
}