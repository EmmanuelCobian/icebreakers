import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import {
  LanguageSelector,
  LanguageOption,
} from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18n from "@/i18n";

export default function EmergencyScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const [language, setLanguage] = useState<LanguageOption>("English");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLanguageChange = (lang: LanguageOption) => {
    setLanguage(lang);
    i18n.changeLanguage(lang === "English" ? "en" : "es");
    setDropdownVisible(false);
  };

  return (
    <View className="flex-1 bg-white items-center justify-between pt-10 pb-16 px-4 relative">
      {/* Language toggle (top-left) */}
      <LanguageSelector language={language} onChange={handleLanguageChange} />

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
          //onPress={() => router.push("/help")}
        >
          <Text className="text-white text-8xl font-extrabold tracking-wide">
            {t("main.help")}
          </Text>
        </TouchableOpacity>

        {/* My Rights Button - Taller */}
        <TouchableOpacity
          className="bg-orange-500 rounded-2xl px-10 py-12 shadow-md w-4/5 items-center"
          //onPress={() => router.push("/rights")}
        >
          <Text className="text-white text-4xl font-bold tracking-wide">
            {t("main.myRights")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
