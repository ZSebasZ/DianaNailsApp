import { Stack } from 'expo-router';
import { OpinionesScreen } from '../../../../../screens/OpinionesScreen';
import BarraSuperior from '../../../../../components/BarraSuperior';

export default function CitasCliente() {
    //Renderizamos la screen OpinionesScreen
    return (
        <>
            <BarraSuperior />
            <Stack.Screen
                options={{
                    headerBackVisible: true,
                }}
            />
            <OpinionesScreen />
        </>

    );
}