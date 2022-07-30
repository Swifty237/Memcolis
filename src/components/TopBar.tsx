import React from "react"
import { StyleSheet, View, Image, Text } from "react-native"
import { Appbar, Avatar } from "react-native-paper"

// type TopBarProps = {
//     title: string
// }

const TopBar: React.FunctionComponent = () => {

    return (

        <Appbar.Header style={{ width: "100%", backgroundColor: "#2c3e50" }}>
            <Avatar.Image size={40} source={require("../assets/logo_Memcolis.png")} />
            <Appbar.Content title="Profil" />
        </Appbar.Header>

        // <View style={styles.container}>
        //     <View style={styles.header}>
        //         <Text style={styles.text}>De <Text style={{ color: "#f39c12" }}>main</Text> en main ca va plus vite et c'est moins cher</Text>
        //         <View style={styles.logo}>
        //             <Image source={require("../assets/logo_Memcolis.png")} style={styles.image} />
        //             <Text style={styles.memcolis}>Memcolis</Text>
        //         </View>
        //     </View>

        //     <Text style={styles.welcomeText}>{title}</Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#2c3e50",
        width: "100%",
        height: 150
    },

    header: {
        flexDirection: "row"
    },

    logo: {
        flexDirection: "row",
        alignItems: "flex-end"
    },

    image: {
        width: 45,
        height: 45
    },

    memcolis: {
        color: "white",
        marginStart: 3
    },

    text: {
        color: "white",
        fontSize: 10,
        width: 150,
        textAlign: "right",
        marginEnd: 5
    },

    welcomeText: {
        color: "white",
        fontSize: 17,
        fontStyle: "italic",
        marginTop: 50
    }
})

export default TopBar