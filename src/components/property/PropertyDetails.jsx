import { Box, Button,Flex, Heading, useColorModeValue, Stack, Divider, Img, Image, Grid, GridItem, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Collapse } from "@chakra-ui/react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
export default function  PropertyDetails(){
    
const [document,setDocument]=useState(false)
const [transfer,setTransfer]=useState(false)
    return(
     <>
        <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        direction="column"
        bg={useColorModeValue("gray.50", "gray.800")}
    >
        <Stack textAlign={"center"} w="100%" bg="white" spacing={4} mx={"auto"} maxW={"lg"} py={2} px={6}>
        <Heading>Asset Information</Heading>
        <Divider/>
    
        <Image
        w={"450px"}
        h="450px"
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
<Grid border={"1px solid gray"} p="2"
    rounded={"20px"}
fontWeight={"bold"} templateColumns={"50% 50%"} justifyContent="center" alignItems={"center"}>
    <GridItem bg={"teal.100" 
    } border={"1px solid gray"} p="1"  rounded="10px" m="1">Name of Asset  </GridItem>
    <GridItem bg={"ThreeDFace"}  p="1" rounded="10px"> Test </GridItem>
    <GridItem bg={"teal.100" 
    } border={"1px solid gray"} p="1"  rounded="10px" m="1">Ownership % </GridItem>
    <GridItem bg={"ThreeDFace"}  p="1" rounded="10px"> Test </GridItem>
    <GridItem bg={"teal.100" 
    } border={"1px solid gray"} p="1"  rounded="10px" m="1">Asset Type  </GridItem>
    <GridItem bg={"ThreeDFace"}  p="1" rounded="10px"> Test </GridItem>
    <GridItem bg={"teal.100" 
    } border={"1px solid gray"} p="1"  rounded="10px" m="1">Ownership Document  </GridItem>
    <GridItem bg={"ThreeDFace"}  p="1" rounded="10px"><IconButton onClick={()=>{
        setDocument(true)
    }} color={"green.400"} icon={<RemoveRedEyeIcon/> } /> </GridItem>
</Grid>
<Button onClick={()=>{
    setTransfer(!transfer)
}} colorScheme={"blue"}>Transfer Asset <ArrowDropDownIcon/> </Button>
<Collapse in={transfer} animateOpacity>
        <Box
          p='40px'
          color='white'
          mt='4'
          bg='teal.500'
          rounded='md'
          shadow='md'
        >

        </Box>
      </Collapse>
        </Stack >
    </Flex >
     <Modal size={"xl"} onClose={()=>{
        setDocument(false)
     }} isOpen={document} isCentered>
     <ModalOverlay />
     <ModalContent w="100%" height={"80%"}>
       <ModalHeader>Ownership Document</ModalHeader>
       <ModalCloseButton />
       <ModalBody>
         <iframe src="https://bafybeiaxbb7ur7mkzdoplnp7mga46kzm5v7tvpxpjplw7r2ajwvhqfq6zm.ipfs.w3s.link/NayanSethiResume.pdf" width={"100%"} height={"100%"}/>
       </ModalBody>
       <ModalFooter>
         <Button onClick={()=>{
        setDocument(false)
     }}>Close</Button>
       </ModalFooter>
     </ModalContent>
   </Modal>
    </>

    )
}