import { Box, Button, Text } from '@chakra-ui/react';

export function Demo() {
  return (
    <Box bg="bg.canvas" color="fg.default" p="6">
      <Button bg="primary.solid" _hover={{ bg: 'primary.hover' }} color="primary.fg">
        Acción primaria
      </Button>
      <Text mt="4">Primario azul en light y gris en dark.</Text>
    </Box>
  );
}
