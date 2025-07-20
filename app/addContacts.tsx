import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";
import { useLocalSearchParams } from "expo-router";

const { height } = Dimensions.get("window");

export default function addContacts() {
  const router = useRouter();
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const { name, phone } = useLocalSearchParams();

  const [contacts, setContacts] = useState([
    { phone: "", name: "", relationship: "" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dynamically updates a specific field (phone, name, or relationship) for the current contact being edited.
  const handleInputChange = (field: string, value: string) => {
    const updatedContacts = [...contacts];
    updatedContacts[currentIndex][field] = value;
    setContacts(updatedContacts);
  };

  // Adds a new blank contact form and updates the current index to show it.
  const addNewContact = () => {
    setContacts([...contacts, { phone: "", name: "", relationship: "" }]);
    setCurrentIndex(contacts.length); // Move to the new contact form
  };

  // Navigation between existing contact forms (back and forward arrows).
  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < contacts.length - 1) setCurrentIndex(currentIndex + 1);
  };

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

      {/* Header */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="items-start justify-center px-6 pt-[80px]">
          <Text className="font-bold text-[50px] leading-none">Emergency</Text>
          <Text className="font-bold text-[50px] leading-none">Contacts</Text>
        </View>

        {/* Contact Form */}
        <View className="px-6 mt-8 space-y-4">
          <TextInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={contacts[currentIndex].phone}
            onChangeText={(text) => handleInputChange("phone", text)}
            className="border border-gray-300 rounded-xl px-4 py-3 text-lg shadow-md bg-white"
          />

          <TextInput
            placeholder="Name (optional)"
            value={contacts[currentIndex].name}
            onChangeText={(text) => handleInputChange("name", text)}
            className="border border-gray-300 rounded-xl px-4 py-3 text-lg mt-2 shadow-md bg-white"
          />

          <TextInput
            placeholder="Relationship (optional)"
            value={contacts[currentIndex].relationship}
            onChangeText={(text) => handleInputChange("relationship", text)}
            className="border border-gray-300 rounded-xl px-4 py-3 text-lg mt-2 shadow-md bg-white"
          />

          {/* Add another contact */}
          <Pressable onPress={addNewContact} className="mt-4 items-end w-full">
            <Text className="underline text-base" style={{ color: "#315E26" }}>
              + Add another contact
            </Text>
          </Pressable>
        </View>

        {/* Navigation arrows */}
        {contacts.length > 1 && (
          <View className="flex-row justify-between items-center px-10 mt-6">
            <Pressable onPress={goToPrev} disabled={currentIndex === 0}>
              <Text
                className={`text-3xl ${currentIndex === 0 ? "text-gray-300" : "text-black"}`}
              >
                ←
              </Text>
            </Pressable>
            <Text className="text-base">{`Contact ${currentIndex + 1} of ${contacts.length}`}</Text>
            <Pressable
              onPress={goToNext}
              disabled={currentIndex === contacts.length - 1}
            >
              <Text
                className={`text-3xl ${
                  currentIndex === contacts.length - 1
                    ? "text-gray-300"
                    : "text-black"
                }`}
              >
                →
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      {/* Bottom-right arrow to next screen */}
      <View className="w-full flex-row justify-end pr-4 mt-[10px]">
        <Pressable onPress={() => authContext.signUp(name, phone, contacts)}>
          <Image
            source={require("../assets/images/arrowRight.png")}
            className="w-[70px] h-[70px]"
            resizeMode="cover"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
