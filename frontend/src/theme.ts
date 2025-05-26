import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      blue: '#0055A4',
      red: '#E53E3E',
      gray: '#F7FAFC',
    },
  },
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'brand.blue',
          color: 'white',
          _hover: { bg: 'brand.blue.600' },
        },
      },
    },
    Card: {
      baseStyle: {
        borderRadius: 'md',
        boxShadow: 'sm',
        _hover: { boxShadow: 'md', transform: 'translateY(-2px)' },
      },
    },
  },
});

export default theme;