import React, { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FileUpload from "../components/FileUpload";
import { useMetamask } from "../hooks/useMetamask";
import { useClient } from "../hooks/useClient";
const IssuerForm = () => {
  const { client } = useClient();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
  });
  const [error, setError] = useState("");
  const { isConnected } = useMetamask();
  const navigate = useNavigate();

  async function onSubmit(data) {
    client.registerIssuer(data.issuer_name).then(() => navigate("/"));
    // console.log(
    //     data
    // );
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
            <Heading fontSize={"4xl"}>Register as a issuer 🏫</Heading>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="issuer_name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    {...register("issuer_name", { required: true })}
                    isDisabled={isSubmitting}
                  />
                </FormControl>

                {error ? (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription mr={2}> {error}</AlertDescription>
                  </Alert>
                ) : null}

                {errors.issuer_name ? (
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
                  {isConnected ? (
                    <Stack spacing={3}>
                      <Button
                        color={"white"}
                        bg={"teal.400"}
                        _hover={{
                          bg: "teal.300",
                        }}
                        type={"submit"}
                      >
                        Submit{" "}
                      </Button>
                    </Stack>
                  ) : (
                    <Alert status="warning">
                      <AlertIcon />
                      <AlertDescription mr={2}>
                        Please Connect Your Wallet First to Register
                      </AlertDescription>
                    </Alert>
                  )}
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </main>
    </>
  );
};

export default IssuerForm;
