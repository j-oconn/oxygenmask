import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, font, radius } from '../../constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.emoji}>🌬️</Text>
          <Text style={styles.appName}>Oxygen Mask</Text>
        </View>

        <View style={styles.middle}>
          <Text style={styles.headline}>
            Parenting takes care of everyone else.
          </Text>
          <Text style={styles.headline2}>
            This app helps take care of you.
          </Text>
          <Text style={styles.subtext}>
            Small reminders to strengthen yourself, your relationship, and your wellbeing — built for the reality of parenthood.
          </Text>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(onboarding)/focus-areas')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    justifyContent: 'space-between',
  },
  top: { alignItems: 'center', paddingTop: spacing.xl },
  emoji: { fontSize: 56, marginBottom: spacing.sm },
  appName: {
    fontSize: font.sizes.sm,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  middle: { flex: 1, justifyContent: 'center' },
  headline: {
    fontSize: font.sizes.xl + 4,
    fontWeight: '800',
    color: colors.text,
    lineHeight: (font.sizes.xl + 4) * 1.25,
    marginBottom: spacing.xs,
  },
  headline2: {
    fontSize: font.sizes.xl + 4,
    fontWeight: '800',
    color: colors.primary,
    lineHeight: (font.sizes.xl + 4) * 1.25,
    marginBottom: spacing.lg,
  },
  subtext: {
    fontSize: font.sizes.md + 1,
    color: colors.textMuted,
    lineHeight: 26,
  },
  bottom: { paddingBottom: spacing.md },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.text,
    fontSize: font.sizes.md,
    fontWeight: '700',
  },
});
