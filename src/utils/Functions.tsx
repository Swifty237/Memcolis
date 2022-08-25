import React from "react"
import firestore from "@react-native-firebase/firestore"


export const addDocumentId = (): void => {

    console.log("addDocumentId (UserHome function)")

    firestore()
        .collection("users")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach((snapshot) => {

                if (snapshot.exists) {
                    firestore()
                        .collection("users")
                        .doc(snapshot.id)
                        .onSnapshot((documentSnapshot) => {

                            if (documentSnapshot.exists && documentSnapshot.data()?.id == "") {

                                firestore()
                                    .collection("users")
                                    .doc(snapshot.id)
                                    .update({ id: snapshot.id })
                                    .then(() => {
                                        console.log("id of ", documentSnapshot.data()?.name, " added")

                                    })
                            }
                            else return
                        })
                    console.log("2")
                }
                else return
            })

            console.log("3")
        })

    console.log("=> exit addDocumentId (UserHome function)")
}


export const addColisId = (): void => {

    console.log("addColisId (SendPackage function)")

    firestore()
        .collection("colis")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach((snapshot) => {

                if (snapshot.exists) {
                    firestore()
                        .collection("colis")
                        .doc(snapshot.id)
                        .onSnapshot((documentSnapshot) => {

                            if (documentSnapshot.exists && documentSnapshot.data()?.id == "") {

                                firestore()
                                    .collection("colis")
                                    .doc(snapshot.id)
                                    .update({ id: snapshot.id })
                                    .then(() => {
                                        console.log("id of colis added")

                                    })
                            }
                            else return
                        })
                    console.log("2")
                }
                else return
            })

            console.log("3")
        })

    console.log("=> exit addColisId (SendPackage function)")
}