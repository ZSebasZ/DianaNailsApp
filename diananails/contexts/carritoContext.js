import { createContext, useContext, useReducer } from 'react';
import { carritoReducer, initialState } from './carritoReducer';

// Creamos el contexto
const CarritoContext = createContext();

// Creamos el hook gestionar el contexto
export const useCarrito = () => useContext(CarritoContext);

// Creamos el proveedor que va a envolver toda la app si el rol es de un cliente
export const CarritoProvider = ({ children }) => {
    //Usamos el useReducer del carrito
    const [carrito, dispatch] = useReducer(carritoReducer, initialState);

    return (
        <CarritoContext.Provider value={{ carritoProductos: carrito.items, carritoCargado: carrito.carritoCargado, dispatch }}>
            {children}
        </CarritoContext.Provider>
    );
};