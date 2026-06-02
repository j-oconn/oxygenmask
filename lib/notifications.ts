import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestPermissionsAndSchedule(hour = 8): Promise<void> {
  if (Platform.OS === 'web') return;

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return;

  await Notifications.cancelAllScheduledNotificationsAsync();

  // Daily nudge at user's chosen hour
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Oxygen Mask',
      body: "Your daily reminder is ready. Put on your own mask first.",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute: 0,
    },
  });

  // Weekly check-in on Sunday at 7pm
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Weekly Check-In',
      body: "How connected do you feel to your partner this week?",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
      weekday: 1, // Sunday
      hour: 19,
      minute: 0,
    },
  });
}
