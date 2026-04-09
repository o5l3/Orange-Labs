import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactUs() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  const fields = [
    {
      id: 'name',
      label: t('contact.name'),
      type: 'text',
      placeholder: t('contact.namePlaceholder'),
    },
    {
      id: 'email',
      label: t('contact.workEmail'),
      type: 'email',
      placeholder: t('contact.emailPlaceholder'),
    },
    {
      id: 'company',
      label: t('contact.company'),
      type: 'text',
      placeholder: t('contact.companyPlaceholder'),
    },
  ];

  return (
    <div>
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* ── Left info ── */}
            <div>
              <div
                className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
                style={{
                  backgroundColor: 'rgba(249,115,22,0.1)',
                  color: '#f97316',
                  border: '1px solid rgba(249,115,22,0.3)',
                }}
              >
                {t('contact.badge')}
              </div>
              <h1 className="text-4xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
                {t('contact.title')}
              </h1>
              <p className="text-base leading-relaxed mb-10" style={{ color: '#9ca3af' }}>
                {t('contact.desc')}
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: '📧',
                    label: t('contact.email'),
                    value: import.meta.env.VITE_CONTACT_EMAIL || 'contact@orangelabs.io',
                  },
                  { icon: '🏢', label: t('contact.office'), value: 'Seoul, South Korea' },
                  { icon: '🕐', label: t('contact.hours'), value: t('contact.hoursVal') },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="text-xs font-semibold mb-0.5" style={{ color: '#6b7280' }}>
                        {item.label}
                      </div>
                      <div className="text-sm" style={{ color: '#d1d5db' }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Form ── */}
            <div
              className="p-8 rounded-2xl"
              style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
            >
              {/* Success state */}
              {status === 'success' && (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h2 className="text-xl font-bold mb-2" style={{ color: '#f1f1f3' }}>
                    {t('contact.success_title')}
                  </h2>
                  <p style={{ color: '#9ca3af' }}>{t('contact.success_desc')}</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-5 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      backgroundColor: 'rgba(249,115,22,0.12)',
                      color: '#f97316',
                      border: '1px solid rgba(249,115,22,0.3)',
                    }}
                  >
                    {t('contact.sendAnother')}
                  </button>
                </div>
              )}

              {/* Form */}
              {status !== 'success' && (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  {fields.map((field) => (
                    <div key={field.id}>
                      <label
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: '#d1d5db' }}
                      >
                        {field.label}
                      </label>
                      <input
                        name={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                        required
                        disabled={status === 'sending'}
                        className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all disabled:opacity-50"
                        style={{
                          backgroundColor: '#111114',
                          border: '1px solid #2a2a33',
                          color: '#f1f1f3',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#f97316')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      className="block text-sm font-medium mb-1.5"
                      style={{ color: '#d1d5db' }}
                    >
                      {t('contact.message')}
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder={t('contact.messagePlaceholder')}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      disabled={status === 'sending'}
                      className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all resize-none disabled:opacity-50"
                      style={{
                        backgroundColor: '#111114',
                        border: '1px solid #2a2a33',
                        color: '#f1f1f3',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#f97316')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
                    />
                  </div>

                  {/* Error message */}
                  {status === 'error' && (
                    <div
                      className="px-4 py-3 rounded-lg text-sm"
                      style={{
                        backgroundColor: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.3)',
                        color: '#f87171',
                      }}
                    >
                      {t('contact.error_desc')}
                    </div>
                  )}

                  {/* Hidden field: recipient */}
                  <input
                    type="hidden"
                    name="to_email"
                    value={import.meta.env.VITE_CONTACT_EMAIL || 'contact@orangelabs.io'}
                  />

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#f97316', color: '#fff' }}
                    onMouseEnter={(e) => {
                      if (status !== 'sending') e.currentTarget.style.backgroundColor = '#ea6c0a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f97316';
                    }}
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                          />
                        </svg>
                        {t('contact.sending')}
                      </>
                    ) : (
                      t('contact.send')
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
