import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Layout } from '@/components/common/Layout';
import { AdBanner } from '@/components/common/AdBanner';
import Link from 'next/link';

const posts = [
  { id: 'top-universities', title: 'Top Universities in Pakistan 2025' },
  { id: 'admission-tips', title: 'Admission Tips for Pakistani Universities' },
];

export default function Blog() {
  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading mb={4}>Blog</Heading>
        <VStack spacing={4} align="start">
          {posts.map((post) => (
            <Box key={post.id}>
              <Link href={`/blog/${post.id}`}>
                <Text fontSize="lg" color="blue.600">{post.title}</Text>
              </Link>
            </Box>
          ))}
        </VStack>
        <AdBanner adSlot="courses" />
      </Container>
    </Layout>
  );
}