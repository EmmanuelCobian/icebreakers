import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput } from "react-native";
import auth from "@react-native-firebase/auth";
import { usePathname, useRouter } from "expo-router";
import SendSMS from "react-native-sms";

globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true; // suppress firebase migration warnings

export default function FourthScreen() {
  const router = useRouter();
  const pathname = usePathname();
  console.log("auth", auth().currentUser);
  useEffect(() => {
    console.log("auth", auth().currentUser);
  }, []);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");

  function sendSMS() {
    SendSMS.send(
      {
        body: "The default body of the SMS!",
        recipients: ["6507033432"],
        successTypes: ["sent", "queued"],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log(
          "SMS Callback: completed: " +
            completed +
            " cancelled: " +
            cancelled +
            "error: " +
            error
        );
      }
    );
  }

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
    sendSMS();
    console.log("confirmation", confirmation);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log("Invalid code.");
    }
  }

  if (initializing) return null;

  if (!user) {
    if (!confirm) {
      return (
        <View className="justify-center flex-1 p-4">
          <Button
            onPress={() => signInWithPhoneNumber("+1 111-222-3333")}
            title="Sign In"
          >
          </Button>
        </View>
      );
    }

    return (
      <View className="justify-center flex-1 p-4">
        <TextInput
          value={code}
          onChangeText={(text) => setCode(text)}
          className="p-2 mb-3 border-2 border-solid"
        />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </View>
    );
  }

  return (
    <View className="justify-center flex-1 p-4">
      <Text>
        Welcome! UID: {user.uid} Phone #: {user.phoneNumber}
      </Text>
      <Button title="Sign Out" onPress={() => auth().signOut()} />
    </View>
  );
}
