import { StyleSheet, View, Text, SafeAreaView, Dimensions, FlatList } from 'react-native';

import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Counter from '@/components/Counter';
import Button from '@/components/Button';
import emojiList from '@/utils/emoji.json';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('screen')

export default function Counters() {

  const [counters, setCounters] = useState<[{ name: string, value: any }] | []>([])
  const { top } = useSafeAreaInsets()
  const { setItem, getItem } = useAsyncStorage("counters")

  const emojiKeys = Object.keys(emojiList)

  useEffect(() => {
    const getStorage = async () => {
      const data = await getItem()
      setCounters(JSON.parse(data))
    }

    getStorage()
  }, [])

  const addCounter = () => {
    const emoji = emojiKeys[Math.floor(Math.random() * emojiKeys.length)];
    const data = [...counters, { name: `compteur ${counters.length + 1}`, value: 0, emoji }]
    updateCounters(data)
  }

  const handleChange = (index: number, value: number) => {
    const data = [...counters]
    data[index].value = value
    updateCounters(data)
  }

  const handleRemove = (index: number) => {
    const data = [...counters.filter((_, idx) => idx !== index)]
    updateCounters(data)
  }

  const updateCounters = (values: []) => {
    setCounters(values)
    setItem(JSON.stringify(values))
  }

  const renderItem = (item: any, index: number) => {
    return <Counter key={`counter-${index}`} {...item} handleChange={(e) => handleChange(index, e)} handleRemove={() => handleRemove(index)} />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "#FFF", height: height }}>
        <View style={{ ...styles.header, marginTop: -top, paddingTop: top + 30 }}>
          <Text style={styles.headerTitle}>Mes compteurs</Text>
        </View>
        <View style={styles.container}>
          <Button title='Nouveau compteur' onPress={addCounter} />
          <FlatList
            contentContainerStyle={styles.counters}
            data={counters}
            renderItem={i => renderItem(i.item, i.index)}
          />

        </View>
      </SafeAreaView>
    </GestureHandlerRootView>

  );
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
  }
});
