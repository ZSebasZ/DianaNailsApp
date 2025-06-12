import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginCliente, updateDatosUsuario } from "../api/AuthController";
import { router } from "expo-router";
import { navigationRef } from "./../utils/navigationRef";

// Creamos el contexto
export const AuthContext = createContext()

// Creamos el proveedor
export const AuthProvider = ({ children }) => {

    // Creamos los estados de Auth
    const [usuario, setUsuario] = useState(null)
    const [tipoLogin, setTipoLogin] = useState(null)

    // Funcion que se encarga de hacer el login
    const login = async (credenciales) => {
        const respuesta = await loginCliente(credenciales)
        //console.log("Inicio de sesion exitoso:", respuesta)

        //await AsyncStorage.setItem('tipoUsuario', String(respuesta.tipoUsuario))
        setUsuario({ tipoUsuario: respuesta.tipoUsuario, datosUsuario: respuesta.usuario })
        await AsyncStorage.setItem('email', credenciales.email)
        await AsyncStorage.setItem('contrasena', credenciales.contrasena)

        return respuesta
    }

    // Funcion que se encarga de cerrar la sesion
    const cerrarSesion = async () => {
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("contrasena");

        navigationRef.reset({
            index: 0,
            routes: [{ name: "index" }],
        });

    }

    // Funcion que se encarga de actualizar la foto del usuario
    const actualizarFotoUsuario = (url) => {
        setUsuario(prev => ({
            ...prev,
            datosUsuario: {
                ...prev.datosUsuario,
                url_imagen: url
            }
        }))
    }

    // Funcion que se encarga de cambiar el tipo de login
    const tipoLoginUsuario = (tipo) => {
        setTipoLogin(tipo)
    }

    // Funcion que se encarga de actualizar los datos del cliente
    const updateDatos = async (datos) => {
        datos.tipoUsuario = usuario.tipoUsuario
        const respuesta = await updateDatosUsuario(usuario.datosUsuario.id, datos)
        //console.log("Datos actualizados: ", respuesta)
        setUsuario(prev => ({
            ...prev,
            datosUsuario: {
                ...prev.datosUsuario,
                nombre: datos.nombre,
                apellidos: datos.apellidos,
                telefono: datos.telefono,
                direccion_envio: datos.direccionEnvio
            }
        }))
    }

    // Retornamos el proveedor, el cual va a envolver toda la App
    return (
        <AuthContext.Provider value={{ usuario, login, tipoLogin, tipoLoginUsuario, cerrarSesion, actualizarFotoUsuario, updateDatos }}>
            {children}
        </AuthContext.Provider>
    )
}