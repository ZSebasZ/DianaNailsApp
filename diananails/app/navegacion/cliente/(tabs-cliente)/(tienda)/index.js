import { Stack } from 'expo-router';
import { TiendaScreen } from '../../../../../screens/TiendaScreen';

export default function Index() {
    //Renderizamos la screen TiendaScreen
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <TiendaScreen />
        </>

    );
}