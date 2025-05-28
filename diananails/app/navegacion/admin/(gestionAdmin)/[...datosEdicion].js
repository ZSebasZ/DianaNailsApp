import { useLocalSearchParams } from 'expo-router';
import { GestionEdicionScreen } from '../../../../screens/GestionEdicionScreen';
import BarraSuperior from "../../../../components/BarraSuperior";

export default function GestionEdicion() {

    const { datosEdicion } = useLocalSearchParams();
    const [tipo, id] = datosEdicion;

    //Renderizamos la screen GestionEdicionScreen
    return (
        <>
            <BarraSuperior  mostrarVolverAtras={true} />
            <GestionEdicionScreen tipo={tipo} id={id} />
        </>
        
    );
}