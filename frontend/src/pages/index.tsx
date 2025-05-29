import { Box, Container, Heading, Text, SimpleGrid, Button, Input, InputGroup, InputLeftElement, VStack, Spinner, Flex } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Layout } from '@/components/common/Layout';
import { UniversityCard } from '@/components/university/UniversityCard';
import { AdBanner } from '@/components/common/AdBanner';
import { supabase, SupabaseAdmissionRow, SupabaseUniversityRow } from '@/lib/supabase';
import NextLink from 'next/link';
import { University } from '@/types/university';
import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

// Type for formatted admission
interface Admission {
  id: string;
  university: string;
  addate: string;
  deadline: string;
}

// Helper function to transform fees data
function transformFees(fees: string | { program?: string; semester?: string; type?: string; total?: number }[] | undefined): University['fees'] {
  if (!fees) {
    return [];
  }
  
  if (typeof fees === 'string') {
    return [{
      program: 'General',
      semester: 1,
      tuition: 0,
      admission: 0,
      total: 0,
      year: new Date().getFullYear()
    }];
  }
  
  if (Array.isArray(fees)) {
    return fees.map((fee, index) => ({
      program: fee.program || 'General',
      semester: parseInt(fee.semester || '1'),
      tuition: fee.total || 0,
      admission: 0,
      total: fee.total || 0,
      year: new Date().getFullYear()
    }));
  }
  
  return [];
}

// Helper function to transform campus life data
function transformCampusLife(campuslife: any): University['campusLife'] {
  if (!campuslife) {
    return { facilities: [], societies: [], events: [] };
  }
  
  return {
    facilities: Array.isArray(campuslife.facilities) ? campuslife.facilities : 
                typeof campuslife.facilities === 'string' ? [campuslife.facilities] : [],
    societies: Array.isArray(campuslife.societies) ? campuslife.societies : 
               typeof campuslife.societies === 'string' ? [campuslife.societies] : [],
    events: Array.isArray(campuslife.events) ? campuslife.events : 
            typeof campuslife.events === 'string' ? [campuslife.events] : []
  };
}

// Helper function to transform contact data
function transformContact(contact: any): University['contact'] {
  if (!contact) {
    return { address: '', phone: '', email: '', admissionsOffice: '' };
  }
  
  return {
    address: contact.address || '',
    phone: contact.phone || '',
    email: contact.email || '',
    admissionsOffice: contact.admissionsOffice || ''
  };
}

// Helper function to transform Supabase university data to University type
function transformUniversity(uni: SupabaseUniversityRow): University {
  return {
    id: uni.id,
    name: uni.name,
    shortName: uni.shortname || '',
    city: uni.city || '',
    province: uni.province || '',
    established: uni.established || 0,
    type: uni.type || '',
    logo: uni.logo || '/default-logo.png',
    website: uni.website || '',
    overview: {
      description: uni.overview?.description || '',
      rankings: uni.overview?.rankings || { hec: 0, local: 0 }
    },
    programs: [],
    fees: transformFees(uni.fees),
    admissions: {
      deadlines: {},
      requirements: { undergraduate: [], graduate: [] },
      tests: [],
      meritCriteria: ''
    },
    campusLife: transformCampusLife(uni.campuslife),
    placements: {
      statistics: {
        placementRate: '',
        averageSalary: '',
        topEmployers: []
      }
    },
    contact: transformContact(uni.contact),
    news: Array.isArray(uni.news) ? uni.news : [],
    updatedAt: uni.updatedat || ''
  };
}

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

  // [CHANGE] Fetch university names directly to avoid join issues
  const universityNames: { [key: string]: string } = {};
  const { data: uniNames } = await supabase
    .from('universities')
    .select('id, name');
  if (uniNames) {
    uniNames.forEach((uni: { id: string; name: string }) => {
      universityNames[uni.id] = uni.name;
    });
  }

  const uniqueAdmissions = Array.from(new Map(admissions.map(adm => [adm.id, adm])).values()).map((adm) => ({
    id: adm.id,
    university: universityNames[adm.university_id] || adm.university_id, // Use proper-case name
    addate: adm.addate || '',
    deadline: adm.deadline || ''
  }));

  const formattedUniversities: University[] = (universities as SupabaseUniversityRow[])?.map(transformUniversity) || [];

  return {
    props: {
      initialUniversities: formattedUniversities,
      admissions: uniqueAdmissions
    }
  };
}

export default function Home({ initialUniversities, admissions }: { initialUniversities: University[], admissions: Admission[] }) {
  const [searchInput, setSearchInput] = useState('');
  const [universities, setUniversities] = useState<University[]>(initialUniversities);
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
      setUniversities((data as SupabaseUniversityRow[]).map(transformUniversity));
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
          <Flex justify="center" py={4}>
            <Spinner size="md" color="brand.blue" />
          </Flex>
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
          {admissions.length ? (
            <>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {admissions.map((admission) => (
                  <Box key={admission.id} p={4} bg="white" shadow="md" rounded="lg" border="1px" borderColor="gray.200">
                    <Text fontWeight="bold" fontSize="md" mb={2} color="brand.blue">
                      {admission.university}
                    </Text>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      📅 Ad Date: {admission.addate}
                    </Text>
                    <Text fontSize="sm" color="red.500" fontWeight="medium">
                      ⏰ Deadline: {admission.deadline}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
              <NextLink href="/admissions" passHref>
                <Button mt={4} colorScheme="blue" size="sm">View All Admissions</Button>
              </NextLink>
            </>
          ) : (
            <Text>No admissions found</Text>
          )}
        </Box>
      </Container>
    </Layout>
  );
}