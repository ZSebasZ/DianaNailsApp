import React, { createContext, useContext, useReducer } from 'react';
import { carritoReducer, initialState } from './carritoReducer';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const [carrito, dispatch] = useReducer(carritoReducer, initialState);

    return (
        <CarritoContext.Provider value={{ carritoProductos: carrito.items, carritoCargado: carrito.carritoCargado, dispatch }}>
            {children}
        </CarritoContext.Provider>
    );
};