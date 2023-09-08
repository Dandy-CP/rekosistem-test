import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

interface Iprops {
  isShown: boolean;
}

const LoadingOverlay = ({ isShown }: Iprops) => {
  return (
    <>
      {isShown && (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
          <Text style={{ color: "white" }}>Please Wait...</Text>
        </View>
      )}
    </>
  );
};

export default LoadingOverlay;
