import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import Emoji from 'react-native-emoji';
import { Colors } from '@/constants/Colors';
import SwipeToLeft from './SwipeToLeft';

interface CounterValues {
    name: string,
    value: any,
    emoji: string,
    handleChange: (value: any) => void,
    handleRemove: () => void
}

export default function Counter({ name, value, emoji = 'coffee', handleChange, handleRemove }: CounterValues) {

    const updateValue = (val: number) => {
        handleChange(val)
    }

    return (
        <SwipeToLeft title='Supprimer' onSwipe={handleRemove}>
            <View style={styles.counterContainer}>
                <View style={styles.counterContainerTitle}>
                    <View style={styles.counterSquare}>
                        <Emoji name={emoji} style={{ fontSize: 22 }} />
                    </View>
                    <Text style={styles.counterTitle}>{name}</Text>
                </View>
                <View style={styles.counter}>
                    <TouchableOpacity onPress={() => updateValue(value - 1)} style={styles.counterBtn} disabled={value <= 0}>
                        <Text style={styles.counterText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.count}>{value}</Text>
                    <TouchableOpacity onPress={() => updateValue(value + 1)} style={{ ...styles.counterBtn, backgroundColor: Colors.primary }}>
                        <Text style={{ ...styles.counterText, color: "#FFF" }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SwipeToLeft>
    )
}

const Shadow = {
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
        width: 0,
        height: 0
    },
    shadowRadius: 6
}

const styles = StyleSheet.create({
    counterContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: Colors.primary5,
        height: 80,
        borderRadius: 12
    },
    counter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    counterContainerTitle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    counterSquare: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 2,
        borderColor: Colors.primary30,
        ...Shadow
    },
    counterTitle: {
        fontSize: 18
    },
    counterBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        ...Shadow
    },
    counterText: {
        fontSize: 18,
    },
    count: {
        fontSize: 18
    }
});