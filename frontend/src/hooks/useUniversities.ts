import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { University } from '@/types/university';

export const useUniversities = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*');
      
      if (error) throw error;
      setUniversities(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch universities');
    } finally {
      setLoading(false);
    }
  };

  return { universities, loading, error, refetch: fetchUniversities };
};
