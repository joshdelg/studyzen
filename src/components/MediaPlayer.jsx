import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Flex } from "@chakra-ui/core";

export default function MediaPlayer(props) {
    
    const [urlIndex, setUrlIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songProgress, setSongProgress] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);
    const player = useRef(null);

    const handlePlayPause = () => {
        if(isPlaying) {
            setIsPlaying(false);
        } else {
            if(props.isInSession) {
                setIsPlaying(true);
            } else {
                alert("Must be in session!");
            }
        }
    }

    // Seeks to beginning every time a new song starts playing
    const handleStart = () => {
        setIsSeeking(true);
        setSongProgress(0);
        player.current.seekTo(0, "seconds");
        setIsSeeking(false);
    }

    // Updates songProgress (slider value) every time the song progresses if not currently seeking
    const handleProgress = (progressData) => {
        if(props.isInSession) {
            if(!isSeeking) {
                const { played } = progressData;
                setSongProgress(played);
            }
        } else {
            setIsPlaying(false);
        }
    };

    // When slider is dragged, move through the song
    const handleChange = (num) => {
        setIsSeeking(true);
        setSongProgress(num);
        player.current.seekTo(num, "fraction");
        setIsSeeking(false);
    }

    // When a song finishes playing, move to the next one. If at end, move to beginning
    const handleSongAdvance = () => {
        setUrlIndex((urlIndex + 1) % props.urls.length);
    };

    return (
        <Flex align="center" bg="teal.500" borderRadius="8px" m={8} px={8} py={4}>
            <Button mr={1} px={6} py={4} onClick={handlePlayPause} disabled={!props.isInSession}>{(isPlaying) ? "Pause" : "Play"}</Button>
            <Button ml={1} px={6} py={4} onClick={() => handleSongAdvance()} disabled={!props.isInSession}>Skip</Button>
            <ReactPlayer 
                ref={player}
                width="0"
                height="0"
                url={props.urls[urlIndex]}
                playing={isPlaying}
                onStart={handleStart}
                onProgress={handleProgress}
                onEnded={handleSongAdvance} 
            />
            <Slider
                ml={8}
                size="lg"
                min={0}
                max={1}
                step={0.001}
                defaultValue={0}
                value={songProgress}
                onChange={(num) => handleChange(num)}
            >
                <SliderTrack bg="teal.50"/>
                <SliderFilledTrack bg="teal.300"/>
                <SliderThumb />
            </Slider>
        </Flex>
    );
}