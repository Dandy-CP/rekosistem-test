import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomTextInput, { CustomTextInputProps } from "./CustomTextInput";

export type FieldType = "text" | "password";

export interface FieldProps {
  type?: FieldType;
  name: string;
}

interface Props extends FieldProps, CustomTextInputProps {}

const FieldInput = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { type = "text", name, ...restProps } = props;
  const { control } = useFormContext();
  const { field, fieldState } = useController({
    control,
    name,
  });

  const onPressShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <CustomTextInput
      onBlur={field.onBlur}
      onChangeText={field.onChange}
      value={field.value}
      error={fieldState?.error?.message}
      secureTextEntry={type === "password" && !showPassword}
      rightIconOnPress={type === "password" ? onPressShowPassword : undefined}
      rightIconComponent={
        type === "password"
          ? (size) => (
              <Ionicons
                name={!showPassword ? "eye-off" : "eye"}
                size={size}
                color="#929292"
              />
            )
          : undefined
      }
      {...restProps}
    />
  );
};

export default FieldInput;
