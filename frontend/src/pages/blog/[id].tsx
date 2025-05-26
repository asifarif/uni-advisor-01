import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Layout } from '@/components/common/Layout';
import { AdBanner } from '@/components/common/AdBanner';

const posts: { [key: string]: { title: string; content: string } } = {
  'top-universities': {
    title: 'Top Universities in Pakistan 2025',
    content: `Pakistan’s higher education landscape... (300–500 words)`,
  },
  'admission-tips': {
    title: 'Admission Tips for Pakistani Universities',
    content: `Securing admission... (300–500 words)`,
  },
};

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  const post = id && posts[id as string];

  if (!post) {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <Heading>Post Not Found</Heading>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading mb={4}>{post.title}</Heading>
        <Text whiteSpace="pre-wrap">{post.content}</Text>
        <AdBanner adSlot="in_article" />
      </Container>
    </Layout>
  );
}