import { extendTheme } from 'native-base'

export const THEME = extendTheme({
    colors: {
        blue: {
            700: '#1877F2',
        },
        gray: {
            600: '#050505',
            500: '#4E4B66',
            400: '#667080',
            300: '#A0A3BD',
            200: '#EEF1F4',
            100: '#EEF1F4'
        },
        red: {
            700: '#C30052'
        },
        green: {
            700: '#00BA88'
        }
    },
    fonts: {
        heading: 'Poppins_700Bold',
        body: 'Poppins_600SemiBold',
        mono: 'Poppins_400Regular'
    }
})