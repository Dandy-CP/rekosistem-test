import React, { useCallback, useState, useRef, forwardRef } from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

export interface CustomTextInputProps extends TextInputProps {
  label?: string;
  value?: string;
  error?: string;
  success?: string;
  required?: boolean;
  textInputContainerStyle?: StyleProp<ViewStyle>;
  leftIconComponent?: (size: number, color: string) => React.ReactNode;
  rightIconComponent?: (size: number, color: string) => React.ReactNode;
  rightIconOnPress?: () => void;
  leftIconOnPress?: () => void;
}

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (props: CustomTextInputProps, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const customRef = useRef<TextInput>();

    const {
      label,
      value,
      error,
      success,
      required,
      keyboardType,
      multiline = false,
      editable = true,
      onFocus,
      onBlur,
      placeholderTextColor = "#929292",
      selectionColor = "rgba(0, 0, 0, 0.2)",
      style,
      textInputContainerStyle,
      leftIconComponent,
      rightIconComponent,
      leftIconOnPress,
      rightIconOnPress,
      ...restProps
    } = props;

    const currentIconColor = isFocused ? "#FECA30" : "#929292";

    const handleOnFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus && onFocus(e);
        setIsFocused(true);
      },
      [onFocus]
    );

    const handleOnBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur && onBlur(e);
        setIsFocused(false);
      },
      [onBlur]
    );

    return (
      <View>
        <View style={{ margin: 16 }}>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.requiredText}>{"    *"}</Text>}
          </Text>
        </View>

        <View
          style={[
            styles.defaultTextInputContainer,
            isFocused && { borderColor: "#FECA30" },
            !!error && { borderColor: "#F11C0E" },
            !editable && styles.disabledContainer,
            multiline && styles.multilineContainer,
            textInputContainerStyle,
          ]}
        >
          {leftIconComponent && (
            <TouchableWithoutFeedback
              onPress={() => {
                rightIconOnPress && rightIconOnPress();
              }}
              style={styles.leftIconContainer}
            >
              <View>{leftIconComponent(24, currentIconColor)}</View>
            </TouchableWithoutFeedback>
          )}

          <TextInput
            {...restProps}
            style={[multiline && styles.textAlignTop, style, { width: "100%" }]}
            keyboardType={keyboardType}
            selectionColor={selectionColor}
            value={value}
            multiline={multiline}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            placeholderTextColor={placeholderTextColor}
            editable={editable}
            ref={(ref ? ref : customRef) as any}
          />

          {rightIconComponent && (
            <TouchableWithoutFeedback
              style={styles.rightIconContainer}
              onPress={() => {
                rightIconOnPress && rightIconOnPress();
              }}
            >
              <View style={{ marginLeft: "auto" }}>
                {rightIconComponent(24, currentIconColor)}
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>

        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {!!success && <Text style={styles.successText}>{success}</Text>}
      </View>
    );
  }
);

export default CustomTextInput;

const styles = StyleSheet.create({
  defaultTextInputContainer: {
    height: 50,
    borderRadius: 16,
    backgroundColor: "white",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E4E4E4",
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  defaultStyle: {
    flex: 1,
    height: "100%",
  },
  multilineContainer: {
    height: 100,
    paddingVertical: 8,
  },
  disabledContainer: {
    backgroundColor: "#929292",
  },
  textAlignTop: {
    textAlignVertical: "top",
  },
  leftIconContainer: {
    height: "100%",
  },
  rightIconContainer: {
    height: "100%",
  },

  label: {
    color: "#929292",
    fontSize: 12,
    fontWeight: "500",
  },
  requiredText: {
    color: "#929292",
    letterSpacing: -2,
    fontSize: 12,
  },
  errorText: {
    color: "#929292",
    fontSize: 12,
    marginTop: 6,
  },
  successText: {
    color: "#929292",
    fontSize: 12,
    marginTop: 6,
  },
});
