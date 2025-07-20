import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import {
  LanguageSelector,
  LanguageOption,
} from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18n from "@/i18n";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";
import SendSMS from "react-native-sms";

export default function EmergencyScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  const [language, setLanguage] = useState<LanguageOption>("English");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showRightsCard, setShowRightsCard] = useState(false);

  const handleLanguageChange = (lang: LanguageOption) => {
    //setLanguage(lang);
    i18n.changeLanguage(lang === "English" ? "en" : "es");
    setDropdownVisible(false);
  };
  const handleSendEmergencySMS = async () => {
    try {
      const response = await fetch(
        `http://10.0.0.42:3000/api/users/${authContext.phone}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const text = await response.text();
      try {
        const user_json = JSON.parse(text);
        const user = user_json["user"];
        if (
          !user ||
          !user.emergencyContacts ||
          user.emergencyContacts.length === 0
        ) {
          Alert.alert(
            "No Contacts",
            "No emergency contacts found for this user."
          );
          return;
        }

        const userContactNumbers = user.emergencyContacts.map(
          (c: any) => c.phone
        );

        const subject = user.name != "" ? user.name : "Your contact";
        SendSMS.send(
          {
            body: `🚨 Emergency Alert! ${subject} at ${user.phone} needs help immediately! They are in the presence of ICE. Find local immigration legal help: https://www.immigrationlawhelp.org/
                   🚨 ¡Alerta de Emergencia! ¡${subject} al número ${user.phone} necesita ayuda inmediata! Están en presencia de ICE. Encuentra ayuda legal de inmigración cerca de ti: https://www.immigrationlawhelp.org/`,
            recipients: userContactNumbers,
            allowAndroidSendWithoutReadPermission: true,
          },
          (completed, cancelled, error) => {
            if (completed) {
              console.log("SMS sent successfully");
              Alert.alert("Sent", "Emergency message sent.");
            } else if (cancelled) {
              console.log("SMS sending cancelled");
              Alert.alert("Cancelled", "SMS sending was cancelled.");
            } else if (error) {
              console.error("SMS Error:", error);
              Alert.alert("Error", "There was an error sending the SMS.");
            }
          }
        );
      } catch (err) {
        console.error("Failed to fetch user info or send SMS:", err);
        Alert.alert("Error", "Could not send emergency message.");
      }
    } catch (e) {
      console.log("Error parsing JSON", e);
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-between pt-10 pb-16 px-4 relative mt-20">
      {/* Language toggle (top-left) */}
      <LanguageSelector onChange={handleLanguageChange} />

      {/* Top-left logo */}
      <TouchableOpacity
        className="absolute top-5 left-5"
        //onPress={() => router.push("/profile")}
      >
        <Image
          source={require("@/assets/images/ice-breakers-logo.png")}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Main buttons */}
      <View className="flex-1 items-center justify-center gap-8 w-full">
        {/* HELP Button - Taller */}
        <TouchableOpacity
          className="bg-red-600 rounded-3xl px-12 py-28 shadow-lg w-full items-center"
          onPress={handleSendEmergencySMS}
        >
          <Text className="text-white text-7xl font-extrabold tracking-wide">
            {t("main.help")}
          </Text>
        </TouchableOpacity>

        {/* My Rights Button - Taller */}
        <TouchableOpacity
          className="bg-orange-500 rounded-2xl px-10 py-12 shadow-md w-4/5 items-center"
          onPress={() => setShowRightsCard(true)}
        >
          <Text className="text-white text-3xl font-bold tracking-wide">
            {t("main.myRights")}
          </Text>
        </TouchableOpacity>

        {/* Logout button */}
        <TouchableOpacity
          className="bg-green-800 rounded-xl px-2 py-2 shadow-md absolute bottom-10 right-0"
          onPress={authContext.logOut}
        >
          <Text className="text-white text-base tracking-wide">
            {t("main.logout")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Rights Overlay Card */}
      {showRightsCard && (
        <View className="absolute inset-0 z-50 items-center justify-center bg-black/20 px-4">
          <View className="flex bg-red-600 rounded-2xl p-6 w-full max-w-lg">
            <Text className="text-white text-base mb-4 font-semibold">
              {t("main.right-1")}
            </Text>
            <Text className="text-white text-base mb-4 font-semibold">
              {t("main.right-2")}
            </Text>
            <Text className="text-white text-base mb-4 font-semibold">
              {t("main.right-3")}
            </Text>
            <Text className="text-white text-base mb-4 font-semibold">
              {t("main.right-4")}
            </Text>
            <Text className="text-white text-base mb-4 font-semibold">
              {t("main.right-5")}
            </Text>

            {/* Close Button */}
            <TouchableOpacity
              className="absolute bottom-4 right-4"
              onPress={() => setShowRightsCard(false)}
            >
              <Text className="text-white text-lg underline font-bold">
                {t("main.go-back")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
