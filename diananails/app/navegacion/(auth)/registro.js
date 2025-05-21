import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RegistroScreen } from '../../../screens/RegistroScreen';

export default function Registro() {
    return (
        <SafeAreaProvider>
            <RegistroScreen />
        </SafeAreaProvider>
    );
}