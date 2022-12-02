import { Button,Container,Box,ButtonBaseClasses } from "@mui/material";
import Property from "./Property";

export default function PropertyListing(){


    return(


        <>
        <Box width={"100%"} bgcolor="red" display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center">

            <Box margin="10px"> 
                <Button>
                    Add property
                </Button>
            </Box>
            <Property/>
        </Box>
        </>
    )
}