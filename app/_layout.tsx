import { Stack } from "expo-router";
import "../global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/utils/authContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            animation: "none",
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            animation: "none",
          }}
        />
        <Stack.Screen
          name="verify-code"
          options={{
            animation: "none",
          }}
        />
        <Stack.Screen
          name="welcome"
          options={{
            animation: "none",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="introMessage"
          options={{
            animation: "none",
          }}
        />
        <Stack.Screen
          name="introMessage2"
          options={{
            animation: "none",
          }}
        />
        <Stack.Screen
          name="tutorial"
          options={{
            animation: "none",
          }}
        />
        <Stack.Screen
          name="addContacts"
          options={{
            headerShown: true,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
