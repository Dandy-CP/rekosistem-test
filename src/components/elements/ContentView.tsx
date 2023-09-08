import React, { ForwardRefRenderFunction } from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props extends ScrollViewProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

const ContentView: ForwardRefRenderFunction<ScrollView, Props> = (
  props,
  ref
) => {
  const { style, noPadding = false, children, ...rest } = props;

  const newContentContainerStyle = StyleSheet.flatten([
    styles.contentContainer,
    noPadding && { padding: 0 },
    props.contentContainerStyle,
  ]);

  return (
    <SafeAreaView>
      <ScrollView
        {...rest}
        ref={ref}
        keyboardShouldPersistTaps="handled"
        style={props.style}
        contentContainerStyle={newContentContainerStyle}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContentView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
});
