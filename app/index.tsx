import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Dimensions, Animated, FlatList } from 'react-native';

import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const { height } = Dimensions.get('screen')

export default function Counters() {

  const [counters, setCounters] = useState<[{ name: string, value: any }] | []>([])
  const { top, bottom } = useSafeAreaInsets()

  const addCounter = () => {
    const data = [...counters, { name: `compteur ${counters.length + 1}`, value: 0 }]
    setCounters(data)
  }

  const handleChange = (index: number, value: number) => {
    const data = [...counters]
    data[index].value = value
    setCounters(data)
  }

  const renderItem = (item, index) => <Counter key={item.name} name={item.name} value={item.value} handleChange={(e) => handleChange(index, e)} />

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "#FFF", height: height }}>
        <View style={{ ...styles.header, marginTop: -top, paddingTop: top + 30 }}>
          <Text style={styles.headerTitle}>Mes compteurs</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={addCounter}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[Colors.primary, Colors.secondary]} style={styles.button}>
              <Text style={styles.buttonText}>Add counter</Text>
            </LinearGradient>
          </TouchableOpacity>

          <FlatList
            contentContainerStyle={styles.counters}
            data={counters}
            renderItem={i => renderItem(i.item, i.index)}
            keyExtractor={item => item.id}
          />

        </View>
      </SafeAreaView>
    </GestureHandlerRootView>

  );
}

type CounterValues = {
  name: string,
  value: any,
  handleChange: any
}

const Counter = ({ name, value, handleChange }: CounterValues) => {

  const updateValue = (val: any) => {
    handleChange(val)
  }

  const renderRightActions = (progress: Animated.AnimatedInterpolation, dragAnimatedValue: Animated.AnimatedInterpolation) => {

    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-200, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.swipedRow}>
        <Animated.View style={[styles.deleteButton, { opacity }]}>
          <TouchableOpacity>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} onSwipeableOpen={(event) => console.log(event)} dragOffsetFromRightEdge={1}>
      <View style={styles.counterContainer}>
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
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingBottom: 30,
    marginBottom: 34
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24
  },
  container: {
    paddingHorizontal: 20,
    gap: 34
  },
  counters: {
    gap: 20
  },

  button: {
    height: 40,
    paddingHorizontal: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18
  },

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
  },

  swipedRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
    minHeight: 80,
  },
  deleteButton: {
    backgroundColor: '#b60000',
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
