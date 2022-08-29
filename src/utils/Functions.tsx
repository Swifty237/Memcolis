import React, { useContext } from "react"
import firestore from "@react-native-firebase/firestore"
import { NewSendContext } from "./UserContext"
import auth from "@react-native-firebase/auth"
import storage from "@react-native-firebase/storage"
import uuid from "react-native-uuid"
import { ImageOrVideo } from "react-native-image-crop-picker"



const user = auth().currentUser

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

const uploadImagesToStorage = (path: string, imageName: string, idColis: string) => {

    const imagesRef = storage().ref("images" + "_" + user?.uid + "/colis" + idColis + "/" + imageName)
    const task = imagesRef.putFile(path)

    task.then(() => {
        console.log('Images uploaded to the bucket!')

    }).catch(err => console.error(err))
}


export const addColisIdAndRef = (photo: ImageOrVideo[]): void => {

    console.log("Enter addColisIdAndRef (SendPackage function)")

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

                            if (documentSnapshot.exists && documentSnapshot.data()?.id == "" && documentSnapshot.data()?.imgColis == "") {

                                firestore()
                                    .collection("colis")
                                    .doc(snapshot.id)
                                    .update({
                                        id: snapshot.id,
                                        imgColis: "images" + "_" + user?.uid + "/colis" + snapshot.id + "/"
                                    })
                                    .then(() => {

                                        const storeImages = () => {

                                            if (photo != []) {
                                                photo.forEach(image => {
                                                    let path = image.path
                                                    let imageName = image.modificationDate?.toString() + "_" + uuid.v4().toString()
                                                    uploadImagesToStorage(path, imageName, snapshot.id)
                                                })
                                            }
                                        }

                                        storeImages()

                                        console.log("id of colis added")
                                        console.log("ref of imgColis added")
                                        console.log("images stored")
                                    })
                            }
                            else return
                        })
                    console.log("2")
                }
            })

            console.log("3")
        })

    console.log("=> exit addColisIdAndRef (SendPackage function)")
}

const uploadTicketToStorage = (path: string, imageName: string, idColis: string) => {

    const imagesRef = storage().ref("images" + "_" + user?.uid + "/travel" + idColis + "/" + imageName)
    const task = imagesRef.putFile(path)

    task.then(() => {
        console.log('Images uploaded to the bucket!')

    }).catch(err => console.error(err))
}


export const addTravelIdAndRef = (photo: ImageOrVideo | undefined): void => {

    console.log("Enter addTravelIdAndRef (SendPackage function)")

    firestore()
        .collection("travel")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach((snapshot) => {

                if (snapshot.exists) {
                    firestore()
                        .collection("travel")
                        .doc(snapshot.id)
                        .onSnapshot((documentSnapshot) => {

                            if (documentSnapshot.exists && documentSnapshot.data()?.id == "" && documentSnapshot.data()?.planeTicket == "") {

                                firestore()
                                    .collection("travel")
                                    .doc(snapshot.id)
                                    .update({
                                        id: snapshot.id,
                                        planeTicket: "images" + "_" + user?.uid + "/travel" + snapshot.id + "/"
                                    })
                                    .then(() => {

                                        const storeImages = () => {

                                            if (photo != undefined) {

                                                let path = photo.path
                                                let imageName = photo.modificationDate?.toString() + "_" + uuid.v4().toString()
                                                uploadTicketToStorage(path, imageName, snapshot.id)

                                            }
                                        }

                                        storeImages()

                                        console.log("id of travel added")
                                        console.log("ref of planeTicket added")
                                        console.log("image stored")
                                    })
                            }
                            else return
                        })
                    console.log("2")
                }
            })

            console.log("3")
        })

    console.log("=> exit addTraveldAndRef (SendPackage function)")
}