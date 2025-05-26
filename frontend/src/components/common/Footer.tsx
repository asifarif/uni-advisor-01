import { Box, Container, Text, VStack } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box bg="gray.50" py={10} mt={20}>
      <Container maxW="container.xl">
        <VStack spacing={4} textAlign="center">
          <Text fontSize="sm" color="gray.600">
            © 2025 PakUni Advisor. All rights reserved.
          </Text>
          <Text fontSize="xs" color="gray.500">
            Helping Pakistani students make informed university decisions
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};
