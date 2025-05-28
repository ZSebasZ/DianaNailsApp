import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RegistroScreen } from '../../../screens/RegistroScreen';

export default function Registro() {
    //Renderizamos la screen RegistroScreen
    return (
        <SafeAreaProvider>
            <RegistroScreen />
        </SafeAreaProvider>
    );
}