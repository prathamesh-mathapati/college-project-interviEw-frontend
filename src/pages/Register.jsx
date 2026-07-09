import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && password === confirmPassword) navigate('/dashboard');
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
}