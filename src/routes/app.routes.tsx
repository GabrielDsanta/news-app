import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useTheme } from 'native-base';
import { Platform } from 'react-native'
import { Home } from '@screens/Home';
import { HouseLine, Compass, BookmarkSimple, UserCircle } from 'phosphor-react-native'
import { History } from '@screens/History';
import { Profile } from '@screens/Profile';
import { Exercise } from '@screens/Exercise';

type AppRoutesType = {
    home: undefined;
    history: undefined;
    profile: undefined;
    exercise: { exerciseId: string; };
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AppRoutesType>

const { Screen, Navigator } = createBottomTabNavigator<AppRoutesType>()


export function AppRoutes() {
    const { sizes, colors } = useTheme()

    const iconSize = sizes[6]

    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.blue[700],
            tabBarInactiveTintColor: colors.gray[500],
            tabBarLabelPosition: 'below-icon',
            tabBarStyle: {
                backgroundColor: "white",
                borderTopWidth: 0,
                height: Platform.OS === 'android' ? 'auto' : 96,
                paddingBottom: sizes[10],
                paddingTop: sizes[6]
            }

        }}>
            <Screen
                name='home'
                component={Home}
                options={
                    {
                        tabBarIcon: ({ color }) => (
                            <HouseLine color={color} size={iconSize} />
                        ),
                        tabBarLabel: "Home"
                    }
                }
            />

            <Screen
                name='history'
                component={History}
                options={
                    {
                        tabBarIcon: ({ color }) => (
                            <Compass color={color} size={iconSize} />
                        )
                    }
                }
            />

            <Screen
                name='profile'
                component={Profile}
                options={
                    {
                        tabBarIcon: ({ color }) => (
                            <BookmarkSimple color={color} size={iconSize} />
                        )
                    }
                }
            />

            <Screen
                name='exercise'
                component={Exercise}
                options={
                    {
                        tabBarIcon: ({ color }) => (
                            <UserCircle color={color} size={iconSize} />
                        )
                    }
                }
            />
        </Navigator>
    )
}


