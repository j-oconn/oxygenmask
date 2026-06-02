import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { saveCheckIn, shouldShowWeeklyCheckIn, getCheckInHistory, CheckInEntry } from '../lib/storage';
import { colors, spacing, font, radius } from '../constants/theme';

const SCORES = [
  { value: 1, emoji: '😔', label: 'Disconnected' },
  { value: 2, emoji: '😕', label: 'A bit distant' },
  { value: 3, emoji: '😐', label: 'Getting by' },
  { value: 4, emoji: '🙂', label: 'Pretty good' },
  { value: 5, emoji: '😊', label: 'Really connected' },
];

export default function CheckInScreen() {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState<CheckInEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      setSubmitted(false);
      setSelected(null);
      Promise.all([shouldShowWeeklyCheckIn(), getCheckInHistory()]).then(([show, hist]) => {
        setShowForm(show);
        setHistory(hist);
      });
    }, [])
  );

  const handleSubmit = async () => {
    if (selected === null) return;
    await saveCheckIn(selected);
    setSubmitted(true);
    setShowForm(false);
    const hist = await getCheckInHistory();
    setHistory(hist);
  };

  const lastEntry = history[0];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Weekly Check-In</Text>
        <Text style={styles.subheading}>
          A moment to reflect on your relationship this week.
        </Text>

        {submitted && (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>Thanks for checking in. 💛</Text>
          </View>
        )}

        {showForm && !submitted && (
          <View style={styles.card}>
            <Text style={styles.question}>
              How connected do you feel to your partner this week?
            </Text>
            <View style={styles.scoresRow}>
              {SCORES.map((s) => (
                <TouchableOpacity
                  key={s.value}
                  style={[
                    styles.scoreButton,
                    selected === s.value && styles.scoreButtonSelected,
                  ]}
                  onPress={() => setSelected(s.value)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.scoreEmoji}>{s.emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {selected !== null && (
              <Text style={styles.selectedLabel}>
                {SCORES.find(s => s.value === selected)?.label}
              </Text>
            )}
            <TouchableOpacity
              style={[styles.submitButton, selected === null && styles.submitDisabled]}
              onPress={handleSubmit}
              disabled={selected === null}
              activeOpacity={0.7}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showForm && !submitted && lastEntry && (
          <View style={styles.card}>
            <Text style={styles.doneText}>
              You checked in on{' '}
              {new Date(lastEntry.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })}
              .
            </Text>
            <Text style={styles.doneScore}>
              You felt {SCORES.find(s => s.value === lastEntry.score)?.label?.toLowerCase()}.{' '}
              {SCORES.find(s => s.value === lastEntry.score)?.emoji}
            </Text>
            <Text style={styles.doneNext}>
              Your next check-in will be available in a week.
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
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  question: {
    fontSize: font.sizes.lg,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 28,
    marginBottom: spacing.lg,
  },
  scoresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  scoreButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  scoreButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  scoreEmoji: {
    fontSize: 26,
  },
  selectedLabel: {
    textAlign: 'center',
    fontSize: font.sizes.md,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    alignItems: 'center',
  },
  submitDisabled: {
    backgroundColor: colors.border,
  },
  submitText: {
    color: colors.text,
    fontSize: font.sizes.md,
    fontWeight: '700',
  },
  successBanner: {
    backgroundColor: colors.secondaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  successText: {
    color: colors.secondary,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: font.sizes.md,
  },
  doneText: {
    fontSize: font.sizes.md,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  doneScore: {
    fontSize: font.sizes.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  doneNext: {
    fontSize: font.sizes.sm,
    color: colors.textMuted,
  },
});
