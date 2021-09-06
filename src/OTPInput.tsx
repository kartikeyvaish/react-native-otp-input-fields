import React, { useRef } from "react";
import {
  Dimensions,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import * as Clipboard from "expo-clipboard";

const ScreenWidth = Dimensions.get("screen").width;

type Props = {
  headerTitle?: string;
  headerTitleColor?: TextStyle["color"];
  activeBorderColor?: TextStyle["color"];
  disabledBorderColor?: TextStyle["color"];
  children?: React.ReactNode;
  HeaderComponent?: React.ReactNode;
  FooterComponent?: React.ReactNode;
  value?: string;
  activeBorderWidth?: number;
  disabledBorderWidth?: number;
  valueStyle?: TextStyle | TextStyle[];
  headerTitleStyle?: TextStyle | TextStyle[];
  containerStyle?: ViewStyle | ViewStyle[];
  OTPContainerStyle?: ViewStyle | ViewStyle[];
  TextInputViewStyle?: ViewStyle | ViewStyle[];
  TextInputStyle?: ViewStyle | ViewStyle[];
  length?: number;
  autofocus?: boolean;
  onChangeText: Function;
};

function OTPInput({
  length = 6,
  value = "",
  activeBorderColor = "#03DAC6",
  disabledBorderColor = "grey",
  activeBorderWidth = 3,
  disabledBorderWidth = 1,
  headerTitle = ``,
  headerTitleColor = "black",
  children = null,
  HeaderComponent = null,
  FooterComponent = null,
  headerTitleStyle = {},
  containerStyle = {},
  OTPContainerStyle = {},
  TextInputViewStyle = {},
  TextInputStyle = {},
  autofocus = false,
  onChangeText = (text: string) => {},
}: Props) {
  const TextInputRefs = useRef(new Array(length).fill({}));
  const [Focused, SetFocused] = React.useState(0);

  // UseEffect to handle code copy and app State change
  React.useEffect(() => {
    const subscription = Clipboard.addClipboardListener(CheckClipBoard);

    return () => Clipboard.removeClipboardListener(subscription);
  }, []);

  // Function to check clipboard OTP
  const CheckClipBoard = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      let result = /^[0-9\b]+$/.test(text);
      if (result) {
        if (text.length === length) {
          SetFocused(text.length - 1);
          onChangeText(text);
        }
      }
    } catch (error) {}
  };

  // Function to handle text input change
  const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    try {
      if (e.nativeEvent.key === "Backspace") {
        if (value.length === 1 || value.length === 0) {
          onChangeText("");
          TextInputRefs.current[0].focus();
          SetFocused(0);
        } else if (value.length > 0) {
          const editedText = value.slice(0, -1);
          onChangeText(editedText);
          TextInputRefs.current[editedText.length - 1].focus();
          SetFocused(editedText.length - 1);
        }
      }
    } catch (error) {}
  };

  // Function to handle text input change
  const onChange = (e: any) => {
    try {
      if (e.nativeEvent.text) {
        const editedText = value + e.nativeEvent.text;
        if (editedText.length < length) {
          TextInputRefs.current[editedText.length].focus();
          SetFocused(editedText.length);
        }
        onChangeText(editedText);
      }
    } catch (error) {}
  };

  const headerTitleStyleObj = {
    ...styles.headerTitleStyle,
    color: headerTitleColor,
    ...headerTitleStyle,
  };

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      {HeaderComponent ? HeaderComponent : null}

      {headerTitle ? (
        <Text style={headerTitleStyleObj}>{headerTitle}</Text>
      ) : null}

      <View style={[styles.OTPContainerStyle, OTPContainerStyle]}>
        {[...Array(length)].map((e, index) => (
          <View
            key={index}
            style={[
              styles.TextInputViewStyle,
              {
                borderBottomColor:
                  Focused === index ? activeBorderColor : disabledBorderColor,
                borderBottomWidth:
                  Focused === index ? activeBorderWidth : disabledBorderWidth,
              },
              TextInputViewStyle,
            ]}
          >
            <TextInput
              style={[styles.TextInputStyle, TextInputStyle]}
              onFocus={() => SetFocused(index)}
              maxLength={1}
              autoFocus={autofocus && index === 0}
              keyboardType="number-pad"
              ref={(ref) => (TextInputRefs.current[index] = ref)}
              value={value[index] || ""}
              onChange={onChange}
              onKeyPress={onKeyPress}
              accessible
            />
          </View>
        ))}

        {children ? children : null}
      </View>

      {FooterComponent ? FooterComponent : null}
    </View>
  );
}

export default OTPInput;

const styles = StyleSheet.create({
  OTPContainerStyle: {
    width: ScreenWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  TextInputViewStyle: {
    flex: 1,
    margin: 5,
    minHeight: 50,
  },
  TextInputStyle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  containerStyle: {
    alignItems: "center",
  },
});
