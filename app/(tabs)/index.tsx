import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {

  const [counters, setCounters] = useState([])

  const { top } = useSafeAreaInsets()

  const addCounter = () => {
    const data = [...counters, { name: `compteur ${counters.length + 1}`, value: 0 }]
    setCounters(data)
  }

  const handleChange = (index, value) => {
    const data = [...counters]
    data[index].value = value
    setCounters(data)
  }

  return (
    <SafeAreaView>
      <View style={{ ...styles.header, marginTop: -top, paddingTop: top + 30 }}>
        <Text style={styles.headerTitle}>Mes compteurs</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={addCounter}><Text>Add counter</Text></TouchableOpacity>

      {counters.map(({ name, value }, index) => <Counter key={name} name={name} value={value} handleChange={(e) => handleChange(index, e)} />)}
    </SafeAreaView>
  );
}

const Counter = ({ name, value, handleChange }) => {

  const updateValue = (val: any) => {
    handleChange(val)
  }

  return (
    <View style={styles.counterContainer}>
      <Text>{name}</Text>
      <View style={styles.counter}>
        <TouchableOpacity onPress={() => updateValue(value - 1)} style={styles.counterBtn} disabled={value <= 0}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.count}>{value}</Text>
        <TouchableOpacity onPress={() => updateValue(value + 1)} style={styles.counterBtn}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    backgroundColor: "red",
    paddingBottom: 30,
    marginBottom: 34
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 24
  },
  counterContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#EBEBEB"
  },
  counter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue"
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
    fontSize: 24,
  },
  count: {
    fontSize: 24
  }
});
