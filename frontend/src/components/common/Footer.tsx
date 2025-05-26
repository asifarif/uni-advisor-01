import { Box, Container, Text, VStack, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <Box bg="gray.50" py={10} mt={20}>
      <Container maxW="container.xl">
        <VStack spacing={4} textAlign="center">
          <Text fontSize="sm" color="gray.600">
            © 2025 PakUni Advisor. All rights reserved.
          </Text>
          <Text fontSize="x" color="gray.500">
            Helping Pakistani students make informed university decisions
          </Text>
          <ChakraLink as={Link} href="/privacy" fontSize="xs" color="blue.600">
            Privacy Policy
          </ChakraLink>
        </VStack>
      </Container>
    </Box>
  );
};