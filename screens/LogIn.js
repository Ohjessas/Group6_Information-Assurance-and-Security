// screens/LogIn.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Alert,
} from "react-native";
import { API_BASE } from "../api";

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email) {
      return Alert.alert("Please enter your email.");
    }

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("OTP Sent", "Check your email for the one-time password.");
        navigation.navigate("OTP", { email });
      } else {
        Alert.alert("Login Failed", data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      Alert.alert("Error", "Unable to connect to the server.");
    }
  };

  const handleGoogleLogin = () => {
    navigation.navigate("GoogleLogin");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/g-logo.png")}
        style={styles.logo}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ddd"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ddd"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      {/* Google Sign-In Button */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Image
          source={require("../assets/images/google-icon.png")}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#025c1b",
    justifyContent: "center",
    padding: 30,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#044d15",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "#fffbe6",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#fffbe6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#025c1b",
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    color: "#fffbe6",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 25,
    alignSelf: "center",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
});
