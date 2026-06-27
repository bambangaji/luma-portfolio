// AES-GCM encryption using the built-in Web Crypto API.
// Key is derived from a shared secret via PBKDF2.

const SECRET = import.meta.env.VITE_CRYPTO_SECRET ?? 'luma-default-secret-2026';
const SALT = new TextEncoder().encode('luma-salt-v1');

async function getKey(): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SECRET),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: SALT, iterations: 100_000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encrypt(data: object): Promise<string> {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(JSON.stringify(data));
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  // pack iv + ciphertext → base64
  const buf = new Uint8Array(iv.byteLength + cipher.byteLength);
  buf.set(iv, 0);
  buf.set(new Uint8Array(cipher), iv.byteLength);
  return btoa(String.fromCharCode(...buf));
}

export async function decrypt<T = unknown>(payload: string): Promise<T> {
  const key = await getKey();
  const buf = Uint8Array.from(atob(payload), c => c.charCodeAt(0));
  const iv = buf.slice(0, 12);
  const cipher = buf.slice(12);
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher);
  return JSON.parse(new TextDecoder().decode(plain)) as T;
}
