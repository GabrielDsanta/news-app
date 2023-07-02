import { NativeBaseProvider } from 'native-base'
import { StatusBar } from 'react-native'
import { THEME } from './src/theme';
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';
import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { AuthContextProvider } from '@contexts/AuthContext';


export default function App() {
  const [fontsLoadead] = useFonts({ Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold })


  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <AuthContextProvider>
        {fontsLoadead ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

