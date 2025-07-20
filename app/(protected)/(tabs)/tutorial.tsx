import { View, Text, Image, SafeAreaView, Dimensions } from "react-native";
import { LanguageSelector } from "@/components/LanguageSelector";
import { TutorialBox } from "@/components/TutorialBox";

const { height } = Dimensions.get("window");

export default function introMessage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Logo in top-left */}
      <View className="z-10 m-5">
        <Image
          source={require("../../../assets/images/ice-breakers-logo.png")}
          className="w-[50px] h-[50px]"
          resizeMode="contain"
        />
      </View>
      
      <LanguageSelector language="Spanish"/>

      {/* Bottom text */}
      <View className="flex-1 items-start justify-center px-6">
        <Text className="text-center font-bold text-[25px] leading-none">
          How does
        </Text>
        <Text className="text-center font-bold text-[25px] leading-none">
          ICE Breakers
        </Text>
        <Text className="text-center font-bold text-[25px] leading-none">
          Works: 
        </Text>

        {/* Questions */}
        <Text className="text-start font-bold text-[15px] mt-5 leading-none">
          1. Add your emergency contacts.
        </Text>
        <TutorialBox text="We'll only use these to alert your loved ones when you hit the panic button."/>

        <Text className="text-start font-bold text-[15px] mt-5 leading-none">
          2. Enable your location (optional).
        </Text>
        <TutorialBox text="So we can connect you to local help and nearby immigration resources."/>


        <Text className="text-start font-bold text-[15px] mt-5 leading-none">
          3. In an emergency, tap the big red button.
        </Text>
        <TutorialBox text="We’ll instantly send a message with your location to your trusted contacts and local rapid response teams."/>


        <Text className="text-start font-bold text-[15px] mt-5 leading-none">
          4. Show your “Know Your Rights Card”.
        </Text>
        <TutorialBox text="Know your rights and show them in your preferred language — even during stressful moments."/>

        <View className="w-full flex-row justify-end pr-4 mt-[10px]">
            <Image
            source={require("../../../assets/images/arrowRight.png")}
            className="w-[60px] h-[60px]"
            resizeMode="cover"
            />
        </View>
      </View>
    </SafeAreaView>
  );
}
