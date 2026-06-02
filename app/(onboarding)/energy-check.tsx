import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingShell } from '../../components/OnboardingShell';
import { saveProfile, EnergyBaseline } from '../../lib/profile';
import { colors, spacing, font, radius } from '../../constants/theme';

const DIMENSIONS = [
  {
    key: 'stress' as keyof EnergyBaseline,
    label: 'Stress level',
    low: '😤 Overwhelmed',
    high: '😌 At ease',
  },
  {
    key: 'connection' as keyof EnergyBaseline,
    label: 'Connection to partner',
    low: '😔 Distant',
    high: '😊 Close',
  },
  {
    key: 'fulfillment' as keyof EnergyBaseline,
    label: 'Personal fulfillment',
    low: '😞 Running on empty',
    high: '😄 Fulfilled',
  },
  {
    key: 'sleep' as keyof EnergyBaseline,
    label: 'Sleep quality',
    low: '😫 Exhausted',
    high: '✨ Rested',
  },
];

export default function EnergyCheckScreen() {
  const router = useRouter();
  const [scores, setScores] = useState<EnergyBaseline>({
    stress: 0,
    connection: 0,
    fulfillment: 0,
    sleep: 0,
  });

  const setScore = (key: keyof EnergyBaseline, value: number) => {
    setScores(prev => ({ ...prev, [key]: value }));
  };

  const allSet = Object.values(scores).every(v => v > 0);

  const handleNext = async () => {
    await saveProfile({ energyBaseline: scores });
    router.push('/(onboarding)/notifications');
  };

  return (
    <OnboardingShell
      step={6}
      onNext={handleNext}
      nextDisabled={!allSet}
      showBack
    >
      <Text style={styles.question}>How are you feeling lately?</Text>
      <Text style={styles.sub}>This creates your baseline. No right answers.</Text>

      <View style={styles.dimensions}>
        {DIMENSIONS.map(dim => (
          <View key={dim.key} style={styles.dimension}>
            <Text style={styles.dimLabel}>{dim.label}</Text>
            <View style={styles.scaleRow}>
              {[1, 2, 3, 4, 5].map(n => {
                const active = scores[dim.key] === n;
                return (
                  <TouchableOpacity
                    key={n}
                    style={[styles.dot, active && styles.dotActive]}
                    onPress={() => setScore(dim.key, n)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.dotNum, active && styles.dotNumActive]}>{n}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.scaleLabels}>
              <Text style={styles.scaleEnd}>{dim.low}</Text>
              <Text style={styles.scaleEnd}>{dim.high}</Text>
            </View>
          </View>
        ))}
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  question: {
    fontSize: font.sizes.xl,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  sub: {
    fontSize: font.sizes.md,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  dimensions: { gap: spacing.lg },
  dimension: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  dimLabel: {
    fontSize: font.sizes.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  dot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  dotActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  dotNum: { fontSize: font.sizes.md, fontWeight: '600', color: colors.textMuted },
  dotNumActive: { color: colors.white },
  scaleLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  scaleEnd: { fontSize: font.sizes.sm - 1, color: colors.textMuted },
});
