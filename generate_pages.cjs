const fs = require('fs');

const loginStr = `import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) navigate('/configure');
  };

  return (
    <main className="min-h-screen grid place-items-center bg-mesh-light py-6 font-sans text-slate-900 animate-fade-in-up">
      <div className="w-full max-w-md rounded-2xl bg-glass-light p-8 shadow-2xl backdrop-blur-xl border border-white/40">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-glow text-white font-bold text-xl mb-4">
            ID
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to your Interview Dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white/50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" 
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white/50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit" 
            className="mt-6 w-full rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:from-indigo-400 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}`;

const registerStr = `import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && password === confirmPassword) navigate('/configure');
  };

  return (
    <main className="min-h-screen grid place-items-center bg-mesh-light py-6 font-sans text-slate-900 animate-fade-in-up">
      <div className="w-full max-w-md rounded-2xl bg-glass-light p-8 shadow-2xl backdrop-blur-xl border border-white/40">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-glow text-white font-bold text-xl mb-4">
            ID
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">Create Account</h1>
          <p className="mt-2 text-sm text-slate-500">Join the Interview Dashboard today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white/50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" 
              placeholder="John Doe" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white/50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" 
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white/50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" 
              placeholder="••••••••" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white/50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit" 
            className="mt-6 w-full rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:from-indigo-400 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}`;

const landingStr = `import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <main className="min-h-screen bg-mesh-light flex flex-col items-center justify-center p-6 text-center font-sans animate-fade-in-up">
      <div className="max-w-2xl bg-glass-light p-10 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/40">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-glow text-white font-bold text-2xl mb-8">
          ID
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 tracking-tight leading-tight">
          Master Your Next Tech Interview
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          Upload your resume, select your domain, and practice with our live AI interviewer. Get real-time feedback and detailed performance reports.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/register" 
            className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:from-indigo-400 hover:to-violet-500"
          >
            Get Started Free
          </Link>
          <Link 
            to="/login" 
            className="w-full sm:w-auto rounded-xl bg-white/50 border border-slate-200 px-8 py-4 text-base font-semibold text-slate-700 transition hover:bg-white/80 hover:shadow-sm"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}`;

const configureStr = `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { domains, difficulties, DomainCard, ResumeUploadZone } from '../components/shared';

export default function Configure() {
  const { setInterviewConfig } = useInterview();
  const navigate = useNavigate();

  const [selectedDomain, setSelectedDomain] = useState('Java');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [resumeState, setResumeState] = useState({ fileName: '', status: 'idle' });

  const canLaunch = selectedDomain && difficulty && resumeState.status !== 'analyzing';

  const handleLaunch = () => {
    setInterviewConfig({
      domain: selectedDomain,
      difficulty,
      resumeName: resumeState.fileName || 'No resume attached',
      resumeStatus: resumeState.status,
    });
    navigate('/workspace');
  };

  return (
    <main className="min-h-screen bg-mesh-light py-6 font-sans">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-4 rounded-lg border border-indigo-100 bg-glass-light p-5 shadow-soft sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">AI Interview Simulator</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 sm:text-3xl">Interview Configuration</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Choose the interview track, calibrate difficulty, and attach a resume before launching the AI interview workspace.</p>
          </div>
          <div className="flex gap-2">
            <div className="w-fit rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-800">Personalized AI round</div>
            <button type="button" onClick={() => navigate('/login')} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-rose-600 shadow-sm transition hover:border-rose-200 hover:text-rose-700 hover:bg-rose-50">Sign Out</button>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr] animate-fade-in-up">
          <section className="min-w-0 rounded-lg border border-slate-200 bg-glass-light p-5 shadow-soft">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Select Domain</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">Pick the subject area the AI should use for role-specific questions.</p>
              </div>
              <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">{selectedDomain}</span>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {domains.map((domain) => (
                <DomainCard key={domain.name} domain={domain} selected={selectedDomain === domain.name} onSelect={setSelectedDomain} />
              ))}
            </div>
          </section>

          <aside className="min-w-0 space-y-6">
            <section className="min-w-0 rounded-lg border border-slate-200 bg-glass-light p-5 shadow-soft">
              <h2 className="text-lg font-semibold text-slate-900">Difficulty</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">Match the interview depth to your preparation stage.</p>
              <div className="mt-5 grid rounded-lg border border-slate-200 bg-white/50 p-1 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                {difficulties.map((level) => (
                  <button key={level} type="button" onClick={() => setDifficulty(level)} className={\`rounded-md px-3 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 \${difficulty === level ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}\`}>
                    {level}
                  </button>
                ))}
              </div>
            </section>

            <section className="min-w-0 rounded-lg border border-slate-200 bg-glass-light p-5 shadow-soft">
              <h2 className="text-lg font-semibold text-slate-900">Resume Upload</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">Add a PDF so the AI can adapt questions to your projects and skills.</p>
              <div className="mt-5"><ResumeUploadZone resumeState={resumeState} setResumeState={setResumeState} /></div>
            </section>

            <section className="min-w-0 rounded-lg border border-indigo-100 bg-slate-950 p-5 text-white shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Ready to launch</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{selectedDomain} interview at {difficulty.toLowerCase()} level{resumeState.status === 'success' ? \` with \${resumeState.fileName}\` : ''}.</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100 ring-1 ring-white/10">Live AI</span>
              </div>
              <button type="button" disabled={!canLaunch} onClick={handleLaunch} className="mt-5 w-full rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:from-indigo-400 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300">
                Launch AI Interview
              </button>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}`;

