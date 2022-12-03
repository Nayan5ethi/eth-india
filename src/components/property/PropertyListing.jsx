
import { Box, Button,Flex, Heading } from "@chakra-ui/react";
import Property from "./Property";
import { Navigate, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useEffect,useContext,useState } from "react";
import { UserWalletContext } from "../../context/userWalletContext";
import web3 from 'web3';

export default function PropertyListing({ Contract }){
    const { selectedAccount } = useContext(UserWalletContext);
    const [data,setData]=useState();
    const navigate=useNavigate();
    async function getProperties()
    {
        const tokenIds = await Contract.methods.totalPropertiesListed(selectedAccount).call();  
        let dataTemp=[];
        tokenIds.map((tokenIds)=>{
            Contract.methods.tokenURI(tokenIds).call().then((url)=>{
                fetch(url)
                .then(res => res.json())
                .then(out => {  dataTemp.push(out); setData(dataTemp); console.log(dataTemp)})
            }) 
            .catch(err => { throw err });
        })
 
    }
    useEffect(()=>{
        getProperties();
    },[])
    return(

        <>
        <Box   m="5" bgcolor="red" display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center">
            <Flex m="5" boxShadow={"base"} alignItems="center" backgroundColor="white" rounded="xl" p="5" justifyContent={"space-between"} w={["100%","92%"]}>
                <Typography variant="h4" >My Assets</Typography>

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