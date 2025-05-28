import { useLocalSearchParams } from 'expo-router';
import { ProductoScreen } from '../../../../../../screens/ProductoScreen';

export default function DetalleProducto() {
    const {idProducto} = useLocalSearchParams()

    //Renderizamos la screen ProductoScreen y le pasamos el idProducto
    return (
        <ProductoScreen idProducto={idProducto}/>
    );
}