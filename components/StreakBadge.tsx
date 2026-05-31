import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, font } from '../constants/theme';

interface StreakBadgeProps {
  count: number;
  label: string;
  color: string;
  lightColor: string;
}

export function StreakBadge({ count, label, color, lightColor }: StreakBadgeProps) {
  return (
    <View style={[styles.container, { backgroundColor: lightColor }]}>
      <Text style={[styles.flame, { color }]}>🔥</Text>
      <Text style={[styles.count, { color }]}>{count}</Text>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  flame: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  count: {
    fontSize: font.sizes.xxl,
    fontWeight: '800',
    lineHeight: font.sizes.xxl + 4,
  },
  label: {
    fontSize: font.sizes.sm,
    fontWeight: '600',
    marginTop: spacing.xs,
    textAlign: 'center',
    opacity: 0.8,
  },
});
