import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PedidosClienteScreen } from '../../../../screens/PedidosClienteScreen';
//import { CitasClienteScreen } from '../../screens/CitasClienteScreen';

export default function PedidosCliente() {
    return (
        <PedidosClienteScreen/>
    );
}