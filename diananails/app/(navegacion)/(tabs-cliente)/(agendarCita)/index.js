import { Stack } from 'expo-router';
import { AgendarCitaScreen } from '../../../../screens/AgendarCitaScreen';

export default function Index() {
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <AgendarCitaScreen />
        </>

    );
}