const workspaceStr = `import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { interviewQuestions, formatElapsedTime, EvaluationPanel, EvaluationSkeleton } from '../components/shared';

export default function Workspace() {
  const { interviewConfig } = useInterview();
  const navigate = useNavigate();

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState('');
  const [evaluationStatus, setEvaluationStatus] = useState('idle');
  const [activeTab, setActiveTab] = useState('Strengths');
  const recognitionRef = useRef(null);
  const evaluationTimeoutRef = useRef(null);

  const question = interviewQuestions[interviewConfig.domain] || 'Explain the difference between a process and a thread.';
  const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const voiceSupported = Boolean(SpeechRecognition);

  useEffect(() => {
    const timer = window.setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
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
      const transcript = Array.from(event.results).slice(event.resultIndex).map((result) => result[0].transcript).join(' ');
      setAnswer((currentAnswer) => \`\${currentAnswer}\${currentAnswer ? ' ' : ''}\${transcript}\`.trim());
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
    evaluationTimeoutRef.current = window.setTimeout(() => setEvaluationStatus('complete'), 2000);
  };

  return (
    <main className="min-h-screen bg-mesh-light py-6 font-sans">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col justify-between gap-4 rounded-lg border border-indigo-100 bg-glass-light p-5 shadow-soft sm:flex-row sm:items-center">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">Live Simulation</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 sm:text-3xl">Interview Simulation Workspace</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{interviewConfig.domain} interview at {interviewConfig.difficulty.toLowerCase()} level.</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => navigate('/configure')} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700">Configure</button>
            <button type="button" onClick={() => navigate('/dashboard')} className="rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-slate-800 hover:to-slate-700">Dashboard</button>
            <button type="button" onClick={() => navigate('/login')} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50">Sign Out</button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] animate-fade-in-up">
          <section className="min-w-0 rounded-lg border border-slate-200 bg-glass-light p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">AI Interviewer</p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">Current Question</h2>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">Question 1</span>
            </div>
            <div className="mt-6 rounded-lg border border-indigo-100 bg-white/40 p-5 backdrop-blur shadow-inner">
              <p className="text-xl font-semibold leading-8 text-slate-900">{question}</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Stopwatch</p>
                <div className="mt-3 flex items-end gap-3">
                  <p className="font-mono text-4xl font-semibold tracking-tight text-slate-900">{formatElapsedTime(elapsedSeconds)}</p>
                  <span className="mb-1 h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Voice Mode</p>
                <button type="button" onClick={toggleVoiceMode} className={\`mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 \${isListening ? 'bg-rose-600 text-white hover:bg-rose-500' : 'bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow text-white hover:scale-[1.02] hover:shadow-xl transition-all duration-300'}\`}>
                  <span className={\`h-2.5 w-2.5 rounded-full \${isListening ? 'animate-ping bg-white' : 'bg-indigo-200'}\`} />
                  {isListening ? 'Listening...' : 'Start Voice Mode'}
                </button>
                <p className="mt-3 min-h-10 text-xs leading-5 text-slate-500">{speechError || 'Uses native browser speech recognition when available.'}</p>
              </div>
            </div>
          </section>

          <section className="min-w-0 rounded-lg border border-slate-200 bg-glass-light p-5 shadow-soft">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">User Response</p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">Your Answer</h2>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">{answer.length} characters</span>
            </div>
            <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Type your answer here, or start Voice Mode to transcribe your response..." className="mt-5 min-h-72 w-full resize-none rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-800 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100" />
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-slate-500">Submitting triggers a simulated AI review with a score and coaching feedback.</p>
              <button type="button" onClick={submitAnswer} disabled={!answer.trim() || evaluationStatus === 'evaluating'} className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:from-indigo-400 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:hover:scale-100">
                {evaluationStatus === 'evaluating' ? 'Evaluating...' : 'Submit Answer'}
              </button>
            </div>
            <div className="mt-6 min-h-64">
              {evaluationStatus === 'evaluating' && <EvaluationSkeleton />}
              {evaluationStatus === 'complete' && <EvaluationPanel activeTab={activeTab} setActiveTab={setActiveTab} />}
              {evaluationStatus === 'idle' && (
                <div className="grid min-h-64 place-items-center rounded-lg border border-dashed border-slate-200 bg-white/50 p-6 text-center">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Evaluation will appear here</p>
                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">The reserved panel keeps the workspace stable while feedback loads.</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}`;

