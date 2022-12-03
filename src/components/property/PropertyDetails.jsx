import { Box, Button,Flex, Heading, useColorModeValue, Stack, Divider, Img, Image } from "@chakra-ui/react";
export default function  PropertyDetails(){

    return(
        <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        direction="column"
        bg={useColorModeValue("gray.50", "gray.800")}
    >
        <Stack textAlign={"center"} w="100%" bg="white" spacing={4} mx={"auto"} maxW={"lg"} py={2} px={6}>
        <Heading>Property Information</Heading>
        <Divider/>
        </Stack >
        <Image
        w={"450px"}
        h="450px"
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    </Flex >

    )
}