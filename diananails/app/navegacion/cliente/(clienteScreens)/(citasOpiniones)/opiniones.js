import { Stack } from 'expo-router';
import { OpinionesScreen } from '../../../../../screens/OpinionesScreen';
import BarraSuperior from '../../../../../components/BarraSuperior';

export default function CitasCliente() {
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