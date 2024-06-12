import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import Emoji from 'react-native-emoji';
import { Colors } from '@/constants/Colors';
import SwipeToLeft from './SwipeToLeft';

type CounterValues = {
    name: string,
    value: any,
    emoji: string,
    handleChange: (value: any) => void,
    handleRemove: () => void
}

export default function Counter({ name, value, emoji = 'coffee', handleChange, handleRemove }: CounterValues) {

    const updateValue = (val: any) => {
        handleChange(val)
    }

    return (
        <SwipeToLeft title='Supprimer' onSwipe={handleRemove}>
            <View style={styles.counterContainer}>
                <Emoji name={emoji} style={{ fontSize: 22 }} />
                <Text style={styles.counterTitle}>{name}</Text>
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

const styles = StyleSheet.create({
    counterContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: Colors.primaryExtraLight,
        height: 80,
        borderRadius: 12
    },
    counter: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
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
    },
    counterText: {
        fontSize: 18,
    },
    count: {
        fontSize: 18
    }
});