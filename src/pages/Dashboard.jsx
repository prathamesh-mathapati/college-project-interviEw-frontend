import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewInterview from '../components/NewInterview';
import Overview from '../components/Overview';
import ResumeAnalyzer from '../components/ResumeAnalyzer';
import { Sidebar, MenuIcon } from '../components/shared';

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

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
            {activeTab === 'Overview' && <Overview setActiveTab={setActiveTab} />}
            {activeTab === 'New Interview' && <NewInterview />}
            {activeTab === 'Resume Analyzer' && <ResumeAnalyzer />}
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
