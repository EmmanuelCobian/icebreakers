import { Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";

export default function Index() {
  const { isReady, isLoggedIn } = useContext(AuthContext);

  if (!isReady) {
    return null;
  }

  if (isLoggedIn) {
    return <Redirect href="/(protected)/main" />;
  } else {
    return <Redirect href="/welcome" />;
  }
}
