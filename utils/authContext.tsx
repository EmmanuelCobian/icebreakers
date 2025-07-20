import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter, usePathname } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

SplashScreen.preventAutoHideAsync();
globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true; // suppress firebase migration warnings

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  logIn: (phone: string) => void;
  logOut: () => void;
  confirmCode: (code: string, phone: string) => void;
  user: FirebaseAuthTypes.User | null;
  signUp: (name: string, phone: string, contacts: any) => void;
  phone: String;
};

const authStorageKey = "auth-key";

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  logIn: (phone: string) => {},
  logOut: () => {},
  confirmCode: (code: string, phone: string) => {},
  user: null,
  signUp: (name: string, phone: string, contacts: any) => {},
  phone: "",
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  // console.log("auth", auth().currentUser);
  // useEffect(() => {
  // console.log("auth", auth().currentUser);
  // }, []);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
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

  async function confirmCode(code: string, phone: string) {
    try {
      if (!confirm) {
        console.log(
          "No confirmation result available. Please try signing in again."
        );
        return;
      }
      await confirm.confirm(code);
      setIsLoggedIn(true);
      setPhone(phone);
      await storeAuthState({ isLoggedIn: true, phone: phone });
      router.replace("/(protected)/main");
    } catch (error) {
      console.log("Invalid code.", error);
    }
  }

  const storeAuthState = async (newState: {
    isLoggedIn: boolean;
    phone: string;
  }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      await AsyncStorage.setItem(authStorageKey, jsonValue);
    } catch (error) {
      console.log("Error saving", error);
    }
  };

  const signUp = async (name: String, phone: String, contacts: any) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          phone: phone,
          name: name,
          emergencyContacts: contacts,
        }),
      });
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        await newLogIn(data.phone);
      } catch (e) {
        console.log("Error parsing JSON", e);
      }
    } catch (error) {
      console.log("Error signing up with phone number:", error);
    }
  };

  const newLogIn = async (phone: string) => {
    try {
      setIsLoggedIn(true);
      await storeAuthState({ isLoggedIn: true, phone: phone });
      router.replace("/(protected)/location");
      // await signInWithPhoneNumber("+1 555-123-4567");
      // router.push("/verify-code");
    } catch (error) {
      console.log("Error signing in with phone number:", error);
    }
  };

  const logIn = async (phone: string) => {
    try {
      setIsLoggedIn(true);
      await storeAuthState({ isLoggedIn: true, phone: phone });
      router.replace("/(protected)/main");
      // await signInWithPhoneNumber("+1 555-123-4567");
      // router.push("/verify-code");
    } catch (error) {
      console.log("Error signing in with phone number:", error);
    }
  };

  const logOut = () => {
    console.log("Hi");
    auth().signOut();
    setIsLoggedIn(false);
    storeAuthState({ isLoggedIn: false, phone: "" });
    router.replace("/welcome");
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
          setPhone(auth.phone);
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
        user,
        signUp,
        phone,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
