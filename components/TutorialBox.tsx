import { View, Text } from "react-native";

type TutorialBoxProps = {
  text: string;
};

export function TutorialBox({ text }: TutorialBoxProps) {
  return (
    <View className="rounded-2xl px-6 py-4 w-full items-center justify-center" 
    style={{ backgroundColor: "#315E26" }}>
      <Text className="text-white text-start font-bold text-[15px] text-base">
        {text}
      </Text>
    </View>
  );
}
