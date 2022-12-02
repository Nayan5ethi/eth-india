import { Box, Button,Flex, Heading, useColorModeValue, Stack, Divider, Img } from "@chakra-ui/react";
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
        <Heading>ASddasds</Heading>
        <Divider/>
        </Stack >
        <img>

        </img>
    </Flex >

    )
}