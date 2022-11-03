
import React, { useState } from "react"
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native"
import Moment from "moment"
import DateTimePicker from "@react-native-community/datetimepicker"
import Icon from "react-native-vector-icons/Entypo"


type Props = {
    label: string,
    defaultValue?: string,
    date?: string,
    onChangeDate: (date: string) => void,
    error?: string,
}

const DatePicker = ({ label, defaultValue, date, onChangeDate, error }: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const onSubmit = (date: Date) => {
        setShow(false)
        onChangeDate(Moment(date).format("DD/MM/YYYY"))
    }
    return (
        <View style={styles.container}>
            <View style={styles.labelBox}>
                <Text style={styles.labelStyle}>{label}</Text>
            </View>
            <View style={styles.inputBox}>
                <TextInput style={styles.input} defaultValue={defaultValue} value={date} editable={true} />
                <TouchableOpacity onPress={() => setShow(true)} style={styles.icon}>
                    <Icon name="calendar" size={25} color="#2c3e50" />
                </TouchableOpacity>
            </View>

            {show && <DateTimePicker
                mode="date"
                value={new Date()}
                onChange={(event, date) => {
                    if (date != undefined) {
                        onSubmit(date)
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
        marginEnd: 5
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
export default DatePicker