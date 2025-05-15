import { Stack } from 'expo-router';
import { CarritoClienteScreen } from '../../../../screens/CarritoClienteScreen';
import BarraSuperior from '../../../../components/BarraSuperior';

export default function PedidosCliente() {
    return (
        <>
            <BarraSuperior />
            <Stack.Screen
                options={{
                    headerBackVisible: true,
                }}
            />
            <CarritoClienteScreen />
        </>
    );
}