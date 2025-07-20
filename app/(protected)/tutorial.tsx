import { View, Text, Image, SafeAreaView, Dimensions } from "react-native";
import { LanguageSelector } from "@/components/LanguageSelector";
import { TutorialBox } from "@/components/TutorialBox";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

const { height } = Dimensions.get("window");

export default function introMessage() {
  const router = useRouter();
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Logo in top-left */}
      <View className="z-10 m-5">
        <Image
          source={require("../../assets/images/ice-breakers-logo.png")}
          className="w-[50px] h-[50px]"
          resizeMode="contain"
        />
      </View>

      {/* <LanguageSelector language="Spanish"/> */}

      {/* Bottom text */}
      <View className="flex-1 items-start justify-center px-6">
        <Text className="text-center font-bold text-[25px] leading-none">
          {t("tutorial.title-p1")}
        </Text>
        <Text className="text-center font-bold text-[25px] leading-none">
          {t("tutorial.title-p2")}
        </Text>
        <Text className="text-center font-bold text-[25px] leading-none">
          {t("tutorial.title-p3")}
        </Text>

        {/* Questions */}
        <Text className="text-start font-bold text-[15px] mt-5 leading-none">
          {t("tutorial.point-1")}
        </Text>
        <TutorialBox text={t("tutorial.description-1")} />

        <Text className="text-start font-bold text-[15px] mt-5 leading-none">
          {t("tutorial.point-2")}
        </Text>
        <TutorialBox text={t("tutorial.description-2")} />

        <Text className="text-start font-bold text-[15px] mt-5 leading-none">
          {t("tutorial.point-3")}
        </Text>
        <TutorialBox text={t("tutorial.description-3")} />

        <Text className="text-start font-bold text-[15px] mt-5 leading-none">
          {t("tutorial.point-4")}
        </Text>
        <TutorialBox text={t("tutorial.description-4")} />

        <View className="w-full flex-row justify-end pr-4 mt-[10px]">
          <Pressable onPress={() => router.push("/(protected)/addContacts")}>
            <Image
              source={require("../../assets/images/arrowRight.png")}
              className="w-[60px] h-[60px]"
              resizeMode="cover"
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
