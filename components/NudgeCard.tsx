import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, font } from '../constants/theme';

interface NudgeCardProps {
  title: string;
  nudgeText: string;
  category: string;
  done: boolean;
  accentColor: string;
  accentLight: string;
  onDone: () => void;
  darkButtonText?: boolean;
}

export function NudgeCard({
  title,
  nudgeText,
  category,
  done,
  accentColor,
  accentLight,
  onDone,
  darkButtonText = false,
}: NudgeCardProps) {
  return (
    <View style={[styles.card, done && styles.cardDone]}>
      <View style={[styles.badge, { backgroundColor: accentLight }]}>
        <Text style={[styles.badgeText, { color: accentColor }]}>{title}</Text>
      </View>
      <Text style={styles.categoryLabel}>{category}</Text>
      <Text style={[styles.nudgeText, done && styles.nudgeTextDone]}>{nudgeText}</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: done ? colors.border : accentColor }]}
        onPress={onDone}
        disabled={done}
        activeOpacity={0.7}
      >
        <Text style={[styles.buttonText, { color: done ? colors.textMuted : darkButtonText ? colors.buttonText : colors.white }]}>
          {done ? 'Done ✓' : 'Mark Done'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardDone: {
    opacity: 0.75,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginBottom: spacing.xs,
  },
  badgeText: {
    fontSize: font.sizes.sm,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoryLabel: {
    fontSize: font.sizes.sm,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  nudgeText: {
    fontSize: font.sizes.lg,
    color: colors.text,
    lineHeight: 28,
    marginBottom: spacing.lg,
    fontWeight: '500',
  },
  nudgeTextDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  button: {
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: font.sizes.md,
    fontWeight: '700',
  },
});
