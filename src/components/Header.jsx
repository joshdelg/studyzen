import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/core";

export default function Header(props) {
    return (
        <Flex bg="teal.500" color="white" px={8} py={4} justify="space-between" align="center">
            <Heading letterSpacing="0.25rem">StudyZen</Heading>
            <Text fontSize="xl">Hello, Josh</Text>
        </Flex>
    )
}