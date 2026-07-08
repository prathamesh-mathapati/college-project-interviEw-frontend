const fs = require('fs');
const file = './src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

const authComponents = `
function LoginScreen({ onLogin, onNavigateRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) onLogin();
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
          <button type="button" onClick={onNavigateRegister} className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
            Create one
          </button>
        </p>
      </div>
    </main>
  );
}

function RegisterScreen({ onRegister, onNavigateLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && password === confirmPassword) onRegister();
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
          <button type="button" onClick={onNavigateLogin} className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
            Sign in
          </button>
        </p>
      </div>
    </main>
  );
}

`;

content = content.replace('function MenuIcon({ open }) {', authComponents + 'function MenuIcon({ open }) {');

const appComponent = `
export default function App() {
  const [screen, setScreen] = useState('login');
  const [interviewConfig, setInterviewConfig] = useState({
    domain: 'Java',
    difficulty: 'Intermediate',
    resumeName: 'No resume attached',
    resumeStatus: 'idle',
  });

  if (screen === 'login') {
    return (
      <LoginScreen 
        onLogin={() => setScreen('configure')} 
        onNavigateRegister={() => setScreen('register')} 
      />
    );
  }

  if (screen === 'register') {
    return (
      <RegisterScreen 
        onRegister={() => setScreen('configure')} 
        onNavigateLogin={() => setScreen('login')} 
      />
    );
  }

  if (screen === 'dashboard') {
    return (
      <Dashboard
        interviewConfig={interviewConfig}
        onBack={() => setScreen('configure')}
        onSignOut={() => setScreen('login')}
      />
    );
  }

  if (screen === 'workspace') {
    return (
      <InterviewSimulationWorkspace
        interviewConfig={interviewConfig}
        onBack={() => setScreen('configure')}
        onDashboard={() => setScreen('dashboard')}
        onSignOut={() => setScreen('login')}
      />
    );
  }

  return (
    <InterviewConfiguration
      onLaunch={(config) => {
        setInterviewConfig(config);
        setScreen('workspace');
      }}
      onSignOut={() => setScreen('login')}
    />
  );
}
`;

content = content.replace(/export default function App\(\) \{[\s\S]*\}\s*$/, appComponent);

// Also need to add onSignOut to Dashboard, Workspace, Configuration signatures and buttons

// Configuration
content = content.replace(/function InterviewConfiguration\(\{ onLaunch \}\) \{/, 'function InterviewConfiguration({ onLaunch, onSignOut }) {');
content = content.replace(
  /<div className="w-fit rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-800">\s*Personalized AI round\s*<\/div>/,
  `<div className="flex gap-2">
            <div className="w-fit rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-800">
              Personalized AI round
            </div>
            <button type="button" onClick={onSignOut} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-rose-600 shadow-sm transition hover:border-rose-200 hover:text-rose-700 hover:bg-rose-50">Sign Out</button>
          </div>`
);

// Workspace
content = content.replace(/function InterviewSimulationWorkspace\(\{ interviewConfig, onBack, onDashboard \}\) \{/, 'function InterviewSimulationWorkspace({ interviewConfig, onBack, onDashboard, onSignOut }) {');
content = content.replace(
  /<button\s*type="button"\s*onClick=\{onDashboard\}\s*className="rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-\[1.02\] hover:from-slate-800 hover:to-slate-700 transition-all duration-300"\s*>\s*Dashboard\s*<\/button>/,
  `<button
              type="button"
              onClick={onDashboard}
              className="rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.02] hover:from-slate-800 hover:to-slate-700 transition-all duration-300"
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={onSignOut}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50"
            >
              Sign Out
            </button>`
);

// Dashboard
content = content.replace(/function Dashboard\(\{ interviewConfig, onBack \}\) \{/, 'function Dashboard({ interviewConfig, onBack, onSignOut }) {');
content = content.replace(
  /<button\s*type="button"\s*className="hidden rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 sm:block"\s*onClick=\{onBack\}\s*>\s*Configure\s*<\/button>/,
  `<button
                  type="button"
                  className="hidden rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 sm:block"
                  onClick={onBack}
                >
                  Configure
                </button>
                <button
                  type="button"
                  className="hidden rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50 sm:block"
                  onClick={onSignOut}
                >
                  Sign Out
                </button>`
);

fs.writeFileSync(file, content);
console.log('App.jsx patched successfully.');
