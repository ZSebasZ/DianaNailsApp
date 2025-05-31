//Estado inicial del carrito
export const initialState = {
    items: [],
    carritoCargado: false
};

export function carritoReducer(carrito, action) {
    //Switch segun el distpatch
    switch (action.type) {
        //Cargamos el carrito
        case 'CARGAR_CARRITO':
            //console.log("carrito cargado")
            return {
                ...carrito,
                items: action.payload.map(p => ({ ...p })),
                carritoCargado: true
            };

        //Añadimos un producto
        case 'ANADIR_PRODUCTO':
            //console.log('Añadir producto:', action.payload);
            const existingItem = carrito.items.find(item => item.id_producto === action.payload.id_producto);
            if (existingItem) {
                // Si ya existe, no agregar otra entrada, solo aumentar cantidad
                return {
                    ...carrito,
                    items: carrito.items.map(item =>
                        item.id_producto === action.payload.id_producto
                            ? { ...item, cantidad: item.cantidad + 1 }
                            : item
                    ),
                };
            } else {
                // Agregar nuevo producto con cantidad 1
                return {
                    ...carrito,
                    items: [...carrito.items, { ...action.payload, cantidad: action.payload.cantidad }],
                };
            }
        
        //Quitamos un cantidad
        case 'QUITAR_CANTIDAD':
            return {
                ...carrito,
                items: carrito.items.map(item =>
                    item.id_producto === action.payload.id_producto
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                ),
            };

        //Eliminamos un producto
        case 'ELIMINAR_PRODUCTO':
            //console.log(action.payload)
            return {
                ...carrito,
                items: carrito.items.filter(item => item.id_producto !== action.payload),
            };

        //Hacemos el pedido y vaciamos el carrito
        case 'HACER_PEDIDO':
            return {
                ...carrito,
                items: [],
            };
        
        //Vaciamos el carrito
        case 'VACIAR_CARRITO':
            return {
                ...carrito,
                items: [],
            };

        default:
            return carrito;
    }
}