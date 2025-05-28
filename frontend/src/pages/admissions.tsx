import { Box, Container, Heading, VStack, Text } from '@chakra-ui/react';
import { Layout } from '@/components/common/Layout';
import { supabase, SupabaseAdmissionRow } from '@/lib/supabase';

// Type for formatted admission
interface AdmissionData {
  id: string;
  university: string;
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
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from('admissions')
    .select(`
      id,
      university_id,
      addate,
      deadline,
      details,
      universities (name)
    `)
    .order('deadline', { ascending: true });

  if (error) {
    console.error('Supabase error:', error);
    return { props: { admissions: [] } };
  }

  const admissions = data as SupabaseAdmissionRow[];

  const seen = new Set<string>();
  const formattedAdmissions: AdmissionData[] = admissions
    .filter((adm) => {
      const key = `${adm.university_id}-${adm.deadline}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((adm) => ({
      id: adm.id,
      university: adm.universities?.[0]?.name || toTitleCase(adm.university_id),
      addate: adm.addate || '',
      deadline: adm.deadline || '',
      details: adm.details
    }));

  return { props: { admissions: formattedAdmissions } };
}

// Utility function to convert to title case
function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Admissions({ admissions }: { admissions: AdmissionData[] }) {
  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading size="lg" mb={6}>All Admissions</Heading>
        <VStack spacing={4} align="stretch">
          {admissions.length ? (
            admissions.map((admission) => (
              <Box key={admission.id} p={4} bg="white" shadow="sm" rounded="md">
                <Heading size="md">{admission.university}</Heading>
                <Text>Ad Date: {admission.addate}</Text>
                <Text>Deadline: {admission.deadline}</Text>
                <Text>Tests: {admission.details?.tests?.join(', ') || 'N/A'}</Text>
                <Text>Merit Criteria: {admission.details?.meritCriteria || 'N/A'}</Text>
              </Box>
            ))
          ) : (
            <Text>No admissions found</Text>
          )}
        </VStack>
      </Container>
    </Layout>
  );
}