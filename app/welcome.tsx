import { View, Text, Image, SafeAreaView, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default function Welcome() {
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

      {/* Top half photo */}
      <View style={{ height: height * 0.5 }} className="w-full">
        <Image
          source={require("../assets/images/welcome-image.png")}
          className="w-full h-full rounded-b-3xl"
          resizeMode="cover"
        />
      </View>

      {/* Bottom text */}
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-center font-bold text-[60px] leading-none">
          Welcome to
        </Text>
        <Text className="text-center font-bold text-[55px] leading-none">
          ICE Breakers
        </Text>
        <Text className="text-center font-semibold text-[18.8px] leading-none">
            Your trusted emergency companion. {'\n'}
        </Text>
        <Text className="text-left font-semibold text-[18.8px] leading-none w-[317px]">
        With one tap, connect to help, alert loved ones, and protect your rights — wherever you are.
        </Text>

        <View className="w-full flex-row justify-end pr-4 mt-[10px]">
            <Image
            source={require("../assets/images/arrowRight.png")}
            className="w-[70px] h-[70px]"
            resizeMode="cover"
            />
        </View>
      </View>
    </SafeAreaView>
  );
}
