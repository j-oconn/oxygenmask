import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { OnboardingShell } from '../../components/OnboardingShell';
import { saveProfile } from '../../lib/profile';
import { colors, spacing, font, radius } from '../../constants/theme';

const OPTIONS = [
  { id: 'just-myself', label: 'Just myself', emoji: '🙋', desc: 'I parent solo or want to focus on myself.' },
  { id: 'partner', label: 'Myself and a partner', emoji: '👫', desc: 'We parent together and I want to nurture both of us.' },
  { id: 'co-parenting', label: 'Co-parenting', emoji: '🤝', desc: 'We share parenting across two households.' },
  { id: 'single-parent', label: 'Single parent', emoji: '💪', desc: 'I\'m doing this on my own.' },
];

export default function RelationshipScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = async () => {
    if (!selected) return;
    await saveProfile({ relationshipStatus: selected });
    router.push('/(onboarding)/time-reality');
  };

  return (
    <OnboardingShell
      step={4}
      onNext={handleNext}
      nextDisabled={!selected}
      showBack
    >
      <Text style={styles.question}>Who are you caring for?</Text>
      <Text style={styles.sub}>This helps us personalize your suggestions.</Text>

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
  desc: { fontSize: font.sizes.sm, color: colors.textMuted, lineHeight: 18 },
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
