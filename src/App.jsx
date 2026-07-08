import { useEffect, useRef, useState } from 'react';

const navigation = [
  { label: 'Overview', icon: '⌘', active: true },
  { label: 'Interviews', icon: '◫' },
  { label: 'Resume Analyzer', icon: '◎' },
  { label: 'Skill Matrix', icon: '◇' },
  { label: 'Reports', icon: '▣' },
];

const performanceSummary = [
  {
    label: 'Total Interviews Taken',
    value: '18',
    detail: '+4 this month',
    tone: 'bg-blue-50 text-blue-700 ring-blue-100',
  },
  {
    label: 'Average Performance Score',
    value: '78%',
    detail: '+6% over last 5 sessions',
    tone: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  },
  {
    label: 'Top Mastered Domain',
    value: 'Web Dev',
    detail: 'Best score: 91/100',
    tone: 'bg-indigo-50 text-indigo-700 ring-indigo-100',
  },
];

const performanceHistory = [
  {
    id: 1,
    date: 'Jul 7, 2026',
    domain: 'Web Development',
    difficulty: 'Advanced',
    score: 91,
  },
  {
    id: 2,
    date: 'Jul 4, 2026',
    domain: 'Java',
    difficulty: 'Intermediate',
    score: 84,
  },
  {
    id: 3,
    date: 'Jun 30, 2026',
    domain: 'Machine Learning',
    difficulty: 'Advanced',
    score: 76,
  },
  {
    id: 4,
    date: 'Jun 25, 2026',
    domain: 'Python',
    difficulty: 'Beginner',
    score: 69,
  },
  {
    id: 5,
    date: 'Jun 19, 2026',
    domain: 'HR',
    difficulty: 'Intermediate',
    score: 58,
  },
  {
    id: 6,
    date: 'Jun 12, 2026',
    domain: 'Web Development',
    difficulty: 'Intermediate',
    score: 88,
  },
];

const domains = [
  {
    name: 'Java',
    description: 'OOP, Spring, collections, and backend fundamentals.',
    accent: 'from-blue-500 to-indigo-500',
    icon: 'J',
  },
  {
    name: 'Python',
    description: 'Scripting, APIs, data handling, and problem solving.',
    accent: 'from-sky-500 to-blue-600',
    icon: 'Py',
  },
  {
    name: 'Machine Learning',
    description: 'Models, metrics, feature engineering, and AI systems.',
    accent: 'from-indigo-500 to-violet-600',
    icon: 'ML',
  },
  {
    name: 'Web Development',
    description: 'React, Node, databases, APIs, and architecture.',
    accent: 'from-cyan-500 to-indigo-600',
    icon: '</>',
  },
  {
    name: 'HR',
    description: 'Behavioral, communication, leadership, and culture fit.',
    accent: 'from-blue-600 to-slate-700',
    icon: 'HR',
  },
];

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

const activity = [
  'Resume analysis completed for Priya Sharma',
  'Gemini feedback generated for full-stack round',
  'New mock interview scheduled for tomorrow',
];

const interviewQuestions = {
  Java: 'Explain the difference between a process and a thread.',
  Python: 'How would you structure a Python service that needs to process background jobs?',
  'Machine Learning': 'How do you detect and reduce overfitting in a machine learning model?',
  'Web Development': 'Explain how you would design a responsive dashboard with reliable API states.',
  HR: 'Tell me about a time you handled conflict inside a team.',
};

const feedback = {
  Strengths: [
    'Clear opening explanation with good technical framing.',
    'Mentioned practical tradeoffs instead of only definitions.',
    'Answer stayed focused and easy to follow.',
  ],
  Weaknesses: [
    'Could include one concrete real-world example.',
    'Some implementation details need sharper terminology.',
    'The conclusion can be more decisive.',
  ],
  'Suggested Improvements': [
    'Use the STAR pattern for behavioral answers and a compare/contrast structure for technical ones.',
    'Add a brief example from project or internship experience.',
    'Close with one sentence that summarizes the key takeaway.',
  ],
};

