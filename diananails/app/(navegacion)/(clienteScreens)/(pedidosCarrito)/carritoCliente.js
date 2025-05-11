import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CarritoClienteScreen } from '../../../../screens/CarritoClienteScreen';
//import { CitasClienteScreen } from '../../screens/CitasClienteScreen';

export default function PedidosCliente() {
    return (
        <CarritoClienteScreen/>
    );
}