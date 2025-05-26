import { Box, Flex, Text, Button, Image } from '@chakra-ui/react';
import Link from 'next/link';

export const Header = () => {
  return (
    <Box bg="white" shadow="sm" position="sticky" top={0} zIndex={1000}>
      <Flex maxW="container.xl" mx="auto" px={4} py={4} align="center" justify="space-between">
        <Link href="/">
          <Flex align="center">
            <Image src="/images/logo.png" alt="PakUni Advisor" w={8} h={8} />
            <Text fontSize="2xl" fontWeight="bold" color="blue.600" ml={2}>
              PakUni Advisor
            </Text>
          </Flex>
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