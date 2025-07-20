import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import {
  LanguageSelector,
  LanguageOption,
} from "@/components/LanguageSelector";

export default function EnableLocationScreen() {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [language, setLanguage] = useState<LanguageOption>("English");
  const router = useRouter();

  const toggleLocation = () => {
    setLocationEnabled((prev) => !prev);
  };

  return (
    <View className="flex-1 bg-white items-center justify-between pt-10 pb-16 px-4 relative">
      {/* Header: Logo and Language selector */}

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

      {/* Main content */}
      <View className="items-start justify-center flex-1 gap-6">
        <Text className="text-6xl font-bold">Enable{"\n"}Location</Text>

        {/* Toggle */}
        <View className="flex-row items-center bg-white p-1 rounded-xl shadow-md">
          <TouchableOpacity
            className={`px-10 py-5 rounded-xl ${
              locationEnabled ? "bg-white" : "bg-green-800"
            }`}
            onPress={() => setLocationEnabled(false)}
          >
            <Text
              className={`text-white font-bold ${
                locationEnabled ? "text-green-800" : "text-white"
              }`}
            >
              OFF
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-10 py-5 rounded-xl ${
              locationEnabled ? "bg-green-800" : "bg-white"
            }`}
            onPress={() => setLocationEnabled(true)}
          >
            <Text
              className={`font-bold ${
                locationEnabled ? "text-white" : "text-green-800"
              }`}
            >
              ON
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom-right arrow button */}
      <View className="w-full flex-row justify-end pr-4 mt-[10px]">
        <Pressable onPress={() => router.push("/(protected)/main")}>
          <Image
            source={require("../../assets/images/arrowRight.png")}
            className="w-[70px] h-[70px]"
            resizeMode="cover"
          />
        </Pressable>
      </View>
    </View>
  );
}
