import { useState, useEffect, useRef } from 'react';
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
                <button type="button" onClick={toggleVoiceMode} className={`mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isListening ? 'bg-rose-600 text-white hover:bg-rose-500' : 'bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow text-white hover:scale-[1.02] hover:shadow-xl transition-all duration-300'}`}>
                  <span className={`h-2.5 w-2.5 rounded-full ${isListening ? 'animate-ping bg-white' : 'bg-indigo-200'}`} />
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
}