// import React, { useState } from "react";
// import { View, Text, Pressable, TouchableOpacity } from "react-native";

// export type LanguageOption = "English" | "Spanish";

// interface Props {
//   language: LanguageOption;
//   onChange: (lang: LanguageOption) => void;
// }

// export const LanguageSelector: React.FC<Props> = ({ language, onChange }) => {
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const handleLanguageChange = (lang: LanguageOption) => {
//     onChange(lang);
//     setDropdownVisible(false);
//   };

//   return (
//     <View className="absolute top-5 right-5 items-end z-50">
//       <TouchableOpacity
//         className="bg-green-800 px-3 py-2 rounded"
//         onPress={() => setDropdownVisible(!dropdownVisible)}
//       >
//         <View className="flex-row items-center">
//           <Text className="text-sm text-white mr-1">🌐</Text>
//           <Text className="text-sm text-white">{language} ⌄</Text>
//         </View>
//       </TouchableOpacity>

//       {dropdownVisible && (
//         <View className="mt-2 bg-white rounded shadow-lg w-28">
//           {["English", "Spanish"].map((lang) => (
//             <Pressable
//               key={lang}
//               className="px-3 py-2"
//               onPress={() => handleLanguageChange(lang as LanguageOption)}
//             >
//               <Text className="text-black text-base">{lang}</Text>
//             </Pressable>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

import React, { useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

export type LanguageOption = "English" | "Spanish";

interface Props {
  onChange: (lang: LanguageOption) => void;
}

export const LanguageSelector: React.FC<Props> = ({ onChange }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { i18n } = useTranslation();

  const currentLang = i18n.language === "es" ? "Spanish" : "English";

  const handleLanguageChange = (lang: LanguageOption) => {
    onChange(lang);
    setDropdownVisible(false);
  };

  return (
    <View className="absolute top-5 right-5 items-end z-50">
      <TouchableOpacity
        className="bg-green-800 px-3 py-2 rounded"
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <View className="flex-row items-center">
          <Text className="text-sm text-white mr-1">🌐</Text>
          <Text className="text-sm text-white">{currentLang} ⌄</Text>
        </View>
      </TouchableOpacity>

      {dropdownVisible && (
        <View className="mt-2 bg-white rounded shadow-lg w-28">
          {["English", "Spanish"].map((lang) => (
            <Pressable
              key={lang}
              className="px-3 py-2"
              onPress={() => handleLanguageChange(lang as LanguageOption)}
            >
              <Text className="text-black text-base">{lang}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};
