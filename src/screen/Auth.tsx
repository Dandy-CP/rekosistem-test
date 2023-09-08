import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigation } from "@react-navigation/native";
import ContentView from "@/components/elements/ContentView";
import FieldInput from "@/components/elements/Input/FieldInput";
import Form from "@/components/elements/Input/FormProvider";
import useValidationResolver from "@/hooks/useValidationResolver";
import useAuth from "@/hooks/useAuth";
import LoadingOverlay from "@/components/elements/LoadingOverlay";

const Auth = () => {
  const [logingIn, setLogingIn] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const formSchemaSignIn = z.object({
    email: z
      .string()
      .min(1, { message: "email is required" })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password can not less than 8 characters"),
  });

  const { resolver } = useValidationResolver(formSchemaSignIn);
  type FormSchemaType = z.infer<typeof formSchemaSignIn>;
  const defaultValues: FormSchemaType = {
    email: "",
    password: "",
  };

  const methodsSignIn = useForm<FormSchemaType>({
    resolver,
    mode: "all",
    defaultValues,
  });

  const handleLogin = async () => {
    setLogingIn(true);
    setError("");

    const { error } = await signIn(
      methodsSignIn.getValues().email,
      methodsSignIn.getValues().password
    );

    if (error) {
      console.log(error);
      setError(error?.message as string);
      setLogingIn(false);
      return;
    }
  };

  return (
    <React.Fragment>
      <ContentView contentContainerStyle={styles.wrapContainer}>
        <Text style={styles.textTop}>LogIn</Text>

        <Form methods={methodsSignIn}>
          <FieldInput
            name="email"
            label="email"
            placeholder="Masukan Email"
            required
          />
          <FieldInput
            type="password"
            name="password"
            label="Kata Sandi"
            placeholder="Masukkan kata sandi"
            required
          />
        </Form>

        <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>

        <Button
          title="SignIn"
          onPress={() => {
            handleLogin();
          }}
          disabled={
            !methodsSignIn.formState.isDirty || !methodsSignIn.formState.isValid
          }
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp" as never);
          }}
        >
          <Text style={styles.textDimmed}>Sign Up With Email</Text>
        </TouchableOpacity>
      </ContentView>

      <LoadingOverlay isShown={logingIn} />
    </React.Fragment>
  );
};

export default Auth;

const styles = StyleSheet.create({
  wrapContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: 20,
  },
  textTop: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  textDimmed: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    color: "gray",
  },
  input: {
    width: "100%",
  },
});