const dashboardStr = `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { performanceSummary, performanceHistory, scoreBadgeClass, Sidebar, LoadingSpinner, SummaryCard, MenuIcon } from '../components/shared';

export default function Dashboard() {
  const { interviewConfig } = useInterview();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [downloadingReportId, setDownloadingReportId] = useState(null);

  const downloadReport = (session) => {
    setDownloadingReportId(session.id);
    window.setTimeout(() => {
      setDownloadingReportId(null);
      window.alert(\`\${session.domain} report from \${session.date} is ready to download.\`);
    }, 1500);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-mesh-light font-sans">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-w-0 flex-1 animate-fade-in-up">
          <header className="sticky top-0 z-20 border-b border-white/40 bg-glass-light px-4 py-3 shadow-sm lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <button type="button" className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 lg:hidden" onClick={() => setSidebarOpen((value) => !value)}>
                <MenuIcon open={sidebarOpen} />
              </button>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Dashboard</p>
                <h1 className="truncate text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 sm:text-2xl">Interview Performance & History</h1>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button type="button" className="hidden rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 sm:block" onClick={() => navigate('/configure')}>
                  Configure
                </button>
                <button type="button" className="hidden rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50 sm:block" onClick={() => navigate('/login')}>
                  Sign Out
                </button>
              </div>
            </div>
          </header>

          <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Performance Overview</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">Review your mock interview progress, domain mastery, and downloadable AI reports.</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white/70 backdrop-blur px-4 py-3 text-sm text-slate-600 shadow-sm">
                Current track: {interviewConfig.domain} · {interviewConfig.difficulty}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {performanceSummary.map((item) => (
                <SummaryCard key={item.label} item={item} />
              ))}
            </div>

            <section className="mt-6 rounded-lg border border-slate-200 bg-glass-light shadow-soft">
              <div className="flex flex-col justify-between gap-3 border-b border-slate-200/50 p-5 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Performance History</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">Past mock sessions with report actions and score status.</p>
                </div>
                <span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">{performanceHistory.length} sessions</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-[820px] min-w-full divide-y divide-slate-200/50 text-left">
                  <thead className="bg-white/40 backdrop-blur">
                    <tr>
                      {['Date', 'Domain Selected', 'Difficulty', 'Final Score', 'Action'].map((heading) => (
                        <th key={heading} scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{heading}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/50 bg-white/50">
                    {performanceHistory.map((session) => {
                      const isDownloading = downloadingReportId === session.id;
                      return (
                        <tr key={session.id} className="transition hover:bg-white/70">
                          <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-900">{session.date}</td>
                          <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{session.domain}</td>
                          <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{session.difficulty}</td>
                          <td className="whitespace-nowrap px-5 py-4">
                            <span className={\`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 \${scoreBadgeClass(session.score)}\`}>
                              {session.score}/100
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            <button type="button" disabled={isDownloading} onClick={() => downloadReport(session)} className="inline-flex min-w-44 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:from-slate-800 hover:to-slate-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-wait disabled:bg-slate-400 disabled:shadow-none disabled:hover:scale-100">
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
}`;

fs.writeFileSync('./src/pages/Login.jsx', loginStr);
fs.writeFileSync('./src/pages/Register.jsx', registerStr);
fs.writeFileSync('./src/pages/Landing.jsx', landingStr);
fs.writeFileSync('./src/pages/Configure.jsx', configureStr);
fs.writeFileSync('./src/pages/Workspace.jsx', workspaceStr);
fs.writeFileSync('./src/pages/Dashboard.jsx', dashboardStr);

console.log('Pages created successfully.');
