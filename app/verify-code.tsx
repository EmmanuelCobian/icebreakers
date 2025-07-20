import { useContext, useState } from "react";
import { View, TextInput, Text } from "react-native";
import { Button } from "@/components/Button";
import { AuthContext } from "@/utils/authContext";
import { useLocalSearchParams } from "expo-router";

export default function VerifyCodeScreen() {
  const { phone } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const authContext = useContext(AuthContext);

  return (
    <View className="flex-1 justify-center p-4">
      <Text>Enter the code sent to your phone</Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="123456"
        keyboardType="number-pad"
        className="border p-2 my-4"
      />
      <Button
        title="Confirm Code"
        onPress={() => authContext.confirmCode(code, phone)}
      />
    </View>
  );
}
