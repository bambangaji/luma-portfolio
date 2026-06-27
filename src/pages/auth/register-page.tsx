import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { AuthService } from '../../services/auth.service';
import { validateRegister, type RegisterFields } from '../../services/auth.validation';
import { AppHeader } from '../../components/app-header';

const field = 'w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white';
const ok = 'border-gray-300 focus:border-violet-500 dark:border-gray-700';
const err = 'border-red-400 focus:border-red-400';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterFields>({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<Partial<RegisterFields>>({});
  const [loading, setLoading] = useState(false);

  const set = (k: keyof RegisterFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    setErrors(p => ({ ...p, [k]: '' }));
  };

  // live password strength
  const strength = (() => {
    const p = form.password;
    if (!p) return null;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-emerald-500'];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateRegister(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await AuthService.register(form.name, form.email, form.password);
      toast.success('Account created — welcome!');
      navigate('/portofolio-editor');
    } catch (e: any) {
      toast.error(e.message ?? 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-cyan-50 px-4 py-12 dark:from-gray-950 dark:via-gray-950 dark:to-black">
      <AppHeader />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">

        <Link to="/" className="mb-8 block text-center">
          <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 bg-clip-text text-2xl font-black text-transparent dark:text-transparent">
            LUMA PORTFOLIO
          </span>
        </Link>

        <h1 className="mb-1 text-2xl font-extrabold text-slate-900 dark:text-white">Create your account</h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-violet-600 hover:underline dark:text-violet-400">Sign in</Link>
        </p>

        <form className="space-y-4" onSubmit={submit} noValidate>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
            <input type="text" value={form.name} onChange={set('name')} placeholder="John Doe"
              className={`${field} ${errors.name ? err : ok}`} />
            {errors.name && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.name}</p>}
          </div>

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
            {/* strength meter */}
            {strength !== null && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex flex-1 gap-1">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor[strength] : 'bg-gray-200 dark:bg-gray-700'}`} />
                  ))}
                </div>
                <span className="text-xs text-slate-500">{strengthLabel[strength]}</span>
              </div>
            )}
            {errors.password && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.password}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
            <input type="password" value={form.confirm} onChange={set('confirm')} placeholder="••••••••"
              className={`${field} ${errors.confirm ? err : ok}`} />
            {errors.confirm && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.confirm}</p>}
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 py-3 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl disabled:opacity-60">
            <UserPlus size={17} /> {loading ? 'Creating account…' : 'Create Account'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
