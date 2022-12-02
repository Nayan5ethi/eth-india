import React, { useEffect, useState } from "react";
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
    Slider
} from "@chakra-ui/react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";



const AddAsset = () => {
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [sliderValue, setSliderValue] = React.useState(0)
    const [showTooltip, setShowTooltip] = React.useState(false)

    useEffect(() => {
    }, []);

    let initValues = {
        name: "",
        type: null,
        count: "",
        ownershipDocument: null
    };


    const schema = yup
        .object()
        .shape({
            name: yup.string().required(`Asset Name is required`),
            type: yup.object().required(`Asset Type is required`).nullable(),
            count: yup.string().required(`Please specify the asset count`),
            ownershipDocument: yup.array().required(`Please select the ownership document`).nullable()
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
        console.log(values)
    };

    const onError = (error) => {
        console.log("Error:::::::", error);
    };


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
                        <Flex
                            gap={'4'}
                            flexDir={["column", "column", "column", "row", "row"]}
                            wrap={["wrap", "wrap", "wrap", "nowrap", "nowrap"]}
                            justifyContent="space-around"
                        >
                            <FormControl>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Input id="name" type="text" {...register("name")} />
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
                                        <FormLabel htmlFor="type">Type</FormLabel>
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
                            gap={'4'}
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
                                <FormLabel htmlFor="count">Count</FormLabel>
                                <Slider
                                    id='count'
                                    defaultValue={0}
                                    min={0}
                                    max={100}
                                    colorScheme='teal'
                                    onChange={(v) => {
                                        onChange(v)
                                        setSliderValue(v)
                                    }}
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                >
                                    <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
                                        25
                                    </SliderMark>
                                    <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
                                        50
                                    </SliderMark>
                                    <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
                                        75
                                    </SliderMark>
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <Tooltip
                                        hasArrow
                                        bg='teal.500'
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
                            gap={'4'}
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
                                        <FormLabel htmlFor="ownershipDocument">Ownership Document</FormLabel>
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
                        </Flex>
                    </Flex>

                </form>}

            </Box>
        </Container>
    );
};

export default AddAsset;