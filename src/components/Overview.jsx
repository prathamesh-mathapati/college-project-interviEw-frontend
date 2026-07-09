import { useState } from 'react';
import { performanceSummary, performanceHistory, scoreBadgeClass, SummaryCard, LoadingSpinner } from './shared';

export default function Overview({ setActiveTab }) {
  const [downloadingReportId, setDownloadingReportId] = useState(null);

  const downloadReport = (session) => {
    setDownloadingReportId(session.id);
    window.setTimeout(() => {
      setDownloadingReportId(null);
      window.alert(`${session.domain} report from ${session.date} is ready to download.`);
    }, 1500);
  };

  return (
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
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${scoreBadgeClass(session.score)}`}>
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
}
