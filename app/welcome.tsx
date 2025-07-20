import { View, Text, Image, SafeAreaView, Dimensions } from "react-native";
import {
  LanguageSelector,
  LanguageOption,
} from "@/components/LanguageSelector";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import i18n from "@/i18n";

const { height } = Dimensions.get("window");

export default function Welcome() {
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
    <SafeAreaView className="flex-1 bg-white mt-20">
      {/* Logo in top-left */}
      <View className="absolute z-10 m-5">
        <Image
          source={require("../assets/images/ice-breakers-logo.png")}
          className="w-[50px] h-[50px]"
          resizeMode="contain"
        />
      </View>

      {/* Top half photo */}
      <View style={{ height: height * 0.5 }} className="w-full">
        <Image
          source={require("../assets/images/welcome-image.png")}
          className="w-full h-full rounded-b-3xl"
          resizeMode="cover"
        />
      </View>

      <LanguageSelector language={language} onChange={handleLanguageChange} />

      {/* Bottom text */}
      <View className="flex-1 items-center justify-center px-6 mt-8">
        <Text className="text-center font-bold text-[60px] leading-none w-[371px]">
          {t("welcome.title-p1")}
        </Text>
        <Text className="text-center font-bold text-[55px] leading-none w-[371px]">
          {t("welcome.title-p2")}
        </Text>
        <Text className="text-center font-semibold text-[18.8px] leading-none w-[371px]">
          {t("welcome.subtitle")} {"\n"}
        </Text>
        <Text className="text-start font-semibold text-[18.8px] leading-none w-[313px]">
          {t("welcome.description")}
        </Text> 

        <View className="w-full flex-row justify-end pr-4 mt-[10px]">
          <View className="absolute left-10 top-8">
            <Pressable onPress={() => router.push("/login")}>
              <Text className="text-green-800">Skip to Login</Text>
            </Pressable>
          </View>
          <Pressable onPress={() => router.push("/introMessage")}>
            <Image
              source={require("../assets/images/arrowRight.png")}
              className="w-[70px] h-[70px]"
              resizeMode="cover"
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
