import { Stack } from "expo-router";

import ClickCountProvider from "./ClickCountContext";

export default function RootLayout() {
  return (
    <ClickCountProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </ClickCountProvider>
  );
}
