import React, { useState } from "react";
import { Flex, Box, Grid, Text, Stack, Select, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader,
        ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, FormHelperText, NumberInput,
        NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Input, CheckboxGroup, Checkbox } from "@chakra-ui/core";

export default function Subject(props) {

  const [isStudying, setIsStudying] = useState(false);
  const [subjectType, setSubjectType] = useState(props.s.subjectType);

  // Modal form state
  const [mentalHealth, setMentalHealth] = useState(10);
  const [stress, setStress] = useState(1);
  const [screen, setScreen] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const musicMappings = {
    math: "Lofi",
    humanities: "Classical",
    science: "Lofi",
    art: "Electronic"
  }

  const handleSubjectChange = (e) => {
      setSubjectType(e.target.value);
      props.edit(props.s.i, {...props.s, subjectType: e.target.value, musicType: musicMappings[e.target.value]})
  }

  const handleStudyClick = () => {
    if(isStudying) {
        setIsStudying(false);
        props.stopStudy();
        onOpen();
    } else {
        if(!props.isInSession) {
            props.studySubject(props.s.subjectType);
            setIsStudying(true);
        }
    }
  };

  const handleSubmit = () => {
      if(screen === 0) {
          props.addDataPoint(mentalHealth);
        if(mentalHealth < 5 || stress > 5) {
            setScreen(1);
          } else {
              onClose();
          }
      } else {
          onClose();
      }
  }

  const renderForm = () => (
    <Stack spacing={8}>
        <FormControl>
            <FormLabel htmlFor="mentalHealth">On a scale of 1-10, how is your mental health today?</FormLabel>
            <NumberInput id="mentalHealth" min={1} max={10} value={mentalHealth} onChange={(num) => setMentalHealth(num)}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <FormHelperText>1 being the worst and 10 being the best</FormHelperText>
            <FormLabel htmlFor="mentalHealthExplain">Feel free to explain</FormLabel>
            <Input type="textarea" id="mentalHealthExplain" />
        </FormControl>
        <FormControl>
            <FormLabel htmlFor="stress">On a scale of 1-10, how stressed are you today?</FormLabel>
            <NumberInput id="stress" min={1} max={10} value={stress} onChange={(num) => setStress(num)}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <FormHelperText>1 being the least and 10 being the most stressed</FormHelperText>
            <FormLabel htmlFor="mentalHealthExplain">Feel free to explain</FormLabel>
            <Input type="textarea" id="mentalHealthExplain" />
        </FormControl>
        <FormControl>
            <FormLabel htmlFor="stressFactors">What are your biggest stress factors?</FormLabel>
            <CheckboxGroup>
                <Checkbox value="school">School</Checkbox>
                <Checkbox value="familyLife">Family Life</Checkbox>
                <Checkbox value="health">Health</Checkbox>
                <Checkbox value="socialLife">Social Life</Checkbox>
                <Checkbox value="sports">Sports/Extracurriculars</Checkbox>
                <Checkbox value="career">Career and Future</Checkbox>
                <Checkbox value="finance">Financial Woes</Checkbox>
            </CheckboxGroup>
        </FormControl>
    </Stack>
  );

  const renderHelpMessage = () => (
      <>
        <Text>Hey, it looks like you're having a bad day.</Text>
        <Text>That's alright. Here's some resources that can help:</Text>
        <Box my={4}>
            <Text my={2}>National Mental Health Hotline: 1-800-662-HELP (4357)</Text>
            <Text my={2}>Information About Mental Health: <a href="https://www.mentalhealth.gov">https://www.mentalhealth.gov</a></Text>
        </Box>
      </>
  );

  return (
    <>
      <Flex my={4} boxShadow={(isStudying) ? "lg" : "md"}>
        <Box bg={(isStudying) ? "teal.500" : "gray.200"} w="15px">
            {" "}
        </Box>
        <Flex w="100%" p={6} justify="space-between" align="center">
            <Grid flex={2} gap={4} gridTemplateColumns="repeat(3, 1fr)">
            <Text m="auto" ml="0" fontSize="2xl">
                {props.s.name}
            </Text>
            <Stack mx={4} my="auto">
                <Text>Subject Type</Text>
                <Select maxW={150} value={subjectType} onChange={handleSubjectChange}>
                    <option value="math">Math</option>
                    <option value="humanities">Humanities</option>
                    <option value="science">Science</option>
                    <option value="art">Art</option>
                </Select>
            </Stack>
            <Text textAlign="center" m="auto" fontSize="lg">
                Music Type: {props.s.musicType}
            </Text>
            </Grid>
            <Flex flex={1} justify="flex-end">
            <Button mx={4} onClick={handleStudyClick}>{(isStudying) ? "Stop Studying" : "Start Studying!"}</Button>
            <Button mx={4} onClick={() => props.delete(props.i)}>
                Delete
            </Button>
            </Flex>
        </Flex>
      </Flex>
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Mental Health Survey</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{(screen === 0) ? renderForm() : renderHelpMessage()}</ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}>{(screen === 0) ? "Submit" : "Close"}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  );
}
