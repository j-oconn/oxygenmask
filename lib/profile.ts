import AsyncStorage from '@react-native-async-storage/async-storage';

export interface EnergyBaseline {
  stress: number;       // 1–5
  connection: number;
  fulfillment: number;
  sleep: number;
}

export interface UserProfile {
  focusAreas: string[];
  kidsAges: string[];
  relationshipStatus: string;
  availableMinutes: number;
  energyBaseline: EnergyBaseline;
  notificationTime: string;
  onboardingComplete: boolean;
}

const PROFILE_KEY = 'profile';

export async function saveProfile(updates: Partial<UserProfile>): Promise<void> {
  const existing = await getProfile();
  const merged = { ...(existing ?? {}), ...updates };
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(merged));
}

export async function getProfile(): Promise<UserProfile | null> {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export async function isOnboardingComplete(): Promise<boolean> {
  const profile = await getProfile();
  return profile?.onboardingComplete === true;
}

export function hasSoloStatus(relationshipStatus: string): boolean {
  return relationshipStatus === 'just-myself' || relationshipStatus === 'single-parent';
}
