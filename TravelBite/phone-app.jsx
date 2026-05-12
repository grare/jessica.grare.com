// Shared PhoneApp component — used by TravelBite.html (canvas) and export.html (one-screen export).
// Exposes ONBOARDING_FLOW, APP_FLOW, SCREEN_ORDER, PhoneApp on window so any sibling
// <script type="text/babel"> can pick them up.

const ONBOARDING_FLOW = [
  { id: 'onboarding1', label: '01 · Welcome', flow: 'onboarding' },
  { id: 'onboarding2', label: '02 · Pantry permission', flow: 'onboarding' },
  { id: 'onboarding3', label: '03 · Taste profile', flow: 'onboarding' },
];
const APP_FLOW = [
  { id: 'home',     label: '01 · Home / Logbook' },
  { id: 'pantry',   label: '02 · Pantry' },
  { id: 'matches',  label: '03 · Recipes hub' },
  { id: 'cook',     label: '04 · Cook (scroll)' },
  { id: 'learn',    label: '05 · Learn (Spices)' },
  { id: 'spice',    label: '06 · Spice card' },
  { id: 'import',   label: '07 · Import recipe' },
  { id: 'me',       label: '08 · Me' },
];
const SCREEN_ORDER = [...ONBOARDING_FLOW, ...APP_FLOW];

function PhoneApp({ initialScreen, dark, setDark, embedded, showSpec }) {
  // History stack — every navigation pushes; goBack pops to previous tab-level screen.
  const [stack, setStack] = React.useState([initialScreen || 'home']);
  const screen = stack[stack.length - 1];
  const [recipe, setRecipe] = React.useState(RECIPES[0]);
  const [spice, setSpice] = React.useState(SPICES.find(s => s.id === 'staranise'));
  const [importOpen, setImportOpen] = React.useState(initialScreen === 'import');
  // Recipe notes, keyed by recipe id, persisted in localStorage so they survive reloads
  const [notes, setNotes] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('tb_notes') || '{}'); } catch { return {}; }
  });
  const setNoteFor = (id, text) => {
    setNotes(prev => {
      const next = { ...prev };
      if (text && text.trim()) next[id] = text.trim();
      else delete next[id];
      try { localStorage.setItem('tb_notes', JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const TAB_LEVEL = ['home', 'pantry', 'matches', 'learn', 'me'];

  const go = (s, payload) => {
    if (s === 'recipe') s = 'cook';
    if (s === 'cook' && payload) setRecipe(payload);
    if (s === 'spice' && payload) setSpice(payload);
    if (s === 'import') { setImportOpen(true); return; }
    setStack(st => {
      if (TAB_LEVEL.includes(s)) return [s];
      return [...st, s];
    });
  };

  const goBack = () => {
    setStack(st => st.length > 1 ? st.slice(0, -1) : ['home']);
  };

  const tabFor = (s) => ({
    home: 'home', pantry: 'pantry', matches: 'recipes',
    cook: 'recipes',
    learn: 'learn', spice: 'learn',
    me: 'me',
  })[s] || 'home';

  const onTab = (id) => {
    const map = { home: 'home', pantry: 'pantry', recipes: 'matches', learn: 'learn', me: 'me' };
    setStack([map[id]]);
  };

  let body, hideTabs = false, hideNav = false;
  switch (screen) {
    case 'onboarding1': body = <OnboardingScreen1 go={go} />; hideTabs = true; hideNav = true; break;
    case 'onboarding2': body = <OnboardingScreen2 go={go} />; hideTabs = true; hideNav = true; break;
    case 'onboarding3': body = <OnboardingScreen3 go={go} />; hideTabs = true; hideNav = true; break;
    case 'home':     body = <HomeScreen go={go} />; break;
    case 'pantry':   body = <PantryScreen go={go} />; break;
    case 'matches':  body = <MatchesScreen go={go} goBack={goBack} />; break;
    case 'cook':     body = <CookScreen go={go} goBack={goBack} recipe={recipe} note={notes[recipe.id]} onSaveNote={(t) => setNoteFor(recipe.id, t)} />; break;
    case 'learn':    body = <LearnScreen go={go} />; break;
    case 'spice':    body = <SpiceScreen go={go} goBack={goBack} spice={spice} />; break;
    case 'me':       body = <MeScreen go={go} dark={dark} setDark={setDark} showSpec={showSpec} />; break;
    default:         body = <HomeScreen go={go} />;
  }

  return (
    <Phone dark={dark}>
      <StatusBar />
      <div className="scroll-area" style={{ flex: 1, position: 'relative' }}>
        {body}
        {importOpen && <ImportSheet onClose={() => setImportOpen(false)} go={(s, p) => { setImportOpen(false); go(s, p); }} />}
      </div>
      {!hideTabs && <TabBar active={tabFor(screen)} onTab={onTab} showSpec={showSpec} />}
      {!hideNav && <NavPill />}
    </Phone>
  );
}

Object.assign(window, { ONBOARDING_FLOW, APP_FLOW, SCREEN_ORDER, PhoneApp });
