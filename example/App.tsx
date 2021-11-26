import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import OTPInput from "react-native-otp-input-fields";

export default function App() {
  const [OTP, SetOTP] = useState("");

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>{OTP}</Text>
      <OTPInput onChangeText={SetOTP} value={OTP} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
