
import { Box, Button,Flex, Heading } from "@chakra-ui/react";
import Property from "../property/Property";
import { Navigate, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import Loader from "../loader/Loader";
import { UserWalletContext } from "../../context/userWalletContext";

export default function HouseSale({Contract}){
    const { selectedAccount } = useContext(UserWalletContext);
    const [loading,setLoading]=useState(false);
    const [data,setData]=useState(null);
    async function getProperties()
    {
        try{

            setLoading(true);
            const tokenIdCount = await Contract.methods.count().call();
            let dataTemp = [];
            console.log(tokenIdCount);
            if(tokenIdCount<=0)
            {
                setLoading(false);
            }
            for(let tokenIds = 1; tokenIds <=tokenIdCount; tokenIds++ ) {
                const propertyData =  await Contract.methods.Properties(tokenIds).call()
                dataTemp.push(propertyData)
                console.log(dataTemp);
            }
            setLoading(false);
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
 
    }
    useEffect(()=>{
        getProperties()

    },[])
const navigate=useNavigate();

    return(

        <>
        <Loader isVisible={loading} />
        <Box   m="5" bgcolor="red" display={"flex"} flexDirection="column" justifyjContent={"center"} alignItems="center">
            <Flex m="5"  boxShadow={"base"} justifyContent="center" alignItems="center" backgroundColor="white" rounded="xl" p="5"  w={["100%","60%"]}>
            <Heading >Houses for Sale</Heading>
               
            
            </Flex>
            <Flex flexDirection={["column","row"]} flexWrap="wrap" justifyContent={"center"} alignItems="center">
            <Property sale={true}/>
            <Property sale={true}/>
            <Property sale={true}/>
            <Property sale={true}/>
            <Property sale={true}/>
            </Flex>
        </Box>
        </>
    )
}