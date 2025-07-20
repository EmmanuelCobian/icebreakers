import { AuthContext } from "@/utils/authContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

export const unstable_settings = {
  initialRouteName: "main", // anchor
};

export default function ProtectedLayout() {
  const authState = useContext(AuthContext);

  if (!authState.isReady) {
    return null;
  }

  if (!authState.isLoggedIn) {
    return <Redirect href="/welcome" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="main"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="location"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
