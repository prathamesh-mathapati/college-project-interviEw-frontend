
import { useRef, useState, useEffect } from 'react';

export const navigation = [
  { label: 'Overview', icon: '⌘' },
  { label: 'New Interview', icon: '◫' },
  { label: 'Resume Analyzer', icon: '◎' }
];

export const performanceSummary = [
  { label: 'Total Interviews Taken', value: '18', detail: '+4 this month', tone: 'bg-blue-50 text-blue-700 ring-blue-100' },
  { label: 'Average Performance Score', value: '78%', detail: '+6% over last 5 sessions', tone: 'bg-emerald-50 text-emerald-700 ring-emerald-100' },
  { label: 'Top Mastered Domain', value: 'Web Dev', detail: 'Best score: 91/100', tone: 'bg-indigo-50 text-indigo-700 ring-indigo-100' },
];

export const performanceHistory = [
  { id: 1, date: 'Jul 7, 2026', domain: 'Web Development', difficulty: 'Advanced', score: 91 },
  { id: 2, date: 'Jul 4, 2026', domain: 'Java', difficulty: 'Intermediate', score: 84 },
  { id: 3, date: 'Jun 30, 2026', domain: 'Machine Learning', difficulty: 'Advanced', score: 76 },
  { id: 4, date: 'Jun 25, 2026', domain: 'Python', difficulty: 'Beginner', score: 69 },
  { id: 5, date: 'Jun 19, 2026', domain: 'HR', difficulty: 'Intermediate', score: 58 },
  { id: 6, date: 'Jun 12, 2026', domain: 'Web Development', difficulty: 'Intermediate', score: 88 },
];

export const domains = [
  { name: 'Java', description: 'OOP, Spring, collections, and backend fundamentals.', accent: 'from-blue-500 to-indigo-500', icon: 'J' },
  { name: 'Python', description: 'Scripting, APIs, data handling, and problem solving.', accent: 'from-sky-500 to-blue-600', icon: 'Py' },
  { name: 'Machine Learning', description: 'Models, metrics, feature engineering, and AI systems.', accent: 'from-indigo-500 to-violet-600', icon: 'ML' },
  { name: 'Web Development', description: 'React, Node, databases, APIs, and architecture.', accent: 'from-cyan-500 to-indigo-600', icon: '</>' },
  { name: 'HR', description: 'Behavioral, communication, leadership, and culture fit.', accent: 'from-blue-600 to-slate-700', icon: 'HR' },
];

export const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

export const activity = [
  'Resume analysis completed for Priya Sharma',
  'Gemini feedback generated for full-stack round',
  'New mock interview scheduled for tomorrow',
];

export const interviewQuestions = {
  Java: [
    { type: 'mcq', question: 'Which of the following is true about Java Garbage Collection?', options: ['It guarantees memory will not leak', 'It is deterministic', 'It reclaims memory from unreachable objects', 'You can force it to run using System.gc()'], correctAnswer: 'It reclaims memory from unreachable objects' },
    { type: 'mcq', question: 'What is the main difference between an interface and an abstract class in Java 8+?', options: ['Interfaces can have state, abstract classes cannot', 'Abstract classes support multiple inheritance', 'Interfaces can have default methods', 'There is no difference'], correctAnswer: 'Interfaces can have default methods' },
    { type: 'text', question: 'Describe the concept of polymorphism with a real-world example.' }
  ],
  Python: [
    { type: 'mcq', question: 'What is the key difference between lists and tuples in Python?', options: ['Lists are immutable, tuples are mutable', 'Tuples are immutable, lists are mutable', 'Tuples can only store integers', 'Lists are faster than tuples for all operations'], correctAnswer: 'Tuples are immutable, lists are mutable' },
    { type: 'mcq', question: 'Which keyword is used to create a generator in Python?', options: ['return', 'yield', 'generate', 'lambda'], correctAnswer: 'yield' },
    { type: 'text', question: 'How would you structure a Python service that needs to process background jobs?' }
  ],
  'Machine Learning': [
    { type: 'mcq', question: 'Which of the following helps to reduce overfitting in a model?', options: ['Increasing model complexity', 'Removing dropout layers', 'Adding L1/L2 regularization', 'Using a smaller training dataset'], correctAnswer: 'Adding L1/L2 regularization' },
    { type: 'mcq', question: 'What is the primary goal of unsupervised learning?', options: ['Predicting a continuous target variable', 'Classifying data into labeled categories', 'Discovering hidden patterns in unlabeled data', 'Maximizing a reward function'], correctAnswer: 'Discovering hidden patterns in unlabeled data' },
    { type: 'text', question: 'Explain the curse of dimensionality and how you deal with it.' }
  ],
  'Web Development': [
    { type: 'mcq', question: 'Which storage mechanism is cleared when the page session ends?', options: ['LocalStorage', 'SessionStorage', 'Cookies', 'IndexedDB'], correctAnswer: 'SessionStorage' },
    { type: 'mcq', question: 'In React, what is the purpose of the useEffect dependency array?', options: ['To declare variables used in the effect', 'To trigger the effect only when specified values change', 'To style the component', 'To pass props to child components'], correctAnswer: 'To trigger the effect only when specified values change' },
    { type: 'text', question: 'Explain how you would design a responsive dashboard with reliable API states.' }
  ],
  HR: [
    { type: 'mcq', question: 'When faced with a tight deadline, what is the best approach?', options: ['Panic and work randomly', 'Prioritize tasks and communicate with the team', 'Ignore the deadline and focus on perfection', 'Delegate everything to juniors without guidance'], correctAnswer: 'Prioritize tasks and communicate with the team' },
    { type: 'mcq', question: 'How should you respond to constructive criticism?', options: ['Defend your actions aggressively', 'Ignore the feedback completely', 'Listen actively and identify areas for improvement', 'Blame others for the mistakes'], correctAnswer: 'Listen actively and identify areas for improvement' },
    { type: 'text', question: 'Describe a situation where you failed and what you learned from it.' }
  ],
};

