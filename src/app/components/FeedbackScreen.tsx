type Choice = 'sooner' | 'later';

interface FeedbackScreenProps {
  group: 'A' | 'B';
  preChoices: (Choice | null)[];
  postChoices: (Choice | null)[];
  onContinue: () => void;
}

const QUESTIONS = [
  { sooner: '$20 today', later: '$30 in 7 days' },
  { sooner: '$15 today', later: '$30 in 30 days' },
  { sooner: '$50 today', later: '$90 in 90 days' },
];

export function FeedbackScreen({ group, preChoices, postChoices, onContinue }: FeedbackScreenProps) {
  const preScore = preChoices.filter((c) => c === 'later').length;
  const postScore = postChoices.filter((c) => c === 'later').length;
  const diff = postScore - preScore;

  const isImproved = diff > 0;
  const isSame = diff === 0;
  const isDecreased = diff < 0;

  const getResultTitle = () => {
    if (group === 'A') {
      if (isImproved) return 'Your Future Self Showed Up ✨';
      if (isSame) return 'Steady Choices';
      return 'Interesting Pattern';
    } else {
      if (isImproved) return 'Your Choices Shifted';
      if (isSame) return 'Consistent Choices';
      return 'An Interesting Result';
    }
  };

  const getResultBody = () => {
    if (group === 'A') {
      if (isImproved)
        return `You chose the later, larger option ${diff} more time${diff > 1 ? 's' : ''} after writing to your future self. Connecting with who you'll become helped you discount the future a little less.`;
      if (isSame)
        return `You chose the same number of delayed rewards before and after. Your preferences are consistent — that's data too! Many people don't shift on the first try.`;
      return `Interestingly, you chose ${Math.abs(diff)} fewer delayed reward${Math.abs(diff) > 1 ? 's' : ''} after writing. That can happen — writing can surface how much effort the future feels like.`;
    } else {
      if (isImproved)
        return `You chose the later, larger option ${diff} more time${diff > 1 ? 's' : ''} after the writing exercise. Even a neutral writing break can shift attention and choices.`;
      if (isSame)
        return `Your choices were completely consistent before and after. This is actually typical for a neutral writing condition — the postcard group often sees more change.`;
      return `You chose ${Math.abs(diff)} fewer delayed rewards after the writing exercise. Interesting — writing about the present may have made the now feel more vivid.`;
    }
  };

  const getScoreColor = (score: number) => {
    if (score === 3) return '#3A7A8C';
    if (score === 2) return '#5A9AA8';
    if (score === 1) return '#7A7672';
    return '#B8B5B2';
  };

  const getDiffBadge = () => {
    if (isImproved) return { label: `+${diff} delayed`, bg: '#E8F2F4', color: '#3A7A8C' };
    if (isSame) return { label: 'No change', bg: '#F0EFED', color: '#7A7672' };
    return { label: `${diff} delayed`, bg: '#FEF3F3', color: '#C0504A' };
  };

  const badge = getDiffBadge();

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12" style={{ minHeight: '60vh' }}>
      <div
        className="w-full max-w-xl rounded-2xl p-10 shadow-sm"
        style={{ backgroundColor: '#F0EFED', border: '1px solid #E5E5E5' }}
      >
        {/* Step label */}
        <div className="mb-5">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase"
            style={{ backgroundColor: '#E8F2F4', color: '#3A7A8C' }}
          >
            Step 4: Your Results
          </span>
        </div>

        <h2 className="mb-2" style={{ color: '#2D2D2B' }}>
          {getResultTitle()}
        </h2>

        <p className="mb-6 text-sm leading-relaxed" style={{ color: '#7A7672' }}>
          {getResultBody()}
        </p>

        {/* Score comparison */}
        <div
          className="rounded-xl p-5 mb-6"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wide" style={{ color: '#7A7672' }}>
              Delayed reward choices
            </span>
            <span
              className="text-xs px-2.5 py-1 rounded-full"
              style={{ backgroundColor: badge.bg, color: badge.color, fontWeight: 600 }}
            >
              {badge.label}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Before */}
            <div className="flex-1 text-center">
              <div className="text-xs mb-2" style={{ color: '#7A7672' }}>Before Writing</div>
              <div
                className="text-4xl mb-1"
                style={{ color: getScoreColor(preScore), fontWeight: 700 }}
              >
                {preScore}/3
              </div>
              <div className="flex justify-center gap-1">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: preChoices[i] === 'later' ? '#2D2D2B' : '#E5E5E5',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-1">
              <div
                className="text-2xl"
                style={{ color: isImproved ? '#3A7A8C' : isSame ? '#B8B5B2' : '#C0504A' }}
              >
                {isImproved ? '→' : isSame ? '—' : '→'}
              </div>
            </div>

            {/* After */}
            <div className="flex-1 text-center">
              <div className="text-xs mb-2" style={{ color: '#7A7672' }}>After Writing</div>
              <div
                className="text-4xl mb-1"
                style={{ color: getScoreColor(postScore), fontWeight: 700 }}
              >
                {postScore}/3
              </div>
              <div className="flex justify-center gap-1">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: postChoices[i] === 'later' ? '#3A7A8C' : '#E5E5E5',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Per-question breakdown */}
        <div
          className="rounded-xl p-5 mb-6"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
        >
          <p className="text-xs uppercase tracking-wide mb-4" style={{ color: '#7A7672' }}>
            Choice breakdown
          </p>
          <div className="space-y-3">
            {QUESTIONS.map((q, i) => {
              const prePick = preChoices[i];
              const postPick = postChoices[i];
              const changed = prePick !== postPick;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs w-4 text-center" style={{ color: '#B8B5B2' }}>
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#7A7672' }}>
                      <span
                        className="px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: prePick === 'later' ? '#2D2D2B' : '#F0EFED',
                          color: prePick === 'later' ? '#fff' : '#7A7672',
                        }}
                      >
                        {prePick === 'later' ? q.later : q.sooner}
                      </span>
                      <span style={{ color: '#B8B5B2' }}>→</span>
                      <span
                        className="px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: postPick === 'later' ? '#3A7A8C' : '#F0EFED',
                          color: postPick === 'later' ? '#fff' : '#7A7672',
                        }}
                      >
                        {postPick === 'later' ? q.later : q.sooner}
                      </span>
                      {changed && (
                        <span style={{ color: postPick === 'later' ? '#3A7A8C' : '#C0504A', fontWeight: 600 }}>
                          ↑
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* What is delay discounting */}
        <div
          className="rounded-xl p-5 mb-8"
          style={{ backgroundColor: '#F8F7F5', border: '1px solid #E5E5E5' }}
        >
          <p className="text-xs uppercase tracking-wide mb-2" style={{ color: '#3A7A8C' }}>
            What's happening here?
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#7A7672' }}>
            <span style={{ color: '#2D2D2B', fontWeight: 600 }}>Delay discounting</span> is our tendency to undervalue future rewards compared to immediate ones. We often pick the smaller-sooner option even when waiting would benefit us more.{' '}
            {group === 'A'
              ? 'Making your future self feel more "real" — like writing them a postcard — can help reduce this bias.'
              : 'Awareness of this bias is a first step — knowing it exists can help you catch yourself in the moment.'}
          </p>
        </div>

        <button
          onClick={onContinue}
          className="w-full py-3 rounded-xl text-white transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
          style={{ backgroundColor: '#2D2D2B' }}
        >
          One more reflection →
        </button>
      </div>
    </div>
  );
}
