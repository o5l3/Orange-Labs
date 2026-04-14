import { useTranslation } from 'react-i18next';

const videos = [
  {
    id: '_75DoslS53E',
    titleKey: 'demoVideos.v1_title',
    descKey: 'demoVideos.v1_desc',
  },
  {
    id: 'RZbglZL2_S0',
    titleKey: 'demoVideos.v2_title',
    descKey: 'demoVideos.v2_desc',
  },
  {
    id: 'HoEHranuElA',
    titleKey: 'demoVideos.v3_title',
    descKey: 'demoVideos.v3_desc',
  },
  {
    id: 'kCUAEMbWCQc',
    titleKey: 'demoVideos.v4_title',
    descKey: 'demoVideos.v4_desc',
  },
  {
    id: '5J-9jUfGxN0',
    titleKey: 'demoVideos.v5_title',
    descKey: 'demoVideos.v5_desc',
  },
  {
    id: 'vNIcSwuc5YU',
    titleKey: 'demoVideos.v6_title',
    descKey: 'demoVideos.v6_desc',
  },
  {
    id: 'dHVHWXm4GEw',
    titleKey: 'demoVideos.v7_title',
    descKey: 'demoVideos.v7_desc',
  },
  {
    id: 'H2Xo2Lo0tR8',
    titleKey: 'demoVideos.v8_title',
    descKey: 'demoVideos.v8_desc',
  },
  {
    id: 'MvzAWeMsQMk',
    titleKey: 'demoVideos.v9_title',
    descKey: 'demoVideos.v9_desc',
  },
  {
    id: 'MAleJpfYgDI',
    titleKey: 'demoVideos.v10_title',
    descKey: 'demoVideos.v10_desc',
  },
];

export default function DemoVideos() {
  const { t } = useTranslation();

  return (
    <div>
      {/* ── 히어로 ── */}
      <section className="py-24 px-4 sm:px-6" style={{ backgroundColor: '#111114' }}>
        <div className="max-w-5xl mx-auto text-center">
          <div
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
            style={{
              backgroundColor: 'rgba(249,115,22,0.1)',
              color: '#f97316',
              border: '1px solid rgba(249,115,22,0.3)',
            }}
          >
            {t('nav.demoVideos')}
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#f1f1f3' }}>
            {t('nav.demoVideos')}
          </h1>
          <p className="text-base" style={{ color: '#9ca3af' }}>
            {t('demoVideos.pageDesc')}
          </p>
        </div>
      </section>

      {/* ── 영상 목록 ── */}
      <section className="pb-20 px-4 sm:px-6" style={{ backgroundColor: '#0e0e11' }}>
        <div className="max-w-5xl mx-auto space-y-16">
          {videos.map((video) => (
            <div
              key={video.id}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid #2a2a33' }}
            >
              {/* YouTube embed */}
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={t(video.titleKey)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              </div>

              {/* 제목 + 설명 */}
              <div className="p-6" style={{ backgroundColor: '#2a2a32' }}>
                <h2 className="text-xl font-bold mb-3" style={{ color: '#f1f1f3' }}>
                  {t(video.titleKey)}
                </h2>
                <p
                  className="text-sm leading-relaxed whitespace-pre-line"
                  style={{ color: '#9ca3af' }}
                >
                  {t(video.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
