import { Stack } from 'expo-router';
import { AgendarCitaScreen } from '../../../../../screens/AgendarCitaScreen';
import { FechaHoraCitaScreen } from '../../../../../screens/FechaHoraCitaScreen';
import { ManicuristaMetodoPagoScreen } from '../../../../../screens/ManicuristaMetodoPagoScreen';
import { useContext } from 'react';
import { AgendarCitaContext } from '../../../../../contexts/agendarCitaContext';
import { ResumenCitaScreen } from '../../../../../screens/ResumenCitaScreen';


export default function Index() {

    const {pasoAgendamiento} = useContext(AgendarCitaContext)

    //Segun el paso del agendamiento, mostramos la pantalla correspondiente
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            {pasoAgendamiento == 1 ?  <AgendarCitaScreen />
            : pasoAgendamiento == 2 ? <FechaHoraCitaScreen />
            : pasoAgendamiento == 3 ? <ManicuristaMetodoPagoScreen />
            : <ResumenCitaScreen />}
           
        </>

    );
}