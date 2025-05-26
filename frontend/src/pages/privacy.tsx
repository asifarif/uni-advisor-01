import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { Layout } from '@/components/common/Layout';
import { AdBanner } from '@/components/common/AdBanner';

export default function Privacy() {
  return (
    <Layout>
      <Container maxW="600px" py={8}>
        <Heading size="lg" mb={4}>Privacy Policy</Heading>
        <Text mb={4}>
          We value your trust and are committed to protecting your privacy. PakUni Advisor collects minimal data to enhance your experience and does not share it with third parties.
        </Text>
        <AdBanner adSlot="in_article" />
      </Container>
    </Layout>
  );
}