
import { Box, Button,Flex, Heading } from "@chakra-ui/react";
import Property2 from "./Property2";
import { Navigate, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useEffect,useContext,useState } from "react";
import { UserWalletContext } from "../../context/userWalletContext";
import web3 from 'web3';
import Loader from "../loader/Loader";


export default function PropertyListing({ Contract }){
    const { selectedAccount } = useContext(UserWalletContext);
    const [loading,setLoading]=useState(false);
    const [data,setData]=useState(null);
    const navigate=useNavigate();
    async function getProperties()
    {
        try{

            setLoading(true);
            const tokenIds = await Contract.methods.totalPropertiesListed(selectedAccount).call();
            let dataTemp = [];
            console.log(tokenIds);
            if(tokenIds)
            tokenIds.map((tokenIds,idx) => {
                Contract.methods.tokenURI(tokenIds).call().then((url) => {
                    fetch(url)
                        .then(res => res.json())
                        .then(out => { out.tokenId = tokenIds; dataTemp.push(out); setData(dataTemp);  if (idx == tokenIds.length-1){setLoading(false)} })
                }) 
                .catch(err => { throw err });
            })
        }
        catch(err){
            console.log(err);
            setLoading(false);
        }
        
 
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
            {
                data?
                <Flex flexDirection={["column","row"]} flexWrap="wrap" justifyContent={"center"} alignItems="center">
                    {data.map((ele) => <Property2 name={ele.name} desc={ele.assetDescription} imgUrl={ele.assetImage} type={ele.type} id={ele.tokenId} ownershipDocument={ele.ownershipDocument} fragments={ele.fragments}/>)}
                </Flex>:""
            }
        </Box>
        <Loader isVisible={loading} />

        </>
    )
}