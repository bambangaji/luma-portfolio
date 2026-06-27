import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { toast } from 'sonner';
import { AuthService } from '../../services/auth.service';
import { validateLogin, type LoginFields } from '../../services/auth.validation';
import { AppHeader } from '../../components/app-header';
const field = 'w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white';
const ok    = 'border-gray-300 focus:border-violet-500 dark:border-gray-700';
const err   = 'border-red-400 focus:border-red-400 text-red dark:text-red-400';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm]       = useState<LoginFields>({ email: '', password: '' });
  const [errors, setErrors]   = useState<Partial<LoginFields>>({});
  const [loading, setLoading] = useState(false);

  const set = (k: keyof LoginFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    setErrors(p => ({ ...p, [k]: '' }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateLogin(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await AuthService.login(form.email, form.password);
      toast.success('Signed in successfully');
      navigate('/portofolio-editor');
    } catch (e: any) {
      toast.error(e.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-4 dark:from-gray-950 dark:via-gray-950 dark:to-black">
      <AppHeader />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">

        <Link to="/" className="mb-8 block text-center">
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-2xl font-black text-transparent dark:text-transparent">
            LUMA PORTFOLIO
          </span>
        </Link>

        <h1 className="mb-1 text-2xl font-extrabold text-slate-900 dark:text-white">Welcome back</h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-violet-600 hover:underline dark:text-violet-400">Register</Link>
        </p>

        <form className="space-y-4" onSubmit={submit} noValidate>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com"
              className={`${field} ${errors.email ? err : ok}`} />
            {errors.email && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input type="password" value={form.password} onChange={set('password')} placeholder="Min. 8 characters"
              className={`${field} ${errors.password ? err : ok}`} />
            {errors.password && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <input type="checkbox" className="rounded" /> Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-violet-600 hover:underline dark:text-violet-400">Forgot password?</Link>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl disabled:opacity-60">
            <LogIn size={17} /> {loading ? 'Signing in…' : 'Sign In'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
