import React, { useEffect, useState } from "react";
import {
    Container,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Box,
    Button,
    NumberInput,
    NumberInputField,
    Flex,
    Center,
    Image,
} from "@chakra-ui/react";



import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";



const AddAsset = () => {
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
    }, []);




    let initValues = {
        name: "",
        type: "",
        count: "",
        ownershipDocument: ""
    };


    const schema = yup
        .object()
        .shape({
            name: yup.string().required(`Asset Name is required`),
            type: yup.string().required(`Asset Type is required`),
            count: yup.string().required(`Please specify the asset count`),
            ownershipDocument: yup.string().required(`Please select the ownership document`)
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

    };

    const onError = (error) => {
        console.log("Error:::::::", error);
    };

    const [image, setImage] = useState("https://img.icons8.com/ios/100/000000/gender-neutral-user.png")
    const [file, setFile] = useState("")

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          setImage(URL.createObjectURL(event.target.files[0]));
         setFile(event.target.files[0]);
          console.log("i am running");
        }
       }



    return (
        <Container maxW={'full'} p="4" fontSize={'18px'}>
            <Box rounded="lg" boxShadow="base" p="4">
                {!submitSuccess && <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <Flex
                        gap={'4'}
                        flexDir={["column"]}
                        // align={["center"]}
                        wrap={["wrap"]}
                        justifyContent="space-around"
                    >


                        <Center border="1px" borderColor="black" m="1" p="2" borderRadius="20px">
                                    <Image src={image}></Image>
                                </Center>
                                
                                < label htmlFor='inputTag'>
                                <Center>
                        <img src='https://img.icons8.com/material-rounded/48/000000/camera--v2.png'></img>
                        </Center>
                        <Input required onChange={onImageChange} style={{display:'none'}} id="inputTag" accept='image/*' capture  type="file"/>
                        </label>
                        <Flex
                            gap={'4'}
                            flexDir={["column", "column", "column", "row", "row"]}
                            wrap={["wrap", "wrap", "wrap", "nowrap", "nowrap"]}
                            justifyContent="space-around"
                        >
                            <FormControl>
                                <FormLabel htmlFor="firstName">First Name</FormLabel>
                                <Input id="firstName" type="text" {...register("firstName")} />
                                {errors && errors.firstName && (
                                    <FormHelperText color="red">
                                        {errors.firstName.message && errors.firstName.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="lasttName">Last Name</FormLabel>
                                <Input id="lastName" type="text" {...register("lastName")} />
                                {errors && errors.lastName && (
                                    <FormHelperText color="red">
                                        {errors.lastName.message && errors.lastName.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Flex>

                        {/* Number and Email */}
                        <Flex
                            gap={'4'}
                            flexDir={["column", "column", "column", "row", "row"]}
                            wrap={["wrap", "wrap", "wrap", "nowrap", "nowrap"]}
                            justifyContent="space-around"
                        >
                            <FormControl>
                                <FormLabel htmlFor="email">Email address</FormLabel>
                                <Input id="email" type="email" {...register("email")} />
                                {errors && errors.email && (
                                    <FormHelperText color="red">
                                        {errors.email.message && errors.email.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
                                <Controller
                                    name={"mobileNumber"}
                                    control={control}
                                    render={({ field: { ref, ...restField } }) => (
                                        <NumberInput ref={ref} {...restField} >
                                            <NumberInputField name={restField.name} placeholder="enter mobile number" maxLength={10} minLength={10} />
                                        </NumberInput>
                                    )} />
                                {errors && errors.mobileNumber && (
                                    <FormHelperText color="red">
                                        {errors.mobileNumber.message && errors.mobileNumber.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Flex>


                        <Flex
                            gap={'4'}
                            flexDir={["column", "column", "column", "row", "row"]}
                            wrap={["wrap", "wrap", "wrap", "nowrap", "nowrap"]}
                            justifyContent="space-around"
                        >
                            <Button type="submit" colorScheme="blue">
                                Submit
                            </Button>

                            <Button type="button" onClick={() => navigate(-1)} colorScheme="red">
                                Cancel
                            </Button>
                        </Flex>
                    </Flex>

                </form>}

            </Box>
        </Container>
    );
};

export default AddAsset;