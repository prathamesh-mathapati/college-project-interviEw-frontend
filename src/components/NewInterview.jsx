import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { domains, difficulties, DomainCard, ResumeUploadZone } from './shared';

export default function NewInterview() {

  const { setInterviewConfig } = useInterview();
  const navigate = useNavigate();

  // Configure State
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
              <button key={level} type="button" onClick={() => setDifficulty(level)} className={`rounded-md px-3 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${difficulty === level ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
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
              <p className="mt-2 text-sm leading-6 text-slate-300">{selectedDomain} interview at {difficulty.toLowerCase()} level{resumeState.status === 'success' ? ` with ${resumeState.fileName}` : ''}.</p>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100 ring-1 ring-white/10">Live AI</span>
          </div>
          <button type="button" disabled={!canLaunch} onClick={handleLaunch} className="mt-5 w-full rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:from-indigo-400 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300">
            Launch AI Interview
          </button>
        </section>
      </aside>
    </div>
  );
}
