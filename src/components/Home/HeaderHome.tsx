import { HStack, Input, VStack } from "native-base";
import { MagnifyingGlass } from "phosphor-react-native"
import Logo  from "@assets/Logo.svg"


export function HeaderHome(){
    return(
        <VStack mt={16}> 
            <Logo height={30} width={100} />
            
            <HStack h={12} mt={10} rounded={6} px={2} borderWidth="1" borderColor="gray.500" alignItems="center">
                <MagnifyingGlass color="#4E4B66" size={20} />
                <Input  
                    mt={1}
                    borderWidth="0"
                    bg="transparent"
                    placeholder="Search"
                    _focus={{
                        bg: "transparent"
                    }}
                />
            </HStack>
        </VStack>
    )
}