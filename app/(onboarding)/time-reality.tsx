import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingShell } from '../../components/OnboardingShell';
import { saveProfile } from '../../lib/profile';
import { colors, spacing, font, radius } from '../../constants/theme';

const OPTIONS = [
  { minutes: 5, label: '5 minutes', desc: 'Quick, micro-actions only.' },
  { minutes: 10, label: '10 minutes', desc: 'A little breathing room.' },
  { minutes: 15, label: '15 minutes', desc: 'Enough for something meaningful.' },
  { minutes: 30, label: '30+ minutes', desc: 'I can carve out real time.' },
];

export default function TimeRealityScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);

  const handleNext = async () => {
    if (selected === null) return;
    await saveProfile({ availableMinutes: selected });
    router.push('/(onboarding)/energy-check');
  };

  return (
    <OnboardingShell
      step={5}
      onNext={handleNext}
      nextDisabled={selected === null}
      showBack
    >
      <Text style={styles.eyebrow}>This is important.</Text>
      <Text style={styles.question}>
        On a typical day, how much time could you realistically dedicate to yourself?
      </Text>
      <Text style={styles.sub}>
        Most apps assume you have more time than you do. We won't.
      </Text>

      <View style={styles.options}>
        {OPTIONS.map(opt => {
          const active = selected === opt.minutes;
          return (
            <TouchableOpacity
              key={opt.minutes}
              style={[styles.option, active && styles.optionActive]}
              onPress={() => setSelected(opt.minutes)}
              activeOpacity={0.7}
            >
              <View style={styles.textBlock}>
                <Text style={[styles.label, active && styles.labelActive]}>{opt.label}</Text>
                <Text style={styles.desc}>{opt.desc}</Text>
              </View>
              <View style={[styles.radio, active && styles.radioActive]}>
                {active && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </OnboardingShell>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    fontSize: font.sizes.sm,
    color: colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  question: {
    fontSize: font.sizes.xl,
    fontWeight: '800',
    color: colors.text,
    lineHeight: font.sizes.xl * 1.3,
    marginBottom: spacing.sm,
  },
  sub: {
    fontSize: font.sizes.md,
    color: colors.textMuted,
    lineHeight: 22,
    marginBottom: spacing.lg,
    fontStyle: 'italic',
  },
  options: { gap: spacing.sm },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  textBlock: { flex: 1 },
  label: { fontSize: font.sizes.md, fontWeight: '700', color: colors.text, marginBottom: 2 },
  labelActive: { color: colors.primary },
  desc: { fontSize: font.sizes.sm, color: colors.textMuted },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  radioActive: { borderColor: colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
});
