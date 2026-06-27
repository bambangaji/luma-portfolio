import { encrypt, decrypt } from './crypto.service';

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export interface AuthResponse {
  token: string;
  user: { id: string; name: string; email: string };
}

async function post<T>(path: string, body: object): Promise<T> {
  const payload = await encrypt(body);
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.message ?? 'Request failed');
  // Server returns { payload: '<encrypted>' }
  return decrypt<T>(json.payload);
}

export const AuthService = {
  login: (email: string, password: string) =>
    post<AuthResponse>('/auth/login', { email, password }),

  register: (name: string, email: string, password: string) =>
    post<AuthResponse>('/auth/register', { name, email, password }),
};
