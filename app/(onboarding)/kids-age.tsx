import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingShell } from '../../components/OnboardingShell';
import { saveProfile } from '../../lib/profile';
import { colors, spacing, font, radius } from '../../constants/theme';

const AGE_OPTIONS = [
  { id: 'expecting', label: 'Expecting', emoji: '🤰' },
  { id: 'under-1', label: 'Under 1', emoji: '👶' },
  { id: '1-3', label: '1–3', emoji: '🧒' },
  { id: '4-7', label: '4–7', emoji: '🧒‍♂️' },
  { id: '8-12', label: '8–12', emoji: '🧑' },
  { id: 'teenagers', label: 'Teenagers', emoji: '🧑‍🎤' },
];

export default function KidsAgeScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleNext = async () => {
    await saveProfile({ kidsAges: selected });
    router.push('/(onboarding)/relationship');
  };

  return (
    <OnboardingShell
      step={3}
      onNext={handleNext}
      nextDisabled={selected.length === 0}
      showBack
    >
      <Text style={styles.question}>How old are your children?</Text>
      <Text style={styles.sub}>Select all that apply.</Text>

      <View style={styles.grid}>
        {AGE_OPTIONS.map(opt => {
          const active = selected.includes(opt.id);
          return (
            <TouchableOpacity
              key={opt.id}
              style={[styles.tile, active && styles.tileActive]}
              onPress={() => toggle(opt.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.tileEmoji}>{opt.emoji}</Text>
              <Text style={[styles.tileLabel, active && styles.tileLabelActive]}>
                {opt.label}
              </Text>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tile: {
    width: '47%',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tileActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  tileEmoji: { fontSize: 32, marginBottom: spacing.xs },
  tileLabel: { fontSize: font.sizes.md, color: colors.text, fontWeight: '500' },
  tileLabelActive: { color: colors.primary, fontWeight: '700' },
});
