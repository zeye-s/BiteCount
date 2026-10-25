import { Stack } from 'expo-router';
import { Slot } from 'expo-router';
import { ThemeProvider } from './storage/ThemeContext';


export default function RootLayout() {
  return (
    <ThemeProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='tabs' />
      <Slot />
    </Stack>
    </ThemeProvider>
  );
}