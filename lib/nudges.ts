export interface Nudge {
  id: string;
  text: string;
  category: string;
}

export const selfCareNudges: Nudge[] = [
  { id: 'sc1', text: 'Spend 15 minutes alone doing something you enjoy.', category: 'Alone Time' },
  { id: 'sc2', text: 'Go for a 10-minute walk outside — no podcast, just you.', category: 'Exercise' },
  { id: 'sc3', text: 'Go to bed 30 minutes earlier than usual tonight.', category: 'Sleep' },
  { id: 'sc4', text: 'Text a friend you haven\'t talked to in a while.', category: 'Friends' },
  { id: 'sc5', text: 'Do one thing today that has nothing to do with parenting.', category: 'Hobbies' },
  { id: 'sc6', text: 'Eat a meal sitting down, without screens.', category: 'Rest' },
  { id: 'sc7', text: 'Take 5 slow, deep breaths before getting out of bed.', category: 'Mindfulness' },
  { id: 'sc8', text: 'Stretch for 5 minutes after the kids are asleep.', category: 'Exercise' },
  { id: 'sc9', text: 'Read something you actually want to read — even just one chapter.', category: 'Hobbies' },
  { id: 'sc10', text: 'Say no to one non-essential obligation today.', category: 'Boundaries' },
  { id: 'sc11', text: 'Listen to music you love while doing a chore.', category: 'Joy' },
  { id: 'sc12', text: 'Drink a full glass of water first thing this morning.', category: 'Health' },
  { id: 'sc13', text: 'Step outside for 5 minutes of fresh air, even briefly.', category: 'Exercise' },
  { id: 'sc14', text: 'Write down three things that went okay today.', category: 'Mindfulness' },
  { id: 'sc15', text: 'Schedule one thing this week that\'s purely for you.', category: 'Planning' },
  { id: 'sc16', text: 'Close your eyes for 5 minutes — not sleeping, just resting.', category: 'Rest' },
  { id: 'sc17', text: 'Do a hobby for 20 minutes — without guilt.', category: 'Hobbies' },
  { id: 'sc18', text: 'Call a friend and tell them one real thing about your week.', category: 'Friends' },
  { id: 'sc19', text: 'Move your body in any way that feels good for 10 minutes.', category: 'Exercise' },
  { id: 'sc20', text: 'Put your phone in another room for one hour tonight.', category: 'Rest' },
  { id: 'sc21', text: 'Make yourself a meal or drink you genuinely enjoy.', category: 'Joy' },
  { id: 'sc22', text: 'Write down one thing you\'re proud of from this week.', category: 'Mindfulness' },
  { id: 'sc23', text: 'Take a shower or bath without rushing.', category: 'Rest' },
  { id: 'sc24', text: 'Do 10 minutes of something creative — drawing, writing, cooking.', category: 'Hobbies' },
  { id: 'sc25', text: 'Let yourself laugh at something today — a show, a memory, a joke.', category: 'Joy' },
  { id: 'sc26', text: 'Ask for help with one thing you\'ve been doing alone.', category: 'Boundaries' },
  { id: 'sc27', text: 'Spend 15 minutes outside, even just sitting on the porch.', category: 'Exercise' },
  { id: 'sc28', text: 'Set a bedtime alarm tonight to protect your sleep.', category: 'Sleep' },
  { id: 'sc29', text: 'Reach out to a friend who makes you feel like yourself.', category: 'Friends' },
  { id: 'sc30', text: 'Give yourself permission to do nothing for 10 minutes today.', category: 'Rest' },
];

export const partnerCareNudges: Nudge[] = [
  { id: 'pc1', text: 'Tell your partner one thing you appreciated about them this week.', category: 'Appreciation' },
  { id: 'pc2', text: 'Schedule one hour where your partner is completely off-duty.', category: 'Acts of Service' },
  { id: 'pc3', text: 'Ask your partner: "What\'s one thing I could do next week to make life easier?"', category: 'Connection' },
  { id: 'pc4', text: 'Give your partner a genuine compliment — not about parenting.', category: 'Compliments' },
  { id: 'pc5', text: 'Handle bedtime solo so your partner gets a break tonight.', category: 'Acts of Service' },
  { id: 'pc6', text: 'Send your partner a text mid-day just to check in.', category: 'Connection' },
  { id: 'pc7', text: 'Plan a 30-minute date — after the kids are asleep counts.', category: 'Date Nights' },
  { id: 'pc8', text: 'Tell your partner one thing you love about who they are as a person.', category: 'Compliments' },
  { id: 'pc9', text: 'Do one chore your partner usually handles, without being asked.', category: 'Acts of Service' },
  { id: 'pc10', text: 'Ask your partner how they\'re really doing — and just listen.', category: 'Connection' },
  { id: 'pc11', text: 'Express gratitude for something small your partner did this week.', category: 'Appreciation' },
  { id: 'pc12', text: 'Look your partner in the eyes and smile at them today.', category: 'Connection' },
  { id: 'pc13', text: 'Give your partner 30 minutes to do something they enjoy — alone.', category: 'Acts of Service' },
  { id: 'pc14', text: 'Plan a real date night for the next two weeks.', category: 'Date Nights' },
  { id: 'pc15', text: 'Notice something your partner did today and say "thank you" for it.', category: 'Appreciation' },
  { id: 'pc16', text: 'Share a funny memory or inside joke with your partner today.', category: 'Connection' },
  { id: 'pc17', text: 'Take something off your partner\'s mental load — just do it.', category: 'Acts of Service' },
  { id: 'pc18', text: 'Tell your partner what you admire about how they parent.', category: 'Compliments' },
  { id: 'pc19', text: 'Ask: "Is there anything you need from me this week?"', category: 'Connection' },
  { id: 'pc20', text: 'Sit together for 10 quiet minutes — no phones, no agenda.', category: 'Date Nights' },
  { id: 'pc21', text: 'Write your partner a short note and leave it somewhere they\'ll find it.', category: 'Appreciation' },
  { id: 'pc22', text: 'Let your partner vent without trying to fix anything.', category: 'Connection' },
  { id: 'pc23', text: 'Do the morning routine solo so your partner can sleep in.', category: 'Acts of Service' },
  { id: 'pc24', text: 'Tell your partner one thing they do that makes your life easier.', category: 'Appreciation' },
  { id: 'pc25', text: 'Reach for your partner\'s hand today — no reason needed.', category: 'Connection' },
  { id: 'pc26', text: 'Surprise your partner with their favorite snack or drink.', category: 'Acts of Service' },
  { id: 'pc27', text: 'Remind your partner: "You\'re doing a great job."', category: 'Compliments' },
  { id: 'pc28', text: 'Make a plan together for something fun — even small.', category: 'Date Nights' },
  { id: 'pc29', text: 'Give your partner a real hug today.', category: 'Connection' },
  { id: 'pc30', text: 'Acknowledge one sacrifice your partner has made recently.', category: 'Appreciation' },
];

export function getNudgeForToday(nudges: Nudge[]): Nudge {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return nudges[dayOfYear % nudges.length];
}
