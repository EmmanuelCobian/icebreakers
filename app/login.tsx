import {
  View,
  TextInput,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "@/utils/authContext";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { Link, useRouter } from "expo-router";
import {
  LanguageSelector,
  LanguageOption,
} from "@/components/LanguageSelector";

export default function LoginScreen() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState<LanguageOption>("English");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLanguageChange = (lang: LanguageOption) => {
    setLanguage(lang);
    setDropdownVisible(false);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-40">
      {/* Language toggle (top-right) */}
      <LanguageSelector language={language} onChange={setLanguage} />

      {/* Logo */}
      <View className="items-center mb-6">
        <Image
          source={require("@/assets/images/ice-breakers-logo.png")}
          className="w-45 h-45"
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <AppText className="text-center text-lg font-semibold mb-4">
        Sign up for an Account:
      </AppText>

      {/* Phone number input */}
      <TextInput
        placeholder="Phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        className="bg-white border border-gray-300 rounded-lg px-4 py-3 mb-3 shadow-sm"
      />

      {/* Login button */}
      <Button
        title="Sign in!"
        onPress={authContext.logIn}
        className="bg-green-800 rounded-lg py-3 items-center mt-5"
      />

      {/* Sign up link */}
      <View className="mt-5 flex-row justify-center">
        <Text className="text-black">Don’t have an account? </Text>
        <Pressable onPress={() => router.replace("/signup")}>
          <Text className="text-red-600 font-semibold">Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}
