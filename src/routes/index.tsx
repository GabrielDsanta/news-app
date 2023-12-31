import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { Box } from 'native-base'
import { AuthRoutes } from './auth.routes'
import { useAuth } from '@hooks/useAuth'
import { AppRoutes } from './app.routes'

export function Routes() {
    const { isLogged } = useAuth()

    const theme = DefaultTheme
    theme.colors.background = "#FFFFFF"
    
    return (
        <Box flex={1} bg="#FFFFFF">
            <NavigationContainer theme={theme}>
                {isLogged ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </Box>
    )
}