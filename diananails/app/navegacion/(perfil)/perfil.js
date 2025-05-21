import { Stack } from 'expo-router';
import { PerfilScreen } from '../../../screens/PerfilScreen';
import BarraSuperior from "./../../../components/BarraSuperior"

export default function Perfil() {
    return (
        <>
            <BarraSuperior mostrarCerrarSesion={true}/>
            <PerfilScreen />
        </>

    );
}