export const feedback = {
  Strengths: ['Clear opening explanation with good technical framing.', 'Mentioned practical tradeoffs instead of only definitions.', 'Answer stayed focused and easy to follow.'],
  Weaknesses: ['Could include one concrete real-world example.', 'Some implementation details need sharper terminology.', 'The conclusion can be more decisive.'],
  'Suggested Improvements': ['Use the STAR pattern for behavioral answers and a compare/contrast structure for technical ones.', 'Add a brief example from project or internship experience.', 'Close with one sentence that summarizes the key takeaway.'],
};
export const mockResumeAnalysis = {
  score: 82,
  summary: 'Your resume shows strong technical background but lacks quantifiable achievements in recent roles.',
  strengths: [
    'Excellent use of action verbs (e.g., "Architected", "Spearheaded").',
    'Clear and concise education section.',
    'Technical skills are grouped logically.',
  ],
  improvements: [
    'Add specific metrics to your latest role (e.g., "Increased performance by X%").',
    'Include a brief professional summary at the top.',
    'Remove outdated technologies from the skills section.',
  ],
  keywords: {
    matched: ['React', 'Node.js', 'REST API', 'Git', 'Agile'],
    missing: ['GraphQL', 'AWS', 'Docker', 'CI/CD'],
  }
};


export function MenuIcon({ open }) {
  return (
    <span className="relative block h-5 w-5" aria-hidden="true">
      <span className={`absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-slate-700 transition ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
      <span className={`absolute left-0 top-2.5 block h-0.5 w-5 rounded-full bg-slate-700 transition ${open ? 'opacity-0' : ''}`} />
      <span className={`absolute left-0 top-4 block h-0.5 w-5 rounded-full bg-slate-700 transition ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
    </span>
  );
}

export function CheckIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 10.5 8.2 13.7 15.5 6.3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UploadIcon() {
  return (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 15V4m0 0 4 4m-4-4L8 8M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SkeletonBlock({ className = '' }) {
  return <div className={`animate-pulse rounded-lg bg-slate-200/80 ${className}`} />;
}

export function StatCardSkeleton() {
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

export function ResumeAnalysisSkeleton() {
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

export function DomainCard({ domain, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(domain.name)}
      className={`group rounded-lg border bg-glass-light p-4 text-left shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        selected ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-white/40 hover:border-indigo-200'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${domain.accent} text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition group-hover:scale-105`}>
          {domain.icon}
        </div>
        <span className={`grid h-6 w-6 place-items-center rounded-full border transition ${
          selected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white text-transparent group-hover:border-indigo-300'
        }`}>
          <CheckIcon />
        </span>
      </div>
      <h3 className="mt-5 text-base font-semibold text-slate-900">{domain.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{domain.description}</p>
    </button>
  );
}

export function ResumeUploadZone({ resumeState, setResumeState }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const startAnalysis = (file) => {
    if (!file) return;
    setResumeState({ fileName: file.name, status: 'analyzing' });
    window.setTimeout(() => {
      setResumeState({ fileName: file.name, status: 'success' });
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
      className={`rounded-lg border border-dashed bg-glass-light p-6 shadow-soft transition ${
        isDragging ? 'border-indigo-500 bg-indigo-50/70' : isSuccess ? 'border-emerald-300 bg-emerald-50/40' : 'border-slate-300 hover:border-indigo-300 hover:bg-blue-50/30'
      }`}
      onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input ref={inputRef} type="file" accept="application/pdf,.pdf" className="sr-only" onChange={(event) => startAnalysis(event.target.files?.[0])} />
      <div className="flex flex-col items-center text-center">
        <div className={`grid h-14 w-14 place-items-center rounded-lg ${isSuccess ? 'bg-emerald-600 text-white' : 'bg-indigo-50 text-indigo-700'}`}>
          {isSuccess ? <CheckIcon /> : <UploadIcon />}
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">{isAnalyzing ? 'AI Analyzing Resume...' : isSuccess ? 'Resume Ready' : 'Upload your PDF resume'}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{isSuccess ? `${resumeState.fileName} has been scanned and attached to this interview.` : 'Drag and drop your resume here, or browse to attach a PDF for AI-led personalization.'}</p>
        {isAnalyzing ? (
          <div className="mt-5 w-full max-w-sm">
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-indigo-600" />
            </div>
            <p className="mt-3 text-xs font-medium text-indigo-700">Extracting skills, projects, and role fit signals</p>
          </div>
        ) : (
          <button type="button" onClick={() => inputRef.current?.click()} className="mt-5 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Choose PDF
          </button>
        )}
      </div>
    </div>
  );
}

export function formatElapsedTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function ProgressRing({ score }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative grid h-32 w-32 place-items-center">
      <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeWidth="10" className="text-indigo-100" />
        <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset} className="text-indigo-600 transition-all duration-700 ease-out" />
      </svg>
      <div className="absolute text-center">
        <p className="text-3xl font-semibold tracking-tight text-slate-900">{score}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">/100</p>
      </div>
    </div>
  );
}

export function EvaluationSkeleton() {
  return (
    <div className="rounded-lg border border-indigo-100 bg-glass-light p-5 shadow-soft">
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

export function EvaluationPanel({ activeTab, setActiveTab }) {
  return (
    <div className="rounded-lg border border-indigo-100 bg-glass-light p-5 shadow-soft">
      <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="flex justify-center"><ProgressRing score={85} /></div>
        <div className="min-w-0">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">AI Evaluation</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">Strong answer</h2>
            </div>
            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">Ready</span>
          </div>
          <div className="mt-5 grid rounded-lg border border-slate-200 bg-white/50 p-1 sm:grid-cols-3">
            {Object.keys(feedback).map((tab) => (
              <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`rounded-md px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${activeTab === tab ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
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

export function Sidebar({ isOpen, onClose, activeItem, onSelect }) {
  return (
    <>
      <div className={`fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={onClose} aria-hidden="true" />
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-glass-light px-4 py-5 shadow-2xl shadow-slate-900/10 transition-transform duration-300 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 lg:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg text-sm font-semibold text-white">ID</div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Interview Desk</p>
            <p className="text-xs text-slate-500">AI evaluation suite</p>
          </div>
        </div>
        <nav className="mt-8 space-y-1">
          {navigation.map((item) => (
            <a key={item.label} href="#" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${activeItem === item.label ? 'bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`} onClick={(e) => { e.preventDefault(); if(onSelect) onSelect(item.label); onClose(); }}>
              <span className="grid h-6 w-6 place-items-center text-xs">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

      </aside>
    </>
  );
}

export function LoadingSpinner() {
  return <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />;
}

export function SummaryCard({ item }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-glass-light p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{item.value}</p>
          <p className="mt-3 text-sm text-slate-500">{item.detail}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${item.tone}`}>Live</span>
      </div>
    </article>
  );
}

export function scoreBadgeClass(score) {
  if (score >= 80) return 'bg-emerald-50 text-emerald-700 ring-emerald-100';
  if (score >= 60) return 'bg-amber-50 text-amber-700 ring-amber-100';
  return 'bg-rose-50 text-rose-700 ring-rose-100';
}
