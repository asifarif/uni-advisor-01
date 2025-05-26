import { Box, Container, Text, VStack, HStack, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <Box bg="gray.50" py={10} mt={20}>
      <Container maxW="container.xl">
        <VStack spacing={3} textAlign="center">
          <Text fontSize="xs" color="gray.700">
            Helping Pakistani students make informed university decisions
          </Text>
          <Text fontSize="xs" color="gray.800">
            © 2025 PakUni Advisor. All rights reserved.
          </Text>
          <HStack spacing={2}>
            <ChakraLink as={Link} href="/privacy" fontSize="xs" color="blue.600">
              Privacy Policy
            </ChakraLink>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};