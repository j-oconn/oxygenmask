import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingShell } from '../../components/OnboardingShell';
import { saveProfile } from '../../lib/profile';
import { colors, spacing, font, radius } from '../../constants/theme';

const ALL_AREAS = [
  { id: 'wellbeing', label: 'My own wellbeing', emoji: '🌱' },
  { id: 'relationship', label: 'My relationship with my partner', emoji: '💛' },
  { id: 'friendships', label: 'Friendships and social life', emoji: '👯' },
  { id: 'exercise', label: 'Exercise and health', emoji: '🏃' },
  { id: 'hobbies', label: 'Hobbies and personal interests', emoji: '🎨' },
  { id: 'rest', label: 'Rest and recovery', emoji: '😴' },
];
const ALL_ID = 'all';

export default function FocusAreasScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    if (id === ALL_ID) {
      setSelected(selected.length === ALL_AREAS.length
        ? []
        : ALL_AREAS.map(a => a.id));
    } else {
      setSelected(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
    }
  };

  const allSelected = selected.length === ALL_AREAS.length;

  const handleNext = async () => {
    await saveProfile({ focusAreas: allSelected ? ['all'] : selected });
    router.push('/(onboarding)/kids-age');
  };

  return (
    <OnboardingShell
      step={2}
      onNext={handleNext}
      nextDisabled={selected.length === 0}
      showBack
    >
      <Text style={styles.question}>Which areas feel neglected?</Text>
      <Text style={styles.sub}>Select all that apply.</Text>

      <View style={styles.options}>
        {ALL_AREAS.map(area => {
          const active = selected.includes(area.id);
          return (
            <TouchableOpacity
              key={area.id}
              style={[styles.option, active && styles.optionActive]}
              onPress={() => toggle(area.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionEmoji}>{area.emoji}</Text>
              <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>
                {area.label}
              </Text>
              <View style={[styles.check, active && styles.checkActive]}>
                {active && <Text style={styles.checkMark}>✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* All of the above */}
        <TouchableOpacity
          style={[styles.option, allSelected && styles.optionActive]}
          onPress={() => toggle(ALL_ID)}
          activeOpacity={0.7}
        >
          <Text style={styles.optionEmoji}>✨</Text>
          <Text style={[styles.optionLabel, allSelected && styles.optionLabelActive]}>
            All of the above
          </Text>
          <View style={[styles.check, allSelected && styles.checkActive]}>
            {allSelected && <Text style={styles.checkMark}>✓</Text>}
          </View>
        </TouchableOpacity>
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
  optionEmoji: { fontSize: 20, marginRight: spacing.sm },
  optionLabel: { flex: 1, fontSize: font.sizes.md, color: colors.text },
  optionLabelActive: { color: colors.primary, fontWeight: '600' },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkMark: { color: colors.white, fontSize: 12, fontWeight: '700' },
});
