import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
  useDisclosure,
} from "@chakra-ui/core";
import React, { useState } from "react";
import db from "../lib/firebase";

const AddNewPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isSaving, setSaving] = useState(false);

  const handleSubmit = async () => {
    setSaving(true);

    const date = new Date();
    const author = Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')))['username'];

    await db.collection("posts").add({
      title,
      content,
      author,
      upVotesCount: 0,
      downVotesCount: 0,
      createdAt: date.toUTCString(),
      updatedAt: date.toUTCString(),
    });

    onClose();
    setTitle("");
    setContent("");
    setAuthor("");
    setSaving(false);
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Add new post
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Add new post</ModalHeader>
            <ModalCloseButton /
>            <ModalBody>
              <FormControl id="post-title">
                <FormLabel>Post title</FormLabel>
                <Textarea
                  type="post-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
            </ModalBody>

          <ModalContent>
            <ModalBody>
              <FormControl id="post-content">
                <FormLabel>Post content</FormLabel>
                <Textarea
                type="post-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            </ModalContent>

            <ModalFooter>
              <HStack spacing={2}>
                <Button onClick={onClose}>Close</Button>
                <Button
                  onClick={handleSubmit}
                  colorScheme="blue"
                  disabled={!title.trim()}
                  isLoading={isSaving}
                >
                  Save
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};

export default AddNewPost;