function MenuIcon({ open }) {
  return (
    <span className="relative block h-5 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-slate-700 transition ${
          open ? 'translate-y-1.5 rotate-45' : ''
        }`}
      />
      <span
        className={`absolute left-0 top-2.5 block h-0.5 w-5 rounded-full bg-slate-700 transition ${
          open ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`absolute left-0 top-4 block h-0.5 w-5 rounded-full bg-slate-700 transition ${
          open ? '-translate-y-1.5 -rotate-45' : ''
        }`}
      />
    </span>
  );
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 10.5 8.2 13.7 15.5 6.3"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 15V4m0 0 4 4m-4-4L8 8M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-lg bg-slate-200/80 ${className}`} />;
}

function StatCardSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div className="w-full space-y-4">
          <SkeletonBlock className="h-3 w-32" />
          <SkeletonBlock className="h-9 w-24" />
          <SkeletonBlock className="h-3 w-40" />
        </div>
        <SkeletonBlock className="h-10 w-10 shrink-0 rounded-full" />
      </div>
    </div>
  );
}

function ResumeAnalysisSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <div className="space-y-3">
          <SkeletonBlock className="h-4 w-40" />
          <SkeletonBlock className="h-3 w-56" />
        </div>
        <SkeletonBlock className="h-9 w-24" />
      </div>
      <div className="space-y-3">
        <SkeletonBlock className="h-3 w-full" />
        <SkeletonBlock className="h-3 w-11/12" />
        <SkeletonBlock className="h-3 w-4/5" />
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <SkeletonBlock className="h-20" />
        <SkeletonBlock className="h-20" />
        <SkeletonBlock className="h-20" />
      </div>
    </div>
  );
}

function DomainCard({ domain, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(domain.name)}
      className={`group rounded-lg border bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        selected
          ? 'border-indigo-500 ring-2 ring-indigo-100'
          : 'border-slate-200 hover:border-indigo-200'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${domain.accent} text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition group-hover:scale-105`}
        >
          {domain.icon}
        </div>
        <span
          className={`grid h-6 w-6 place-items-center rounded-full border transition ${
            selected
              ? 'border-indigo-600 bg-indigo-600 text-white'
              : 'border-slate-300 bg-white text-transparent group-hover:border-indigo-300'
          }`}
        >
          <CheckIcon />
        </span>
      </div>
      <h3 className="mt-5 text-base font-semibold text-slate-950">{domain.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{domain.description}</p>
    </button>
  );
}

