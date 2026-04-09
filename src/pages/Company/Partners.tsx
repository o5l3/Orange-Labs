import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const partners = [
  { name: '한일네트웍스', logo: '/images/partners/hanil_logo.png' },
  { name: '한일시멘트', logo: '/images/partners/hanil_logo.png' },
  { name: '효성ITX', logo: '/images/partners/hyosung_itx_logo.png' },
  { name: '크라운해태', logo: '/images/partners/crown_haetae_logo.png' },
  { name: 'U BASE', logo: '/images/partners/ubase_logo.png' },
  { name: 'SUN AT FOOD', logo: '/images/partners/sun_at_food_logo.png' },
  { name: '교보생명', logo: '/images/partners/kyobo_life_logo.png' },
  { name: '현대해상', logo: '/images/partners/hyundai_fire_logo.png' },
  {
    name: '부천도시공사',
    logo: '/images/partners/bucheon_environment_logo.png',
  },
  {
    name: '국립순천대학교',
    logo: '/images/partners/sunchon_national_university_logo.png',
  },
  { name: '유솔정보통신', logo: '/images/partners/yousol_logo.png' },
];

function PartnerCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        padding: '32px 24px',
        borderRadius: '16px',
        backgroundColor: '#1a1a1f',
        border: '1px solid #2a2a33',
        transition: 'border-color 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.4)';
        const img = e.currentTarget.querySelector('img') as HTMLImageElement | null;
        if (img) img.style.filter = 'none';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#2a2a33';
        const img = e.currentTarget.querySelector('img') as HTMLImageElement | null;
        if (img) img.style.filter = 'brightness(0) invert(1) opacity(0.4)';
      }}
    >
      <img
        src={logo}
        alt={name}
        style={{
          maxHeight: '52px',
          maxWidth: '140px',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          filter: 'brightness(0) invert(1) opacity(0.4)',
          transition: 'filter 0.2s',
        }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      <span
        style={{
          color: '#6b7280',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.03em',
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default function Partners() {
  const { t } = useTranslation();

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
              'radial-gradient(ellipse 50% 50% at 50% 30%, rgba(249,115,22,0.08) 0%, transparent 70%)',
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
            {t('partners.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
            {t('partners.title')}
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#9ca3af', lineHeight: '1.7' }}>
            {t('partners.desc')}
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {partners.map((p) => (
              <PartnerCard key={p.name} name={p.name} logo={p.logo} />
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: '#0e0e11' }}>
        <div
          className="max-w-3xl mx-auto rounded-2xl p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, #1a1a22 0%, #1f1520 100%)',
            border: '1px solid #2a2a36',
          }}
        >
          <div
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
            style={{
              backgroundColor: 'rgba(249,115,22,0.1)',
              color: '#f97316',
              border: '1px solid rgba(249,115,22,0.3)',
            }}
          >
            PARTNERSHIP
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#f1f1f3' }}>
            {t('partners.become_title')}
          </h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: '#9ca3af', lineHeight: '1.7' }}>
            {t('partners.become_desc')}
          </p>
          <Link
            to="/company/contact-us"
            className="inline-block px-8 py-3 rounded-full font-semibold transition-all"
            style={{ backgroundColor: '#f97316', color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6c0a')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
          >
            {t('partners.become_cta')}
          </Link>
        </div>
      </section>
    </div>
  );
}
