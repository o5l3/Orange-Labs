import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const deptColors: Record<string, string> = {
  Engineering: '#3b82f6',
  Product: '#f97316',
  Sales: '#10b981',
  'Customer Success': '#a855f7',
};

export default function Careers() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const openings = [
    {
      title: t('careers.jobs.ai_engineer'),
      dept: t('careers.jobs.engineering'),
      location: 'Seoul / Remote',
      type: t('careers.fulltime'),
    },
    {
      title: t('careers.jobs.frontend'),
      dept: t('careers.jobs.engineering'),
      location: 'Seoul / Remote',
      type: t('careers.fulltime'),
    },
    {
      title: t('careers.jobs.backend'),
      dept: t('careers.jobs.engineering'),
      location: 'Seoul / Remote',
      type: t('careers.fulltime'),
    },
    {
      title: t('careers.jobs.pm'),
      dept: t('careers.jobs.product'),
      location: 'Seoul',
      type: t('careers.fulltime'),
    },
    {
      title: t('careers.jobs.sales'),
      dept: t('careers.jobs.salesDept'),
      location: 'Seoul / Remote',
      type: t('careers.fulltime'),
    },
    {
      title: t('careers.jobs.sa'),
      dept: t('careers.jobs.cs'),
      location: 'Seoul / Remote',
      type: t('careers.fulltime'),
    },
  ];

  const perks = [
    { icon: '🚀', title: t('careers.perks.work_title'), desc: t('careers.perks.work_desc') },
    { icon: '🏠', title: t('careers.perks.remote_title'), desc: t('careers.perks.remote_desc') },
    { icon: '📈', title: t('careers.perks.growth_title'), desc: t('careers.perks.growth_desc') },
    { icon: '💰', title: t('careers.perks.comp_title'), desc: t('careers.perks.comp_desc') },
    { icon: '🏥', title: t('careers.perks.health_title'), desc: t('careers.perks.health_desc') },
    {
      icon: '📚',
      title: t('careers.perks.learning_title'),
      desc: t('careers.perks.learning_desc'),
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section
        className="py-24 px-4 sm:px-6"
        style={{
          background: 'linear-gradient(135deg, #111114 0%, #1a1020 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 30%, rgba(249,115,22,0.1) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
            style={{
              backgroundColor: 'rgba(249,115,22,0.1)',
              color: '#f97316',
              border: '1px solid rgba(249,115,22,0.3)',
            }}
          >
            {t('careers.badge')}
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
            {t('careers.title_1')}
            <br />
            <span style={{ color: '#f97316' }}>{t('careers.title_2')}</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9ca3af', lineHeight: '1.7' }}>
            {t('careers.desc')}
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#0e0e11' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12" style={{ color: '#f1f1f3' }}>
            {t('careers.why')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="p-6 rounded-xl flex gap-4"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
              >
                <span className="text-2xl">{perk.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#f1f1f3' }}>
                    {perk.title}
                  </h3>
                  <p className="text-sm" style={{ color: '#9ca3af' }}>
                    {perk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-10" style={{ color: '#f1f1f3' }}>
            {t('careers.openings')}
          </h2>
          <div className="space-y-3">
            {openings.map((job) => (
              <div
                key={job.title}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl cursor-pointer transition-all gap-4"
                style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2a2a33')}
                onClick={() => navigate('/company/contact')}
              >
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: '#f1f1f3' }}>
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${deptColors[job.dept] ?? '#6b7280'}22`,
                        color: deptColors[job.dept] ?? '#6b7280',
                      }}
                    >
                      {job.dept}
                    </span>
                    <span className="text-xs" style={{ color: '#6b7280' }}>
                      {job.location}
                    </span>
                    <span className="text-xs" style={{ color: '#6b7280' }}>
                      {job.type}
                    </span>
                  </div>
                </div>
                <button
                  className="text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-all"
                  style={{
                    backgroundColor: 'rgba(249,115,22,0.1)',
                    color: '#f97316',
                    border: '1px solid rgba(249,115,22,0.3)',
                  }}
                >
                  {t('careers.apply')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 text-center" style={{ backgroundColor: '#0e0e11' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#f1f1f3' }}>
            {t('careers.noRole_title')}
          </h2>
          <p className="mb-8" style={{ color: '#9ca3af' }}>
            {t('careers.noRole_desc')}
          </p>
          <button
            className="px-6 py-3 rounded-full font-semibold transition-all"
            style={{ backgroundColor: '#f97316', color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6c0a')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
            onClick={() => navigate('/company/contact')}
          >
            {t('careers.contact')}
          </button>
        </div>
      </section>
    </div>
  );
}
