import { View, ScrollView, FlatList } from "react-native";
import { Screen } from '../components/Screen';
import { useState } from "react";
import { manicuristaMetodoPagoStyles } from "../styles/manicuristaMetodoPagoStyles";
import { fuenteTextoStyles } from '../styles/fuenteTextoStyles';
import { SeccionEnTab } from "../components/SeccionEnTab";
import { BotonesCancelarVerServicios } from "../components/BotonesCancelarVerServicios";
import { BarraResumen } from "../components/BarraResumen";
import { CardManicurista } from "../components/CardManicurista";
import { useContext } from "react";
import { AgendarCitaContext } from "../contexts/agendarCitaContext";
import { BotonTexto } from "../components/BotonTexto";
import { ModalServiciosSelec } from "../components/ModalServiciosSelec";

//Pantalla de ManicuristaMetodoPago
export const ManicuristaMetodoPagoScreen = () => {

    //Fuentes
    const fuenteTexto = fuenteTextoStyles();

    // Usamos el contexto de agendar cita
    const { serviciosSeleccionados, subtotal, manicuristas, manicurista, seleccionarManicurista, metodoPago, seleccionarMetodoPago, setPasoAgendamiento } = useContext(AgendarCitaContext)

    // Metodos de pago
    const metodosPago = [
        {
            idMetodoPago: 1,
            metodoPago: "Pagar en el local"
        },
        {
            idMetodoPago: 2,
            metodoPago: "Tarjeta"
        }
    ]

    // Estado del modal
    const [modalServiciosSelec, setModalServiciosSelec] = useState(false)

    // Renderizamos la pantalla
    return (
        <Screen enTab={true}>
            <ModalServiciosSelec
                editable={false}
                servicios={serviciosSeleccionados}
                visible={modalServiciosSelec}
                cerrar={() => { setModalServiciosSelec(false) }}
                
            />
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Manicuristas"}
                        textInfo1={"Seleccione la manicurista que quiere que la atienda"}
                    />
                    <FlatList
                        data={manicuristas}
                        numColumns={2}

                        contentContainerStyle={{
                            gap: 20,
                            marginBottom: 20
                        }}
                        columnWrapperStyle={{
                            justifyContent: "center",
                            gap: 20
                        }}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                            <CardManicurista
                                estaSeleccionada={manicurista.idManicurista === item.id}
                                fuenteTextoBold={fuenteTexto.gantariBold}
                                manicuristaImg={item.url_imagen}
                                nombreManicurista={item.nombre}
                                onPress={() => {
                                    seleccionarManicurista({
                                        idManicurista: item.id,
                                        manicurista: item.nombre,
                                        urlImagen: item.url_imagen
                                    })
                                }}
                            />
                        }
                        scrollEnabled={false}

                    >
                    </FlatList>
                    <SeccionEnTab
                        fuenteTextoBold={fuenteTexto.gantariBold}
                        fuenteTextoRegular={fuenteTexto.gantariRegular}
                        tituloSeccion={"Metodo de pago"}
                        textInfo1={"Seleccione el metodo de pago"}
                    />
                    {/*<ListaDropdown
                        items={items}
                        fuenteTexto={fuenteTexto.gantariRegular}
                    />*/}
                    <FlatList
                        data={metodosPago}
                        numColumns={4}

                        contentContainerStyle={{
                            gap: 20,
                            marginBottom: 80,
                        }}
                        columnWrapperStyle={{
                            justifyContent: "center",
                            gap: 20
                        }}
                        renderItem={({ item }) =>
                            <BotonTexto
                                botonNavegacion={true}
                                esLink={false}
                                fondo={metodoPago.idMetodoPago === item.idMetodoPago}
                                fuenteTexto={fuenteTexto.gantariRegular}
                                textoBoton={item.metodoPago}
                                onPress={() => seleccionarMetodoPago(item)}
                            />
                        }
                        scrollEnabled={false}

                    ></FlatList>
                </ScrollView>
            </View>
            <BotonesCancelarVerServicios 
                verServicios={() => {setModalServiciosSelec(true)}}
            />
            <BarraResumen
                onPress={() => {
                    setPasoAgendamiento(4)
                }}
                onPressAtras={() => {
                    setPasoAgendamiento(2)
                }}
                botonVolver={true}
                hrefAtras={"../"}
                botonSiguiente={true}
                btnSiguienteDeshabilitado={(manicurista.manicurista == null || metodoPago.metodoPago == null) ? true : false}
                subtotal={subtotal}
                hrefSiguiente={"/navegacion/cliente/(tabs-cliente)/(agendarCita)/(screens)/resumenCita"}
            />
        </Screen>
    );
}