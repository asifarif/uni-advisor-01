import { Box, Container, Heading, Text, SimpleGrid, Button, Input, InputGroup, InputLeftElement, VStack, Spinner } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Layout } from '@/components/common/Layout';
import { UniversityCard } from '@/components/university/UniversityCard';
import { AdBanner } from '@/components/common/AdBanner';
import { supabase } from '@/lib/supabase';
import NextLink from 'next/link';
import { University } from '@/types/university';
import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

export async function getServerSideProps() {
  const { data: universities, error: uniError } = await supabase
    .from('universities')
    .select('id, name, shortname, city, province, established, type, logo, website, overview, fees, campuslife, placements, contact, news, updatedat')
    .limit(8);

  const { data: admissions, error: admError } = await supabase
    .from('admissions')
    .select(`
      id,
      university_id,
      addate,
      deadline,
      universities (name)
    `)
    .limit(5)
    .order('deadline', { ascending: true });

  if (uniError || admError) {
    console.error('Supabase error:', uniError || admError);
    return { props: { initialUniversities: [], admissions: [] } };
  }

  const formattedAdmissions = admissions?.map((adm) => ({
    id: adm.id,
    university: adm.universities?.name || adm.university_id,
    addate: adm.addate,
    deadline: adm.deadline
  })) || [];

  return {
    props: {
      initialUniversities: universities || [],
      admissions: formattedAdmissions
    }
  };
}

interface Admission {
  id: number;
  university: string;
  addate: string;
  deadline: string;
}

export default function Home({ initialUniversities, admissions }: { initialUniversities: University[], admissions: Admission[] }) {
  const [searchInput, setSearchInput] = useState('');
  const [universities, setUniversities] = useState(initialUniversities);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUniversities = async (term: string) => {
    setIsLoading(true);
    let query = supabase
      .from('universities')
      .select('id, name, shortname, city, province, established, type, logo, website, overview, fees, campuslife, placements, contact, news, updatedat')
      .limit(8);

    if (term) {
      query = query.or(`name.ilike.${term}%,city.ilike.${term}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      setUniversities([]);
    } else {
      setUniversities(data || []);
    }
    setIsLoading(false);
  };

  const debouncedFetch = debounce(fetchUniversities, 300);

  useEffect(() => {
    debouncedFetch(searchInput);
  }, [searchInput]);

  return (
    <Layout>
      <Box bg="brand.gray" py={12} textAlign="center">
        <Container maxW="container.xl">
          <Heading size="2xl" mb={4} color="brand.blue">
            Find Your Dream University
          </Heading>
          <Text fontSize="lg" mb={6}>
            Explore top universities in Pakistan with PakUni Advisor
          </Text>
          <InputGroup maxW="500px" mx="auto" mb={6}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search by name or city..."
              bg="white"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </InputGroup>
        </Container>
      </Box>
      <Container maxW="container.xl" py={8}>
        <Heading size="md" mb={6}>Featured Universities</Heading>
        <AdBanner adSlot="hero" />
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
            {universities.length ? (
              universities.map((university) => (
                <UniversityCard key={university.id} university={university} />
              ))
            ) : (
              <Text>No universities found</Text>
            )}
          </SimpleGrid>
        )}
        <AdBanner adSlot="featured" />
        <Box my={6}>
          <Heading size="md" mb={6}>Latest Admissions</Heading>
          <VStack spacing={4} align="stretch">
            {admissions.length ? (
              admissions.map((admission) => (
                <Box key={admission.id} p={4} bg="white" shadow="sm" rounded="md">
                  <Text fontWeight="bold">{admission.university}</Text>
                  <Text fontSize="sm">Ad Date: {admission.addate}</Text>
                  <Text fontSize="sm">Deadline: {admission.deadline}</Text>
                </Box>
              ))
            ) : (
              <Text>No admissions found</Text>
            )}
          </VStack>
          <NextLink href="/admissions" passHref>
            <Button mt={4} size="sm">View All Admissions</Button>
          </NextLink>
        </Box>
      </Container>
    </Layout>
  );
}