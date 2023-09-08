import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Transaksi from "@/screen/Transaksi";
import NativeModule from "@/screen/NativeModule";
import DragAndDrop from "@/screen/DragAndDrop";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = "";

          if (route.name === "Transaksi") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Native Module") {
            iconName = focused ? "code" : "code-outline";
          } else if (route.name === "Drag And Drop") {
            iconName = focused ? "layers" : "layers-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Transaksi"
        component={Transaksi}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Native Module"
        component={NativeModule}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Drag And Drop"
        component={DragAndDrop}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default AppStack;
