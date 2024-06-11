import { Image, StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

import { useEffect, useState } from 'react';

export default function HomeScreen() {

  const [count, setCount] = useState(0)
  const { setItem } = useAsyncStorage('count')

  useEffect(() => {
    setItem(`${count}`)
  }, [count])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#A1CEDC' }}
      headerImage={
        <Image
          source={require('@/assets/images/count-it-all.png')}
          style={styles.reactLogo}
        />
      }>
      <View style={styles.counter}>
        <TouchableOpacity onPress={() => setCount(count - 1)} style={styles.counterBtn} disabled={count <= 0}>
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.count}>{count}</Text>
        <TouchableOpacity onPress={() => setCount(count + 1)} style={styles.counterBtn}>
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 250,
    width: Dimensions.get('screen').width,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  counter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20
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
    fontSize: 24,
    color: "#FFFFFF",
  }
});
