import { useTranslation } from 'react-i18next';

export default function UserManual() {
  const { t } = useTranslation();

  const sections = [
    {
      title: t('userManual.sec1'),
      items: [
        { key: 'accountSetup', label: t('userManual.items.accountSetup') },
        { key: 'dashboardOverview', label: t('userManual.items.dashboardOverview') },
        { key: 'firstAgent', label: t('userManual.items.firstAgent') },
        { key: 'dataSources', label: t('userManual.items.dataSources') },
      ],
    },
    {
      title: t('userManual.sec2'),
      items: [
        { key: 'agentTypes', label: t('userManual.items.agentTypes') },
        { key: 'taskDef', label: t('userManual.items.taskDef') },
        { key: 'triggers', label: t('userManual.items.triggers') },
        { key: 'permissions', label: t('userManual.items.permissions') },
      ],
    },
    {
      title: t('userManual.sec3'),
      items: [
        { key: 'workflowBuilder', label: t('userManual.items.workflowBuilder') },
        { key: 'monitoring', label: t('userManual.items.monitoring') },
        { key: 'userMgmt', label: t('userManual.items.userMgmt') },
        { key: 'auditLogs', label: t('userManual.items.auditLogs') },
      ],
    },
    {
      title: t('userManual.sec4'),
      items: [
        { key: 'restApi', label: t('userManual.items.restApi') },
        { key: 'webhooks', label: t('userManual.items.webhooks') },
        { key: 'cloudServices', label: t('userManual.items.cloudServices') },
        { key: 'customConnectors', label: t('userManual.items.customConnectors') },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
      <div
        className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
        style={{
          backgroundColor: 'rgba(249,115,22,0.1)',
          color: '#f97316',
          border: '1px solid rgba(249,115,22,0.3)',
        }}
      >
        {t('userManual.badge')}
      </div>
      <h1 className="text-4xl font-bold mb-4" style={{ color: '#f1f1f3' }}>
        {t('userManual.title')}
      </h1>
      <p className="text-lg mb-12" style={{ color: '#9ca3af' }}>
        {t('userManual.desc')}
      </p>
      <div className="grid sm:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="p-6 rounded-2xl"
            style={{ backgroundColor: '#1a1a1f', border: '1px solid #2a2a33' }}
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: '#f1f1f3' }}>
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li
                  key={item.key}
                  className="flex items-center gap-2 text-sm cursor-pointer transition-colors"
                  style={{ color: '#9ca3af' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f97316')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
