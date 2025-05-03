import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Login } from '../../components/Login';

export default function Index() {
    return (
        <SafeAreaProvider>
            <Login />
        </SafeAreaProvider>
    );
}