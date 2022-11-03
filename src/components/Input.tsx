import React, { useState } from "react"
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"



export type InputProps = {
    placeholder?: string
    value?: any
    label: string
    error: string | undefined
    onChangeText: (entry: string) => void
    onBlur: () => void
    keyBoardNumeric?: boolean
    icon?: boolean
    defaultValue?: string
    onFocus?: () => void
    containerBox?: {}
    inputContainerStyle?: {} // Permet d'appliquer un autre style à mon input au lieu du style par défaut
}

const Input: React.FunctionComponent<InputProps> = ({ label, placeholder, value, onChangeText, error, onBlur, keyBoardNumeric, icon, defaultValue, onFocus, inputContainerStyle, containerBox }) => {

    const [eyeOff, setEyeOff] = useState<boolean>(true)

    return (
        <View style={containerBox ? containerBox : styles.container}>
            <Text style={styles.labelStyle}>{label}</Text>

            <View style={inputContainerStyle ? inputContainerStyle : styles.inputContainer}>
                <TextInput
                    onFocus={onFocus}
                    defaultValue={defaultValue}
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    keyboardType={keyBoardNumeric ? "numeric" : "default"}
                    placeholderTextColor="#bdc3c7"
                    secureTextEntry={(label === "password" || "confirmPassword") && eyeOff && icon ? true : false} />

                <TouchableOpacity style={{ justifyContent: "center" }} onPress={() => setEyeOff(!eyeOff)}>
                    <Text>
                        {(label === "password" || "confirmPassword") && icon ? <Icon name={eyeOff ? "eye-off" : "eye"} size={25} color="#bdc3c7" /> : null}
                    </Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.text}>{error}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },

    inputContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#bdc3c7",
        borderRadius: 7,
        backgroundColor: "white"
    },

    input: {
        width: 300,
        height: 45,
        color: "black"
    },

    text: {
        color: "red",
        fontSize: 10,
        marginTop: 3,
        paddingLeft: 10,
        width: 300
    },

    labelStyle: {
        color: "black",
        marginStart: 10,
        marginBottom: 5,
        fontWeight: "bold",
        width: "83%"
    }
})

export default Input