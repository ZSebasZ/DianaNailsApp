import { Stack } from 'expo-router';
import { CarritoClienteScreen } from '../../../../../screens/CarritoClienteScreen';
import BarraSuperior from '../../../../../components/BarraSuperior';

export default function PedidosCliente() {
    //Renderizamos la screen CarritoClienteScreen
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