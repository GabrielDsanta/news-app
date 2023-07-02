import { StorageUserGet, StorageUserRemove } from "@storage/storageUser";
import { ReactNode, createContext, useState, useEffect } from "react";

export type AuthContextDataProps = {
    isLogged: boolean;
    setIsLogged: (bool: boolean) => void;
    SignIn: (username: string, password: string) => Promise<void>;
    SignOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

type AuthContextProviderProps = {
    children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [isLoadingStorageData, setIsLoadingStorageData] = useState(true)
    const [isLogged, setIsLogged] = useState(false)

    async function SignIn(email: string, password: string) {
        try {
            await StorageUserGet()
        } catch (error) {
            throw error
        } finally {
            setIsLoadingStorageData(false)
        }
    }

    async function SignOut() {
        try {
            setIsLoadingStorageData(true)

            await StorageUserRemove()

        } catch (error) {
            throw error
        } finally {
            setIsLoadingStorageData(false)
        }
    }

    useEffect(() => {
        async function loadDataUser(){
            const user = await StorageUserGet()

            if(user){
                setIsLogged(true)
            }
        }

        loadDataUser()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                setIsLogged,
                SignIn,
                SignOut,
            }}
        >
            {children}

        </AuthContext.Provider>
    )
}

