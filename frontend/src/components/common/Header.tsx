import { Box, Flex, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';

export const Header = () => {
  return (
    <Box bg="white" shadow="sm" position="sticky" top={0} zIndex={1000}>
      <Flex maxW="container.xl" mx="auto" px={4} py={4} align="center" justify="space-between">
        <Link href="/">
          <Text fontSize="xl" fontWeight="bold" color="blue.600">
            PakUni Advisor
          </Text>
        </Link>
        
        <Flex gap={6} align="center">
          <Link href="/universities">Universities</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/tools">Tools</Link>
          <Link href="/blog">Blog</Link>
          <Button colorScheme="blue" size="sm">
            Get Started
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
