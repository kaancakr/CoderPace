import { Text, View } from "react-native";
import FlashCards from "./components/FlashCards";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlashCards/>
    </View>
  );
}
