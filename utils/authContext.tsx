import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter, usePathname } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

SplashScreen.preventAutoHideAsync();
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true; // suppress firebase migration warnings

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  logIn: () => void;
  logOut: () => void;
  confirmCode: (code: string) => void;
};

const authStorageKey = "auth-key";

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
  confirmCode: (code: string) => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  console.log("auth", auth().currentUser);
  useEffect(() => {
    console.log("auth", auth().currentUser);
  }, []);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [confirm, setConfirm] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (pathname == "/firebaseauth/link") router.back();
  }, [pathname]);

  async function signInWithPhoneNumber(phoneNumber: string) {
    console.log("phoneNumber", phoneNumber);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log("confirmation", confirmation);
    setConfirm(confirmation);
  }

  async function confirmCode(code: string) {
    try {
      await confirm.confirm(code);
      setIsLoggedIn(true);
      await storeAuthState({ isLoggedIn: true });
      router.replace("/"); // move to home screen
    } catch (error) {
      console.log("Invalid code.", error);
    }
  }

  const storeAuthState = async (newState: { isLoggedIn: boolean }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(authStorageKey, jsonValue);
    } catch (error) {
      console.log("Error saving", error);
    }
  };

  const logIn = () => {
    signInWithPhoneNumber("+1 111-222-3333");
    router.push("/verify-code");
  };

  const logOut = () => {
    auth().signOut();
    setIsLoggedIn(false);
    storeAuthState({ isLoggedIn: false });
    router.replace("/login");
  };

  useEffect(() => {
    const getAuthFromStorage = async () => {
      // simulate a delay, e.g. for an API request
      await new Promise((res) => setTimeout(() => res(null), 1000));
      try {
        const value = await AsyncStorage.getItem(authStorageKey);
        if (value !== null) {
          const auth = JSON.parse(value);
          setIsLoggedIn(auth.isLoggedIn);
        }
      } catch (error) {
        console.log("Error fetching from storage", error);
      }
      setIsReady(true);
    };
    getAuthFromStorage();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{
        isReady,
        isLoggedIn,
        logIn,
        logOut,
        confirmCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
