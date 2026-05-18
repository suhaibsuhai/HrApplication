import { useMemo, useState } from 'react';
import { Header } from '../shared/components/layout/Header.jsx';
import { Sidebar } from '../shared/components/layout/Sidebar.jsx';
import { PageShell } from '../shared/components/layout/PageShell.jsx';
import { moduleRegistry } from './config/moduleRegistry.js';

export function App() {
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState('dashboard');

  const activeModule = useMemo(
    () => moduleRegistry.find((module) => module.id === activeModuleId) ?? moduleRegistry[0],
    [activeModuleId],
  );

  const ActiveModuleComponent = activeModule.component;

  return (
    <div className={`app-shell${navCollapsed ? ' nav-collapsed' : ''}`}>
      <Header />
      <div className="app-body">
        <Sidebar
          activeModuleId={activeModule.id}
          collapsed={navCollapsed}
          modules={moduleRegistry}
          onModuleChange={setActiveModuleId}
          onToggle={() => setNavCollapsed((value) => !value)}
        />
        <PageShell eyebrow={activeModule.group} title={activeModule.label} description={activeModule.description}>
          <ActiveModuleComponent />
        </PageShell>
      </div>
    </div>
  );
}
