
import { Box, Button,Flex, Heading } from "@chakra-ui/react";
import Property from "./Property";
import { Navigate, useNavigate } from "react-router-dom";
export default function PropertyListing(){
const navigate=useNavigate();

    return(


        <>
        <Box   m="5" bgcolor="red" display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center">
            <Flex m="5" boxShadow={"base"} alignItems="center" backgroundColor="white" rounded="xl" p="5" justifyContent={"space-between"} w={["100%","60%"]}>
            <Heading>My Assets</Heading>
                <Button onClick={()=>{
                    navigate("add")
                }} colorScheme={"blue"}>
                    Add assets
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