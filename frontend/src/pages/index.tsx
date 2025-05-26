import { Box, Container, Heading, Text, SimpleGrid, Button, Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Layout } from '@/components/common/Layout';
import { UniversityCard } from '@/components/university/UniversityCard';
import { AdBanner } from '@/components/common/AdBanner';
import universities from '@/data/universities.json';
import admissions from '@/data/admissions.json';
import NextLink from 'next/link';

export default function Home() {
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
            <Input placeholder="Search universities..." bg="white" />
          </InputGroup>
          <Button colorScheme="blue" size="lg">
            Get Started
          </Button>
        </Container>
      </Box>
      <Container maxW="container.xl" py={8}>
        <Heading size="md" mb={6}>Featured Universities</Heading>
        <AdBanner adSlot="hero" />
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={4}>
          {universities.slice(0, 8).map((university) => (
            <UniversityCard key={university.id} university={university} />
          ))}
        </SimpleGrid>
        <AdBanner adSlot="featured" />
        <Box my={6}>
          <Heading size="md" mb={6}>Latest Admissions</Heading>
          <VStack spacing={4} align="stretch">
            {admissions.slice(0, 5).map((admission) => (
              <Box key={admission.id} p={4} bg="white" shadow="sm" rounded="md">
                <Text fontWeight="bold">{admission.university}</Text>
                <Text fontSize="sm">Ad Date: {admission.adDate}</Text>
                <Text fontSize="sm">Deadline: {admission.deadline}</Text>
              </Box>
            ))}
          </VStack>
          <NextLink href="/admissions" passHref>
            <Button mt={4} size="sm">View All Admissions</Button>
          </NextLink>
        </Box>
      </Container>
    </Layout>
  );
}