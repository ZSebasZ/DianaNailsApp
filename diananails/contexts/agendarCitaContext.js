import { createContext, use, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginCliente, updateDatosUsuario } from "../api/AuthController";
import { router } from "expo-router";

export const AgendarCitaContext = createContext()

export const AgendarCitaProvider = ({ children }) => {

    const estadoInicialHora = { idHora: null, hora: null };
    const estadoInicialManicurista = { idManicurista: null, manicurista: null, urlImagen: null };
    const estadoInicialMetodoPago = { idMetodoPago: null, metodoPago: null };

    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
    const [tiempoTotal, setTiempoTotal] = useState(0)
    const [subtotal, setSubtotal] = useState(0.00);
    const [fecha, setFecha] = useState(null);
    const [hora, setHora] = useState({ idHora: null, hora: null })
    const [manicuristas, setManicuristas] = useState(null)
    const [manicurista, setManicurista] = useState({ idManicurista: null, manicurista: null, urlImagen: null })
    const [metodoPago, setMetodoPago] = useState({ idMetodoPago: null, metodoPago: null })

    const alternarSeleccionServicio = (servicio) => {
        setServiciosSeleccionados((prev) => {
            const existe = prev.find(s => s.id === servicio.id);

            if (existe) {
                // Deseleccionar: quitar el objeto cuyo id coincide
                setSubtotal(subtotal - servicio.precio)
                setTiempoTotal(tiempoTotal - servicio.horas_requeridas);
                return prev.filter(s => s.id !== servicio.id);
            } else {
                if (prev.length >= 3) {
                    //alert("Solo puedes seleccionar hasta 3 servicios.");
                    return prev;
                }
                // Seleccionar nuevo: agregar el objeto servicio completo
                setSubtotal(subtotal + servicio.precio)
                setTiempoTotal(tiempoTotal + servicio.horas_requeridas);
                return [...prev, servicio];
            }
        });
    };

    const seleccionarFecha = (fecha) => {
        setFecha(fecha)
    }

    const seleccionarHora = (nuevaHora, manicuristas) => {
        setHora((prev) => {
            //console.log(manicuristas)
            // Si ya estaba seleccionada esa misma hora, la deselecciona
            if (prev.idHora === nuevaHora.idHora) {
                setManicurista(null)
                return { idHora: null, hora: null };
            }

            // Si es una nueva hora, se selecciona
            setManicuristas(manicuristas)
            return nuevaHora;
        }); // hora debería ser un objeto como { idHora: ..., hora: ... }
    };

    const seleccionarManicurista = (nuevaManicurista) => {
        //console.log(nuevaManicurista)
        setManicurista((prev) => {
            if (prev.idManicurista === nuevaManicurista.idManicurista) {
                // Deseleccionar
                return { idManicurista: null, manicurista: null, urlImagen: null };
            }
            // Seleccionar nueva manicurista
            return nuevaManicurista;
        });
    };

    const seleccionarMetodoPago = (nuevoMetodoPago) => {
        setMetodoPago((prev) => {
            if (prev.idMetodoPago === nuevoMetodoPago.idMetodoPago) {
                // Deseleccionar
                return { idMetodoPago: null, metodoPago: null };
            }
            // Seleccionar nueva manicurista
            return nuevoMetodoPago;
        });
    };

    const resetHoraManicuristas = () => {
        setHora({ idHora: null, hora: null })
        setManicuristas(null),
        setManicurista({ idManicurista: null, manicurista: null, urlImagen: null })
    }

    const reiniciarContexto = () => {
        setServiciosSeleccionados([]);
        setTiempoTotal(0);
        setSubtotal(0.00);
        setFecha(null);
        setHora(estadoInicialHora);
        setManicuristas(null);
        setManicurista(estadoInicialManicurista);
        setMetodoPago(estadoInicialMetodoPago);
        //router.push("/navegacion/(tabs-cliente)/(agendarCita)/");
    };

    return (
        <AgendarCitaContext.Provider value={{
            serviciosSeleccionados,
            alternarSeleccionServicio,
            tiempoTotal,
            subtotal,
            fecha,
            seleccionarFecha,
            hora,
            seleccionarHora,
            manicuristas,
            manicurista,
            seleccionarManicurista,
            metodoPago,
            seleccionarMetodoPago,
            resetHoraManicuristas,
            reiniciarContexto
        }}>
            {children}
        </AgendarCitaContext.Provider>
    )
}