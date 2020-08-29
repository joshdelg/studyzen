import React from 'react';
import { Box, Text, Stack, Button, Heading } from "@chakra-ui/core";
import Header from './components/Header';

function App() {
  return (
    <Box>
      <Header />
      <Stack m={8} spacing={8} align="center">
        <Heading>Welcome to my React App!</Heading>
        <Text fontSize="lg">Hello, world!</Text>
        <Button>Here's a cool button!</Button>
      </Stack>
    </Box>
  );
}

export default App;
