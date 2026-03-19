import { useState } from 'react';
import { buildApiUrl } from '../lib/api';

function Toast({ type = 'success', message = '', onClose }) {
  if (!message) return null;
  const color = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  return (
    <div className={`fixed bottom-4 right-4 text-white px-4 py-2 rounded shadow ${color}`} role="status" aria-live="polite">
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button onClick={onClose} className="underline">Close</button>
      </div>
    </div>
  );
}

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ type: 'success', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setToast({ type: 'error', message: 'Please fill all fields.' });
      return;
    }
    const emailOk = /.+@.+\..+/.test(email);
    if (!emailOk) {
      setToast({ type: 'error', message: 'Please enter a valid email.' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(buildApiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setName('');
      setEmail('');
      setMessage('');
      setToast({ type: 'success', message: 'Message sent successfully!' });
    } catch (err) {
      setToast({ type: 'error', message: err.message || 'Something went wrong.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="bg-gradient-to-b from-slate-50 via-white to-slate-100"
    >
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-googleBlue/80 uppercase">
            Contact
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-medium text-slate-900">
            Let&apos;s connect
          </h2>
          <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Share a few details and I&apos;ll get back to you, or reach out instantly on WhatsApp or
            a quick call.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-stretch">
          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl bg-white shadow-lg border border-slate-100 px-5 py-6 sm:px-8 sm:py-8 space-y-5"
            noValidate
          >
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-googleBlue/70 focus:ring-2 focus:ring-googleBlue/20"
                placeholder="Your name"
              />
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-googleBlue/70 focus:ring-2 focus:ring-googleBlue/20"
                placeholder="you@example.com"
              />
            </div>
            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-googleBlue/70 focus:ring-2 focus:ring-googleBlue/20"
                placeholder="Tell me about your project, ideas or questions..."
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full bg-googleBlue px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:shadow-md hover:bg-googleBlue/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
              <p className="text-[11px] text-slate-500">
                I usually reply within{' '}
                <span className="font-semibold text-slate-700">a few hours</span>.
              </p>
            </div>
          </form>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-slate-900 text-slate-50 px-6 py-7 sm:px-7 sm:py-8 shadow-xl">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-300">
                Direct contact
              </p>
              <h3 className="mt-3 text-2xl font-semibold">
                Prefer chatting instantly?
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Skip the form and reach me directly on WhatsApp or by a quick call. I&apos;m happy
                to talk about freelance work, internships, collaborations, or tech ideas.
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href="https://wa.me/919140149699"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl bg-emerald-500/95 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400"
                >
                  <span>
                    Chat on WhatsApp
                    <span className="block text-[11px] font-normal text-emerald-100/90">
                      +91 9140149699
                    </span>
                  </span>
                  <span className="text-lg transition group-hover:translate-x-0.5">↗</span>
                </a>
                <a
                  href="tel:+919140149699"
                  className="group flex items-center justify-between rounded-xl border border-slate-500/60 bg-slate-900/60 px-4 py-3 text-sm font-semibold text-slate-50 transition hover:border-emerald-400/80 hover:bg-slate-800"
                >
                  <span>
                    Call me
                    <span className="block text-[11px] font-normal text-slate-300/90">
                      +91 9140149699
                    </span>
                  </span>
                  <span className="text-lg transition group-hover:-translate-y-0.5">📞</span>
                </a>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-700/70 pt-4 text-[11px] text-slate-400">
              <p>
                Available most days between{' '}
                <span className="font-semibold text-slate-200">10:00–20:00 IST</span>. Feel free to
                drop a message anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toast type={toast.type} message={toast.message} onClose={() => setToast({ ...toast, message: '' })} />
    </section>
  );
}

