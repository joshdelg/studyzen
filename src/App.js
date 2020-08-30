import React, { useState } from 'react';
import { Box, Stack, Heading, Text, Select, Flex, Button, Grid } from "@chakra-ui/core";
import Header from './components/Header';
import MediaPlayer from './components/MediaPlayer';
import SubjectList from './components/SubjectList';
import { XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, LineSeries, LineMarkSeries } from 'react-vis';
import '../node_modules/react-vis/dist/style.css';

function App() {

  const urlSet = {
    math: [
      'https://www.youtube.com/watch?v=iEGFFyv0MH4'
    ],
    humanities: [
      'https://www.youtube.com/watch?v=hKkR4YFtyJk&vl=en'
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
  const [graphData, setGraphData] = useState([
    {x: 1, y: 7}, {x: 2, y: 8}, {x: 3, y: 8}, {x: 4, y: 6}
  ]);

  const addDataPoint = (y) => {
    setGraphData([...graphData, {x: graphData.length + 1, y: y}]);
  };

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
          addDataPoint={addDataPoint}
        />
        <Heading my={8} size="2xl">Your Mental Health Over Time</Heading>
        <Flex my={8} justify="center">
        <XYPlot yDomain={[0, 10]} height={300} width={1080}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickTotal={graphData.length} title="Survey Submission Number"/>
          <YAxis title="Mental Health Scale"/>
          <LineMarkSeries data={graphData} />
        </XYPlot>
      </Flex>
      </Stack>
      <Box pos="fixed" bottom="0" zIndex={2} w="100%">
        <MediaPlayer urls={urls} isInSession={isInSession} />
      </Box>
      {/*Placeholder to allow media player to not obstruct anything*/}
      <Box h="150px">{" "}</Box>
    </Box>
  );
}

export default App;
