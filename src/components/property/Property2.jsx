import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Link, Stack, Text, Flex } from "@chakra-ui/react";
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router-dom";
export default function Property({ name, desc, imgUrl, type, id, ownershipDocument, fragments,flag }) {
    const navigate = useNavigate();
    console.log(flag)
    return (
        !flag && <Card
            _hover={{
                border: "1px solid black",
                cursor: "pointer",

            }}
            maxW='sm' bg={"white"} rounded="xl" m="5">
            <CardBody>
                <Image
                    src={imgUrl}
                    alt={name}
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Flex justifyContent={"space-between"}><Heading size='md'>{name} </Heading>   <Chip label={type} color="primary" /></Flex>
                    <Divider />
                    <Text>
                        {desc}
                    </Text>
                </Stack>
            </CardBody>
            <Divider/>
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue' onClick={() => { navigate(`/transfer/${id}/${fragments}`)}}>
                        Transfer Stakes
                    </Button>
                    <Button variant='ghost' colorScheme='blue' onClick={() => { window.open(ownershipDocument); }} >
                        View Ownership Document
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}