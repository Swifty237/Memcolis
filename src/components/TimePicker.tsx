import React, { useState } from "react"
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native"
import Moment from "moment"
import DateTimePicker from "@react-native-community/datetimepicker"
import Icon from "react-native-vector-icons/Entypo"

type Props = {
    label: string,
    date: string,
    time: string,
    onChangeDate: (date: string) => void,
    error?: string,
}

const TimePicker = ({ label, time, onChangeDate, error }: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const onSubmit = (time: Date) => {
        setShow(false)
        onChangeDate(Moment(time).format("hh:mm a"))
    }
    return (
        <View style={styles.container}>
            <View style={styles.labelBox}>
                <Text style={styles.labelStyle}>{label}</Text>
            </View>
            <View style={styles.inputBox}>
                <TextInput style={styles.input} value={time} editable={false} />
                <TouchableOpacity onPress={() => setShow(true)} style={styles.icon}>
                    <Icon name="clock" size={25} color="#2c3e50" />
                </TouchableOpacity>
            </View>

            {show && <DateTimePicker
                mode="time"
                value={new Date()}
                onChange={(event, time) => {
                    if (time != undefined) {
                        onSubmit(time)
                    }
                }}
            // dateFormat="day month year"
            />}
            {/* Nous permet d'afficher la modal de date */}
            {error != undefined && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginStart: 5
    },
    inputBox: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#bdc3c7",
        borderRadius: 7,
        height: 45,
        color: "black"
    },

    input: {
        color: "black",
        textAlign: "center"
    },

    icon: {
        position: "absolute",
        right: 10,
        top: 5,
    },
    text: {
        color: "white",
        textAlign: "center",
    },
    error: {
        color: "red",
        fontSize: 10,
        marginTop: 3,
        paddingLeft: 10,
        width: 300
    },

    labelBox: {

    },

    labelStyle: {
        color: "black",
        marginStart: 10,
        marginBottom: 5,
        fontWeight: "bold"
    }
})

export default TimePicker