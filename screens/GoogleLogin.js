// screens/GoogleLogin.js
import React, { useEffect } from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "1020484235834-3qj6oq8jq8jij5vdtb5ieq848ihn65h1.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@jessluengas/JessNew", // Must match Google Cloud Console
    scopes: ["profile", "email"], // Add scopes explicitly
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      Alert.alert(
        "✅ Google Login Success",
        `Access Token: ${authentication.accessToken}`
      );
      // Here, you could send token to backend to verify/sign in the user
    } else if (response?.type === "error") {
      Alert.alert(
        "❌ Google Login Failed",
        "Something went wrong during login."
      );
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => promptAsync()}
        color="#4285F4"
      />
    </View>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
