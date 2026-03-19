import { useState } from 'react';
import { buildApiUrl } from '../../lib/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(buildApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      window.location.href = '/admin/dashboard';
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-white">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-gray-100 rounded p-6 bg-white">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
        <div className="mt-4">
          <label htmlFor="username" className="block text-sm font-medium">Username</label>
          <input id="username" className="mt-1 w-full rounded border border-gray-300 px-3 py-2" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input id="password" type="password" className="mt-1 w-full rounded border border-gray-300 px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={loading} className="mt-6 w-full px-4 py-2 rounded bg-googleBlue text-white hover:opacity-90 disabled:opacity-50">
          {loading ? 'Logging in…' : 'Login'}
        </button>
      </form>
    </main>
  );
}

