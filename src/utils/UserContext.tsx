import React, { createContext } from "react"


enum STACKCHOICE { SIGN_IN, LOGGED }

export type contextType = {
    isLoggedIn: STACKCHOICE.SIGN_IN | STACKCHOICE.LOGGED
    setIsLoggedIn: (param: number) => void
    userEmail: string
    setUserEmail: (param: string) => void
    userPassword: string
    setUserPassword: (param: string) => void
    userUID: string
    setUserUID: (param: string) => void
}

export const UserContext = createContext<contextType>({
    isLoggedIn: STACKCHOICE.SIGN_IN,
    setIsLoggedIn: () => { },
    userEmail: "",
    setUserEmail: () => { },
    userPassword: "",
    setUserPassword: () => { },
    userUID: "",
    setUserUID: () => { }
})


export type NewSendContextType = {
    visible: boolean
    setVisible: (param: boolean) => void
    destination: string
    setDestination: (param: string) => void
    destinataire: string
    setDestinataire: (param: string) => void
    adress: string
    setAdress: (param: string) => void
    tel: string
    setTel: (param: string) => void
    weight: string
    setWeight: (param: string) => void
    numberArticle: string
    setNumberArticle: (param: string) => void
    travel: "Oui" | "Non"
    setTravel: (param: "Oui" | "Non") => void
    transport: "Oui" | "Non"
    setTransport: (param: "Oui" | "Non") => void
}

export const NewSendContext = createContext<NewSendContextType>({
    visible: false,
    setVisible: () => { },
    destination: "Choisissez une destination",
    setDestination: () => { },
    destinataire: "",
    setDestinataire: () => { },
    adress: "",
    setAdress: () => { },
    tel: "",
    setTel: () => { },
    weight: "",
    setWeight: () => { },
    travel: "Oui",
    setTravel: () => { },
    transport: "Oui",
    setTransport: () => { },
    numberArticle: "",
    setNumberArticle: () => { }
})

export type NewSaleContextType = {
    visible: boolean
    setVisible: (param: boolean) => void
    destination: string
    setDestination: (param: string) => void
    departureDate: string
    setDepartureDate: (param: string) => void
    arrivalDate: string
    setArrivalDate: (param: string) => void
    weight: string
    setWeight: (param: string) => void
}

export const NewSaleContext = createContext<NewSaleContextType>({
    visible: false,
    setVisible: () => { },
    destination: "Choisissez une destination",
    setDestination: () => { },
    departureDate: "",
    setDepartureDate: () => { },
    arrivalDate: "",
    setArrivalDate: () => { },
    weight: "",
    setWeight: () => { }
})

export type EditerContextType = {
    editProfile: boolean
    setEditProfile: (param: boolean) => void
    editIdCard: boolean
    setEditIdCard: (param: boolean) => void
    editProofOfAdress: boolean
    setEditProofOfAdress: (param: boolean) => void
    editRib: boolean
    setEditRib: (param: boolean) => void
    editBankCard: boolean
    setEditBankCard: (param: boolean) => void
}

export const EditerContext = createContext<EditerContextType>({
    editProfile: false,
    setEditProfile: () => { },
    editIdCard: false,
    setEditIdCard: () => { },
    editProofOfAdress: false,
    setEditProofOfAdress: () => { },
    editRib: false,
    setEditRib: () => { },
    editBankCard: false,
    setEditBankCard: () => { }
})