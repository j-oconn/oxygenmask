import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingShell } from '../../components/OnboardingShell';
import { saveProfile } from '../../lib/profile';
import { requestPermissionsAndSchedule } from '../../lib/notifications';
import { colors, spacing, font, radius } from '../../constants/theme';

const OPTIONS = [
  { id: 'morning', label: 'Morning', desc: 'Start the day with intention.', hour: 7, emoji: '🌅' },
  { id: 'lunch', label: 'Lunchtime', desc: 'A midday reset.', hour: 12, emoji: '☀️' },
  { id: 'evening', label: 'Evening', desc: 'Wind down and reflect.', hour: 19, emoji: '🌙' },
  { id: 'after-kids', label: 'After kids are asleep', desc: 'When the house is finally quiet.', hour: 21, emoji: '🌌' },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = async () => {
    const opt = OPTIONS.find(o => o.id === selected);
    if (!opt) return;
    await saveProfile({ notificationTime: selected! });
    await requestPermissionsAndSchedule(opt.hour);
    router.push('/(onboarding)/first-action');
  };

  return (
    <OnboardingShell
      step={7}
      onNext={handleNext}
      nextDisabled={!selected}
      showBack
    >
      <Text style={styles.question}>When are you most likely to act on a reminder?</Text>
      <Text style={styles.sub}>We'll send you one daily nudge at this time.</Text>

      <View style={styles.options}>
        {OPTIONS.map(opt => {
          const active = selected === opt.id;
          return (
            <TouchableOpacity
              key={opt.id}
              style={[styles.option, active && styles.optionActive]}
              onPress={() => setSelected(opt.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.emoji}>{opt.emoji}</Text>
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
  emoji: { fontSize: 24, marginRight: spacing.sm },
  textBlock: { flex: 1 },
  label: { fontSize: font.sizes.md, fontWeight: '600', color: colors.text, marginBottom: 2 },
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
