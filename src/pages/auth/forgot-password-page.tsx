import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AppHeader } from '../../components/app-header';

const field = 'w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email'); return; }
    setLoading(true);
    // TODO: wire to real API
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
    toast.success('Reset link sent!');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-4 dark:from-gray-950 dark:via-gray-950 dark:to-black">
      <AppHeader />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">

        <Link to="/" className="mb-8 block text-center">
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-2xl font-black text-transparent">
            LUMA PORTFOLIO
          </span>
        </Link>

        {sent ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/15">
              <CheckCircle size={28} className="text-emerald-500" />
            </div>
            <h1 className="mb-2 text-2xl font-extrabold text-slate-900 dark:text-white">Check your email</h1>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
              We sent a password reset link to <span className="font-semibold text-slate-700 dark:text-slate-200">{email}</span>
            </p>
            <Link to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:underline dark:text-violet-400">
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mb-1 text-2xl font-extrabold text-slate-900 dark:text-white">Forgot password?</h1>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
              Enter your email and we'll send you a reset link.
            </p>

            <form className="space-y-4" onSubmit={submit} noValidate>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input type="email" value={email} placeholder="you@example.com"
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  className={`${field} ${error ? 'border-red-400 focus:border-red-400' : 'border-gray-300 focus:border-violet-500 dark:border-gray-700'}`} />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl disabled:opacity-60">
                <Mail size={17} /> {loading ? 'Sending…' : 'Send Reset Link'}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              Remember your password?{' '}
              <Link to="/login" className="font-semibold text-violet-600 hover:underline dark:text-violet-400">Sign in</Link>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
