import React, { useState } from "react"
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Btn from "../components/Btn"


const Settings: React.FunctionComponent = () => {
    const [profile, setProfile] = useState<boolean>(false)
    const [sender, setSender] = useState<boolean>(false)
    const [transporter, setTransporter] = useState<boolean>(false)
    const [traveler, setTraveler] = useState<boolean>(false)
    const [completeProfile, setCompleteProfile] = useState<boolean>(false)
    const [completeSender, setCompleteSender] = useState<boolean>(false)
    const [completeTransporter, setCompleteTransporter] = useState<boolean>(false)
    const [completeTraveler, setCompleteTraveler] = useState<boolean>(false)



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.annulation} onPress={() => setProfile(prev => !prev)}>
                        <Text style={styles.btnLabel2}>Profil</Text>
                        <SimpleLineIcons name={profile ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                    </TouchableOpacity>
                    {profile &&
                        <View style={styles.infosContainer}>
                            {!completeProfile ?
                                <View style={{ width: "100%" }}>
                                    <Text style={styles.text}>Incomplet</Text>
                                    <Btn label="Completer" textStyle={styles.modifLabel} buttonStyle={styles.modification} onPress={() => setCompleteProfile(true)}></Btn>
                                </View>

                                :
                                <View style={{ width: "100%" }}>
                                    <Text style={styles.text2}>Complet</Text>
                                    <Btn label="Modifier" textStyle={styles.modifLabel} buttonStyle={styles.modification} onPress={() => setCompleteProfile(false)}></Btn>
                                </View>
                            }
                        </View>
                    }
                </View>

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.annulation} onPress={() => setSender(prev => !prev)}>
                        <Text style={styles.btnLabel2}>Expediteur</Text>
                        <SimpleLineIcons name={sender ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                    </TouchableOpacity>
                    {sender &&
                        <View style={styles.infosContainer}>
                            {!completeSender ?
                                <View style={{ width: "100%" }}>
                                    <Text style={styles.text}>Incomplet</Text>
                                    <Btn label="Completer" textStyle={styles.modifLabel} buttonStyle={styles.modification} onPress={() => setCompleteSender(true)}></Btn>
                                </View>

                                :
                                <View style={{ width: "100%" }}>
                                    <Text style={styles.text2}>Complet</Text>
                                    <Btn label="Modifier" textStyle={styles.modifLabel} buttonStyle={styles.modification} onPress={() => setCompleteSender(false)}></Btn>
                                </View>
                            }
                        </View>
                    }

                </View>

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.annulation} onPress={() => setTransporter(prev => !prev)}>
                        <Text style={styles.btnLabel2}>Transporteur</Text>
                        <SimpleLineIcons name={transporter ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                    </TouchableOpacity>
                    {transporter &&
                        <View style={styles.infosContainer}>
                            {!completeTransporter ?
                                <View style={{ width: "100%" }}>
                                    <Text style={styles.text}>Incomplet</Text>
                                    <Btn label="Completer" textStyle={styles.modifLabel} buttonStyle={styles.modification} onPress={() => setCompleteTransporter(true)}></Btn>
                                </View>

                                :
                                <View style={{ width: "100%" }}>
                                    <Text style={styles.text2}>Complet</Text>
                                    <Btn label="Modifier" textStyle={styles.modifLabel} buttonStyle={styles.modification} onPress={() => setCompleteTransporter(false)}></Btn>
                                </View>
                            }
                        </View>
                    }

                </View>

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.annulation} onPress={() => setTraveler(prev => !prev)}>
                        <Text style={styles.btnLabel2}>Voyageur</Text>
                        <SimpleLineIcons name={traveler ? "arrow-up" : "arrow-down"} size={20} color="#f39c12" />
                    </TouchableOpacity>
                    {traveler &&
                        <View style={styles.infosContainer}>
                            {!completeTraveler ?
                                <View style={{ width: "100%" }}>
                                    <Text style={styles.text}>Incomplet</Text>
                                    <Btn label="Completer" textStyle={styles.modifLabel} buttonStyle={styles.modification} onPress={() => setCompleteTraveler(true)}></Btn>
                                </View>

                                :
                                <View style={{ width: "100%" }}>
                                    <Text style={styles.text2}>Complet</Text>
                                    <Btn label="Modifier" textStyle={styles.modifLabel} buttonStyle={styles.modification} onPress={() => setCompleteTraveler(false)}></Btn>
                                </View>
                            }
                        </View>
                    }
                </View>

                <View style={{ marginTop: 20 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    },

    btnContainer: {
        alignItems: "center",
        justifyContent: "center"
    },

    infosContainer: {
        flex: 1,
        width: 300,

        alignItems: "center",
        justifyContent: "space-between"
    },

    text: {
        color: "red",
        width: "100%"
    },

    text2: {
        color: "green",
        width: "100%"
    },

    annulation: {
        backgroundColor: "#2c3e50",
        width: 350,
        height: 50,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 15,
        borderWidth: 2,
        borderColor: "#f39c12",
        alignItems: "center"
    },

    btnLabel2: {
        color: "#f39c12",
        textAlign: "center"
    },

    modifLabel: {
        color: "#f39c12",
        textAlign: "center",
        fontSize: 11
    },

    modification: {
        backgroundColor: "#2c3e50",
        width: 100,
        height: 40,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 15,
        borderWidth: 2,
        borderColor: "#f39c12",
        alignItems: "center",
        alignSelf: "flex-end"
    }

})

export default Settings