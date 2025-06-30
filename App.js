// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import GoogleLogin from "./screens/GoogleLogin"; // ✅ Correct import
import LogIn from "./screens/LogIn";
import SignUp from "./screens/SignUp";
import OTP from "./screens/OTP";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="GoogleLogin" component={GoogleLogin} />
        <Stack.Screen name="OTP" component={OTP} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
