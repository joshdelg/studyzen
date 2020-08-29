import React, { useState, useRef } from 'react';
import { Box, Text, Stack, Button, Heading, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/core";
import Header from './components/Header';
import MediaPlayer from './components/MediaPlayer';

function App() {

  return (
    <Box>
      <Header />
      <Stack m={8} spacing={8} align="center">
        <Heading>Welcome to my React App!</Heading>
        <Text fontSize="lg">Hello, world!</Text>
        <MediaPlayer />
      </Stack>
    </Box>
  );
}

export default App;
