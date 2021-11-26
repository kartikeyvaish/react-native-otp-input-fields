import React, { useRef, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInputKeyPressEventData,
  TextInputChangeEventData,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

// components and utils
import DigitBox from "./components/DigitBox";
import isValidDigit from "./utils/ValidateInput";

// Import types
import { OTPInputProps } from "./types/input";

// Default Configurations
import {
  DEFAULT_BOX_HEIGHT,
  DEFAULT_CONTAINER_WIDTH,
  DEFAULT_COUNT,
  MARGIN,
} from "./utils/DefaultValues";

function Input(props: OTPInputProps) {
  // Destructure the props
  const {
    // Container and Box props
    containerWidth = DEFAULT_CONTAINER_WIDTH,
    containerStyle,
    margin = MARGIN,

    // General Props
    count = DEFAULT_COUNT,
    removeOnBackspace = true,

    // Input Props
    autofocus = true,
    onChangeText = () => {},
    value,

    // Other Props for DigitBox
    allowDigitsOnly = true,
    boxHeight = DEFAULT_BOX_HEIGHT,
    ...otherProps
  } = props;

  const TextInputRefs = useRef(
    new Array(count).fill(React.createRef<TextInput>())
  );
  const [Focused, SetFocused] = useState(0);

  // Function to handle text input change
  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    try {
      if (e.nativeEvent.text) {
        // if allowDigitsOnly is true, only allow digits
        if (allowDigitsOnly && !isValidDigit(e.nativeEvent.text)) return;

        // perform change operations and accordingly focus next input
        const editedText = value + e.nativeEvent.text;
        if (editedText.length < count) {
          TextInputRefs.current[editedText.length].focus();
          SetFocused(editedText.length);
        }
        onChangeText(editedText);
      }
    } catch (error) {}
  };

  // Function to handle backspace press
  const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    try {
      if (e.nativeEvent.key === "Backspace") {
        // If backspace is pressed execute the following operation
        if (value.length === 1 || value.length === 0) {
          if (value.length === 1 && Focused === 0) onChangeText("");
          else {
            if (removeOnBackspace) onChangeText("");
          }
          TextInputRefs.current[0].focus();
          SetFocused(0);
        } else {
          if (value.length === Focused) {
            TextInputRefs.current[Focused - 1].focus();
            SetFocused(Focused - 1);
            if (removeOnBackspace) onChangeText(value.slice(0, -1));
          } else {
            const editedText = value.slice(0, -1);
            onChangeText(editedText);
          }
        }
      }
    } catch (error) {}
  };

  // Styles for the container which has all the input fields
  const outerContainerStyle: StyleProp<ViewStyle> = [
    styles.container,
    { width: containerWidth, height: boxHeight },
    containerStyle,
  ];

  return (
    <View style={outerContainerStyle}>
      {[...Array(count)].map((e, index) => (
        <View key={index} style={{ flex: 1, margin: margin }}>
          <DigitBox
            ref={(ref) => (TextInputRefs.current[index] = ref)}
            value={value[index] || ""}
            autoFocus={autofocus && index === 0}
            focused={Focused === index ? true : false}
            onFocus={() => SetFocused(index)}
            onChange={onChange}
            onKeyPress={onKeyPress}
            // Extra Other Props
            {...otherProps}
          />
        </View>
      ))}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
