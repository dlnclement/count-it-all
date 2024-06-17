import { Colors } from "@/constants/Colors"
import { LinearGradient } from "expo-linear-gradient"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

interface ButtonValues {
    title: string,
    onPress: () => void
}

export default function Button({ title, onPress }: ButtonValues) {

    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[Colors.primary, Colors.secondary]} style={styles.button}>
                <Text style={styles.buttonText}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 18
    }
});