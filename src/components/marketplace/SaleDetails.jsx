import { Box, Button, Flex, Heading, useColorModeValue, Stack, Divider, Img, Image, Grid, GridItem, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Collapse, NumberInput, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInputField, Text } from "@chakra-ui/react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { FormControl, Input } from "@mui/material";
import { Label } from "recharts";
export default function SaleDetails() {

    const [document, setDocument] = useState(false)
    const [transfer, setTransfer] = useState(false)
function handleSubmit(){


}
    return (

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
                    <Divider />

                    <Image
                        w={"450px"}
                        h="450px"
                        src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                    <Grid  p="2"
                        rounded={"20px"}
                        fontWeight={"bold"} templateColumns={"50% 50%"} justifyContent="center" alignItems={"center"}>
                        <GridItem bg={"teal.100"
                        } border={"1px solid gray"} p="1" rounded="10px" m="1">Name of Asset  </GridItem>
                        <GridItem bg={"ThreeDFace"} p="1" rounded="10px"> Test </GridItem>
                        <GridItem bg={"teal.100"
                        } border={"1px solid gray"} p="1" rounded="10px" m="1">Ownership % </GridItem>
                        <GridItem bg={"ThreeDFace"} p="1" rounded="10px"> Test </GridItem>
                        <GridItem bg={"teal.100"
                        } border={"1px solid gray"} p="1" rounded="10px" m="1">Asset Type  </GridItem>
                        <GridItem bg={"ThreeDFace"} p="1" rounded="10px"> Test </GridItem>
                        <GridItem bg={"teal.100"
                        } border={"1px solid gray"} p="1" rounded="10px" m="1">Ownership Document  </GridItem>
                        <GridItem bg={"ThreeDFace"} p="1" rounded="10px"><IconButton onClick={() => {
                            setDocument(true)
                        }} color={"green.400"} icon={<RemoveRedEyeIcon />} /> </GridItem>
                         <GridItem bg={"teal.100"
                        } border={"1px solid gray"} p="1" rounded="10px" m="1">Total fragments  </GridItem>
                        <GridItem bg={"ThreeDFace"} p="1" rounded="10px"> Test </GridItem>
                        <GridItem bg={"teal.100"
                        } border={"1px solid gray"} p="1" rounded="10px" m="1">Available assets  </GridItem>
                        <GridItem bg={"ThreeDFace"} p="1" rounded="10px"> Test </GridItem>

                    </Grid>
                    <Button onClick={() => {
                        setTransfer(!transfer)
                    }} colorScheme={"blue"}>Buy Asset <ArrowDropDownIcon /> </Button>
                    <Collapse in={transfer} animateOpacity>
                        <Box
                            p='40px'
                            border={"1px solid black"}
                            mt='4'
                            
                            rounded='md'
                            shadow='md'
                        >
                            <form>
                                
                                <FormControl required>
                                    <Stack gap={"10px"}>
<label style={{
    fontWeight:900
}} color="black">Number of Fragments </label>
<NumberInput defaultValue={1}  max={20}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
<label style={{
    fontWeight:900
}}>Price in Ethereum</label>
<Text bg={"purple.100"} rounded="40px" p="2" >1400 ETH</Text>
<Button onClick={handleSubmit} colorScheme={"cyan"}>Buy</Button>
</Stack>

                                </FormControl>
                            </form>
                    

                        </Box>
                    </Collapse>
                </Stack >
            </Flex >
            <Modal size={"xl"} onClose={() => {
                setDocument(false)
            }} isOpen={document} isCentered>
                <ModalOverlay />
                <ModalContent w="100%" height={"80%"}>
                    <ModalHeader>Ownership Document</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <iframe src="https://bafybeiaxbb7ur7mkzdoplnp7mga46kzm5v7tvpxpjplw7r2ajwvhqfq6zm.ipfs.w3s.link/NayanSethiResume.pdf" width={"100%"} height={"100%"} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            setDocument(false)
                        }}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}