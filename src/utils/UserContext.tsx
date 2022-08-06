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
    adresse: string
    setAdresse: (param: string) => void
    tel: string
    setTel: (param: string) => void
    weight: string
    setWeight: (param: string) => void
    numberArticle: string
    setNumberArticle: (param: string) => void
}

export const NewSendContext = createContext<NewSendContextType>({
    visible: false,
    setVisible: () => { },
    destination: "Choisissez une destination",
    setDestination: () => { },
    destinataire: "",
    setDestinataire: () => { },
    adresse: "",
    setAdresse: () => { },
    tel: "",
    setTel: () => { },
    weight: "",
    setWeight: () => { },
    numberArticle: "",
    setNumberArticle: () => { }
})