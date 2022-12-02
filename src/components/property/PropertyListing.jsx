
import { Box, Button,Flex, Heading } from "@chakra-ui/react";
import Property from "./Property";

export default function PropertyListing(){


    return(


        <>
        <Box   m="5" bgcolor="red" display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center">
            <Flex m="5" boxShadow={"base"} alignItems="center" backgroundColor="white" rounded="xl" p="5" justifyContent={"space-between"} w={["100%","60%"]}>
            <Heading>Your Properties</Heading>
                <Button colorScheme={"blue"}>
                    Add property
                </Button>
            
            </Flex>
            <Flex flexDirection={["column","row"]} flexWrap="wrap" justifyContent={"center"} alignItems="center">
            <Property/>
            <Property/>
            <Property/>
            <Property/>
            <Property/>
            </Flex>
        </Box>
        </>
    )
}