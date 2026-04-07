import { useTranslation } from 'react-i18next';

export default function Introduction() {
  const { t } = useTranslation();

  const sections = [
    { title: t('introduction.sec1_title'), content: t('introduction.sec1_desc') },
    { title: t('introduction.sec2_title'), content: t('introduction.sec2_desc') },
    { title: t('introduction.sec3_title'), content: t('introduction.sec3_desc') },
    { title: t('introduction.sec4_title'), content: t('introduction.sec4_desc') },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
      <div className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider" style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}>
        {t('introduction.badge')}
      </div>
      <h1 className="text-4xl font-bold mb-6" style={{ color: '#f1f1f3' }}>{t('introduction.title')}</h1>
      <p className="text-lg mb-10" style={{ color: '#9ca3af', lineHeight: '1.8' }}>
        {t('introduction.desc')}
      </p>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="p-8 rounded-2xl" style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}>
            <h2 className="text-xl font-semibold mb-3" style={{ color: '#f1f1f3' }}>{section.title}</h2>
            <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
