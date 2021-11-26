// Imports
import React, { useEffect } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  ViewStyle,
} from "react-native";

// Re-Animated Imports
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// Types Import
import { DigitBoxProps } from "../types/input";

// Default Configurations
import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_BOTTOM_WIDTH,
  DEFAULT_CURSOR_COLOR,
  DEFAULT_DIGIT_COLOR,
  DEFAULT_ELEVATION,
  DEFAULT_FONT_SIZE,
  DEFAULT_KEYBOARD_TYPE,
  DEFAULT_MAX_LENGTH,
} from "../utils/DefaultValues";

// Function component to render a Digit Box
const DigitBox = React.forwardRef(
  (props: DigitBoxProps, ref: React.Ref<TextInput>) => {
    // Destructure the props
    const {
      // Container Props
      boxBackgroundColor = DEFAULT_BACKGROUND_COLOR,
      boxContainerStyle,
      onlyBorderBottom = true,
      digitColor = DEFAULT_DIGIT_COLOR,

      // DigitBox props
      secureTextEntry = false,
      animateDuration = DEFAULT_ANIMATION_DURATION,
      borderBottomWidth = DEFAULT_BORDER_BOTTOM_WIDTH,
      borderColor = DEFAULT_BORDER_COLOR,
      cursorColor = DEFAULT_CURSOR_COLOR,
      digitSize = DEFAULT_FONT_SIZE,
      elevation = DEFAULT_ELEVATION,
      focused = false,
      inputStyle,
      maxLength = DEFAULT_MAX_LENGTH,
      boxBorderRadius,
      keyboardType = DEFAULT_KEYBOARD_TYPE,

      // Input Props
      autoFocus = false,
      onChange = () => {},
      onFocus,
      onKeyPress,
      onSubmitEditing,
      value,
    } = props;

    // Animated Shared Value for Border Bottom Width animation
    const borderWidth = useSharedValue(0);

    // useEffect to detect changes focused props and set border bottom width accordingly
    useEffect(() => {
      // Set border bottom width to the default/passed prop if FOCUSED is true
      if (focused) borderWidth.value = borderBottomWidth;
      // Else set to zero
      else borderWidth.value = 0;
    }, [focused]);

    // Animated Style for border bottom width of Digit Box
    const animatedStyle = useAnimatedStyle(() => {
      return {
        // if onlyBorderBottom is true, set borderWidth to bottom only
        borderBottomWidth: onlyBorderBottom
          ? withTiming(borderWidth.value, {
              duration: animateDuration,
            })
          : undefined,

        // if onlyBorderBottom is false, set borderWidth to whole input field
        borderWidth: onlyBorderBottom
          ? undefined
          : withTiming(borderWidth.value, {
              duration: animateDuration,
            }),
      };
    });

    // Styles for the Box Container
    const BoxContainerStyle: StyleProp<ViewStyle> = [
      styles.container,
      {
        elevation: elevation,
        backgroundColor: boxBackgroundColor,
        borderBottomWidth: borderBottomWidth,
        borderColor: borderColor,
        borderRadius: boxBorderRadius,
      },
      boxContainerStyle,
      animatedStyle,
    ];

    // TextInput styles
    const TextInputStyle: StyleProp<TextStyle> = [
      styles.TextInputStyle,
      {
        fontSize: digitSize,
        color: digitColor,
      },
      inputStyle,
    ];

    // Render
    return (
      <Animated.View style={BoxContainerStyle}>
        <TextInput
          accessible
          ref={ref}
          maxLength={maxLength}
          value={value}
          keyboardType={keyboardType}
          selectionColor={cursorColor}
          style={TextInputStyle}
          autoFocus={autoFocus}
          secureTextEntry={secureTextEntry}
          // Event Props below
          onChange={onChange}
          onFocus={onFocus}
          onSubmitEditing={onSubmitEditing}
          onKeyPress={onKeyPress}
        />
      </Animated.View>
    );
  }
);

// Exporting DigitBox here
export default DigitBox;

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TextInputStyle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
});
