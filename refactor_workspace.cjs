const fs = require('fs');

// 1. Update shared.jsx to have multiple questions
let shared = fs.readFileSync('./src/components/shared.jsx', 'utf8');

const newQuestionsStr = `export const interviewQuestions = {
  Java: [
    'Explain the difference between a process and a thread.',
    'How does Garbage Collection work in Java?',
    'Describe the concept of polymorphism with a real-world example.'
  ],
  Python: [
    'How would you structure a Python service that needs to process background jobs?',
    'What are the differences between lists and tuples in Python?',
    'Explain the concept of a decorator and provide a use case.'
  ],
  'Machine Learning': [
    'How do you detect and reduce overfitting in a machine learning model?',
    'Explain the difference between supervised and unsupervised learning.',
    'What is the curse of dimensionality?'
  ],
  'Web Development': [
    'Explain how you would design a responsive dashboard with reliable API states.',
    'What are the differences between LocalStorage, SessionStorage, and Cookies?',
    'How do you optimize the performance of a React application?'
  ],
  HR: [
    'Tell me about a time you handled conflict inside a team.',
    'Where do you see yourself in 5 years?',
    'Describe a situation where you failed and what you learned from it.'
  ],
};`;

shared = shared.replace(
  /export const interviewQuestions = \{[\s\S]*?\};/,
  newQuestionsStr
);
fs.writeFileSync('./src/components/shared.jsx', shared);

