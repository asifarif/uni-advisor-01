import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from '@/components/common/Layout';
import { AdBanner } from '@/components/common/AdBanner';

const posts: { [key: string]: { title: string; content: string } } = {
  'top-universities': {
    title: 'Top Universities in Pakistan 2025',
    content: 'Discover the top universities in Pakistan, including LUMS and NUST, known for their academic excellence and strong industry connections...',
  },
  'admission-tips': {
    title: 'Admission Tips for Pakistani Universities',
    content: 'Learn how to prepare for university admissions in Pakistan, including tips on entrance tests and application deadlines...',
  },
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(posts).map((id) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = posts[params?.id as string];
  if (!post) {
    return { notFound: true };
  }
  return { props: { post } };
};

export default function BlogPost({ post }: { post: { title: string; content: string } }) {
  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Heading mb={4}>{post.title}</Heading>
        <Text mb={4}>{post.content}</Text>
        <AdBanner adSlot="courses-popular" />
      </Container>
    </Layout>
  );
}