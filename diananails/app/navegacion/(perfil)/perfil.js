import { PerfilScreen } from '../../../screens/PerfilScreen';
import BarraSuperior from "./../../../components/BarraSuperior"

export default function Perfil() {
    //Renderizamos la screen PerfilScreen
    return (
        <>
            <BarraSuperior mostrarCerrarSesion={true}/>
            <PerfilScreen />
        </>

    );
}