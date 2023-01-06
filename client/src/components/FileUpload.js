import { Input, FormControl, FormLabel, InputGroup, InputLeftElement, FormErrorMessage, Icon } from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { useController } from "react-hook-form";
import { useRef } from "react";

export const FileUpload = ({ name, placeholder, acceptedFileTypes, control, children, isRequired = false }) => {
    const inputRef = useRef();
    const {
        field: { ref, onChange, value, ...inputProps },
        fieldState: { invalid, isTouched, isDirty },
    } = useController({
        name,
        control,
        rules: { required: isRequired },
    });

    return (
        <FormControl isInvalid={invalid} isRequired>
            <FormLabel htmlFor="writeUpFile">{children}</FormLabel>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none">
                    <Icon as={FiFile} />
                </InputLeftElement>
                <input type='file'
                    onChange={(e) => onChange(e.target.files[0])}
                    accept={acceptedFileTypes}
                    name={name}
                    ref={inputRef}
                    {...inputProps}
                    style={{ display: 'none' }} />
                <Input
                    placeholder={placeholder || "Your file ..."}
                    onClick={() => inputRef.current.click()}
                    // onChange={(e) => {}}
                    readOnly={true}
                    value={value && value.name || ''}
                />
            </InputGroup>
            <FormErrorMessage>
                {invalid}
            </FormErrorMessage>
        </FormControl>
    );
}

FileUpload.defaultProps = {
    acceptedFileTypes: '',
    allowMultipleFiles: false,
};

export default FileUpload;