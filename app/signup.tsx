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

type LanguageOption = "English" | "Spanish";

export default function SignupScreen() {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<LanguageOption>("English");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLanguageChange = (lang: LanguageOption) => {
    setLanguage(lang);
    setDropdownVisible(false);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-40">
      {/* Language toggle (top-right) */}
      <View className="absolute top-5 right-5 items-end">
        <TouchableOpacity
          className="bg-green-800 px-3 py-2 rounded"
          onPress={() => setDropdownVisible(!dropdownVisible)}
        >
          <View className="flex-row items-center">
            <Text className="text-sm text-white mr-1">🌐</Text>
            <Text className="text-sm text-white">{language} ⌄</Text>
          </View>
        </TouchableOpacity>

        {dropdownVisible && (
          <View className="mt-2 bg-white rounded shadow-lg w-28">
            {["English", "Spanish"].map((lang) => (
              <Pressable
                key={lang}
                className="px-3 py-2 hover:bg-gray-200"
                onPress={() => handleLanguageChange(lang as LanguageOption)}
              >
                <Text className="text-black text-base">{lang}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

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
        Create an Account:
      </AppText>

      {/* Phone number input */}
      <TextInput
        placeholder="Name"
        keyboardType="phone-pad"
        value={name}
        onChangeText={setName}
        className="bg-white border border-gray-300 rounded-lg px-4 py-3 mb-3 shadow-sm"
      />

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
        title="Sign up!"
        onPress={authContext.logIn}
        className="bg-green-800 rounded-lg py-3 items-center mt-5"
      />
    </View>
  );
}
