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
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

export default function LoginScreen() {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [language, setLanguage] = useState<LanguageOption>("English");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLanguageChange = (lang: LanguageOption) => {
    setLanguage(lang);
    i18n.changeLanguage(lang === "English" ? "en" : "es");
    setDropdownVisible(false);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-40">
      {/* Language toggle (top-right) */}
      <LanguageSelector language={language} onChange={handleLanguageChange} />

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
        {t("login.title")}
      </AppText>

      {/* Phone number input */}
      <TextInput
        placeholder={t("login.placeholder")}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(text) =>
          setPhone(text.replace(/[^0-9+\-()]/g, '').slice(0, 12))
        }
        className="bg-white border border-gray-300 rounded-lg px-4 py-3 mb-3 shadow-sm"
      />

      {/* Login button */}
      <Button
        title={t("login.button")}
        onPress={() => authContext.logIn(phone)}
        className="bg-green-800 rounded-lg py-3 items-center mt-5"
      />

      {/* Sign up link */}
      <View className="mt-5 flex-row justify-center">
        <Text className="text-black">{t("login.noAccount")}</Text>
        <Pressable onPress={() => router.replace("/signup")}>
          <Text className="text-red-600 font-semibold">
            {t("login.signup")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
