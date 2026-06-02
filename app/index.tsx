import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { NudgeCard } from '../components/NudgeCard';
import { selfCareNudges, partnerCareNudges, getNudgeForToday } from '../lib/nudges';
import { getTodayCompletions, markComplete, DayCompletions } from '../lib/storage';
import { getProfile, hasSoloStatus, isOnboardingComplete } from '../lib/profile';
import { colors, spacing, font } from '../constants/theme';

export default function TodayScreen() {
  const router = useRouter();
  const [completions, setCompletions] = useState<DayCompletions>({ selfCare: false, partnerCare: false });
  const [refreshing, setRefreshing] = useState(false);
  const [isSolo, setIsSolo] = useState(false);

  // Redirect to onboarding if not yet completed
  useEffect(() => {
    isOnboardingComplete().then(done => {
      if (!done) router.replace('/(onboarding)/welcome');
    });
  }, []);

  const selfCareNudge = getNudgeForToday(selfCareNudges);
  const partnerCareNudge = getNudgeForToday(partnerCareNudges);

  const load = useCallback(async () => {
    const [data, profile] = await Promise.all([getTodayCompletions(), getProfile()]);
    setCompletions(data);
    if (profile?.relationshipStatus) {
      setIsSolo(hasSoloStatus(profile.relationshipStatus));
    }
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const handleDone = async (type: 'selfCare' | 'partnerCare') => {
    await markComplete(type);
    setCompletions(prev => ({ ...prev, [type]: true }));
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const allDone = isSolo ? completions.selfCare : (completions.selfCare && completions.partnerCare);
  const bothDone = allDone;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.date}>{today}</Text>
        <Text style={styles.heading}>Put on your{'\n'}oxygen mask first.</Text>
        {bothDone && (
          <View style={styles.completedBanner}>
            <Text style={styles.completedText}>
            {isSolo ? 'You showed up for yourself today. 🌱' : 'You showed up for yourself and your partner today. 🌱'}
          </Text>
          </View>
        )}
        <NudgeCard
          title="Self-Care"
          nudgeText={selfCareNudge.text}
          category={selfCareNudge.category}
          done={completions.selfCare}
          accentColor={colors.secondary}
          accentLight={colors.secondaryLight}
          onDone={() => handleDone('selfCare')}
        />
        {!isSolo && (
          <NudgeCard
            title="Partner Care"
            nudgeText={partnerCareNudge.text}
            category={partnerCareNudge.category}
            done={completions.partnerCare}
            accentColor={colors.primary}
            accentLight={colors.primaryLight}
            darkButtonText
            onDone={() => handleDone('partnerCare')}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  date: {
    fontSize: font.sizes.sm,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  heading: {
    fontSize: font.sizes.xl,
    fontWeight: '800',
    color: colors.text,
    lineHeight: font.sizes.xl * 1.3,
    marginBottom: spacing.lg,
  },
  completedBanner: {
    backgroundColor: colors.secondaryLight,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  completedText: {
    fontSize: font.sizes.md,
    color: colors.secondary,
    fontWeight: '600',
    textAlign: 'center',
  },
});
