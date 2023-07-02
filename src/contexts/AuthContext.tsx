import { StorageUserGet } from "@storage/storageUser";
import { ReactNode, createContext, useState, useEffect } from "react";

export type AuthContextDataProps = {
    isLogged: boolean;
    setIsLogged: (bool: boolean) => void;
    SignOut: () => Promise<void>;
    isFetchingData: boolean;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

type AuthContextProviderProps = {
    children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [isLoadingStorageData, setIsLoadingStorageData] = useState(true)
    const [isFetchingData, setIsFetchingData] = useState(false)
    const [isLogged, setIsLogged] = useState(false)

    async function SignOut() {
        setIsLogged(false)
    }

    useEffect(() => {
        async function loadDataUser(){
            setIsFetchingData(true)
            const user = await StorageUserGet()

            if(user){
                setIsLogged(true)
            }

            setIsFetchingData(false)
        }

        loadDataUser()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                setIsLogged,
                SignOut,
                isFetchingData
            }}
        >
            {children}

        </AuthContext.Provider>
    )
}

