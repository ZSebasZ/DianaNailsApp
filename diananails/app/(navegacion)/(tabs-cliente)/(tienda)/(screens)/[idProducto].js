import React from 'react';
import { View, Text } from 'react-native'; 
import { Link } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { ProductoScreen } from '../../../../../screens/ProductoScreen';

export default function DetalleProducto() {
    const {idProducto} = useLocalSearchParams()

    return (
        <ProductoScreen idProducto={idProducto}/>
    );
}