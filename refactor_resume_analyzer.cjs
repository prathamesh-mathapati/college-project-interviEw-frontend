const fs = require('fs');

// 1. Update shared.jsx to add mock data
let shared = fs.readFileSync('./src/components/shared.jsx', 'utf8');

const mockDataStr = `
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
`;

if (!shared.includes('mockResumeAnalysis')) {
  shared = shared.replace(
    /export const feedback = \{[\s\S]*?\};/,
    `$&${mockDataStr}`
  );
  fs.writeFileSync('./src/components/shared.jsx', shared);
}


// 2. Rewrite Dashboard.jsx
const dashboardStr = `import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { performanceSummary, performanceHistory, scoreBadgeClass, Sidebar, LoadingSpinner, SummaryCard, MenuIcon, domains, difficulties, DomainCard, ResumeUploadZone, mockResumeAnalysis, ProgressRing, ResumeAnalysisSkeleton } from '../components/shared';

export default function Dashboard() {
  const { interviewConfig, setInterviewConfig } = useInterview();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [downloadingReportId, setDownloadingReportId] = useState(null);

  // Configure State
  const [selectedDomain, setSelectedDomain] = useState('Java');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [resumeState, setResumeState] = useState({ fileName: '', status: 'idle' });
  const canLaunch = selectedDomain && difficulty && resumeState.status !== 'analyzing';

  // Resume Analyzer State
  const [analyzerResumeState, setAnalyzerResumeState] = useState({ fileName: '', status: 'idle' });

  const handleLaunch = () => {
    setInterviewConfig({
      domain: selectedDomain,
      difficulty,
      resumeName: resumeState.fileName || 'No resume attached',
      resumeStatus: resumeState.status,
    });
    navigate('/workspace');
  };

  const downloadReport = (session) => {
    setDownloadingReportId(session.id);
    window.setTimeout(() => {
      setDownloadingReportId(null);
      window.alert(\`\${session.domain} report from \${session.date} is ready to download.\`);
    }, 1500);
  };

  const renderOverview = () => (
    <div className="animate-fade-in-up">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Performance Overview</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">Review your mock interview progress, domain mastery, and downloadable AI reports.</p>
        </div>
        <button type="button" onClick={() => setActiveTab('New Interview')} className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]">
          Start New Interview
        </button>
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
    </div>
  );

  const renderNewInterview = () => (
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
  );

  const renderResumeAnalyzer = () => (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr] animate-fade-in-up">
      <section className="min-w-0 space-y-6">
        <div className="rounded-lg border border-slate-200 bg-glass-light p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Upload for Analysis</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">Upload your PDF resume to receive a comprehensive ATS evaluation.</p>
          <div className="mt-5">
            <ResumeUploadZone resumeState={analyzerResumeState} setResumeState={setAnalyzerResumeState} />
          </div>
          {analyzerResumeState.status === 'success' && (
            <button 
              type="button" 
              onClick={() => setAnalyzerResumeState({ fileName: '', status: 'idle' })} 
              className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Analyze Another Resume
            </button>
          )}
        </div>
      </section>

      <section className="min-w-0">
        {analyzerResumeState.status === 'idle' && (
          <div className="grid h-full min-h-[400px] place-items-center rounded-lg border border-dashed border-slate-300 bg-white/50 text-center">
            <div className="px-4">
              <p className="text-sm font-semibold text-slate-700">Waiting for Resume</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">Upload your resume on the left to see your AI-generated ATS score and feedback.</p>
            </div>
          </div>
        )}
        
        {analyzerResumeState.status === 'analyzing' && (
          <ResumeAnalysisSkeleton />
        )}

        {analyzerResumeState.status === 'success' && (
          <div className="rounded-lg border border-slate-200 bg-glass-light p-6 shadow-soft animate-fade-in-up">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8 pb-8 border-b border-slate-200/50">
              <div className="shrink-0">
                <ProgressRing score={mockResumeAnalysis.score} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">ATS Compatibility Score</p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">Strong Profile</h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-lg">{mockResumeAnalysis.summary}</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  Key Strengths
                </h3>
                <ul className="mt-4 space-y-3">
                  {mockResumeAnalysis.strengths.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm leading-6 text-slate-600 bg-emerald-50/50 rounded-lg p-3 border border-emerald-100">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                  Areas for Improvement
                </h3>
                <ul className="mt-4 space-y-3">
                  {mockResumeAnalysis.improvements.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm leading-6 text-slate-600 bg-amber-50/50 rounded-lg p-3 border border-amber-100">
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/50">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Keyword Analysis</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Matched Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {mockResumeAnalysis.keywords.matched.map(kw => (
                      <span key={kw} className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-1 text-xs font-semibold text-emerald-700">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Missing Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {mockResumeAnalysis.keywords.missing.map(kw => (
                      <span key={kw} className="rounded-md bg-rose-50 border border-rose-200 px-2 py-1 text-xs font-semibold text-rose-700">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-mesh-light font-sans">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activeItem={activeTab} onSelect={setActiveTab} />
        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-white/40 bg-glass-light px-4 py-3 shadow-sm lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <button type="button" className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 lg:hidden" onClick={() => setSidebarOpen((value) => !value)}>
                <MenuIcon open={sidebarOpen} />
              </button>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Dashboard</p>
                <h1 className="truncate text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 sm:text-2xl">{activeTab}</h1>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button type="button" className="hidden rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50 sm:block" onClick={() => navigate('/login')}>
                  Sign Out
                </button>
              </div>
            </div>
          </header>

          <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {activeTab === 'Overview' && renderOverview()}
            {activeTab === 'New Interview' && renderNewInterview()}
            {activeTab === 'Resume Analyzer' && renderResumeAnalyzer()}
            {activeTab !== 'Overview' && activeTab !== 'New Interview' && activeTab !== 'Resume Analyzer' && (
              <div className="grid h-96 place-items-center rounded-lg border border-dashed border-slate-300 bg-white/50 text-slate-500">
                {activeTab} module is under development.
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('./src/pages/Dashboard.jsx', dashboardStr);

console.log('Resume Analyzer refactored.');
