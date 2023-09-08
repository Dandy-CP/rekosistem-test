import React from "react";
import { Modal, Text, View, StyleSheet, Button } from "react-native";

interface Iprops {
  displayTitle: string;
  displayMsg: string;
  visibility: boolean;
  dismissAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAlert = ({
  displayTitle,
  displayMsg,
  visibility,
  dismissAlert,
}: Iprops) => {
  return (
    <View>
      <Modal visible={visibility} transparent={true} animationType="slide">
        <View style={style.container}>
          <View style={style.box}>
            <View style={{ alignItems: "center", margin: 10 }}>
              <Text style={{ fontSize: 25, marginTop: 5 }}>{displayTitle}</Text>
              <Text style={{ fontSize: 18, marginTop: 5, color: "grey" }}>
                {displayMsg}
              </Text>
            </View>

            <View style={style.buttonWarp}>
              <Button title="Oke.." onPress={() => dismissAlert(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalAlert;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 60,
    width: "90%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 7,
    elevation: 10,
  },
  buttonWarp: {
    width: "100%",
    padding: 10,
  },
});
