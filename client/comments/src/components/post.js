import { Box, HStack, Text, Heading} from "@chakra-ui/core";
import React from "react";
import VoteButtons from "./vote-buttons";

const Post = ({ post }) => {
  return (
    <HStack key={post.id} w="100%" alignItems="flex-start">
      <VoteButtons post={post} />
      <Box bg="gray.100" p={4} rounded="md" w="100%">
        <Heading fontSize="25px">{post.title}</Heading>
		<Text fontSize="15px">{post.content}</Text>
      </Box>
    </HStack>
  );
};

export default Post;
