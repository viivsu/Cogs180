import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChoiceInstructionsScreen } from './components/ChoiceInstructionsScreen';
import { ChoiceQuestionScreen } from './components/ChoiceQuestionScreen';
import { WritingScreen } from './components/WritingScreen';
import { FeedbackScreen } from './components/FeedbackScreen';
import { ReflectionScreen } from './components/ReflectionScreen';
import { ThankYouScreen } from './components/ThankYouScreen';

type Group = 'A' | 'B';
type Choice = 'sooner' | 'later';

const QUESTIONS = [
  { sooner: '$20 today', later: '$30 in 7 days' },
  { sooner: '$15 today', later: '$30 in 30 days' },
  { sooner: '$50 today', later: '$90 in 90 days' },
];

// Steps:
// 0  - Welcome
// 1  - Choice Instructions (pre)
// 2  - Pre Q1
// 3  - Pre Q2
// 4  - Pre Q3
// 5  - Writing
// 6  - Choice Instructions (post)
// 7  - Post Q1
// 8  - Post Q2
// 9  - Post Q3
// 10 - Feedback
// 11 - Reflection
// 12 - Thank You

const TOTAL_DISPLAY_STEPS = 11; // steps 1–11 shown in progress bar

export default function App() {
  const [step, setStep] = useState(0);
  const [group] = useState<Group>(() => (Math.random() < 0.5 ? 'A' : 'B'));
  const [preChoices, setPreChoices] = useState<(Choice | null)[]>([null, null, null]);
  const [postChoices, setPostChoices] = useState<(Choice | null)[]>([null, null, null]);
  const [writingText, setWritingText] = useState('');
  const [reflectionText, setReflectionText] = useState('');

  const next = () => setStep((s) => s + 1);

  const handlePreChoice = (qIdx: number, choice: Choice) => {
    setPreChoices((prev) => {
      const updated = [...prev];
      updated[qIdx] = choice;
      return updated;
    });
  };

  const handlePostChoice = (qIdx: number, choice: Choice) => {
    setPostChoices((prev) => {
      const updated = [...prev];
      updated[qIdx] = choice;
      return updated;
    });
  };

  const restart = () => {
    setStep(0);
    setPreChoices([null, null, null]);
    setPostChoices([null, null, null]);
    setWritingText('');
    setReflectionText('');
  };

  // Progress bar: step 0 = welcome (no bar), steps 1-11 shown
  const showProgressBar = step >= 1 && step <= 11;
  const progressStep = step; // 1–11

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F2EE' }}>
      {/* Header */}
      {step > 0 && step < 12 && (
        <header
          className="w-full px-8 py-4 flex items-center justify-between sticky top-0 z-10"
          style={{
            backgroundColor: '#F5F2EE',
            borderBottom: '1px solid #E5E5E5',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
              style={{ backgroundColor: '#3A7A8C', fontWeight: 700 }}
            >
              {group === 'A' ? '📮' : '✏️'}
            </div>
            <span className="text-sm" style={{ color: '#7A7672' }}>
              {group === 'A' ? 'Future Postcard Study' : 'Neutral Writing Study'}
            </span>
          </div>

          {showProgressBar && (
            <div className="flex-1 max-w-sm mx-8">
              <div className="flex items-center gap-2">
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: '#E5E5E5' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${(progressStep / TOTAL_DISPLAY_STEPS) * 100}%`,
                      backgroundColor: '#3A7A8C',
                    }}
                  />
                </div>
                <span className="text-xs flex-shrink-0" style={{ color: '#B8B5B2' }}>
                  {progressStep}/{TOTAL_DISPLAY_STEPS}
                </span>
              </div>
            </div>
          )}

          <div className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#E8F2F4', color: '#3A7A8C' }}>
            {getPhaseLabel(step)}
          </div>
        </header>
      )}

      {/* Main content */}
      <main className="w-full max-w-2xl mx-auto">
        {/* Step 0: Welcome */}
        {step === 0 && <WelcomeScreen onStart={next} />}

        {/* Step 1: Choice Instructions (pre) */}
        {step === 1 && <ChoiceInstructionsScreen isPost={false} onContinue={next} />}

        {/* Steps 2–4: Pre-writing money questions */}
        {step >= 2 && step <= 4 && (
          <ChoiceQuestionScreen
            questionIndex={step - 1}
            totalQuestions={3}
            sooner={QUESTIONS[step - 2].sooner}
            later={QUESTIONS[step - 2].later}
            selected={preChoices[step - 2]}
            onSelect={(choice) => handlePreChoice(step - 2, choice)}
            onNext={next}
            footerNote="Tap one option to continue."
          />
        )}

        {/* Step 5: Writing */}
        {step === 5 && (
          <WritingScreen
            group={group}
            text={writingText}
            onChange={setWritingText}
            onSubmit={next}
          />
        )}

        {/* Step 6: Post-choice instructions */}
        {step === 6 && <ChoiceInstructionsScreen isPost={true} onContinue={next} />}

        {/* Steps 7–9: Post-writing money questions */}
        {step >= 7 && step <= 9 && (
          <ChoiceQuestionScreen
            questionIndex={step - 6}
            totalQuestions={3}
            sooner={QUESTIONS[step - 7].sooner}
            later={QUESTIONS[step - 7].later}
            selected={postChoices[step - 7]}
            onSelect={(choice) => handlePostChoice(step - 7, choice)}
            onNext={next}
            footerNote="Tap one option to continue."
          />
        )}

        {/* Step 10: Feedback */}
        {step === 10 && (
          <FeedbackScreen
            group={group}
            preChoices={preChoices}
            postChoices={postChoices}
            onContinue={next}
          />
        )}

        {/* Step 11: Reflection */}
        {step === 11 && (
          <ReflectionScreen
            group={group}
            text={reflectionText}
            onChange={setReflectionText}
            onDone={next}
          />
        )}

        {/* Step 12: Thank You */}
        {step === 12 && (
          <ThankYouScreen
            group={group}
            reflectionText={reflectionText}
            onRestart={restart}
          />
        )}
      </main>
    </div>
  );
}

function getPhaseLabel(step: number): string {
  if (step <= 1) return 'Intro';
  if (step <= 4) return 'Baseline Choices';
  if (step === 5) return 'Writing';
  if (step <= 9) return 'Post Choices';
  if (step === 10) return 'Feedback';
  if (step === 11) return 'Reflection';
  return 'Complete';
}