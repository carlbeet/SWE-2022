import { Box, Container, Flex } from "@chakra-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import AddNewPost from "./add-new-post";

const Navbar = () => {
  return (
    <>
      <div class="topnav">
        <a class="active" href="http://localhost:3000">Home</a>
        <a href="http://localhost:3001">Comment</a>
        <a href="http://localhost:3002">Messaging</a>
        <a href="">About</a>
      </div>
      <Box position="sticky" top={0} p={4} bg="gray.100" zIndex={1}>
        <Container maxW="md" centerContent>
          <Flex justifyContent="flex-end" w="100%" position="sticky" top={0}>
            <AddNewPost />
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
