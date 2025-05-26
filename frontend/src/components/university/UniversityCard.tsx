import { Box, Text, Image, Badge, Button, VStack, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { University } from '@/types/university';


interface UniversityCardProps {
  university: University;
}


export const UniversityCard = ({ university }: UniversityCardProps) => {
  return (
    <Box
      bg="white"
      shadow="md"
      rounded="lg"
      p={6}
      transition="all 0.2s"
      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
    >
      <VStack spacing={4} align="center">
        <Image src={university.logo} alt={university.name} w={16} h={16} />
        <VStack spacing={2} textAlign="center">
          <Text fontWeight="bold" fontSize="lg">{university.name}</Text>
          <HStack>
            <Badge colorScheme="blue">{university.city}</Badge>
            <Badge colorScheme="gray">Est. {university.established}</Badge>
          </HStack>
        </VStack>
        <Link href={`/universities/${university.id}`}>
          <Button colorScheme="blue" size="sm" w="full">
            View Details
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};
