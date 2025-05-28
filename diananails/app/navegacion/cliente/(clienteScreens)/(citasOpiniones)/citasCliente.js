import { Stack } from 'expo-router';
import { CitasClienteScreen } from '../../../../../screens/CitasClienteScreen';
import BarraSuperior from '../../../../../components/BarraSuperior';

export default function CitasCliente() {
    //Renderizamos la screen CitasClienteScreen
    return (
        <>
            <BarraSuperior />
            <Stack.Screen
                options={{
                    headerBackVisible: true,
                }}
            />
            <CitasClienteScreen />
        </>

    );
}