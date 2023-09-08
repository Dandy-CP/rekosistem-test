import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "@/screen/Auth";
import SignUp from "@/screen/SignUp";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStack;
