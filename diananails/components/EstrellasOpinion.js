import { Pressable, StyleSheet, View } from "react-native";
import { useThemedStyles } from "../hooks/useThemeStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Icono } from "./Icono";
import { useEffect, useState } from "react";

export const EstrellasOpinion = (props) => {
    const tema = useThemedStyles();

    const styles = StyleSheet.create({
        contenedor: {
            flexDirection: "row",
            justifyContent: "center",
            gap: 15,
        },
        iconoEstrella: {
            color: tema.primary,
            fontSize: hp(4),
        },
    });

    const manejarSeleccion = (indice) => {
        const nuevaValoracion = indice + 1;
        if (props.tipo === "filtro") {
            if (nuevaValoracion === props.valor) {
                props.onSeleccion(0);
                return;
            }
        }
        props.onSeleccion(nuevaValoracion);
    };

    return (
        <View style={styles.contenedor}>
            {[0, 1, 2, 3, 4].map((i) => (
                <Pressable key={i} onPress={() => manejarSeleccion(i)}>
                    <Icono
                        IconComponent={MaterialCommunityIcons}
                        name={i < props.valor ? "star" : "star-outline"}
                        onPrimary={false}
                        style={styles.iconoEstrella}
                    />
                </Pressable>
            ))}
        </View>
    );
};
