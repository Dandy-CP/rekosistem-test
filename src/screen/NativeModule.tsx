import React, { useState } from "react";
import { Text, Button, View, StyleSheet } from "react-native";
import ContentView from "@/components/elements/ContentView";
import CustomTextInput from "@/components/elements/Input/CustomTextInput";
import ModalAlert from "@/components/elements/Modal";

const NativeModule = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  return (
    <ContentView style={{ height: "100%" }}>
      <Text style={{ textAlign: "center", fontWeight: "700", fontSize: 20 }}>
        Native Module Input & Modal
      </Text>

      <View style={style.container}>
        <CustomTextInput
          placeholder="Type text here"
          onChangeText={(value) => {
            setMessage(value);
          }}
        />

        <Button
          title="Open Modal"
          disabled={message.length === 0 ? true : false}
          onPress={() => {
            setModal(true);
          }}
        />
      </View>

      <ModalAlert
        visibility={modal}
        displayTitle="Alert"
        displayMsg={message}
        dismissAlert={setModal}
      />
    </ContentView>
  );
};

export default NativeModule;

const style = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: 50,
  },
});