function ResumeUploadZone({ resumeState, setResumeState }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const startAnalysis = (file) => {
    if (!file) return;

    setResumeState({
      fileName: file.name,
      status: 'analyzing',
    });

    window.setTimeout(() => {
      setResumeState({
        fileName: file.name,
        status: 'success',
      });
    }, 3000);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    startAnalysis(event.dataTransfer.files?.[0]);
  };

  const isAnalyzing = resumeState.status === 'analyzing';
  const isSuccess = resumeState.status === 'success';

  return (
    <div
      className={`rounded-lg border border-dashed bg-white p-6 shadow-sm transition ${
        isDragging
          ? 'border-indigo-500 bg-indigo-50/70'
          : isSuccess
            ? 'border-emerald-300 bg-emerald-50/40'
            : 'border-slate-300 hover:border-indigo-300 hover:bg-blue-50/30'
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        onChange={(event) => startAnalysis(event.target.files?.[0])}
      />

      <div className="flex flex-col items-center text-center">
        <div
          className={`grid h-14 w-14 place-items-center rounded-lg ${
            isSuccess ? 'bg-emerald-600 text-white' : 'bg-indigo-50 text-indigo-700'
          }`}
        >
          {isSuccess ? <CheckIcon /> : <UploadIcon />}
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-950">
          {isAnalyzing
            ? 'AI Analyzing Resume...'
            : isSuccess
              ? 'Resume Ready'
              : 'Upload your PDF resume'}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          {isSuccess
            ? `${resumeState.fileName} has been scanned and attached to this interview.`
            : 'Drag and drop your resume here, or browse to attach a PDF for AI-led personalization.'}
        </p>

        {isAnalyzing ? (
          <div className="mt-5 w-full max-w-sm">
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-indigo-600" />
            </div>
            <p className="mt-3 text-xs font-medium text-indigo-700">
              Extracting skills, projects, and role fit signals
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-5 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Choose PDF
          </button>
        )}
      </div>
    </div>
  );
}

function formatElapsedTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return `${minutes}:${seconds}`;
}

function ProgressRing({ score }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative grid h-32 w-32 place-items-center">
      <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-indigo-100"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-indigo-600 transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-semibold tracking-tight text-slate-950">{score}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">/100</p>
      </div>
    </div>
  );
}

function EvaluationSkeleton() {
  return (
    <div className="rounded-lg border border-indigo-100 bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <SkeletonBlock className="h-28 w-28 shrink-0 rounded-full" />
        <div className="w-full space-y-3">
          <SkeletonBlock className="h-4 w-40" />
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-10/12" />
          <SkeletonBlock className="h-10 w-36" />
        </div>
      </div>
    </div>
  );
}

function EvaluationPanel({ activeTab, setActiveTab }) {
  return (
    <div className="rounded-lg border border-indigo-100 bg-white p-5 shadow-soft">
      <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="flex justify-center">
          <ProgressRing score={85} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                AI Evaluation
              </p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950">Strong answer</h2>
            </div>
            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
              Ready
            </span>
          </div>

          <div className="mt-5 grid rounded-lg border border-slate-200 bg-slate-100 p-1 sm:grid-cols-3">
            {Object.keys(feedback).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  activeTab === tab
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <ul className="mt-4 space-y-3">
            {feedback[activeTab].map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function InterviewSimulationWorkspace({ interviewConfig, onBack, onDashboard }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState('');
  const [evaluationStatus, setEvaluationStatus] = useState('idle');
  const [activeTab, setActiveTab] = useState('Strengths');
  const recognitionRef = useRef(null);
  const evaluationTimeoutRef = useRef(null);

  const question =
    interviewQuestions[interviewConfig.domain] || 'Explain the difference between a process and a thread.';
  const SpeechRecognition =
    typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const voiceSupported = Boolean(SpeechRecognition);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      window.clearTimeout(evaluationTimeoutRef.current);
    };
  }, []);

  const toggleVoiceMode = () => {
    if (!voiceSupported) {
      setSpeechError('Voice mode is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .slice(event.resultIndex)
        .map((result) => result[0].transcript)
        .join(' ');

      setAnswer((currentAnswer) => `${currentAnswer}${currentAnswer ? ' ' : ''}${transcript}`.trim());
    };

    recognition.onerror = () => {
      setSpeechError('Voice transcription stopped. You can continue typing your answer.');
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    setSpeechError('');
    setIsListening(true);
    recognition.start();
  };

  const submitAnswer = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    setEvaluationStatus('evaluating');
    setActiveTab('Strengths');
    window.clearTimeout(evaluationTimeoutRef.current);

    evaluationTimeoutRef.current = window.setTimeout(() => {
      setEvaluationStatus('complete');
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_52%,_#f8fafc_100%)] py-6">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-4 rounded-lg border border-indigo-100 bg-white/90 p-5 shadow-soft backdrop-blur sm:flex-row sm:items-center">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">
              Live Simulation
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              Interview Simulation Workspace
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {interviewConfig.domain} interview at {interviewConfig.difficulty.toLowerCase()} level.
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700"
            >
              Configure
            </button>
            <button
              type="button"
              onClick={onDashboard}
              className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Dashboard
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="min-w-0 rounded-lg border border-slate-200 bg-white/90 p-5 shadow-soft backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  AI Interviewer
                </p>
                <h2 className="mt-2 text-lg font-semibold text-slate-950">Current Question</h2>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
                Question 1
              </span>
            </div>

            <div className="mt-6 rounded-lg border border-indigo-100 bg-indigo-50/60 p-5">
              <p className="text-xl font-semibold leading-8 text-slate-950">{question}</p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Stopwatch
                </p>
                <div className="mt-3 flex items-end gap-3">
                  <p className="font-mono text-4xl font-semibold tracking-tight text-slate-950">
                    {formatElapsedTime(elapsedSeconds)}
                  </p>
                  <span className="mb-1 h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Voice Mode
                </p>
                <button
                  type="button"
                  onClick={toggleVoiceMode}
                  className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    isListening
                      ? 'bg-rose-600 text-white hover:bg-rose-500'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500'
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isListening ? 'animate-ping bg-white' : 'bg-indigo-200'
                    }`}
                  />
                  {isListening ? 'Listening...' : 'Start Voice Mode'}
                </button>
                <p className="mt-3 min-h-10 text-xs leading-5 text-slate-500">
                  {speechError || 'Uses native browser speech recognition when available.'}
                </p>
              </div>
            </div>
          </section>

          <section className="min-w-0 rounded-lg border border-slate-200 bg-white/90 p-5 shadow-soft backdrop-blur">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  User Response
                </p>
                <h2 className="mt-2 text-lg font-semibold text-slate-950">Your Answer</h2>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                {answer.length} characters
              </span>
            </div>

            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Type your answer here, or start Voice Mode to transcribe your response..."
              className="mt-5 min-h-72 w-full resize-none rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-800 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-slate-500">
                Submitting triggers a simulated AI review with a score and coaching feedback.
              </p>
              <button
                type="button"
                onClick={submitAnswer}
                disabled={!answer.trim() || evaluationStatus === 'evaluating'}
                className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/15 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              >
                {evaluationStatus === 'evaluating' ? 'Evaluating...' : 'Submit Answer'}
              </button>
            </div>

            <div className="mt-6 min-h-64">
              {evaluationStatus === 'evaluating' && <EvaluationSkeleton />}
              {evaluationStatus === 'complete' && (
                <EvaluationPanel activeTab={activeTab} setActiveTab={setActiveTab} />
              )}
              {evaluationStatus === 'idle' && (
                <div className="grid min-h-64 place-items-center rounded-lg border border-dashed border-slate-200 bg-slate-50/70 p-6 text-center">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Evaluation will appear here</p>
                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                      The reserved panel keeps the workspace stable while feedback loads.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function InterviewConfiguration({ onLaunch }) {
  const [selectedDomain, setSelectedDomain] = useState('Java');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [resumeState, setResumeState] = useState({ fileName: '', status: 'idle' });

  const canLaunch = selectedDomain && difficulty && resumeState.status !== 'analyzing';

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_34%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_48%,_#f8fafc_100%)] py-6">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-4 rounded-lg border border-blue-100 bg-white/85 p-5 shadow-soft backdrop-blur sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">
              AI Interview Simulator
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              Interview Configuration
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Choose the interview track, calibrate difficulty, and attach a resume before launching
              the AI interview workspace.
            </p>
          </div>
          <div className="w-fit rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-800">
            Personalized AI round
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
          <section className="min-w-0 rounded-lg border border-slate-200 bg-white/90 p-5 shadow-soft backdrop-blur">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Select Domain</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Pick the subject area the AI should use for role-specific questions.
                </p>
              </div>
              <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                {selectedDomain}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {domains.map((domain) => (
                <DomainCard
                  key={domain.name}
                  domain={domain}
                  selected={selectedDomain === domain.name}
                  onSelect={setSelectedDomain}
                />
              ))}
            </div>
          </section>

          <aside className="min-w-0 space-y-6">
            <section className="min-w-0 rounded-lg border border-slate-200 bg-white/90 p-5 shadow-soft backdrop-blur">
              <h2 className="text-lg font-semibold text-slate-950">Difficulty</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Match the interview depth to your preparation stage.
              </p>

              <div className="mt-5 grid rounded-lg border border-slate-200 bg-slate-100 p-1 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                {difficulties.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`rounded-md px-3 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      difficulty === level
                        ? 'bg-white text-indigo-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </section>

            <section className="min-w-0 rounded-lg border border-slate-200 bg-white/90 p-5 shadow-soft backdrop-blur">
              <h2 className="text-lg font-semibold text-slate-950">Resume Upload</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Add a PDF so the AI can adapt questions to your projects and skills.
              </p>
              <div className="mt-5">
                <ResumeUploadZone resumeState={resumeState} setResumeState={setResumeState} />
              </div>
            </section>

            <section className="min-w-0 rounded-lg border border-indigo-100 bg-slate-950 p-5 text-white shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Ready to launch</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {selectedDomain} interview at {difficulty.toLowerCase()} level
                    {resumeState.status === 'success' ? ` with ${resumeState.fileName}` : ''}.
                  </p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100 ring-1 ring-white/10">
                  Live AI
                </span>
              </div>

              <button
                type="button"
                disabled={!canLaunch}
                onClick={() =>
                  onLaunch({
                    domain: selectedDomain,
                    difficulty,
                    resumeName: resumeState.fileName || 'No resume attached',
                    resumeStatus: resumeState.status,
                  })
                }
                className="mt-5 w-full rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/25 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
              >
                Launch AI Interview
              </button>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white/95 px-4 py-5 shadow-2xl shadow-slate-900/10 backdrop-blur transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-sm font-semibold text-white">
            ID
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-950">Interview Desk</p>
            <p className="text-xs text-slate-500">AI evaluation suite</p>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                item.active
                  ? 'bg-slate-950 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              }`}
              onClick={onClose}
            >
              <span className="grid h-6 w-6 place-items-center text-xs">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-950">Gemini Analyzer</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Resume parsing and interview scoring are synced with your latest uploads.
          </p>
        </div>
      </aside>
    </>
  );
}

function LoadingSpinner() {
  return (
    <span
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
  );
}

function SummaryCard({ item }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{item.value}</p>
          <p className="mt-3 text-sm text-slate-500">{item.detail}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${item.tone}`}>
          Live
        </span>
      </div>
    </article>
  );
}

function scoreBadgeClass(score) {
  if (score >= 80) return 'bg-emerald-50 text-emerald-700 ring-emerald-100';
  if (score >= 60) return 'bg-amber-50 text-amber-700 ring-amber-100';

  return 'bg-rose-50 text-rose-700 ring-rose-100';
}

function Dashboard({ interviewConfig, onBack }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [downloadingReportId, setDownloadingReportId] = useState(null);

  const downloadReport = (session) => {
    setDownloadingReportId(session.id);

    window.setTimeout(() => {
      setDownloadingReportId(null);
      window.alert(`${session.domain} report from ${session.date} is ready to download.`);
    }, 1500);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/90 px-4 py-3 backdrop-blur lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 lg:hidden"
                onClick={() => setSidebarOpen((value) => !value)}
                aria-label="Toggle navigation"
              >
                <MenuIcon open={sidebarOpen} />
              </button>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Dashboard
                </p>
                <h1 className="truncate text-xl font-semibold text-slate-950 sm:text-2xl">
                  Interview Performance & History
                </h1>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  className="hidden rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 sm:block"
                  onClick={onBack}
                >
                  Configure
                </button>
              </div>
            </div>
          </header>

          <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Performance Overview</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                  Review your mock interview progress, domain mastery, and downloadable AI reports.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                Current track: {interviewConfig.domain} · {interviewConfig.difficulty}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {performanceSummary.map((item) => (
                <SummaryCard key={item.label} item={item} />
              ))}
            </div>

            <section className="mt-6 rounded-lg border border-slate-200 bg-white shadow-soft">
              <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-base font-semibold text-slate-950">
                    Performance History
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Past mock sessions with report actions and score status.
                  </p>
                </div>
                <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
                  {performanceHistory.length} sessions
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-[820px] min-w-full divide-y divide-slate-200 text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      {['Date', 'Domain Selected', 'Difficulty', 'Final Score', 'Action'].map(
                        (heading) => (
                          <th
                            key={heading}
                            scope="col"
                            className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500"
                          >
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {performanceHistory.map((session) => {
                      const isDownloading = downloadingReportId === session.id;

                      return (
                        <tr key={session.id} className="transition hover:bg-slate-50/80">
                          <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">
                            {session.date}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                            {session.domain}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                            {session.difficulty}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${scoreBadgeClass(
                                session.score,
                              )}`}
                            >
                              {session.score}/100
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            <button
                              type="button"
                              disabled={isDownloading}
                              onClick={() => downloadReport(session)}
                              className="inline-flex min-w-44 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-wait disabled:bg-slate-400"
                            >
                              {isDownloading && <LoadingSpinner />}
                              {isDownloading ? 'Preparing...' : 'Download PDF Report'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('configure');
  const [interviewConfig, setInterviewConfig] = useState({
    domain: 'Java',
    difficulty: 'Intermediate',
    resumeName: 'No resume attached',
    resumeStatus: 'idle',
  });

  if (screen === 'dashboard') {
    return (
      <Dashboard
        interviewConfig={interviewConfig}
        onBack={() => setScreen('configure')}
      />
    );
  }

  if (screen === 'workspace') {
    return (
      <InterviewSimulationWorkspace
        interviewConfig={interviewConfig}
        onBack={() => setScreen('configure')}
        onDashboard={() => setScreen('dashboard')}
      />
    );
  }

  return (
    <InterviewConfiguration
      onLaunch={(config) => {
        setInterviewConfig(config);
        setScreen('workspace');
      }}
    />
  );
}
