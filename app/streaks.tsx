import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { StreakBadge } from '../components/StreakBadge';
import { calculateStreak } from '../lib/streaks';
import { getCheckInHistory, CheckInEntry } from '../lib/storage';
import { colors, spacing, font, radius } from '../constants/theme';

const CHECK_IN_EMOJIS = ['', '😔', '😕', '😐', '🙂', '😊'];

export default function StreaksScreen() {
  const [selfCareStreak, setSelfCareStreak] = useState(0);
  const [partnerStreak, setPartnerStreak] = useState(0);
  const [checkInHistory, setCheckInHistory] = useState<CheckInEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      Promise.all([
        calculateStreak('selfCare'),
        calculateStreak('partnerCare'),
        getCheckInHistory(),
      ]).then(([sc, pc, history]) => {
        setSelfCareStreak(sc);
        setPartnerStreak(pc);
        setCheckInHistory(history);
      });
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Your Streaks</Text>
        <Text style={styles.subheading}>Consecutive days you've shown up.</Text>

        <View style={styles.streakRow}>
          <StreakBadge
            count={selfCareStreak}
            label={'Self-Care\nStreak'}
            color={colors.secondary}
            lightColor={colors.secondaryLight}
          />
          <StreakBadge
            count={partnerStreak}
            label={'Partner Care\nStreak'}
            color={colors.primary}
            lightColor={colors.primaryLight}
          />
        </View>

        {checkInHistory.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Connection History</Text>
            {checkInHistory.slice(0, 8).map((entry) => (
              <View key={entry.date} style={styles.historyRow}>
                <Text style={styles.historyDate}>
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </Text>
                <Text style={styles.historyEmoji}>{CHECK_IN_EMOJIS[entry.score]}</Text>
                <View style={styles.historyBar}>
                  <View
                    style={[
                      styles.historyFill,
                      { width: `${(entry.score / 5) * 100}%`, backgroundColor: colors.primary },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {checkInHistory.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Complete your first weekly check-in to start tracking your connection score.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { padding: spacing.lg, paddingBottom: spacing.xl * 2 },
  heading: {
    fontSize: font.sizes.xl,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subheading: {
    fontSize: font.sizes.md,
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  streakRow: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: font.sizes.md,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  historyDate: {
    fontSize: font.sizes.sm,
    color: colors.textMuted,
    width: 60,
  },
  historyEmoji: {
    fontSize: 18,
    width: 30,
    textAlign: 'center',
  },
  historyBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginLeft: spacing.sm,
  },
  historyFill: {
    height: '100%',
    borderRadius: 4,
  },
  emptyState: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: font.sizes.md,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
