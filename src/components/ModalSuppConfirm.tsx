import React from "react"
import { View, Modal, Pressable, Text, StyleSheet } from "react-native"
import Btn from "./Btn"


type ModalInfosType = {
    visibleInfos: boolean
    infos: string
    getVisibleInfos: (param: boolean) => void
    getItemToDelete: (param: string) => void
    getDelete: () => void
}


const ModalSuppConfrim: React.FunctionComponent<ModalInfosType> = ({ visibleInfos, infos, getVisibleInfos, getItemToDelete, getDelete }): JSX.Element => {

    return (
        <Modal visible={visibleInfos} animationType="slide" transparent={true}>
            <View style={styles.container}>
                <View style={styles.infosBox}>
                    <View style={{ marginTop: 25 }}>
                        <Text style={styles.textInfos}>{infos}</Text>
                    </View>
                    <View>
                        <Btn
                            label="Confimer"
                            textStyle={styles.btnLabel}
                            buttonStyle={styles.btnConfirmation}
                            onPress={() => {
                                getDelete()
                                getVisibleInfos(false)
                            }}
                        />

                        <Btn
                            label="Annuler"
                            textStyle={styles.btnLabel}
                            buttonStyle={styles.btnStyle}
                            onPress={() => {
                                getVisibleInfos(false)
                                getItemToDelete("")
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 400,
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#2c3e50",
        marginTop: 150,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#2c3e50"
    },

    textStatus: {
        color: "white",
        fontStyle: "italic",
        marginBottom: 10
    },

    textInfos: {
        color: "white",
        fontStyle: "italic",
        marginBottom: 10
    },

    btnLabel: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15
    },

    btnBox: {
        backgroundColor: "#3742fa",
        marginEnd: 5,
        height: 50,
        padding: 15,
        borderRadius: 5
    },

    btnStyle: {
        backgroundColor: "#f39c12",
        width: 150,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
    },

    btnConfirmation: {
        backgroundColor: "red",
        width: 150,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
    },

    infosBox: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        width: "75%"
    },

    cancelBtn: {
        borderWidth: 1,
        borderRadius: 2,
        paddingHorizontal: 5,
        alignSelf: "flex-end",
        margin: 5,
        backgroundColor: "white"
    }
})


export default ModalSuppConfrim