import { View, Text, Image, SafeAreaView, Dimensions } from "react-native";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

const { height } = Dimensions.get("window");

export default function introMessage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Logo in top-left */}
      <View className="absolute z-10 m-5">
        <Image
          source={require("../../assets/images/ice-breakers-logo.png")}
          className="w-[50px] h-[50px]"
          resizeMode="contain"
        />
      </View>
      
      <LanguageSelector language="Spanish"/>

      {/* Bottom text */}
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-left font-semibold text-[18.8px] leading-none w-[317px] mt-6">
          ““We built this app as an act of resistance and care — a way to protect each other when the systems around us won’t. It’s a lifeline born from love, urgency, and the deep belief that our people deserve safety, dignity, and the power to act when it matters most.””
        </Text>
        <View className="w-[90%] items-end pr-4 mt-2">
          <Text className="font-semibold text-[18.8px] leading-none">
            – Ice Breakers' Team {'\n'}
          </Text>
        </View>

        <Pressable onPress={() => router.push("/(protected)/tutorial")}>
          <View className="items-center justify-center w-[315px] h-[70px] pr-4 mt-2"
          style={{ backgroundColor: "#315E26", borderRadius: 8 }} >
            <Text className="font-semibold text-[25px] leading-none text-white">
              Get Started!
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
