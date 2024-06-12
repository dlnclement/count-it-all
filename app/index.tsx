import { StyleSheet, View, Text, SafeAreaView, Dimensions, FlatList } from 'react-native';

import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Counter from '@/components/Counter';
import Button from '@/components/Button';
import emojiList from '@/utils/emoji.json';

const { height } = Dimensions.get('screen')

export default function Counters() {

  const [counters, setCounters] = useState<[{ name: string, value: any }] | []>([])
  const { top } = useSafeAreaInsets()
  const emojiKeys = Object.keys(emojiList)

  const addCounter = () => {
    const emoji = emojiKeys[Math.floor(Math.random() * emojiKeys.length)];
    const data = [...counters, { name: `compteur ${counters.length + 1}`, value: 0, emoji }]
    setCounters(data)
  }

  const handleChange = (index: number, value: number) => {
    const data = [...counters]
    data[index].value = value
    setCounters(data)
  }

  const handleRemove = (index: number) => {
    setCounters([...counters.filter((_, idx) => idx !== index)])
  }

  const renderItem = (item: any, index: number) => {
    return <Counter key={item.name} {...item} handleChange={(e) => handleChange(index, e)} handleRemove={() => handleRemove(index)} />
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
            keyExtractor={item => item.key}
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
