import { useLocalSearchParams } from 'expo-router';
import { tabsMainLabelStyles } from "./../../../styles/tabsMainLabelStyles";
import { useThemedStyles } from './../../../hooks/useThemeStyles';
import { GestionEdicionScreen } from '../../../screens/GestionEdicionScreen';
import BarraSuperior from "../../../components/BarraSuperior";

export default function GestionEdicion() {

    const styles = useThemedStyles(tabsMainLabelStyles);
    const colors = useThemedStyles();

    const { datosEdicion } = useLocalSearchParams();
    const [tipo, id] = datosEdicion;

    return (
        <>
            <BarraSuperior  mostrarVolverAtras={true} />
            <GestionEdicionScreen tipo={tipo} id={id} />
        </>
        
    );
}