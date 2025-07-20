import { View, Text, Image, SafeAreaView, Dimensions } from "react-native";
import { LanguageSelector } from "@/components/LanguageSelector";

const { height } = Dimensions.get("window");

export default function introMessage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Logo in top-left */}
      <View className="absolute z-10 m-5">
        <Image
          source={require("../../../assets/images/ice-breakers-logo.png")}
          className="w-[50px] h-[50px]"
          resizeMode="contain"
        />
      </View>
      
      <LanguageSelector language="Spanish"/>

      {/* Bottom text */}
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-center font-bold text-[27px] leading-none">
          ICE Breakers was built by
        </Text>
        <Text className="text-center font-bold text-[61px] leading-none">
          Immigrants
        </Text>
        <Text className="text-left font-semibold text-[18.8px] leading-none w-[317px] mt-6">
          “We’ve lived the fear, the uncertainty, and the silence when help felt out of reach. We’ve seen our communities targeted, our rights stripped away, and our loved ones disappear without warning.”
        </Text>
        {/* <View className="w-full items-end pr-4 mt-2">
          <Text className="font-semibold text-[18.8px] leading-none">
            – Ice Breakers' Team
          </Text>
        </View> */}

        <View className="w-full flex-row justify-end pr-4 mt-[10px]">
            <Image
            source={require("../../../assets/images/arrowRight.png")}
            className="w-[70px] h-[70px]"
            resizeMode="cover"
            />
        </View>
      </View>
    </SafeAreaView>
  );
}
