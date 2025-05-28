import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginScreen } from '../../../screens/LoginScreen';

export default function Login() {
    //Renderizamos la screen LoginScreen
    return (
        <SafeAreaProvider>
            <LoginScreen />
        </SafeAreaProvider>
    );
}