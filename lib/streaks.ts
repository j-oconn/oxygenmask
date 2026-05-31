import { CompletionType, getCompletionHistory } from './storage';

export async function calculateStreak(type: CompletionType): Promise<number> {
  const history = await getCompletionHistory(90);
  let streak = 0;

  for (let i = 0; i < 90; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const dayData = history[dateStr];

    if (i === 0 && !dayData?.[type]) {
      // Today not yet done — check if yesterday started a streak
      continue;
    }

    if (dayData?.[type]) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
