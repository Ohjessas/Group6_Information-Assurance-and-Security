// screens/OTP.js
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { API_BASE } from "../api";

const OTP = ({ route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to next input
      if (index < 5) {
        inputs.current[index + 1].focus();
      }
    } else if (text === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const verifyOTP = async () => {
    const code = otp.join("");

    if (code.length < 6) {
      return Alert.alert("Incomplete", "Please enter the full 6-digit OTP.");
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert("✅ Success", "Welcome to G!");
      } else {
        Alert.alert("❌ Failed", data.message || "Incorrect OTP.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not verify OTP.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.inputBox}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            returnKeyType="next"
            autoFocus={index === 0}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={verifyOTP}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#025c1b",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  inputBox: {
    width: 45,
    height: 55,
    backgroundColor: "#fff",
    marginHorizontal: 8,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#025c1b",
    borderWidth: 2,
    borderColor: "#fffbe6",
  },
  button: {
    backgroundColor: "#fffbe6",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#025c1b",
    fontWeight: "bold",
    fontSize: 16,
  },
});
