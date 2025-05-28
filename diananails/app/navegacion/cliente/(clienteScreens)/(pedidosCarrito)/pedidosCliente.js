import { Stack } from 'expo-router';
import { PedidosClienteScreen } from '../../../../../screens/PedidosClienteScreen';
import BarraSuperior from '../../../../../components/BarraSuperior';

export default function PedidosCliente() {
    //Renderizamos la screen PedidosClienteScreen
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