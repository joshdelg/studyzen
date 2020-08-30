import React, { useState } from 'react';
import { Box, Stack, Heading, Text, Select, Flex, Button, Grid } from "@chakra-ui/core";
import Header from './components/Header';
import MediaPlayer from './components/MediaPlayer';
import SubjectList from './components/SubjectList';

function App() {

  const urlSet = {
    math: [
      'https://www.youtube.com/watch?v=iEGFFyv0MH4'
    ],
    humanities: [
      'https://www.youtube.com/watch?v=mIYzp5rcTvU&t=968s'
    ],
    science: [
      'https://www.youtube.com/watch?v=HU7fx7bF94Q&list=PLuDoiEqVUgegWFXgllgj1pL3JkeVfKA4m&index=2&t=0s'
    ],
    art: [
      'https://www.youtube.com/watch?v=O6h1W5WpbfA&list=PLrhYk2slIGFPmr6DdjsLqNvDCF_WSS-Ul&index=2&t=0sk2slIGFPmr6DdjsLqNvDCF_WSS-Ul'
    ]
  };

  const musicMappings = {
    math: "Lofi",
    humanities: "Classical",
    science: "Lofi",
    art: "Electronic"
  }

  const [subjects, setSubjects] = useState([
    {name: "AP Calculus BC", subjectType: "math", musicType: musicMappings["math"]},
    {name: "AP US History", subjectType: "humanities", musicType: musicMappings["humanities"]}
  ]);

  const [urls, setUrls] = useState(urlSet.math);
  const [isInSession, setIsInSession] = useState(false);

  const studySubject = (subjectType) => {
    if(isInSession) {
      return;
    } else {
      setUrls(urlSet[subjectType]);
      setIsInSession(true);
    }
  }

  const stopStudy = () => {
    setIsInSession(false);
  }

  const addSubject = (name, subjectType) => {
    setSubjects([...subjects, {name: name, subjectType: subjectType, musicType: musicMappings[subjectType]}]);
  }

  const deleteSubject = (index) => {
    setSubjects(subjects.filter((s, i) => i !== index));
  }

  const editSubject = (index, subject) => {
    let newSubjects = subjects;
    newSubjects[index] = subject;
    setSubjects(newSubjects);
  }

  return (
    <Box>
      <Header />
      <Stack m={8} spacing={8}>
        <Heading size="2xl">Your Classes</Heading>
        <SubjectList
          subjects={subjects}
          add={addSubject}
          delete={deleteSubject}
          edit={editSubject}
          studySubject={studySubject}
          stopStudy={stopStudy}
          isInSession={isInSession}
        />
      </Stack>
      <Box pos="fixed" bottom="0" zIndex={2} w="100%">
        <MediaPlayer urls={urls} isInSession={isInSession} />
      </Box>
      {/*Placeholder to allow media player to not obstruct anything*/}
      <Box h="100px">{" "}</Box>
    </Box>
  );
}

export default App;
