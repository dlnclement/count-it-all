import { Colors } from "@/constants/Colors";
import { Animated, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

interface SwipeToLeftValues {
    children: any,
    title: string,
    onSwipe: () => void,
    config?: {
        rightThreshold: number,
        backgroundColor: string
    }
}

export default function SwipeToLeft({ children, title, onSwipe, config = { rightThreshold: 100, backgroundColor: Colors.red } }: SwipeToLeftValues) {

    const renderRightActions = (progress: Animated.AnimatedInterpolation, dragAnimatedValue: Animated.AnimatedInterpolation) => {

        const opacity = dragAnimatedValue.interpolate({
            inputRange: [-50, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <View style={styles.swipedRow}>
                <Animated.View style={[styles.deleteButton, { opacity, backgroundColor: config.backgroundColor }]}>
                    <TouchableOpacity>
                        <Text style={styles.deleteButtonText}>{title}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions} onSwipeableWillOpen={onSwipe} rightThreshold={config.rightThreshold}>
            {children}
        </Swipeable>
    )

}

const styles = StyleSheet.create({
    swipedRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 5,
        minHeight: 80,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-end',
        height: '100%',
        flex: 1,
        borderRadius: 12,
        paddingHorizontal: 20
    },
    deleteButtonText: {
        color: '#fcfcfc',
        fontWeight: 'bold',
        padding: 3,
    },
});