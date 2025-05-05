import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RegistroScreen } from '../../components/registro/RegistroScreen';

export default function Registro() {
    return (
        <SafeAreaProvider>
            <RegistroScreen />
        </SafeAreaProvider>
    );
}