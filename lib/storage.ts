import AsyncStorage from '@react-native-async-storage/async-storage';

export type CompletionType = 'selfCare' | 'partnerCare';

export interface DayCompletions {
  selfCare: boolean;
  partnerCare: boolean;
}

export interface CheckInEntry {
  date: string;
  score: number;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function markComplete(type: CompletionType): Promise<void> {
  const key = `completions.${todayKey()}.${type}`;
  await AsyncStorage.setItem(key, 'true');
}

export async function getTodayCompletions(): Promise<DayCompletions> {
  const dateStr = todayKey();
  const [sc, pc] = await AsyncStorage.multiGet([
    `completions.${dateStr}.selfCare`,
    `completions.${dateStr}.partnerCare`,
  ]);
  return {
    selfCare: sc[1] === 'true',
    partnerCare: pc[1] === 'true',
  };
}

export async function getCompletionHistory(days: number): Promise<Record<string, DayCompletions>> {
  const history: Record<string, DayCompletions> = {};
  const keys: string[] = [];
  const dates: string[] = [];

  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    dates.push(dateStr);
    keys.push(`completions.${dateStr}.selfCare`);
    keys.push(`completions.${dateStr}.partnerCare`);
  }

  const results = await AsyncStorage.multiGet(keys);

  dates.forEach((dateStr, i) => {
    history[dateStr] = {
      selfCare: results[i * 2][1] === 'true',
      partnerCare: results[i * 2 + 1][1] === 'true',
    };
  });

  return history;
}

export async function saveCheckIn(score: number): Promise<void> {
  const existing = await getCheckInHistory();
  const entry: CheckInEntry = { date: todayKey(), score };
  const updated = [entry, ...existing.filter(e => e.date !== todayKey())].slice(0, 52);
  await AsyncStorage.setItem('checkins', JSON.stringify(updated));
}

export async function getCheckInHistory(): Promise<CheckInEntry[]> {
  const raw = await AsyncStorage.getItem('checkins');
  if (!raw) return [];
  try {
    return JSON.parse(raw) as CheckInEntry[];
  } catch {
    return [];
  }
}

export async function getLastCheckInDate(): Promise<string | null> {
  const history = await getCheckInHistory();
  return history.length > 0 ? history[0].date : null;
}

export async function shouldShowWeeklyCheckIn(): Promise<boolean> {
  const lastDate = await getLastCheckInDate();
  if (!lastDate) return true;
  const last = new Date(lastDate);
  const now = new Date();
  const diffDays = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= 7;
}
