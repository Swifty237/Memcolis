import React, { useState } from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import MapView, { Callout, Circle, Marker } from "react-native-maps"


const MapComponent = () => {
    const [pin, setPin] = useState({
        latitude: 48.940716,
        longitude: 2.016824
    })
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 48.940716,
                    longitude: 2.016824,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider="google">
                <Marker
                    coordinate={pin}
                    pinColor="black"
                    draggable={true}
                    onDragStart={(e) => {
                        console.log("Drag start :", e.nativeEvent.coordinate)
                    }}
                    onDragEnd={(e) => {
                        setPin({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                    }}>
                    <Callout>
                        <Text style={{ color: "black", fontSize: 12 }}>Je suis ici !</Text>
                    </Callout>
                </Marker>
                <Circle
                    center={pin}
                    radius={2000} />
            </MapView >
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },

    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 2
    }
})

export default MapComponent