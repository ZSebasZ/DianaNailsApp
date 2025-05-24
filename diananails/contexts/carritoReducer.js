export const initialState = {
    items: [],
    carritoCargado: false
};

export function carritoReducer(carrito, action) {
    switch (action.type) {
        case 'CARGAR_CARRITO':
            console.log("carrito cargado")
            return {
                ...carrito,
                items: action.payload.map(p => ({ ...p })),
                carritoCargado: true
            };

        case 'ANADIR_PRODUCTO':
            console.log('Añadir producto:', action.payload);
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

        case 'QUITAR_CANTIDAD':
            return {
                ...carrito,
                items: carrito.items.map(item =>
                    item.id_producto === action.payload.id_producto
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                ),
            };

        case 'ELIMINAR_PRODUCTO':
            console.log(action.payload)
            return {
                ...carrito,
                items: carrito.items.filter(item => item.id_producto !== action.payload),
            };

        case 'HACER_PEDIDO':
            return {
                ...carrito,
                items: [],
            };

        default:
            return carrito;
    }
}