import { Input as NativeBaseInput, IInputProps, FormControl, Text, View } from "native-base"

type InputPropsData = IInputProps & {
    errorMessage?: string | null;
    label: string;
}

export function Input({ label, errorMessage = null, isInvalid, ...rest }: InputPropsData) {
    const inputIsInvalid = !!errorMessage || isInvalid
    
    return (
        <View>
            <Text mb={1} fontFamily="mono" color="gray.500" fontSize="14px">{label} <Text color="red.700">*</Text></Text>

            <FormControl isInvalid={inputIsInvalid} mb={4}>
                <NativeBaseInput
                    bg="transparent"
                    h={12}
                    w="full"
                    px={4}
                    borderWidth={1}
                    borderColor="gray.500"
                    fontSize="14px"
                    justifyContent="center"
                    alignItems="center"
                    color="gray.600"
                    fontFamily="body"
                    placeholderTextColor="rgba(0, 0, 0, 0.3)"
                    mb={1}
                    rounded={4}
                    isInvalid={inputIsInvalid}
                    _invalid={{
                        borderWidth: 1,
                        borderColor: "red.700"
                    }}
                    _focus={{
                        bg: "transparent",
                        borderWidth: 1,
                        borderColor: "blue.700"
                    }}
                    {...rest}
                />

                <FormControl.ErrorMessage>
                    {errorMessage}
                </FormControl.ErrorMessage>
            </FormControl>
        </View>
    )
}