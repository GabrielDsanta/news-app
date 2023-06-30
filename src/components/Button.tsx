import { IButtonProps, Button as NativeBaseButton, Text } from 'native-base'

type ButtonProps = IButtonProps & {
    text: string;
}

export function Button({ text, ...rest }: ButtonProps){
    return(
        <NativeBaseButton {...rest} alignItems="center" justifyContent="center" bg="blue.700" w="full" h="50px">
            <Text color="white">{text}</Text>
        </NativeBaseButton>
    )
}