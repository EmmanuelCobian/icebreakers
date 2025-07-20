import { View, Text, Image, SafeAreaView, Dimensions } from "react-native";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useTranslation } from "react-i18next";

const { height } = Dimensions.get("window");

export default function introMessage() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Logo in top-left */}
      <View className="absolute z-10 m-5">
        <Image
          source={require("../assets/images/ice-breakers-logo.png")}
          className="w-[50px] h-[50px]"
          resizeMode="contain"
        />
      </View>

      {/* <LanguageSelector language="Spanish" /> */}

      {/* Bottom text */}
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-start font-bold text-[27px] leading-none w-[350px]">
          {t("intro1.title-p1")}
        </Text>
        <Text className="text-start font-bold text-[61px] leading-none w-[355px]">
          {t("intro1.title-p2")}
        </Text>
        <Text className="text-left font-semibold text-[18.8px] leading-none w-[355px] mt-6">
          {t("intro1.description")}
        </Text>
        {/* <View className="w-full items-end pr-4 mt-2">
          <Text className="font-semibold text-[18.8px] leading-none">
            – Ice Breakers' Team
          </Text>
        </View> */}

        <View className="w-full flex-row justify-end pr-4 mt-[10px]">
          <Pressable onPress={() => router.push("/introMessage2")}>
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
