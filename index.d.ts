import {
    ColorValue,
    FlexStyle,
    KeyboardTypeOptions,
    NativeSyntheticEvent,
    StyleProp,
    TextInputChangeEventData,
    TextInputKeyPressEventData,
    TextInputSubmitEditingEventData,
    TextStyle,
    ViewStyle,
} from "react-native";

type DigitBoxProps = {
    // Styling Props
    borderBottomWidth?: number | undefined;
    borderColor?: ColorValue | undefined;
    boxBackgroundColor?: ColorValue | undefined;
    boxBorderRadius?: number | undefined;
    boxContainerStyle?: StyleProp<ViewStyle> | undefined;
    digitColor?: ColorValue | undefined;
    elevation?: number | undefined;

    // General Props
    animateDuration?: number | undefined;
    autoFocus?: boolean | undefined;
    cursorColor?: ColorValue | undefined;
    digitSize?: number | undefined;
    focused?: boolean | undefined;
    inputStyle?: StyleProp<TextStyle> | undefined;
    keyboardType?: KeyboardTypeOptions | undefined;
    maxLength?: number | undefined;
    onlyBorderBottom?: boolean | undefined;
    secureTextEntry?: boolean | undefined;
    value?: string | undefined;

    // Event Props
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void | undefined;
    onFocus?: () => void | undefined;
    onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void | undefined;
    onSubmitEditing?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void) | undefined
};

type OTPInputProps = {
    // General Props
    count?: number;
    removeOnBackspace?: boolean;
    autofocus?: boolean;
    onChangeText: ((text: string) => void) | undefined;
    onSubmitEditing?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void) | undefined
    value: string;

    // Container Props
    containerWidth?: FlexStyle["width"];
    containerStyle?: StyleProp<ViewStyle> | undefined;

    // DigitBox props
    allowDigitsOnly?: boolean | undefined;
    animateDuration?: number | undefined;
    borderBottomWidth?: number | undefined;
    borderColor?: ColorValue | undefined;
    boxBackgroundColor?: ColorValue | undefined;
    boxBorderRadius?: number | undefined;
    boxContainerStyle?: StyleProp<ViewStyle> | undefined;
    boxElevation?: number | undefined;
    boxHeight?: FlexStyle["height"] | undefined;
    cursorColor?: ColorValue | undefined;
    digitColor?: ColorValue | undefined;
    digitFontSize?: number | undefined;
    inputStyle?: StyleProp<TextStyle> | undefined;
    keyboardType?: KeyboardTypeOptions | undefined;
    margin?: FlexStyle["margin"] | undefined;
    maxLength?: number | undefined;
    onlyBorderBottom?: boolean | undefined;
    secureTextEntry?: boolean | undefined;
};

export type { DigitBoxProps, OTPInputProps };