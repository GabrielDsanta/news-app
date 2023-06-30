import { useState } from 'react'
import { Input } from "@components/Input";
import { Center, ScrollView, Text, VStack, View, useToast } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Button } from "@components/Button";
import { AuthNavigationRoutesProps } from "@routes/auth.routes";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '@hooks/useAuth';
import { StorageUserSave } from '@storage/storageUser';

type FormDataProps = {
    username: string;
    password: string;
}

const ValidationSchemaForm = yup.object({
    username: yup.string().required("Informe o username"),
    password: yup.string().required("Informe a senha").min(6, "A senha deve possuir no mínimo 6 dígitos"),
})

export function SignUp() {
    const { SignIn } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(ValidationSchemaForm)
    })

    const navigation = useNavigation<AuthNavigationRoutesProps>()
    const toast = useToast()

    async function handleSignIn({ username, password }: FormDataProps){
        setIsLoading(true)
        
        await StorageUserSave(username, password)
       
        const title = "Cadastrado com sucesso !"

        setIsLoading(false)

        toast.show({
            title,
            placement: "top",
            bg: "green.700"
        })

        navigation.navigate("signIn")
        
    }
    
    return (
        <ScrollView>
            <View px={6} mt={12}>
                <Text fontFamily="heading" fontSize="48px" color="blue.700">Hello!</Text>
                <Text mt={1} fontSize="22px" fontFamily="mono" color="gray.500">Signup to get Started</Text>
            </View>

            <VStack px={6} alignItems="center" justifyContent="center" mt={16}>

                <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            placeholder='Enter your username'
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
                            placeholder='Enter your password'
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
                    text="Register" 
                    isLoading={isLoading ? true : false}
                    />
            </VStack>

            <Center mt={4} flexDirection="row">
                <Text fontFamily="mono" color="gray.400" fontSize="16px">don’t have an account ? </Text> 
                <Text onPress={() => navigation.navigate("signIn")} fontFamily="heading" color="blue.700" fontSize="16px">Login</Text>
            </Center>
        </ScrollView>
    );
}
