import React, { useState } from "react";
import { Stack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
        useDisclosure, FormControl, FormLabel, Input, Select } from "@chakra-ui/core";
import Subject from "./Subject";

export default function SubjectList(props) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Modal form state
    const [name, setName] = useState("");
    const [subjectType, setSubjectType] = useState("math");

    const addNewClass = (e) => {
        props.add(name, subjectType);
        setName("");
        setSubjectType("math");
        onClose();
    }

    return (
        <>
            <Stack spacing={4}>
                {props.subjects && props.subjects.map((s, i) => (
                    <Subject
                        key={i}
                        delete={props.delete}
                        edit={props.edit}
                        s={s}
                        i={i}
                        studySubject={props.studySubject}
                        stopStudy={props.stopStudy}
                        isInSession={props.isInSession}/>
                ))}
            <Button w="12.5%" onClick={onOpen}>+ Add Class</Button>
            </Stack>
            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a new class</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form>
                            <FormControl m={6}>
                                <FormLabel htmlFor="name">Class Name</FormLabel>
                                <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                            </FormControl>
                            <FormControl m={6}>
                                <FormLabel htmlFor="subject">Subject Type</FormLabel>
                                <Select id="subject" value={subjectType} onChange={(e) => setSubjectType(e.target.value)}>
                                    <option value="math">Math</option>
                                    <option value="humanities">Humanities</option>
                                    <option value="science">Science</option>
                                    <option value="art">Art</option>
                                </Select>
                            </FormControl>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={addNewClass}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}