import { useTranslation } from 'react-i18next';

export default function UserManual() {
  const { t } = useTranslation();

  const managerSections = [
    { icon: '📊', key: 'dashboard' },
    { icon: '🖥',  key: 'node' },
    { icon: '⚠️', key: 'symptom' },
    { icon: '📈', key: 'load' },
    { icon: '📅', key: 'daily' },
    { icon: '⌨️', key: 'command' },
    { icon: '📄', key: 'report' },
    { icon: '🔧', key: 'rule' },
    { icon: '🏢', key: 'org' },
    { icon: '⚙️', key: 'setting' },
  ];

  const agentCards = [
    { icon: '📥', key: 'install' },
    { icon: '🔄', key: 'update' },
    { icon: '🗑️', key: 'delete' },
    { icon: '🔍', key: 'detect' },
    { icon: '🔔', key: 'tray' },
  ];

  const equipRows: [string, string, string, string][] = [
    ['equip_cpu',    'Intel N100 (4C4T) ×1',          'Intel Xeon E-224G (4C4T) 3.5GHz', 'Intel Xeon 4208 (8C16T) 2.10GHz'],
    ['equip_memory', '8 GB+',                          '16 GB+',                          '32 GB+'],
    ['equip_ssd',    '256 GB+',                        '1 TB+',                           '2 TB+'],
    ['equip_hdd',    '—',                              '1 TB+',                           '2 TB+'],
    ['equip_agents', '1 ~ 100',                        '1,000+',                          '5,000+'],
  ];


  const firewallRows: [string, string, string, string][] = [
    ['fw_agent', 'fw_server', 'TCP / 3181',  'RESTAPI (SSL)'],
    ['fw_agent', 'fw_server', 'TCP / 3182',  'TCP Keep-Alive (SSL)'],
    ['fw_agent', 'fw_server', 'TCP / 443',   'Update (SSL)'],
    ['fw_admin', 'fw_server', 'TCP / 3181',  'RESTAPI'],
    ['fw_admin', 'fw_server', 'TCP / 3183',  'WebSocket (SSL)'],
    ['fw_admin', 'fw_server', 'TCP / 443',   'Manager Web (SSL)'],
    ['fw_admin', 'fw_server', 'TCP / 50022', 'SSH'],
  ];

  const cardBase = { backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' };
  const headerRow = { backgroundColor: '#16161a' };
  const cellBorder = { borderLeft: '1px solid #2a2a33' };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">

      {/* ── Hero ── */}
      <div
        className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
        style={{ backgroundColor: 'rgba(249,115,22,0.1)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' }}
      >
        {t('userManual.badge')}
      </div>
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <h1 className="text-4xl font-bold" style={{ color: '#f1f1f3' }}>
          {t('userManual.title')}
        </h1>
        <span
          className="px-2 py-0.5 text-xs font-semibold rounded"
          style={{ backgroundColor: 'rgba(249,115,22,0.15)', color: '#f97316' }}
        >
          ver 1.6
        </span>
      </div>
      <p className="text-lg mb-6" style={{ color: '#9ca3af', lineHeight: '1.8' }}>
        {t('userManual.desc')}
      </p>

      {/* ── Download Button ── */}
      <div className="mb-16">
        <a
          href="/pdf/OrangeTheClient_Manual.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 rounded-full font-semibold transition-all"
          style={{ backgroundColor: '#f97316', color: '#fff' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ea6c0a')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f97316')}
        >
          {t('userManual.download_btn')}
        </a>
      </div>

      {/* ── Table of Contents ── */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#f1f1f3' }}>
        {t('userManual.toc_title')}
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        {(['overview', 'server', 'manager', 'agent'] as const).map((key, i) => (
          <div key={key} className="p-6 rounded-xl" style={cardBase}>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: 'rgba(249,115,22,0.15)', color: '#f97316' }}
              >
                {i + 1}
              </span>
              <h3 className="font-bold text-lg leading-tight" style={{ color: '#f1f1f3' }}>
                {t(`userManual.toc_${key}_title`)}
              </h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
              {t(`userManual.toc_${key}_desc`)}
            </p>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
          Ch 1 — 개요
      ══════════════════════════════════════ */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-black" style={{ color: '#f97316' }}>1</span>
        <h2 className="text-2xl font-bold" style={{ color: '#f1f1f3' }}>
          {t('userManual.toc_overview_title')}
        </h2>
      </div>
      <div className="p-6 rounded-xl mb-16" style={cardBase}>
        <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
          {t('userManual.overview_desc')}
        </p>
      </div>

      {/* ══════════════════════════════════════
          Ch 2 — 서버 운영 환경
      ══════════════════════════════════════ */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl font-black" style={{ color: '#f97316' }}>2</span>
        <h2 className="text-2xl font-bold" style={{ color: '#f1f1f3' }}>
          {t('userManual.toc_server_title')}
        </h2>
      </div>

      {/* Equipment Table */}
      <h3 className="text-lg font-semibold mb-3" style={{ color: '#f1f1f3' }}>
        {t('userManual.equip_title')}
      </h3>
      <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid #2a2a33' }}>
        <div className="grid grid-cols-4 text-sm font-semibold" style={headerRow}>
          <div className="p-3" style={{ color: '#9ca3af' }}>{t('userManual.equip_category')}</div>
          <div className="p-3" style={{ color: '#9ca3af', ...cellBorder }}>TC100</div>
          <div className="p-3" style={{ color: '#9ca3af', ...cellBorder }}>TC1000</div>
          <div className="p-3 font-bold" style={{ color: '#f97316', ...cellBorder, backgroundColor: 'rgba(249,115,22,0.08)' }}>
            TC10000
          </div>
        </div>
        {equipRows.map(([key, v1, v2, v3], i) => (
          <div
            key={key}
            className="grid grid-cols-4"
            style={{ backgroundColor: i % 2 === 0 ? '#1a1a1f' : '#16161a', borderTop: '1px solid #2a2a33' }}
          >
            <div className="p-3 text-sm font-semibold" style={{ color: '#f1f1f3' }}>{t(`userManual.${key}`)}</div>
            <div className="p-3 text-sm" style={{ color: '#9ca3af', ...cellBorder }}>{v1}</div>
            <div className="p-3 text-sm" style={{ color: '#9ca3af', ...cellBorder }}>{v2}</div>
            <div className="p-3 text-sm" style={{ color: '#d1d5db', ...cellBorder, backgroundColor: 'rgba(249,115,22,0.06)' }}>
              {v3}
            </div>
          </div>
        ))}
      </div>

      {/* Network */}
      <h3 className="text-lg font-semibold mb-3" style={{ color: '#f1f1f3' }}>
        {t('userManual.network_title')}
      </h3>
      <div className="p-6 rounded-xl mb-6" style={cardBase}>
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#9ca3af' }}>
          {t('userManual.network_desc')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {['Server IP (static)', 'Subnet', 'Gateway', 'DNS'].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm">
              <span style={{ color: '#f97316' }}>▸</span>
              <span style={{ color: '#d1d5db' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Firewall */}
      <h3 className="text-lg font-semibold mb-3" style={{ color: '#f1f1f3' }}>
        {t('userManual.firewall_title')}
      </h3>
      <div className="rounded-xl overflow-hidden mb-16" style={{ border: '1px solid #2a2a33' }}>
        <div className="grid grid-cols-4 text-sm font-semibold" style={headerRow}>
          <div className="p-3" style={{ color: '#9ca3af' }}>{t('userManual.fw_src')}</div>
          <div className="p-3" style={{ color: '#9ca3af', ...cellBorder }}>{t('userManual.fw_dest')}</div>
          <div className="p-3" style={{ color: '#9ca3af', ...cellBorder }}>Service</div>
          <div className="p-3" style={{ color: '#9ca3af', ...cellBorder }}>{t('userManual.fw_note')}</div>
        </div>
        {firewallRows.map(([srcKey, destKey, svc, note], i) => (
          <div
            key={i}
            className="grid grid-cols-4"
            style={{ backgroundColor: i % 2 === 0 ? '#1a1a1f' : '#16161a', borderTop: '1px solid #2a2a33' }}
          >
            <div className="p-3 text-sm font-medium" style={{ color: '#f1f1f3' }}>{t(`userManual.${srcKey}`)}</div>
            <div className="p-3 text-sm" style={{ color: '#9ca3af', ...cellBorder }}>{t(`userManual.${destKey}`)}</div>
            <div className="p-3 text-sm font-mono font-semibold" style={{ color: '#f97316', ...cellBorder }}>{svc}</div>
            <div className="p-3 text-sm" style={{ color: '#9ca3af', ...cellBorder }}>{note}</div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
          Ch 3 — 매니저
      ══════════════════════════════════════ */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl font-black" style={{ color: '#f97316' }}>3</span>
        <h2 className="text-2xl font-bold" style={{ color: '#f1f1f3' }}>
          {t('userManual.toc_manager_title')}
        </h2>
      </div>

      {/* Access & Login */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="p-6 rounded-xl" style={cardBase}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl">🌐</span>
            <h3 className="font-bold" style={{ color: '#f97316' }}>{t('userManual.manager_access_title')}</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
            {t('userManual.manager_access_desc')}
          </p>
        </div>
        <div className="p-6 rounded-xl" style={cardBase}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl">🔐</span>
            <h3 className="font-bold" style={{ color: '#f97316' }}>{t('userManual.manager_login_title')}</h3>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
            {t('userManual.manager_login_desc')}
          </p>
        </div>
      </div>

      {/* Manager Sections Grid */}
      <h3 className="text-lg font-semibold mb-4" style={{ color: '#f1f1f3' }}>
        {t('userManual.manager_sections_title')}
      </h3>
      <div className="grid sm:grid-cols-2 gap-3 mb-16">
        {managerSections.map(({ icon, key }) => (
          <div key={key} className="p-5 rounded-xl flex gap-3" style={cardBase}>
            <span className="text-lg mt-0.5 shrink-0">{icon}</span>
            <div>
              <h4 className="font-semibold text-sm mb-1" style={{ color: '#f1f1f3' }}>
                {t(`userManual.manager_sec_${key}_title`)}
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#9ca3af' }}>
                {t(`userManual.manager_sec_${key}_desc`)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════
          Ch 4 — 에이전트
      ══════════════════════════════════════ */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl font-black" style={{ color: '#f97316' }}>4</span>
        <h2 className="text-2xl font-bold" style={{ color: '#f1f1f3' }}>
          {t('userManual.toc_agent_title')}
        </h2>
      </div>
      <p className="text-sm leading-relaxed mb-6" style={{ color: '#9ca3af' }}>
        {t('userManual.agent_intro')}
      </p>

      {/* Agent Spec Table */}
      <h3 className="text-lg font-semibold mb-3" style={{ color: '#f1f1f3' }}>
        {t('introduction.specs_title')}
      </h3>
      <div className="rounded-xl overflow-hidden mb-8" style={{ border: '1px solid #2a2a33' }}>
        {/* Header */}
        <div className="grid grid-cols-3 text-sm font-semibold" style={headerRow}>
          <div className="p-3" style={{ color: '#9ca3af' }}>
            {t('introduction.specs_category')}
          </div>
          <div className="p-3 text-left" style={{ color: '#9ca3af', ...cellBorder }}>
            {t('introduction.specs_min')}
          </div>
          <div
            className="p-3 text-left font-bold"
            style={{ color: '#f97316', ...cellBorder, backgroundColor: 'rgba(249,115,22,0.08)' }}
          >
            {t('introduction.specs_rec')}
          </div>
        </div>
        {/* Rows */}
        {(['os', 'cpu', 'ram', 'disk', 'network'] as const).map((row, i) => (
          <div
            key={row}
            className="grid grid-cols-3"
            style={{
              backgroundColor: i % 2 === 0 ? '#1a1a1f' : '#16161a',
              borderTop: '1px solid #2a2a33',
            }}
          >
            <div className="p-3 text-sm font-semibold" style={{ color: '#f1f1f3' }}>
              {t(`introduction.specs_${row}`)}
            </div>
            <div className="p-3 text-sm" style={{ color: '#9ca3af', ...cellBorder }}>
              {t(`introduction.specs_${row}_min`)}
            </div>
            <div
              className="p-3 text-sm"
              style={{ color: '#d1d5db', ...cellBorder, backgroundColor: 'rgba(249,115,22,0.06)' }}
            >
              {t(`introduction.specs_${row}_rec`)}
            </div>
          </div>
        ))}
      </div>

      {/* Agent Feature Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {agentCards.map(({ icon, key }) => (
          <div key={key} className="p-5 rounded-xl flex gap-3" style={cardBase}>
            <span className="text-xl mt-0.5 shrink-0">{icon}</span>
            <div>
              <h4 className="font-semibold mb-1" style={{ color: '#f1f1f3' }}>
                {t(`userManual.agent_${key}_title`)}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>
                {t(`userManual.agent_${key}_desc`)}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
