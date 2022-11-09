import React, { useState } from "react"
import { StyleSheet, Text, View, Dimensions } from "react-native"
import MapView, { Callout, Marker } from "react-native-maps"


type LatLng = {
    id: number
    latitude: number | undefined
    longitude: number | undefined
}


const MapComponent = () => {
    const [pin, setPin] = useState<LatLng>({
        id: 0,
        latitude: 48.940716,
        longitude: 2.016824
    })


    const data: LatLng[] = [
        {
            id: 1,
            latitude: 48.940716,
            longitude: 2.016824
        },

        {
            id: 2,
            latitude: 48.9188568,
            longitude: 2.0225196
        },

        {
            id: 3,
            latitude: 48.858370,
            longitude: 2.294481
        },

        {
            id: 4,
            latitude: 48.892423,
            longitude: 2.215331
        }
    ]


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

                {
                    data.map(marker => {

                        return (
                            <Marker
                                key={marker.id}
                                coordinate={{ latitude: marker.latitude ? marker.latitude : 0, longitude: marker.longitude ? marker.longitude : 0 }}
                                pinColor="black"
                            >
                                <Callout>
                                    <Text style={{ color: "black", fontSize: 12 }}>Je suis ici !</Text>
                                </Callout>
                            </Marker>
                        )
                    })
                }

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