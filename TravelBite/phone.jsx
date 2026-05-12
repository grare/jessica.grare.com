// phone.jsx — TravelBite custom Android-ish device frame (warm cozy themed)

function Phone({ children, dark, label }) {
  return (
    <div style={{
      width: 360,
      height: 760,
      borderRadius: 36,
      padding: 6,
      background: dark ? '#0a0805' : '#3b2a1c',
      boxShadow: '0 30px 60px rgba(40,20,8,0.35), inset 0 0 0 1px rgba(255,255,255,0.05)',
      position: 'relative',
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: 30,
        overflow: 'hidden',
        background: 'var(--paper)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }} className="paper-bg" data-theme={dark ? 'dark' : 'light'}>
        {children}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="status-bar" style={{ flexShrink: 0, paddingTop: 4 }}>
      <div>9:30</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11 }}>
        <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 9a7 7 0 0 1 12 0M3 7a4.5 4.5 0 0 1 8 0M5 5a2 2 0 0 1 4 0" stroke="currentColor" fill="none" strokeWidth="1.4" strokeLinecap="round"/></svg>
        <svg width="14" height="10" viewBox="0 0 14 10"><rect x="0.5" y="2" width="11" height="6" rx="1" stroke="currentColor" fill="none" strokeWidth="1"/><rect x="2" y="3.5" width="7" height="3" fill="currentColor"/><rect x="12" y="4" width="1.5" height="2" fill="currentColor"/></svg>
      </div>
    </div>
  );
}

function NavPill() {
  return <div className="nav-pill" style={{ flexShrink: 0 }} />;
}

// Standard screen wrapper — status bar, content (scroll), tab bar (optional), nav pill
function Screen({ children, tabs, activeTab, onTab, noTabs, hideStatus }) {
  return (
    <>
      {!hideStatus && <StatusBar />}
      <div className="scroll-area" style={{ flex: 1, position: 'relative' }}>
        {children}
      </div>
      {!noTabs && <TabBar active={activeTab} onTab={onTab} />}
      <NavPill />
    </>
  );
}

function TabBar({ active, onTab, showSpec }) {
  const tabs = [
    { id: 'home', icon: 'nav-home', label: 'Home' },
    { id: 'pantry', icon: 'nav-pantry', label: 'Pantry' },
    { id: 'recipes', icon: 'nav-recipes', label: 'Recipes' },
    { id: 'learn', icon: 'nav-learn', label: 'Learn' },
    { id: 'me', icon: 'nav-me', label: 'Me' },
  ];
  return (
    <div className="tab-bar" style={{ flexShrink: 0, position: 'relative' }}>
      {tabs.map(t => (
        <button key={t.id} className={'tab' + (active === t.id ? ' active' : '')} onClick={() => onTab && onTab(t.id)} style={{ position: 'relative' }}>
          <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22 }}>
            <Icon name={t.icon} size={22} strokeWidth={active === t.id ? 1.9 : 1.5} />
          </span>
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

Object.assign(window, { Phone, StatusBar, NavPill, Screen, TabBar });
