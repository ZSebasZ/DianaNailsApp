import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Inicio } from '../components/Inicio';

export default function Index() {
    return (
        <SafeAreaProvider>
            <Inicio />
        </SafeAreaProvider>
    );
}