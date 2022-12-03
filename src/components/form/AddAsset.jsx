import React, { useState, useContext } from "react";
import { Select as ReactSelect } from "chakra-react-select";
import FilePicker from "chakra-ui-file-picker";
import { Typography } from "@mui/material";
import {
    Container,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Box,
    Button,
    Flex,
    SliderMark,
    SliderTrack,
    SliderFilledTrack,
    Tooltip,
    SliderThumb,
    Slider,
    Textarea,
    Heading,
    Img,
    Center,
    Alert,
    AlertIcon,
    AlertTitle,
    InputGroup,
    InputLeftAddon,
} from "@chakra-ui/react";

import GridViewIcon from '@mui/icons-material/GridView';
import AddIcon from '@mui/icons-material/Add';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { storeFiles } from "../../web3StorageConfig";
import assetLogo from "../../assets/assetLogo.png";
import { UserWalletContext } from "../../context/userWalletContext";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";



const AddAsset = ({Contract}) => {
    const [loading, setLoading] = useState(false);
    const [response,setResponse]=useState("error")
    const [alert, setAlert] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [sliderValue, setSliderValue] = React.useState(0);
    const [showTooltip, setShowTooltip] = React.useState(false);
    const { selectedAccount } = useContext(UserWalletContext);

    let initValues = {
        name: "",
        type: null,
        count: null,
        ownershipDocument: null,
        assetImage: null,
        assetDescription: "",
        price: undefined
    };


    const schema = yup
        .object()
        .shape({
            name: yup.string().required(`Asset Name is required`),
            type: yup.object().required(`Asset Type is required`).nullable(),
            count: yup.number().required(`Please specify the Asset fragments`),
            ownershipDocument: yup.array().required(`Please add the Ownership document.`).nullable(),
            assetImage: yup.array().required(`Please add an Asset image.`).nullable(),
            assetDescription: yup.string().required('Please enter description.'),
            price: yup.number().typeError("Please provide price.").required("Please provide price.")
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        resolver: yupResolver(schema),
        defaultValues: initValues,
    });

    const onSubmit = async (values) => {
        setLoading(true)

        try{
            const document = await storeFiles(values.ownershipDocument)
            const assetImg = await storeFiles(values.assetImage)
            const metadata = {name: values.name, type:values.type.value, fragments: values.count, ownershipDocument:`https://w3s.link/ipfs/${document.cid}/${document.name}`, assetImage:`https://w3s.link/ipfs/${assetImg.cid}/${assetImg.name}` , assetDescription:values.assetDescription}
            const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })
            const files = [
                new File([blob], '0.json')
            ]
            const metadataURI = await storeFiles(files)
            const res = await Contract.methods.addProperty(values.name, "CoOwn", `https://w3s.link/ipfs/${metadataURI.cid}/${metadataURI.name}`, values.count, (values.price/values.count)*100).send({ from: selectedAccount });
            console.log(res)
            setSubmitSuccess(true)
            setResponse("success")
        }   
        catch(err) {
            console.log(err)
            console.log("returns errrorr yessssssssssssss")
            setResponse("error")
        }
        setLoading(false);
        setAlert(true)
    };

    const onError = (error) => {
        console.log("Error:::::::", error);
    };

    

    return (
        <>
         <Loader isVisible={loading}/>
        { !alert && 
        <Container maxW={'full'} p="8">
            <Box my="6" rounded="lg" display="flex" flexDir={["row"]} wrap={"nowrap"} w="100%" justifyContent="space-between" boxShadow="base" p="10">
                {/* <Heading fontWeight={"400"}>Please fill in Asset Details</Heading> */}
                <Typography variant="h4" >Please fill in Asset Details</Typography> 

                <Center><Img 
                boxSize='50px'
                objectFit='cover'
                src={assetLogo}/>
                </Center>
            </Box>
            <Box rounded="lg" boxShadow="base" p="10">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <Flex
                        gap={'8'}
                        flexDir={["column"]}
                        // align={["center"]}
                        wrap={["wrap"]}
                        justifyContent="space-around"
                    >
                        <Flex
                            gap={'8'}
                            flexDir={["column", "column", "column", "row", "row"]}
                            wrap={["wrap", "wrap", "wrap", "nowrap", "nowrap"]}
                            justifyContent="space-around"
                        >
                            <FormControl>
                                <FormLabel fontWeight={"medium"} fontSize={"1.3rem"} htmlFor="name">Name</FormLabel>
                                <Input id="name" type="text" {...register("name")} placeholder="Name" />
                                {errors && errors.name && (
                                    <FormHelperText color="red">
                                        {errors.name.message && errors.name.message}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <Controller
                                control={control}
                                name="type"
                                rules={{ required: "Please select a Type" }}
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { error }
                                }) => (
                                    <FormControl>
                                        <FormLabel fontWeight={"medium"} fontSize={"1.2rem"} htmlFor="type">Type</FormLabel>
                                        <ReactSelect
                                            id="type"
                                            {...register("type")}
                                            ref={ref}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder="Select"
                                            closeMenuOnSelect={true}
                                            options={[
                                                {
                                                    label: "Property",
                                                    value: "Property",
                                                },
                                                {
                                                    label: "Vehicles",
                                                    value: "Vehicles",
                                                },
                                            ]}
                                        />
                                        {errors && errors.type && (
                                            <FormHelperText color="red">
                                                {errors.type.message && errors.type.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />
                        </Flex>


                        


                        <Flex
                            gap={'8'}
                            flexDir={["column", "column", "column", "row", "row"]}
                            wrap={["wrap", "wrap", "wrap", "nowrap", "nowrap"]}
                            justifyContent="space-around"
                        >
                            <Controller
                                control={control}
                                name="ownershipDocument"
                                rules={{ required: "Please select a Document" }}
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { error }
                                }) => (
                                    <FormControl>
                                        <FormLabel fontWeight={"medium"} fontSize={"1.2rem"} htmlFor="ownershipDocument">Ownership Document</FormLabel>
                                        <FilePicker
                                            // ref = {register("ownershipDocument")}
                                            onFileChange={onChange}
                                            placeholder="File"
                                            clearButtonLabel="clear"
                                            multipleFiles={true}
                                            hideClearButton={false}
                                            id="ownershipDocument"
                                        />
                                        {errors && errors.ownershipDocument && (
                                            <FormHelperText color="red">
                                                {errors.ownershipDocument.message && errors.ownershipDocument.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />

                            <Controller
                                control={control}
                                name="assetImage"
                                rules={{ required: "Please select an Asset Image" }}
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { error }
                                }) => (
                                    <FormControl>
                                        <FormLabel fontWeight={"medium"} fontSize={"1.2rem"} htmlFor="assetImage">Asset Image</FormLabel>
                                        <FilePicker
                                            // ref = {register("assetImage")}
                                            onFileChange={onChange}
                                            placeholder="Image"
                                            clearButtonLabel="clear"
                                            accept="image/gif, image/jpeg, image/png"
                                            multipleFiles={true}
                                            hideClearButton={false}
                                            id="assetImage"
                                        />
                                        {errors && errors.assetImage && (
                                            <FormHelperText color="red">
                                                {errors.assetImage.message && errors.assetImage.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                )}
                            />


                        </Flex>

                        <Flex
                            gap={'8'}
                            flexDir={["column", "column", "column", "row", "row"]}
                            wrap={["wrap", "wrap", "wrap", "nowrap", "nowrap"]}
                            justifyContent="space-around"
                        >
                            <Controller
                                control={control}
                                name="count"
                                rules={{ required: "Please select count" }}
                                render={({
                                    field: { onChange, onBlur, value, name, ref },
                                    fieldState: { error }
                                }) => (
                            <FormControl>
                                <FormLabel fontWeight={"medium"} fontSize={"1.2rem"} htmlFor="count">Fragments</FormLabel>
                                <Slider
                                    id='count'
                                    defaultValue={0}
                                    min={0}
                                    max={10}
                                    colorScheme='blue'
                                    onChange={(v) => {
                                        onChange(v)
                                        setSliderValue(v)
                                    }}
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                >
                                    <SliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
                                        0
                                    </SliderMark>
                                    <SliderMark value={5} mt='1' ml='-2.5' fontSize='sm'>
                                        5
                                    </SliderMark>
                                    <SliderMark value={10} mt='1' ml='-2.5' fontSize='sm'>
                                        10
                                    </SliderMark>
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <Tooltip
                                        hasArrow
                                        bg='blue.500'
                                        color='white'
                                        placement='top'
                                        isOpen={showTooltip}
                                        label={`${sliderValue} parts`}
                                    >
                                        <SliderThumb />
                                    </Tooltip>
                                </Slider>
                                {errors && errors.count && (
                                    <FormHelperText color="red">
                                        {errors.count.message && errors.count.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            )}
                            />

                            <FormControl>
                                <FormLabel fontWeight={"medium"} fontSize={"1.3rem"} htmlFor="name">Price</FormLabel>

                                <InputGroup size='sm'>
                                    <InputLeftAddon children='ETH' />
                                    <Input id="price" type="number" {...register("price")} placeholder="Price" />
                                </InputGroup>

                                {/* <Input id="price" type="number" {...register("price")} placeholder="Price" /> */}
                                {errors && errors.price && (
                                    <FormHelperText color="red">
                                        {errors.price.message && errors.price.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Flex>

                        <Flex
                            gap={'8'}
                            flexDir={["column", "column", "column", "row", "row"]}
                            wrap={["wrap", "wrap", "wrap", "nowrap", "nowrap"]}
                            justifyContent="space-around"
                        >
                            <FormControl>
                                <FormLabel fontWeight={"medium"} fontSize={"1.2rem"} htmlFor="name">Asset Description</FormLabel>
                                <Textarea
                                    id='assetDescription'
                                    placeholder='Add asset description'
                                    size='sm'
                                    {...register("assetDescription")}
                            />
                                {errors && errors.assetDescription && (
                                    <FormHelperText color="red">
                                        {errors.assetDescription.message && errors.assetDescription.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Flex>
                        
                        <Flex
                            gap={'8'}
                            flexDir={["column", "column", "column", "row", "row"]}
                            wrap={["wrap", "wrap", "wrap", "nowrap", "nowrap"]}
                            justifyContent="space-around"
                        >
                            <Button type="submit" colorScheme="blue">
                                Create Asset
                            </Button>
                        </Flex>
                        {submitSuccess && 
                        <FormControl>
                            <FormHelperText color="green">
                                Successfully Submitted
                            </FormHelperText>
                        </FormControl>}
                    </Flex>
                </form>

            </Box>
        </Container>
}

{ alert && 
    <Flex mt="4" flexDir={"column"}>

        <Flex pb="4" justifyContent={"space-evenly"} alignItems="center" w={"100%"}>
            <Button
                as={Link}
                to="/"
                size='sm' leftIcon={<GridViewIcon />} colorScheme='blue' variant='solid'>
                Return to Dashboard
            </Button>
            <Button onClick={()=>{
                setAlert(false)
            }}
                size='sm' 
                as={Link}
                to="/add"
                leftIcon={<AddIcon />} colorScheme={response==="success"?"blue":"red"} variant='solid'>
                {response==="success"?"Add more assets":"Try again"}
            </Button>
        </Flex>

   
        <Alert
            status={response==="success"?"success":"error"}
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
            {response==="success"?"Successfully Submitted":"Failed to Add Asset. Please try again."}
            </AlertTitle>
    
        </Alert>
    </Flex>
}   
        </>
    );
};

export default AddAsset;