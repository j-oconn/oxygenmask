import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingShell } from '../../components/OnboardingShell';
import { saveProfile, getProfile, hasSoloStatus } from '../../lib/profile';
import { markComplete } from '../../lib/storage';
import { selfCareNudges, partnerCareNudges, getNudgeForToday } from '../../lib/nudges';
import { colors, spacing, font, radius } from '../../constants/theme';

export default function FirstActionScreen() {
  const router = useRouter();
  const [isSolo, setIsSolo] = useState(false);

  useEffect(() => {
    getProfile().then(p => {
      if (p?.relationshipStatus) setIsSolo(hasSoloStatus(p.relationshipStatus));
    });
  }, []);

  const selfNudge = getNudgeForToday(selfCareNudges);
  const partnerNudge = getNudgeForToday(partnerCareNudges);

  const previewNudges = isSolo
    ? [selfNudge.text, selfCareNudges[(selfCareNudges.indexOf(selfNudge) + 1) % selfCareNudges.length].text]
    : [selfNudge.text, partnerNudge.text];

  const firstActionText = isSolo
    ? "Before we begin — do one thing right now, just for you. Step outside for 60 seconds."
    : "Before we begin — text your partner one thing you appreciate about them.";

  const completeOnboarding = async (markDone: boolean) => {
    if (markDone) {
      await markComplete(isSolo ? 'selfCare' : 'partnerCare');
    }
    await saveProfile({ onboardingComplete: true });
    router.replace('/');
  };

  return (
    <OnboardingShell step={8} showBack={false} scrollable>
      <Text style={styles.eyebrow}>You're all set 🎉</Text>
      <Text style={styles.question}>Here's what we'll work on together.</Text>

      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>Coming up for you</Text>
        {previewNudges.map((text, i) => (
          <View key={i} style={styles.previewRow}>
            <Text style={styles.previewBullet}>→</Text>
            <Text style={styles.previewText}>{text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.firstActionCard}>
        <Text style={styles.firstActionLabel}>One thing before you start</Text>
        <Text style={styles.firstActionText}>{firstActionText}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => completeOnboarding(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.doneText}>I did it ✓</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => completeOnboarding(false)}
          activeOpacity={0.7}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    fontSize: font.sizes.md,
    color: colors.secondary,
    fontWeight: '700',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  question: {
    fontSize: font.sizes.xl,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.lg,
    lineHeight: font.sizes.xl * 1.3,
  },
  previewCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  previewTitle: {
    fontSize: font.sizes.sm,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  previewRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    alignItems: 'flex-start',
  },
  previewBullet: {
    fontSize: font.sizes.md,
    color: colors.primary,
    marginRight: spacing.sm,
    lineHeight: 24,
  },
  previewText: {
    flex: 1,
    fontSize: font.sizes.md,
    color: colors.text,
    lineHeight: 24,
  },
  firstActionCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  firstActionLabel: {
    fontSize: font.sizes.sm,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  firstActionText: {
    fontSize: font.sizes.md + 1,
    color: colors.text,
    lineHeight: 26,
    fontWeight: '500',
  },
  buttons: { gap: spacing.sm },
  doneButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  doneText: { color: colors.text, fontSize: font.sizes.md, fontWeight: '700' },
  skipButton: {
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    alignItems: 'center',
  },
  skipText: { color: colors.textMuted, fontSize: font.sizes.md },
});
