import { Pressable, PressableProps, Text } from "react-native";
import { cn } from "../utils/cn";
import React from "react";

type ButtonProps = PressableProps & {
  title: string;
  onPress?: () => void;
  theme?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
};

export function Button({
  title,
  onPress,
  theme = "primary",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center justify-center rounded-md px-5 py-3 mb-4 border",
        theme === "primary" && "bg-[#007AFF] border-[#007AFF]",
        theme === "secondary" && "bg-white border-gray-300",
        theme === "tertiary" && "bg-transparent border-transparent",
        disabled && "opacity-50"
      )}
      disabled={disabled}
      {...rest}
    >
      <Text
        className={cn(
          "font-semibold text-2xl tracking-wider",
          theme === "secondary" && "text-black",
          theme === "primary" && "text-white",
          theme === "tertiary" && "text-gray-800"
        )}
      >
        {title} {disabled}
      </Text>
    </Pressable>
  );
}
