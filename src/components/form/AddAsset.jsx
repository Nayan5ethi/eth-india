import React, { useEffect, useState, useContext } from "react";
import { Select as ReactSelect } from "chakra-react-select";
import FilePicker from "chakra-ui-file-picker";
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
    AlertDescription
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
        assetDescription: ""
    };


    const schema = yup
        .object()
        .shape({
            name: yup.string().required(`Asset Name is required`),
            type: yup.object().required(`Asset Type is required`).nullable(),
            count: yup.number().required(`Please specify the asset count`),
            ownershipDocument: yup.array().required(`Please select the ownership document.`).nullable(),
            assetImage: yup.array().required(`Please select an Asset Image.`).nullable(),
            assetDescription: yup.string().required('Please enter some additional asset description.')
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
       try{
            setLoading(true)
            console.log(values)
            console.log(Contract)
            const document = await storeFiles(values.ownershipDocument)
            const symbol = await storeFiles(values.assetImage)
            console.log(values.name, symbol.cid, document.cid, 1633, values.count)
            console.log(selectedAccount)
            const res = await Contract.methods.addProperty(values.name, symbol.cid, document.cid, 10020202, values.count).send({ from: selectedAccount });
            console.log(res)
            setSubmitSuccess(true)
            setResponse("success")
        }   
        catch(err) {
            console.log(err)
            console.log("returns errrorr yessssssssssssss")
            setResponse("error")
        }
        finally{
            console.log("finally block running")
            setLoading(false);
            setAlert(true)
        }
    };

    const onError = (error) => {
        console.log("Error:::::::", error);
    };

    

    return (
        <>
         <Loader isVisible={loading}/>
        { !alert && 
        <Container maxW={'full'} p="8">
            <Box rounded="lg" display="flex" flexDir={["row"]} wrap={"nowrap"} w="100%" justifyContent="space-between" boxShadow="base" p="10">
                <Heading>Please fill in Asset Details</Heading>
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
                                    max={100}
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
                                    <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                                        25
                                    </SliderMark>
                                    <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                                        50
                                    </SliderMark>
                                    <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
                                        75
                                    </SliderMark>
                                    <SliderMark value={100} mt='1' ml='-2.5' fontSize='sm'>
                                        100
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
            <Button 
                onClick={setAlert(false)}
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