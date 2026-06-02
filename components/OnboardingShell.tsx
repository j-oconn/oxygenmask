import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, font, radius } from '../constants/theme';

interface Props {
  step: number;        // 1-based, 0 = welcome (no progress bar)
  totalSteps?: number;
  children: React.ReactNode;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
  scrollable?: boolean;
}

export function OnboardingShell({
  step,
  totalSteps = 8,
  children,
  onNext,
  nextLabel = 'Continue',
  nextDisabled = false,
  showBack = true,
  scrollable = true,
}: Props) {
  const router = useRouter();
  const showProgress = step > 0;
  const progress = step / totalSteps;

  const content = (
    <View style={styles.inner}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          {showBack && step > 1 ? (
            <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.backPlaceholder} />
          )}
          {showProgress && (
            <Text style={styles.stepLabel}>{step} of {totalSteps}</Text>
          )}
        </View>

        {/* Progress bar */}
        {showProgress && (
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` as any }]} />
          </View>
        )}

        {/* Content */}
        {scrollable ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {content}
          </ScrollView>
        ) : (
          <View style={styles.scrollContent}>{content}</View>
        )}

        {/* Footer CTA */}
        {onNext && (
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.nextButton, nextDisabled && styles.nextDisabled]}
              onPress={onNext}
              disabled={nextDisabled}
              activeOpacity={0.8}
            >
              <Text style={[styles.nextText, nextDisabled && styles.nextTextDisabled]}>
                {nextLabel}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  backText: { fontSize: font.sizes.md, color: colors.textMuted },
  backPlaceholder: { width: 60 },
  stepLabel: { fontSize: font.sizes.sm, color: colors.textMuted },
  progressTrack: {
    height: 3,
    backgroundColor: colors.border,
    marginHorizontal: spacing.lg,
    borderRadius: 2,
    marginBottom: spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  inner: { flex: 1 },
  footer: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 4,
    alignItems: 'center',
  },
  nextDisabled: { backgroundColor: colors.border },
  nextText: { color: colors.buttonText, fontSize: font.sizes.md, fontWeight: '700' },
  nextTextDisabled: { color: colors.textMuted },
});
