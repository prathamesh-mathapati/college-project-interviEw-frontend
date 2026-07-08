const fs = require('fs');
const file = './src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

// Backgrounds
content = content.replace(/bg-\[radial-gradient\(circle_at_top_left,_rgba\(99,102,241,0\.18\),_transparent_32%\),linear-gradient\(180deg,_#f8fbff_0%,_#eef4ff_52%,_#f8fafc_100%\)\]/g, 'bg-mesh-light');
content = content.replace(/bg-\[radial-gradient\(circle_at_top_left,_rgba\(59,130,246,0\.16\),_transparent_34%\),linear-gradient\(180deg,_#f8fbff_0%,_#eef4ff_48%,_#f8fafc_100%\)\]/g, 'bg-mesh-light');
content = content.replace(/bg-slate-50\/90/g, 'bg-glass-light border-b border-white/40');
content = content.replace(/bg-slate-50/g, 'bg-mesh-light'); // for the dashboard wrapper

// Glass panels
content = content.replace(/bg-white\/90 p-5 shadow-soft backdrop-blur/g, 'bg-glass-light p-5 shadow-soft');
content = content.replace(/bg-white\/85 p-5 shadow-soft backdrop-blur/g, 'bg-glass-light p-5 shadow-soft');
content = content.replace(/bg-white\/95 px-4 py-5 shadow-2xl shadow-slate-900\/10 backdrop-blur/g, 'bg-glass-light px-4 py-5 shadow-2xl shadow-slate-900/10');

// Typography gradients
content = content.replace(/text-slate-950 sm:text-3xl/g, 'text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 sm:text-3xl');
content = content.replace(/text-slate-950/g, 'text-slate-900'); // softer dark

// Animations
content = content.replace(/className="grid gap-6/g, 'className="grid gap-6 animate-fade-in-up');
content = content.replace(/className="min-w-0 flex-1"/g, 'className="min-w-0 flex-1 animate-fade-in-up"');

// Button upgrades
content = content.replace(/bg-indigo-600/g, 'bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow');
content = content.replace(/hover:bg-indigo-500/g, 'hover:scale-[1.02] hover:shadow-xl hover:from-indigo-400 hover:to-violet-500 transition-all duration-300');
content = content.replace(/bg-indigo-500/g, 'bg-gradient-to-r from-indigo-500 to-violet-600 shadow-glow');
content = content.replace(/hover:bg-indigo-400/g, 'hover:scale-[1.02] hover:shadow-xl hover:from-indigo-400 hover:to-violet-500 transition-all duration-300');
content = content.replace(/bg-slate-950/g, 'bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg');
content = content.replace(/hover:bg-slate-800/g, 'hover:scale-[1.02] hover:from-slate-800 hover:to-slate-700 transition-all duration-300');

fs.writeFileSync(file, content);
console.log('Done');
