import React, { useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    InputRightAddon,
    InputGroup,
    Alert,
    AlertIcon,
    AlertDescription,
    FormHelperText,
    Textarea,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import FileUpload from '../components/FileUpload';

const StudentForm = () => {

    const { handleSubmit, register, formState: { isSubmitting, errors } } = useForm({
        mode: "onChange"
    })
    const [error, setError] = useState("");

    async function onSubmit(data) {
        console.log(
            // data.minimumContribution,
            // data.Issued by,
            // data.description,
            // data.UUID,
            // data.target
        );
    }

    return (
        <>
            <main>
                <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6} my={20}>
                    <Text fontSize={"lg"} color={"teal.400"}>
                        <ArrowBackIcon mr={2} />
                        <Link to="/is-not-registered">Back to Home</Link>
                    </Text>

                    <Stack>
                        <Heading fontSize={"4xl"}>Register as a Student 👨‍🎓👩‍🎓</Heading>
                    </Stack>

                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>


                                <FormControl id="student_name">
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        {...register("student_name", { required: true })}
                                        isDisabled={isSubmitting}
                                    />
                                </FormControl>


                                {error ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertDescription mr={2}> {error}</AlertDescription>
                                    </Alert>
                                ) : null}

                                {errors.student_name ? (
                                    <Alert status="error">
                                        <AlertIcon />
                                        <AlertDescription mr={2}>
                                            {" "}
                                            All Fields are Required
                                        </AlertDescription>
                                    </Alert>
                                ) : null}

                                <Stack spacing={10}>

                                    {/* conditional rendering if wallet is  connected will come here */}
                                    <Stack spacing={3}>
                                        <Button
                                            color={"white"}
                                            bg={"teal.400"}
                                            _hover={{
                                                bg: "teal.300",
                                            }}
                                            onClick={
                                                // () => wallet.connect()
                                                console.log("Hello")
                                            }
                                        >
                                            Submit{" "}
                                        </Button>
                                        <Alert status="warning">
                                            <AlertIcon />
                                            <AlertDescription mr={2}>
                                                Please Connect Your Wallet First to Register
                                            </AlertDescription>
                                        </Alert>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </main>
        </>
    )
}

export default StudentForm