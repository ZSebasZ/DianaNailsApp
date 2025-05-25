import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InicioScreen } from '../screens/InicioScreen';

export default function Index() {

    

    return (
        <SafeAreaProvider>
            <InicioScreen />
        </SafeAreaProvider>
    );
}