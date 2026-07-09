import { useState } from 'react';
import { ResumeUploadZone, ProgressRing, mockResumeAnalysis } from './shared';

export default function ResumeAnalyzer() {
  const [analyzerResumeState, setAnalyzerResumeState] = useState({ fileName: '', status: 'idle' });
  const [jobDescription, setJobDescription] = useState('');
  const [isJdAnalyzing, setIsJdAnalyzing] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('scorecard');
  
  // Custom states to handle dynamic JD keyword match
  const [jdMatchedKeywords, setJdMatchedKeywords] = useState([]);
  const [jdMissingKeywords, setJdMissingKeywords] = useState([]);
  const [jdMatchScore, setJdMatchScore] = useState(null);
  const [jdAnalyzed, setJdAnalyzed] = useState(false);

  // Simulated scan steps during upload
  const [scanStep, setScanStep] = useState(0);

  const simulateUploadScan = (fileState) => {
    setAnalyzerResumeState(fileState);
    if (fileState.status === 'analyzing') {
      setScanStep(1);
      setTimeout(() => setScanStep(2), 800);
      setTimeout(() => setScanStep(3), 1600);
      setTimeout(() => {
        setAnalyzerResumeState({ fileName: fileState.fileName, status: 'success' });
        setScanStep(0);
        // Reset JD scan if fresh file upload
        setJdAnalyzed(false);
        setJdMatchScore(null);
      }, 2500);
    }
  };

  const handleJdAnalysis = (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;
    
    setIsJdAnalyzing(true);
    setTimeout(() => {
      const text = jobDescription.toLowerCase();
      
      // Look for target industry keywords in pasted JDs
      const targetKeywords = [
        { term: 'react', name: 'React' },
        { term: 'node', name: 'Node.js' },
        { term: 'rest api', name: 'REST API' },
        { term: 'git', name: 'Git' },
        { term: 'agile', name: 'Agile' },
        { term: 'graphql', name: 'GraphQL' },
        { term: 'aws', name: 'AWS' },
        { term: 'docker', name: 'Docker' },
        { term: 'ci/cd', name: 'CI/CD' },
        { term: 'python', name: 'Python' },
        { term: 'sql', name: 'SQL' }
      ];

      const foundInJd = targetKeywords.filter(k => text.includes(k.term));
      
      // Resume has: React, Node.js, REST API, Git, Agile, SQL
      const resumeKeywords = ['React', 'Node.js', 'REST API', 'Git', 'Agile', 'SQL'];
      
      const matched = foundInJd.filter(k => resumeKeywords.includes(k.name)).map(k => k.name);
      const missing = foundInJd.filter(k => !resumeKeywords.includes(k.name)).map(k => k.name);
      
      setJdMatchedKeywords(matched.length > 0 ? matched : ['React', 'Git']);
      setJdMissingKeywords(missing.length > 0 ? missing : ['AWS', 'Docker']);
      
      // Calculate match percentage: (matched / total required in JD) * 100
      const totalRequired = foundInJd.length || 5;
      const matchedCount = matched.length || 3;
      const score = Math.round((matchedCount / totalRequired) * 100);
      
      setJdMatchScore(score);
      setJdAnalyzed(true);
      setIsJdAnalyzing(false);
      setActiveSubTab('scorecard'); // redirect to scorecard view
    }, 1500);
  };

  // Helper values for dimensional scores
  const skillsScore = jdMatchScore !== null ? jdMatchScore : 85;
  const formattingScore = 90;
  const impactScore = 72;
  const linksScore = 60;
  const overallAtsScore = Math.round((skillsScore + formattingScore + impactScore + linksScore) / 4);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr] animate-fade-in-up">
      {/* LEFT COLUMN: Input controls */}
      <section className="min-w-0 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-glass-light p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Upload Resume</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">Upload your PDF resume to receive a comprehensive ATS evaluation.</p>
          <div className="mt-5">
            <ResumeUploadZone 
              resumeState={analyzerResumeState} 
              setResumeState={simulateUploadScan} 
            />
          </div>
          {analyzerResumeState.status === 'success' && (
            <button 
              type="button" 
              onClick={() => {
                setAnalyzerResumeState({ fileName: '', status: 'idle' });
                setJdAnalyzed(false);
                setJdMatchScore(null);
              }} 
              className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300"
            >
              Analyze Another Resume
            </button>
          )}
        </div>

        {/* Optional JD matcher */}
        {analyzerResumeState.status === 'success' && (
          <div className="rounded-2xl border border-indigo-100 bg-glass-light p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-slate-900">Job Description Matcher</h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">Paste your target job description here to check your keyword density and compatibility score.</p>
            <form onSubmit={handleJdAnalysis} className="mt-4 space-y-4">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job requirements or details here..."
                rows={5}
                className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
              <button 
                type="submit" 
                disabled={isJdAnalyzing || !jobDescription.trim()}
                className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none"
              >
                {isJdAnalyzing ? 'Scanning Alignment...' : 'Analyze JD Alignment'}
              </button>
            </form>
          </div>
        )}
      </section>

      {/* RIGHT COLUMN: Results display */}
      <section className="min-w-0">
        {/* State 1: Idle */}
        {analyzerResumeState.status === 'idle' && (
          <div className="grid h-full min-h-[480px] place-items-center rounded-2xl border border-dashed border-slate-300 bg-white/50 text-center p-8">
            <div className="max-w-md">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-indigo-50 text-indigo-600 mb-5">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800">ATS Evaluation Dashboard</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Upload your resume on the left to see your AI-generated ATS compatibility scorecard, keyword density scan, and compliance checklist.
              </p>
            </div>
          </div>
        )}
        
        {/* State 2: Scanning */}
        {analyzerResumeState.status === 'analyzing' && (
          <div className="rounded-2xl border border-slate-200 bg-glass-light p-8 shadow-soft min-h-[480px] flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full text-center space-y-6">
              <div className="relative inline-flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                <div className="absolute font-semibold text-indigo-600 text-xs">{scanStep * 25}%</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">AI ATS Engine Scanning</h3>
                <p className="mt-2 text-sm text-slate-500">Reading layout files and indexing keywords...</p>
              </div>
              
              <ul className="text-left max-w-xs mx-auto space-y-3 bg-white/40 p-4 rounded-xl border border-slate-100/50">
                <li className="flex items-center gap-3 text-sm">
                  <span className={`h-4 w-4 rounded-full flex items-center justify-center text-white text-[10px] ${scanStep >= 1 ? 'bg-emerald-500' : 'bg-slate-200'}`}>✓</span>
                  <span className={scanStep >= 1 ? 'text-slate-900 font-medium' : 'text-slate-400'}>Parsing PDF layout & syntax</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <span className={`h-4 w-4 rounded-full flex items-center justify-center text-white text-[10px] ${scanStep >= 2 ? 'bg-emerald-500' : 'bg-slate-200'}`}>✓</span>
                  <span className={scanStep >= 2 ? 'text-slate-900 font-medium' : 'text-slate-400'}>Scanning contact info & links</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <span className={`h-4 w-4 rounded-full flex items-center justify-center text-white text-[10px] ${scanStep >= 3 ? 'bg-emerald-500' : 'bg-slate-200'}`}>✓</span>
                  <span className={scanStep >= 3 ? 'text-slate-900 font-medium' : 'text-slate-400'}>Evaluating keyword compliance</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* State 3: Display Scorecard */}
        {analyzerResumeState.status === 'success' && (
          <div className="rounded-2xl border border-slate-200 bg-glass-light p-6 shadow-soft animate-fade-in-up">
            
            {/* Top Score Banner */}
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6 pb-6 border-b border-slate-200/50">
              <div className="shrink-0">
                <ProgressRing score={overallAtsScore} />
              </div>
              <div className="space-y-1">
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                  ATS Scanner Report
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  {overallAtsScore >= 80 ? 'Excellent Match' : overallAtsScore >= 70 ? 'Strong Profile' : 'Needs Optimization'}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                  {jdAnalyzed 
                    ? `Your resume was compared against the target job requirements. Real-time keyword density checks suggest a ${skillsScore}% compatibility match.`
                    : mockResumeAnalysis.summary
                  }
                </p>
              </div>
            </div>

            {/* View Tabs */}
            <div className="flex border-b border-slate-200 mb-6 bg-white/30 rounded-lg p-1">
              {[
                { id: 'scorecard', label: 'Scorecard' },
                { id: 'keywords', label: 'Keywords Check' },
                { id: 'checklist', label: 'Compliance Scan' },
                { id: 'actions', label: 'Action Items' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`flex-1 text-center py-2 px-3 text-xs font-semibold rounded-md transition ${activeSubTab === tab.id ? 'bg-white text-indigo-700 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENTS */}
            
            {/* 1. Scorecard tab */}
            {activeSubTab === 'scorecard' && (
              <div className="space-y-5 animate-fade-in-up">
                <h3 className="text-sm font-semibold text-slate-900">ATS Rating Breakdown</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: 'Skills & Keywords Density', value: skillsScore, desc: 'Presence of critical target terms.' },
                    { label: 'Formatting & Layout', value: formattingScore, desc: 'Font sizes, column parses, spacing.' },
                    { label: 'Impact & Numeric Metrics', value: impactScore, desc: 'Usage of percentages, currency, hours.' },
                    { label: 'Links & Professional Bio', value: linksScore, desc: 'Presence of GitHub, LinkedIn, portfolios.' }
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl border border-slate-100 bg-white/40 p-4 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline">
                          <p className="text-xs font-bold text-slate-700">{stat.label}</p>
                          <span className="text-sm font-semibold text-slate-900">{stat.value}%</span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-500 leading-normal">{stat.desc}</p>
                      </div>
                      <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            stat.value >= 85 ? 'bg-emerald-500' : stat.value >= 70 ? 'bg-indigo-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${stat.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Keywords Tab */}
            {activeSubTab === 'keywords' && (
              <div className="space-y-5 animate-fade-in-up">
                <div className="grid gap-4 sm:grid-cols-2">
                  
                  {/* Matched */}
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/20 p-4">
                    <h4 className="text-xs font-bold text-emerald-800 mb-3 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      Matched Keywords ({jdAnalyzed ? jdMatchedKeywords.length : mockResumeAnalysis.keywords.matched.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(jdAnalyzed ? jdMatchedKeywords : mockResumeAnalysis.keywords.matched).map(kw => (
                        <span key={kw} className="rounded-md bg-emerald-100/70 border border-emerald-200/50 px-2 py-1 text-xs text-emerald-800 font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing */}
                  <div className="rounded-xl border border-rose-100 bg-rose-50/20 p-4">
                    <h4 className="text-xs font-bold text-rose-800 mb-3 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                      Missing target skills ({jdAnalyzed ? jdMissingKeywords.length : mockResumeAnalysis.keywords.missing.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(jdAnalyzed ? jdMissingKeywords : mockResumeAnalysis.keywords.missing).map(kw => (
                        <span key={kw} className="rounded-md bg-rose-100/70 border border-rose-200/50 px-2 py-1 text-xs text-rose-800 font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Overused */}
                <div className="rounded-xl border border-amber-100 bg-amber-50/20 p-4">
                  <h4 className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    Cliché / Overused Buzzwords detected
                  </h4>
                  <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
                    ATS scoring models penalize resumes loaded with soft keywords that lack numeric validation. Try replacing these with action verbs:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Responsible for', 'Detail-oriented', 'Hard worker', 'Team player'].map(kw => (
                      <span key={kw} className="rounded-md bg-amber-100/70 border border-amber-200/50 px-2 py-1 text-xs text-amber-800 font-medium">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Compliance tab */}
            {activeSubTab === 'checklist' && (
              <div className="space-y-4 animate-fade-in-up">
                <h3 className="text-sm font-semibold text-slate-900">Compliance & Parseability Checklist</h3>
                <div className="space-y-2">
                  {[
                    { pass: true, label: 'Single Column layout format', detail: 'Parser scanned left-to-right columns with no overlap warnings.' },
                    { pass: true, label: 'Contact Details presence', detail: 'Email address and phone number parsed successfully.' },
                    { pass: false, label: 'Professional Links scan', detail: 'No GitHub or LinkedIn profile links detected in the headers.', type: 'links' },
                    { pass: true, label: 'Standard sections mapping', detail: 'Identified Education, Experience, and Skills sections.' },
                    { pass: false, label: 'Quantitative metrics checks', detail: 'Only 2 metrics found. ATS profiles prefer 4-6 metrics to gauge impact.', type: 'metrics' },
                  ].map((check, idx) => (
                    <div key={idx} className="flex gap-4 p-3 rounded-lg border border-slate-100 bg-white/40">
                      <span className={`mt-0.5 grid h-5 w-5 place-items-center rounded-full text-xs font-bold shrink-0 text-white ${
                        check.pass ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}>
                        {check.pass ? '✓' : '!'}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-800">{check.label}</h4>
                          {!check.pass && (
                            <button 
                              type="button" 
                              onClick={() => {
                                // Direct to fixes tab
                                setActiveSubTab('actions');
                              }}
                              className="text-[10px] text-indigo-600 hover:underline font-semibold"
                            >
                              How to fix
                            </button>
                          )}
                        </div>
                        <p className="mt-0.5 text-[11px] text-slate-500 leading-normal">{check.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Action items tab */}
            {activeSubTab === 'actions' && (
              <div className="space-y-5 animate-fade-in-up">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Strengths */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Strong ATS Compliance Highlights
                    </h4>
                    <ul className="space-y-2">
                      {mockResumeAnalysis.strengths.map((item, idx) => (
                        <li key={idx} className="text-[11px] leading-relaxed text-slate-600 bg-white/30 border border-slate-100 rounded-lg p-2.5">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions to optimize */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                      Required Revisions Checklist
                    </h4>
                    <ul className="space-y-2">
                      {mockResumeAnalysis.improvements.map((item, idx) => (
                        <li key={idx} className="text-[11px] leading-relaxed text-slate-600 bg-white/30 border border-slate-100 rounded-lg p-2.5">
                          {item}
                        </li>
                      ))}
                      <li className="text-[11px] leading-relaxed text-slate-600 bg-white/30 border border-slate-100 rounded-lg p-2.5">
                        Add links to your professional Github, LinkedIn, or personal website in the contact header.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}
      </section>
    </div>
  );
}
