import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginCliente, updateDatosUsuario } from "../api/AuthController";
import { router } from "expo-router";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(null)

    const login = async (credenciales) => {
        const respuesta = await loginCliente(credenciales)
        console.log("Inicio de sesion exitoso:", respuesta)

        //await AsyncStorage.setItem('tipoUsuario', String(respuesta.tipoUsuario))
        setUsuario({tipoUsuario: respuesta.tipoUsuario, datosUsuario: respuesta.usuario})
        await AsyncStorage.setItem('email', credenciales.email)
        await AsyncStorage.setItem('contrasena', credenciales.contrasena)
        
        return respuesta
    }

    const cerrarSesion = async () => {
        await AsyncStorage.removeItem("email")
        await AsyncStorage.removeItem("contrasena")
        router.replace("/")
    }

    const actualizarFotoUsuario = (url) => {
        setUsuario(prev => ({
            ...prev,
            datosUsuario: {
                ...prev.datosUsuario,
                url_imagen: url
            }
        }))
    }

    const updateDatos = async (datos) => {
        const respuesta = await updateDatosUsuario(usuario.datosUsuario.id, datos)
        console.log("Datos actualizados: ", respuesta)
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

    return (
        <AuthContext.Provider value={{ usuario, login, cerrarSesion, actualizarFotoUsuario, updateDatos }}>
            {children}
        </AuthContext.Provider>
    )
}