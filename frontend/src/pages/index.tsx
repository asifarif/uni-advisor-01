import { Box, Container, SimpleGrid, Heading, Text, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { UniversityCard } from '@/components/university/UniversityCard';
import { AdBanner } from '@/components/common/AdBanner';
import universities from '@/data/universities.json';
import { University } from '@/types/university';

export default function Home() {
  const [search, setSearch] = useState('');
  const filteredUniversities = (universities as unknown as University[]);
  const filteredUniversities = (universities as University[])
    .filter((uni) =>
      uni.name.toLowerCase().includes(search.toLowerCase()) ||
      uni.city.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 6);

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading size="lg" mb={4}>🎓 Find Your University</Heading>
        <Input
          placeholder="Search by name or city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          mb={6}
          size="lg"
        />
        <AdBanner adSlot="courses-popular" />
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((uni) => (
              <UniversityCard key={uni.id} university={uni} />
            ))
          ) : (
            <Text>No universities found.</Text>
          )}
        </SimpleGrid>
        <AdBanner adSlot="courses" />
        <Box mt={12}>
          <Heading size="md">🆚 Compare Top Institutions</Heading>
          <Text color="gray.600" mt={2}>
            Use our comparison tool to explore differences in fees, rankings, and programs.
          </Text>
        </Box>
      </Container>
    </Layout>
  );
}