// 2. Rewrite Workspace.jsx
const workspaceStr = `import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { interviewQuestions, formatElapsedTime, EvaluationPanel, EvaluationSkeleton, ProgressRing, scoreBadgeClass } from '../components/shared';
import html2pdf from 'html2pdf.js';

export default function Workspace() {
  const { interviewConfig } = useInterview();
  const navigate = useNavigate();

  // Interview Flow State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersHistory, setAnswersHistory] = useState([]);
  const [interviewStatus, setInterviewStatus] = useState('active'); // active, evaluating, finished
  const [activeTab, setActiveTab] = useState('Strengths');

  // Input & Timer State
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  const recognitionRef = useRef(null);
  const evaluationTimeoutRef = useRef(null);
  const reportRef = useRef(null);

  // Retrieve questions for domain (fallback to Web Dev if missing)
  const domainQuestions = interviewQuestions[interviewConfig.domain] || interviewQuestions['Web Development'];
  const totalQuestions = domainQuestions.length;
  const currentQuestion = domainQuestions[currentQuestionIndex];

  const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const voiceSupported = Boolean(SpeechRecognition);

  // Global Timer
  useEffect(() => {
    let timer;
    if (interviewStatus === 'active') {
      timer = window.setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    }
    return () => window.clearInterval(timer);
  }, [interviewStatus]);

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
    setInterviewStatus('evaluating');
    setActiveTab('Strengths');
    
    // Simulate AI evaluation time
    window.clearTimeout(evaluationTimeoutRef.current);
    evaluationTimeoutRef.current = window.setTimeout(() => {
      // Mock score generation (75 to 95)
      const mockScore = Math.floor(Math.random() * 21) + 75;
      
      setAnswersHistory(prev => [
        ...prev, 
        { 
          question: currentQuestion, 
          answer: answer, 
          score: mockScore 
        }
      ]);
      setInterviewStatus('feedback_ready');
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAnswer('');
      setInterviewStatus('active');
    } else {
      setInterviewStatus('finished');
    }
  };

  const downloadPDF = () => {
    setIsGeneratingPDF(true);
    const element = reportRef.current;
    
    // Create an invisible clone for PDF rendering to preserve styling without screen resizing constraints
    const opt = {
      margin:       10,
      filename:     \`\${interviewConfig.domain}_Interview_Report.pdf\`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      setIsGeneratingPDF(false);
    });
  };

  const renderActiveWorkspace = () => (
    <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] animate-fade-in-up">
      <section className="min-w-0 rounded-lg border border-slate-200 bg-glass-light p-5 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">AI Interviewer</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">Current Question</h2>
          </div>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100">
            Question {currentQuestionIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div className="mt-6 rounded-lg border border-indigo-100 bg-white/40 p-5 backdrop-blur shadow-inner">
          <p className="text-xl font-semibold leading-8 text-slate-900">{currentQuestion}</p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Stopwatch</p>
            <div className="mt-3 flex items-end gap-3">
              <p className="font-mono text-4xl font-semibold tracking-tight text-slate-900">{formatElapsedTime(elapsedSeconds)}</p>
              {interviewStatus === 'active' && <span className="mb-1 h-2 w-2 animate-pulse rounded-full bg-emerald-500" />}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white/50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Voice Mode</p>
            <button 
              type="button" 
              onClick={toggleVoiceMode} 
              disabled={interviewStatus !== 'active'}
              className={\`mt-3 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 \${isListening ? 'bg-rose-600 text-white hover:bg-rose-500' : 'bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow text-white hover:scale-[1.02] hover:shadow-xl transition-all duration-300'} disabled:opacity-50 disabled:cursor-not-allowed\`}>
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
        
        <textarea 
          value={answer} 
          onChange={(event) => setAnswer(event.target.value)} 
          disabled={interviewStatus !== 'active'}
          placeholder="Type your answer here, or start Voice Mode to transcribe your response..." 
          className="mt-5 min-h-72 w-full resize-none rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-800 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-500" 
        />
        
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500">Submitting triggers a simulated AI review with a score and coaching feedback.</p>
          <button 
            type="button" 
            onClick={submitAnswer} 
            disabled={!answer.trim() || interviewStatus !== 'active'} 
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:from-indigo-400 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none disabled:hover:scale-100">
            Submit Answer
          </button>
        </div>
        
        <div className="mt-6 min-h-64">
          {interviewStatus === 'evaluating' && <EvaluationSkeleton />}
          
          {interviewStatus === 'feedback_ready' && (
            <div className="space-y-4 animate-fade-in-up">
              <EvaluationPanel activeTab={activeTab} setActiveTab={setActiveTab} />
              <button 
                type="button" 
                onClick={handleNextQuestion}
                className="w-full rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 shadow-lg">
                {currentQuestionIndex + 1 < totalQuestions ? 'Proceed to Next Question' : 'Finish Interview'}
              </button>
            </div>
          )}
          
          {interviewStatus === 'active' && (
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
  );

  const renderFinishedScreen = () => {
    const totalScore = answersHistory.reduce((acc, curr) => acc + curr.score, 0);
    const averageScore = Math.round(totalScore / answersHistory.length) || 0;
    
    return (
      <div className="animate-fade-in-up max-w-4xl mx-auto space-y-6">
        {/* Visible Download Button */}
        <div className="flex justify-end">
          <button 
            type="button" 
            onClick={downloadPDF}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 shadow-glow px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {isGeneratingPDF ? 'Generating...' : 'Download PDF Report'}
          </button>
        </div>

        {/* PDF Content Wrapper */}
        <div ref={reportRef} className="rounded-xl border border-slate-200 bg-white p-8 shadow-2xl">
          <header className="border-b border-slate-100 pb-6 mb-8 flex justify-between items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Interview Completion Report</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">{interviewConfig.domain} Developer</h1>
              <p className="mt-2 text-slate-500">Difficulty: {interviewConfig.difficulty}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-500">Total Duration</p>
              <p className="mt-1 font-mono text-2xl font-bold text-slate-900">{formatElapsedTime(elapsedSeconds)}</p>
            </div>
          </header>

          <section className="flex flex-col sm:flex-row gap-8 items-center justify-center py-8 bg-slate-50 rounded-2xl border border-slate-100 mb-10">
            <ProgressRing score={averageScore} />
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-900">Overall Performance</h2>
              <p className="mt-2 text-slate-600 max-w-sm">
                Based on {answersHistory.length} technical questions, your AI mock interviewer assigned an average score of {averageScore}/100.
              </p>
              <span className={\`mt-4 inline-flex rounded-full px-4 py-1.5 text-sm font-semibold ring-1 \${scoreBadgeClass(averageScore)}\`}>
                {averageScore >= 80 ? 'Strong Candidate' : averageScore >= 60 ? 'Good Potential' : 'Needs Preparation'}
              </span>
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">Question Breakdown</h3>
            {answersHistory.map((item, index) => (
              <div key={index} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h4 className="text-base font-semibold text-slate-900"><span className="text-indigo-600 mr-2">Q{index + 1}.</span>{item.question}</h4>
                  <span className={\`shrink-0 rounded-full px-3 py-1 text-xs font-bold ring-1 \${scoreBadgeClass(item.score)}\`}>
                    Score: {item.score}/100
                  </span>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 leading-relaxed border border-slate-100">
                  <span className="font-semibold text-slate-500 block mb-2 text-xs uppercase tracking-wider">Your Answer</span>
                  "{item.answer}"
                </div>
              </div>
            ))}
          </section>
          
          <footer className="mt-12 pt-6 border-t border-slate-100 text-center text-sm text-slate-400">
            Report generated by Mock Interview AI Dashboard
          </footer>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-mesh-light py-6 font-sans">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 rounded-lg border border-indigo-100 bg-glass-light p-5 shadow-soft sm:flex-row sm:items-center">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">Live Simulation</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 sm:text-3xl">Interview Simulation Workspace</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{interviewConfig.domain} interview at {interviewConfig.difficulty.toLowerCase()} level.</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => navigate('/dashboard')} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700">Dashboard</button>
            <button type="button" onClick={() => navigate('/login')} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50">Sign Out</button>
          </div>
        </header>

        {interviewStatus === 'finished' ? renderFinishedScreen() : renderActiveWorkspace()}
        
      </section>
    </main>
  );
}`;

fs.writeFileSync('./src/pages/Workspace.jsx', workspaceStr);

console.log('Workspace refactored.');
