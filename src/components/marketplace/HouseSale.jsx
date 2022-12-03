
import { Box, Button,Flex, Heading } from "@chakra-ui/react";
import Property from "../property/Property";
import { Navigate, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export default function HouseSale(){
const navigate=useNavigate();

    return(

        <>
        <Box   m="5" bgcolor="red" display={"flex"} flexDirection="column" justifyjContent={"center"} alignItems="center">
            <Flex m="5"  boxShadow={"base"} justifyContent="center" alignItems="center" backgroundColor="white" rounded="xl" p="5"  w={["100%","60%"]}>
            <Heading >Houses for Sale</Heading>
               
            
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