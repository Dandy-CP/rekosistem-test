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

const SignUp = () => {
  const [signedUp, setSignedUp] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigation = useNavigation();
  const { signUp } = useAuth();

  const formSchemaSignUp = z
    .object({
      email: z
        .string()
        .min(1, { message: "email is required" })
        .email("This is not a valid email."),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password can not less than 8 characters"),
      passwordConfirm: z
        .string()
        .min(1, "New Password is required")
        .min(8, "Password can not less than 8 characters"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ["passwordConfirm"],
    });

  const { resolver } = useValidationResolver(formSchemaSignUp);
  type FormSchemaType = z.infer<typeof formSchemaSignUp>;
  const defaultValues: FormSchemaType = {
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const methodsSignUp = useForm<FormSchemaType>({
    resolver,
    mode: "onChange",
    defaultValues,
  });

  const handleSignUp = async () => {
    setSignedUp(true);
    setError("");

    const { valueAuth, error } = await signUp(
      methodsSignUp.getValues().email,
      methodsSignUp.getValues().password
    );

    if (error) {
      console.log(error);
      setError(error?.message as string);
      setSignedUp(false);
      return;
    }

    if (valueAuth) {
      navigation.navigate("Auth" as never);
      setError("");
      setSignedUp(false);
    }
  };

  return (
    <React.Fragment>
      <ContentView contentContainerStyle={styles.wrapContainer}>
        <Text style={styles.textTop}>SignUp</Text>
        <Form methods={methodsSignUp}>
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
          <FieldInput
            type="password"
            name="passwordConfirm"
            label="Konfirmasi Kata Sandi"
            placeholder="Konfirmasi Kata Sandi"
            required
          />
        </Form>

        <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>

        <Button
          title="SignUp"
          onPress={() => {
            handleSignUp();
          }}
          disabled={
            !methodsSignUp.formState.isDirty || !methodsSignUp.formState.isValid
          }
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Auth" as never);
          }}
        >
          <Text style={styles.textDimmed}>Have Account? SignIn</Text>
        </TouchableOpacity>
      </ContentView>
      <LoadingOverlay isShown={signedUp} />
    </React.Fragment>
  );
};

export default SignUp;

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
});
