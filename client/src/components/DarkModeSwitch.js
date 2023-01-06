import React from 'react';
import { useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const DarkModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return <IconButton aria-label="Toggle Dark Switch"
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}></IconButton>;
};

export default DarkModeSwitch;
