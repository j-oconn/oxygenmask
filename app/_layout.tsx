import { Tabs } from 'expo-router';
import { ColorValue } from 'react-native';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarLabel: 'Today',
          tabBarIcon: ({ color }) => <TabIcon emoji="🌅" color={color} />,
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          title: 'Streaks',
          tabBarLabel: 'Streaks',
          tabBarIcon: ({ color }) => <TabIcon emoji="🔥" color={color} />,
        }}
      />
      <Tabs.Screen
        name="checkin"
        options={{
          title: 'Check-In',
          tabBarLabel: 'Check-In',
          tabBarIcon: ({ color }) => <TabIcon emoji="💬" color={color} />,
        }}
      />
      {/* Onboarding group — hidden from tab bar, full-screen */}
      <Tabs.Screen
        name="(onboarding)"
        options={{
          href: null,
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}

function TabIcon({ emoji }: { emoji: string; color: ColorValue }) {
  const { Text } = require('react-native');
  return <Text style={{ fontSize: 20 }}>{emoji}</Text>;
}
