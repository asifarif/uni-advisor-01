import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { Layout } from '@/components/common/Layout';
import { AdBanner } from '@/components/common/AdBanner';

export default function About() {
  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading mb={4}>About Us</Heading>
        <Text mb={4}>
          PakUni Advisor helps students find the best universities in Pakistan. We provide detailed profiles, including programs, fees, and contact information, to guide your higher education journey.
        </Text>
        <Text mb={4}>
          Our mission is to simplify university selection with accurate, up-to-date data. Whether you’re interested in computer science or business, we’ve got you covered.
        </Text>
        <AdBanner adSlot="courses-popular" />
      </Container>
    </Layout>
  );
}