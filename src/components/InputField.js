import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const InputField = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  style,
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
});

export default InputField;
