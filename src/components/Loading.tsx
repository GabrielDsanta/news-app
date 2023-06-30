import { Center, Spinner } from "native-base";


export function Loading(){
    return(
        <Center style={{flex: 1}}>
            <Spinner color='blue.700' />
        </Center>
    )
}