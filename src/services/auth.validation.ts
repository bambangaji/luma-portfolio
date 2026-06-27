export interface LoginFields  { email: string; password: string }
export interface RegisterFields extends LoginFields { name: string; confirm: string }

type Errors<T> = Partial<Record<keyof T, string>>;

export function validateLogin(f: LoginFields): Errors<LoginFields> {
  const e: Errors<LoginFields> = {};
  if (!f.email)                            e.email    = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(f.email)) e.email    = 'Enter a valid email';
  if (!f.password)                         e.password = 'Password is required';
  else if (f.password.length < 8)          e.password = 'Password must be at least 8 characters';
  return e;
}

export function validateRegister(f: RegisterFields): Errors<RegisterFields> {
  const e: Errors<RegisterFields> = { ...validateLogin(f) };
  if (!f.name || f.name.trim().length < 2)   e.name    = 'Name must be at least 2 characters';
  if (!f.confirm)                             e.confirm = 'Please confirm your password';
  else if (f.confirm !== f.password)          e.confirm = 'Passwords do not match';
  return e;
}
