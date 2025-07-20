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

      {/* <LanguageSelector language="Spanish"/> */}

      {/* Bottom text */}
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-left font-semibold text-[18.8px] leading-none w-[317px] mt-6">
          {t("intro2.quote")}
        </Text>
        <View className="w-[90%] items-end pr-4 mt-2">
          <Text className="font-semibold text-[18.8px] leading-none">
            {t("intro2.team")} {"\n"}
          </Text>
        </View>

        <Pressable onPress={() => router.push("/tutorial")}>
          <View
            className="items-center justify-center w-[315px] h-[70px] pr-4 mt-2"
            style={{ backgroundColor: "#315E26", borderRadius: 8 }}
          >
            <Text className="font-semibold text-[25px] leading-none text-white">
              {t("intro2.started")}
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
