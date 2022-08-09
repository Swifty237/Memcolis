import React from "react";
import { TouchableOpacity, Text } from "react-native"

type ButtonProps = {
    label: string
    textStyle: {}
    buttonStyle: {}
    onPress: () => void
}

const Btn: React.FunctionComponent<ButtonProps> = ({ label, textStyle, buttonStyle, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle} >
            <Text style={textStyle}>{label}</Text>
        </TouchableOpacity>
    )
}

export default Btn