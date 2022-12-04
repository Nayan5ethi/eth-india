import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Link, Stack, Text,Flex } from "@chakra-ui/react";
import Chip from '@mui/material/Chip';

export default function Property({name,desc,imgUrl,type,price,sale }){

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
            
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{name}</Heading>
            <Text>
             {desc}
            </Text>
            {sale && <Text color='blue.600' fontSize='2xl'>
              {price} ETH
            </Text>
}
          </Stack>
        </CardBody>
        <Divider />
        {sale && <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              Buy now
            </Button>
    
          </ButtonGroup>
        </CardFooter>
}
      </Card>
)}
