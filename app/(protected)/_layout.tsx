import { AuthContext } from "@/utils/authContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

export const unstable_settings = {
  initialRouteName: "welcome", // anchor
};

export default function ProtectedLayout() {
  const authState = useContext(AuthContext);

  if (!authState.isReady) {
    return null;
  }

  if (!authState.isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="welcome"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="introMessage"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="introMessage2"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="tutorial"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
