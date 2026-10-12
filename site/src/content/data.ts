/**
 * Manual-derived content shared across pages. Source references point to USER_MANUAL.md v1.1.
 * Strings may contain trusted inline HTML (rendered with set:html); never put user input here.
 */

/** Coaching cards — USER_MANUAL §5.2 */
export const coachingCards = [
  {
    name: 'Your fastest lap',
    when: 'Always — which lap it was and how far ahead of your average.',
  },
  {
    name: 'Top speed',
    when: 'When telemetry was recorded — your highest speed and the lap you hit it on.',
  },
  { name: 'Consistency', when: 'Always — how tightly your lap times cluster together.' },
  {
    name: 'Dream Lap',
    when: 'When your sector times support it — at least 3 laps with sound sector data.',
  },
  {
    name: 'Sector focus',
    when: 'When your laps have sectors — which third of the track is costing you most.',
  },
  { name: 'The odd one out', when: '4+ laps, when one was far off your usual pace.' },
  {
    name: 'Pace trend',
    when: '6+ laps, when you clearly got quicker or slower through the session.',
  },
] as const;

export interface Faq {
  id: string;
  q: string;
  a: string;
}
export interface FaqGroup {
  id: string;
  title: string;
  items: Faq[];
}

/** FAQ — USER_MANUAL §8 (curated; see docs/CONTENT_FACT_CHECK.md for exclusions). */
export const faqGroups: FaqGroup[] = [
  {
    id: 'general',
    title: 'General',
    items: [
      {
        id: 'cost',
        q: 'How much does Trillian cost?',
        a: '<p>Nothing. Trillian is 100% free — there is no subscription, no premium tier and no in-app purchase.</p>',
      },
      {
        id: 'account',
        q: 'Do I need to create an account?',
        a: '<p>No. Trillian only asks for a name so it knows what to call you. There are no accounts, passwords or email addresses in this version.</p>',
      },
      {
        id: 'public-roads',
        q: 'Can I use this on public roads?',
        a: '<p>No. The app is designed for closed tracks only. Lap detection needs a defined start/finish line, which doesn’t apply to normal driving.</p>',
      },
      {
        id: 'battery',
        q: 'How much battery does recording use?',
        a: '<p>Roughly 10–15% per hour, depending on your phone. Keep the phone plugged in for long sessions and turn off battery saver.</p>',
      },
      {
        id: 'realtime',
        q: 'Does Trillian coach me while I’m driving?',
        a: '<p>No. All analysis happens after the session, once you stop recording. There is no live or audio coaching — keep your eyes on the track.</p>',
      },
    ],
  },
  {
    id: 'devices',
    title: 'Devices & setup',
    items: [
      {
        id: 'android',
        q: 'Which phones are supported?',
        a: '<p>Android phones running Android 8.0 or newer with GPS. The app is not available for iPhone.</p>',
      },
      {
        id: 'tablets',
        q: 'Does the app work on tablets?',
        a: '<p>Yes — any Android device running 8.0+ with GPS hardware should work, though Trillian is optimised for phones.</p>',
      },
      {
        id: 'which-circuits',
        q: 'Which circuits come with the app?',
        a: '<p>Tap <strong>SELECT TRACK</strong> to see the current list — it works without a connection. Built-in circuits have surveyed start/finish lines and track outlines. Circuits you save yourself appear in the same list.</p>',
      },
      {
        id: 'select-vs-capture',
        q: 'Why pick SELECT TRACK instead of capturing the line again?',
        a: '<p>Accuracy. A surveyed line is in the right place (your phone is at its worst at fixing its own position while standing still), the app knows which direction you drive through the start/finish, and it knows roughly how long a lap should take, so it won’t show you a “lap” that obviously isn’t one.</p>',
      },
      {
        id: 'edit-circuit',
        q: 'Can I edit or delete a circuit I saved?',
        a: '<p>Yes — rename or delete any circuit you saved from the circuit list. Circuits that ship with Trillian can’t be changed or removed.</p>',
      },
      {
        id: 'start-grey',
        q: 'I picked a circuit but START is greyed out. Why?',
        a: '<p>Your GPS isn’t ready yet, or the last fix is too old to trust. Picking a known circuit doesn’t skip the GPS check. Hold the phone with a clear view of the sky and it clears in a moment.</p>',
      },
      {
        id: 'edit-line',
        q: 'Can I edit the start/finish line after recording?',
        a: '<p>Not currently. You set the line before recording, and that line is used for that session’s lap detection.</p>',
      },
      {
        id: 'gps-lost',
        q: 'What happens if the GPS signal is lost during recording?',
        a: '<p>The app shows a warning, but recording continues. Gaps in GPS may affect lap detection accuracy, so try to keep good sky visibility.</p>',
      },
    ],
  },
  {
    id: 'accuracy',
    title: 'Lap times & sectors',
    items: [
      {
        id: 'accuracy',
        q: 'How accurate is the lap timing?',
        a: '<p>Lap times come from GPS-based start/finish line detection, so accuracy depends on your phone’s GPS and signal quality. Professional timing systems are more accurate — Trillian is designed for tracking your own improvement from lap to lap.</p>',
      },
      {
        id: 'sectors',
        q: 'My sector times don’t match the circuit’s timing screen. Why?',
        a: '<p>They’re not the same sectors. The circuit’s sectors are set by the organisers at particular corners; Trillian splits each lap into <strong>three equal thirds by distance</strong> instead. They’re for comparing your own laps to each other, not against official timing.</p>',
      },
      {
        id: 'no-sectors',
        q: 'Why has one of my laps got no sector times?',
        a: '<p>The GPS didn’t give enough fixes during that lap to divide it up honestly — usually a weak signal or a very short lap. Rather than estimate numbers that look real but aren’t, the app leaves them blank.</p>',
      },
      {
        id: 'corner-numbers',
        q: 'The corner numbers in the Analysis tab don’t match the circuit map. Why?',
        a: '<p>Trillian works out corners from the way your car actually changed direction and numbers them in the order you drove through them. It has no knowledge of the circuit’s official layout, so a chicane may show up as two corners and a gentle kink may not register at all.</p>',
      },
      {
        id: 'avg-speed',
        q: 'Why is my average speed so low?',
        a: '<p>It’s averaged over the whole recording, including time spent stationary in the paddock or queuing at pit exit. Look at your best lap and the speed chart for your driving pace.</p>',
      },
    ],
  },
  {
    id: 'coaching',
    title: 'Coaching & Dream Lap',
    items: [
      {
        id: 'how-coaching',
        q: 'How does the coaching work?',
        a: '<p>After you stop recording, Trillian analyses your laps on your phone and shows between one and seven coaching cards — fastest lap, top speed, consistency, Dream Lap, sector focus, the odd one out and pace trend. A card only appears when your session’s data supports it.</p>',
      },
      {
        id: 'dream-lap',
        q: 'Why don’t I get a Dream Lap?',
        a: '<p>The Dream Lap only appears when the app is confident the data behind it is sound. It needs at least 3 laps with good sector times, and it refuses if anything looks wrong — most often when it suspects two laps were recorded as one. A missing Dream Lap means the app wasn’t willing to show you a time you never drove.</p>',
      },
      {
        id: 'sensors',
        q: 'Does the Analysis tab use my phone’s motion sensors?',
        a: '<p>No. The braking g figures come from how fast your GPS speed drops. What the accelerometer reads depends on how the phone is mounted, so it can’t reliably tell braking from cornering.</p>',
      },
    ],
  },
  {
    id: 'data',
    title: 'Data & privacy',
    items: [
      {
        id: 'offline',
        q: 'Can I record without an internet connection?',
        a: '<p>Yes — it makes no difference. Trillian works fully in flight mode. Lap detection, the speed chart, the track map and the coaching all run on your phone. The app doesn’t even hold Android’s internet permission.</p>',
      },
      {
        id: 'location-sent',
        q: 'Does Trillian send my location anywhere?',
        a: '<p>No. Your GPS recordings stay in the app’s private storage on your phone. There is no account, no server, no analytics and no tracking. The only way anything leaves your phone is if you share or export it yourself.</p>',
      },
      {
        id: 'storage',
        q: 'How long are sessions stored?',
        a: '<p>On your phone, for as long as you keep them. There is no cloud backup in this version, so uninstalling the app or using <strong>Clear User Data</strong> deletes your history permanently.</p>',
      },
      {
        id: 'delete',
        q: 'How do I delete my data?',
        a: '<p>Delete individual sessions in the app (long-press a session on the Home screen), use <strong>Profile → Clear User Data</strong>, or uninstall Trillian. Since nothing is uploaded, there is no server copy to worry about.</p>',
      },
      {
        id: 'rename',
        q: 'Will I lose my sessions if I change my name?',
        a: '<p>No. Your name is purely a label; renaming never touches your recorded sessions.</p>',
      },
    ],
  },
];

/** Shortlist for the homepage FAQ preview. */
export const faqPreviewIds = ['cost', 'offline', 'sectors', 'android'] as const;
export const faqPreview = faqPreviewIds.map((id) =>
  faqGroups.flatMap((g) => g.items).find((f) => f.id === id)!,
);
