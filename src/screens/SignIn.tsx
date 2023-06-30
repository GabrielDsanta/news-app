import { useState } from 'react'
import { Input } from "@components/Input";
import { Center, ScrollView, Text, VStack, View, useToast } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { StorageUserGet } from '@storage/storageUser';
import { useAuth } from '@hooks/useAuth';
import { AuthNavigationRoutesProps } from '@routes/auth.routes';

type FormDataProps = {
    username: string;
    password: string;
}

const ValidationSchemaForm = yup.object({
    username: yup.string().required("Informe o username"),
    password: yup.string().required("Informe a senha").min(6, "A senha deve possuir no mínimo 6 dígitos"),
})

export function SignIn() {
    const { setIsLogged } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(ValidationSchemaForm)
    })

    const navigation = useNavigation<AuthNavigationRoutesProps>()
    const toast = useToast()

    async function handleSignIn({ username, password }: FormDataProps){
        setIsLoading(true)

        const user = await StorageUserGet()

        if(user.username === username && user.password === password){
            setIsLogged(true)
        } else{
            const title = "Não foi possível entrar. Tente novamente mais tarde"
            toast.show({
                title,
                placement: "top",
                bg: "red.700"
            })
        }

        setIsLoading(false)
    }
    
    return (
        <ScrollView>
            <View px={6} mt={12}>
                <Text fontFamily="heading" fontSize="48px" color="gray.600">Hello</Text>
                <Text fontFamily="heading" fontSize="48px" color="blue.700">Again!</Text>
                <Text mt={1} w="64" fontSize="22px" fontFamily="mono" color="gray.500">Welcome back you’ve been missed</Text>
            </View>

            <VStack px={6} alignItems="center" justifyContent="center" mt={8}>

                <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Username"
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.username?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            type='password'
                            label="Password"
                            onChangeText={onChange}
                            value={value}
                            errorMessage={errors.password?.message}
                        />
                    )}
                />

                <Button 
                    onPress={handleSubmit(handleSignIn)} 
                    mt={4} 
                    text="Login" 
                    isLoading={isLoading ? true : false}
                    />
            </VStack>

            <Center mt={4} flexDirection="row">
                <Text fontFamily="mono" color="gray.400" fontSize="16px">don’t have an account ? </Text> 
                <Text onPress={() => navigation.navigate("signUp")} fontFamily="heading" color="blue.700" fontSize="16px">Sign Up</Text>
            </Center>
        </ScrollView>
    );
}
