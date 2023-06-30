import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NewsPage } from '@screens/NewsPage';


type AppRoutesType = {
    newsPage: { url: string; };
}

export type AppStackNavigationRoutesProps = NativeStackNavigationProp<AppRoutesType>

const { Screen, Navigator } = createNativeStackNavigator<AppRoutesType>()

export function AppRoutes() {

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen
                name='newsPage'
                component={NewsPage}
            />

        </Navigator>
    )
}


