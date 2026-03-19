import { useEffect, useState } from 'react';
import ProjectForm from '../../components/Admin/ProjectForm';
import { buildApiUrl } from '../../lib/api';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      window.location.href = '/admin';
      return;
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(buildApiUrl('/api/projects'));
      if (!res.ok) throw new Error('Failed to load projects');
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : data.projects || []);
    } catch (e) {
      setError(e.message || 'Error loading projects');
    } finally {
      setLoading(false);
    }
  }

  async function create(payload) {
    setSubmitting(true);
    try {
      const res = await fetch(buildApiUrl('/api/projects'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to create');
      await load();
      setEditing(null);
    } catch (e) { setError(e.message || 'Error'); }
    finally { setSubmitting(false); }
  }

  async function update(id, payload) {
    setSubmitting(true);
    try {
      const res = await fetch(buildApiUrl(`/api/projects/${id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update');
      await load();
      setEditing(null);
    } catch (e) { setError(e.message || 'Error'); }
    finally { setSubmitting(false); }
  }

  async function remove(id) {
    if (!confirm('Delete this project?')) return;
    try {
      const res = await fetch(buildApiUrl(`/api/projects/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status !== 204) throw new Error('Failed to delete');
      await load();
    } catch (e) { setError(e.message || 'Error'); }
  }

  function startEdit(p) {
    setEditing(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/admin';
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <button onClick={logout} className="px-3 py-1.5 rounded border border-gray-200 hover:border-gray-300">Logout</button>
        </div>

        {error && <p className="mt-3 text-red-600">{error}</p>}

        <section className="mt-6">
          <h2 className="text-xl font-medium">{editing ? 'Edit Project' : 'Create Project'}</h2>
          <div className="mt-3 border border-gray-100 rounded p-4">
            <ProjectForm
              initial={editing}
              submitting={submitting}
              onSubmit={(payload) => (editing ? update(editing._id, payload) : create(payload))}
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-medium">Projects</h2>
          {loading ? (
            <p className="mt-3 text-gray-600">Loading…</p>
          ) : (
            <div className="mt-3 grid sm:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div key={p._id} className="border border-gray-100 rounded p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-sm text-gray-600">{p.description}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(p)} className="px-3 py-1.5 text-sm rounded border border-gray-200 hover:border-gray-300">Edit</button>
                      <button onClick={() => remove(p._id)} className="px-3 py-1.5 text-sm rounded bg-red-600 text-white hover:opacity-90">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

