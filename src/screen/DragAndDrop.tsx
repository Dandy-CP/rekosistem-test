import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Image, View } from "react-native";
import {
  NestableScrollContainer,
  NestableDraggableFlatList,
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Item = {
  key: string;
  label: string;
  height: number;
  width: number;
  backgroundColor: string;
};

const getColor = (i: number) => {
  const multiplier = 255 / (ITEMS.length - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
};

const ITEMS = [
  "B2222IKN",
  "A3590LMN",
  "C5543KKP",
  "A5555KYT",
  "B1ND",
  "A9OK",
  "B247882930PPP",
  "B3374892KH",
  "K738971843789KH",
  "R3852123LL",
];

const initialData1: Item[] = ITEMS.map((value, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: value,
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  };
});

const initialData2: Item[] = ITEMS.map((value, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: value,
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  };
});

const initialData3: Item[] = ITEMS.map((value, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: value,
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  };
});

const initialData4: Item[] = ITEMS.map((value, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: value,
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  };
});

const initialData5: Item[] = ITEMS.map((value, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: value,
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  };
});

const DragAndDrop = () => {
  const [data1, setData1] = useState(initialData1);
  const [data2, setData2] = useState(initialData2);
  const [data3, setData3] = useState(initialData3);
  const [data4, setData4] = useState(initialData4);
  const [data5, setData5] = useState(initialData5);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? "red" : item.backgroundColor },
          ]}
        >
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView>
      <View style={{ position: "relative", marginTop: 30, height: "100%" }}>
        <Image
          source={require("@/assets/Kapal.png")}
          style={{
            position: "absolute",
            height: "100%",
            width: 150,
          }}
        />

        <NestableScrollContainer>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <NestableDraggableFlatList
              data={data1}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              onDragEnd={({ data }) => setData1(data)}
              style={{ marginTop: 70, marginLeft: 20 }}
              dragItemOverflow={true}
            />

            <NestableDraggableFlatList
              data={data2}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              onDragEnd={({ data }) => setData2(data)}
              style={{ marginTop: 40, marginLeft: 3 }}
            />

            <NestableDraggableFlatList
              data={data3}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              onDragEnd={({ data }) => setData3(data)}
              style={{ marginTop: 30, marginLeft: 3 }}
            />

            <NestableDraggableFlatList
              data={data4}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              onDragEnd={({ data }) => setData4(data)}
              style={{ marginTop: 40, marginLeft: 3 }}
            />

            <NestableDraggableFlatList
              data={data5}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
              onDragEnd={({ data }) => setData5(data)}
              style={{ marginTop: 70, marginLeft: 3 }}
            />
          </View>
        </NestableScrollContainer>
      </View>
    </GestureHandlerRootView>
  );
};

export default DragAndDrop;

const styles = StyleSheet.create({
  rowItem: {
    height: 50,
    width: 20,
    marginBottom: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 5,
    textAlign: "center",
    transform: [{ rotate: "90deg" }],
  },
});
