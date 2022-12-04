import { Center, useEditable ,Flex, useFormControlStyles} from "@chakra-ui/react";
import {Button, Paper} from "@mui/material";
import TextField from '@mui/material/TextField';
import { Box } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react"; 
import {useEffect, useState, useContext} from "react";   
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Colors } from 'chart.js';
import { Pie, } from 'react-chartjs-2';     
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
 import { Typography } from "@mui/material";
 import { UserWalletContext } from "../../context/userWalletContext";
import { useParams } from "react-router-dom";

const TransferOwnership=({Contract})=>{
    const { id,fragments } = useParams();

    const [maxTokens,setMaxTokens]=useState(fragments);
    ChartJS.register(ArcElement, Tooltip, Legend, Colors);
    
    const { selectedAccount } = useContext(UserWalletContext);
    const [data,setData]=useState([]);
    const [labels,setLabels]=useState([]);
    const [formFields, setFormFields] = useState([
        { receiverAddress: '', tokens: '' },
    ])
    const [myTok,setMyTok]=useState();
    const handleFormChange = (event, index,x) => {
        let data = [...formFields];
        data[index][x] = event.target.value;
        setFormFields(data);
        let label=[]
        let token=[]
        let s=0;
        formFields.forEach((e)=>{
            label.push(e.receiverAddress)
            token.push(e.tokens)
            s+=parseInt(e.tokens);
        })
        label.push("My tokens");
        token.push(maxTokens-s);
        setMyTok(maxTokens-s);

        setLabels(label)
        setData(token)
    }
   
    const submit = async (e) => {
        if(myTok<0)
        {
            e.preventDefault();
            let walletAddress = formFields.map(({ receiverAddress }) => receiverAddress)
            let tokens = formFields.map(({ tokens }) => tokens)
            console.log(walletAddress, tokens)
            const res = await Contract.methods.transferFractionInBatch(id, walletAddress, tokens).send({ from: selectedAccount });
            console.log(res)
        }
        else{
            
        }
        
    }

    const addFields = () => {
        let object = { receiverAddress: '', tokens: '' }
        setFormFields([...formFields, object])
    }
    const options = {
        responsive: true,
        plugins: {
            colors: {
                enabled: true
            },

        
            legend: {
                position: 'bottom' ,
            },
            title: {
                display: true,
                text: 'Type of Visitors',
            },
        },
    };
    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1);
        console.log(data)
        setFormFields([]);
        setFormFields(data);
        let label = []
        let token = []
        let s = 0;
        data.forEach((e) => {
            label.push(e.receiverAddress)
            token.push(e.tokens)
            s += parseInt(e.tokens);
        })
        label.push("My tokens");
        token.push(maxTokens - s);
        setMyTok(maxTokens-s);

        console.log(label)
        console.log(token   )
        setLabels(label);
        setData(token);
    }
    let dataset = {
        title: "Type of Visitors",
        labels: labels,
        datasets: [
            {

                data: data,
                borderWidth: 1,
            },

        ],
    };

    return (
        <Card boxShadow="base" bgColor="white.1000" p="2">
            <Flex m="5" boxShadow={"base"} alignItems="center" backgroundColor="white" rounded="xl" p="5" justifyContent={"space-between"} w={["100%", "92%"]}>
                <Typography variant="h4" >Transfer Properties</Typography>
                <Button variant="contained" onClick={addFields} colorScheme={"blue"}>
                    Add Beneficiaries
                </Button>

            </Flex>
           
            <br />
            <form onSubmit={submit}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "2%", padding: "2%" }}>
                {formFields.map((ele, index) => {
                    return (
                        <Center w={["100%"]}>
                            <Card w={["100%", "50%"]} bg={"white"} boxShadow="base" rounded="xl" m="5" key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "2%", padding: "2%" }}>
                                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                    <IconButton aria-label="delete" onClick={() => removeFields(index)}>
                                        <DeleteIcon />
                                    </IconButton>  

                                </div>
                                <TextField
                                    sx={{ m: 2 }}
                                    placeholder='Receivers address'
                                    label="Receivers address"
                                    onChange={event => handleFormChange(event, index, "receiverAddress")}
                                    value={ele?.receiverAddress}
                                />
                                <TextField
                                    placeholder='Tokens'
                                    sx={{ m: 2 }}
                                    label="Tokens"
                                    type="number"
                                    onChange={event => handleFormChange(event, index, "tokens")}
                                    value={ele?.tokens}
                                />
                            </Card>
                        </Center>                      
                    )
                })}
            </div>

            </form>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" sx={{mr:10}} onClick={submit}>Submit</Button>
            </div>
            <Center w="100%">
                <Box maxW="400px">
                <Pie  redraw options={options} data={dataset} />
                </Box>
            </Center>

        </Card> 
    );}
export default TransferOwnership; 