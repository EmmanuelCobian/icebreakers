import { View, TextInput, Image } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "@/utils/authContext";
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useRouter } from "expo-router";
import {
  LanguageSelector,
  LanguageOption,
} from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<LanguageOption>("English");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();

  const handleLanguageChange = (lang: LanguageOption) => {
    // setLanguage(lang);
    i18n.changeLanguage(lang === "English" ? "en" : "es");
    setDropdownVisible(false);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-40">
      <LanguageSelector onChange={handleLanguageChange} />

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
        {t("signup.title")}
      </AppText>

      {/* Name input */}
      <TextInput
        placeholder={t("signup.name")}
        keyboardType="phone-pad"
        value={name}
        onChangeText={setName}
        className="bg-white border border-gray-300 rounded-lg px-4 py-3 mb-3 shadow-sm"
      />

      {/* Phone number input */}
      <TextInput
        placeholder={t("signup.placeholder")}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(text) => setPhone(text.replace(/\D/g, '').slice(0, 12))}
        className="bg-white border border-gray-300 rounded-lg px-4 py-3 mb-3 shadow-sm"
      />

      {/* Login button */}
      <Button
        title={t("signup.button")}
        onPress={() =>
          router.push({
            pathname: "/addContacts",
            params: { name: name, phone: phone },
          })
        }
        className="bg-green-800 rounded-lg py-3 items-center mt-5"
      />
    </View>
  );
}
