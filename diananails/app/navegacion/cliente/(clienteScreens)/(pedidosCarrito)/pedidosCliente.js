import { Stack } from 'expo-router';
import { PedidosClienteScreen } from '../../../../../screens/PedidosClienteScreen';
import BarraSuperior from '../../../../../components/BarraSuperior';

export default function PedidosCliente() {
    return (
        <>
            <BarraSuperior />
            <Stack.Screen
                options={{
                    headerBackVisible: true,
                }}
            />
            <PedidosClienteScreen/>
        </>
        
    );
}