import { useRoute } from "@react-navigation/native";
import { View } from "native-base";
import { WebView } from 'react-native-webview';

interface NewsPageParams {
    url: string;
}

export function NewsPage(){
    const route = useRoute();

    const { url } = route.params as NewsPageParams;

    return(
        <View mt={20} flex={1}>
            <WebView
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                }}
                javaScriptEnabled
                startInLoadingState
                source={{ uri: url }}
            />
        </View>
    )
}