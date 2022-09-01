import React, { useContext } from "react"
import firestore from "@react-native-firebase/firestore"
import { NewSendContext } from "./UserContext"
import auth from "@react-native-firebase/auth"
import storage from "@react-native-firebase/storage"
import uuid from "react-native-uuid"
import { ImageOrVideo } from "react-native-image-crop-picker"
import { boolean } from "yup/lib/locale"



const user = auth().currentUser

type uploadToStorageType = {
    path: string
    imageName: string
    folderName: string
    idColis?: string
}

type addIdAndImgRefType = {
    photo: ImageOrVideo[] | undefined
    collection: string
    folderName: string
}

type addTravelIdAndImgRefType = {
    photo: ImageOrVideo | undefined
    collection: string
    folderName: string
}

export const addDocumentId = (): void => {

    console.log("addDocumentId (UserHome function)")

    firestore()
        .collection("user")
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach((snapshot) => {

                if (snapshot.exists) {
                    firestore()
                        .collection("user")
                        .doc(snapshot.id)
                        .onSnapshot((documentSnapshot) => {

                            if (documentSnapshot.exists && documentSnapshot.data()?.id == "") {

                                firestore()
                                    .collection("user")
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

const uploadToStorage = ({ path, folderName, imageName }: uploadToStorageType) => {

    const imagesRef = storage().ref(folderName + "_" + user?.uid + "/" + imageName)
    const task = imagesRef.putFile(path)

    task.then(() => {
        console.log('Images uploaded to the bucket!')

    }).catch(err => console.error(err))
}


export const addTravelIdAndImgRef = ({ photo, collection, folderName }: addTravelIdAndImgRefType): void => {

    console.log("Enter addIdAndImgRef (SendPackage function)")

    firestore()
        .collection(collection)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach((snapshot) => {

                if (snapshot.exists) {
                    firestore()
                        .collection(collection)
                        .doc(snapshot.id)
                        .onSnapshot((documentSnapshot) => {

                            if (documentSnapshot.exists && documentSnapshot.data()?.id == "" && documentSnapshot.data()?.planeTicket == "") {

                                firestore()
                                    .collection(collection)
                                    .doc(snapshot.id)
                                    .update({
                                        id: snapshot.id,
                                        planeTicket: folderName + "_" + user?.uid + "/" + collection + snapshot.id + "/"
                                    })
                                    .then(() => {

                                        const storeImages = () => {

                                            if (photo != undefined) {

                                                let path = photo.path
                                                let imageName = photo.modificationDate?.toString() + "_" + uuid.v4().toString()

                                                uploadToStorage({ path: path, folderName: folderName, imageName: imageName, idColis: snapshot.id })

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

    console.log("=> exit  addIdAndImgRef  (SendPackage function)")
}



export const addIdCardImgRef = ({ photo, collection, folderName }: addIdAndImgRefType): void => {

    console.log("Enter addIdAndImgRef (SendPackage function)")

    firestore()
        .collection(collection)
        .doc(user?.uid)
        .update({
            idCard: folderName + "_" + user?.uid + "/"
        })
        .then(() => {

            const storeImages = () => {

                if (photo != undefined) {

                    photo.forEach(image => {
                        let path = image.path
                        let imageName = image.modificationDate?.toString() + "_" + uuid.v4().toString()

                        uploadToStorage({ path: path, folderName: folderName, imageName: imageName })
                    })

                }
            }

            storeImages()

            console.log("id of travel added")
            console.log("ref of planeTicket added")
            console.log("image stored")
        })

    console.log("=> exit  addIdAndImgRef  (SendPackage function)")
}