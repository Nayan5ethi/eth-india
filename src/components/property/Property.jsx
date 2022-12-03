import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Link, Stack, Text,Flex } from "@chakra-ui/react";
import Chip from '@mui/material/Chip';

export default function Property({name,desc,imgUrl,type}){

    return(
        
        <Card
        _hover={{
            border:"1px solid black",
            cursor:"pointer",
            
        }}
        maxW='sm' bg={"white"} rounded="xl" m="5">
  <CardBody>
    <Image
      src={imgUrl}
      alt={name}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Flex justifyContent={"space-between"}><Heading size='md'>{name} </Heading>   <Chip label="primary" color="primary" /></Flex>
      <Divider/>
      <Text>
        {desc}
      </Text>
    </Stack>
  </CardBody>

</Card>
    )
}