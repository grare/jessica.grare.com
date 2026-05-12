// screens-a.jsx — Home, Pantry, Matches, Recipe Detail, Cook Mode

// ───────── HOME / LOGBOOK ─────────
// Greetings rotate every time the user opens the app — a small ritual that
// keeps the home screen feeling like a journey. Pulled from a fixed pool;
// each open advances by one (mod length) so the rotation is observable.
const GREETINGS = [
  { hi: 'Buongiorno',  from: 'Italy' },
  { hi: 'Bonjour',     from: 'France' },
  { hi: 'Hola',        from: 'Spain' },
  { hi: 'Konnichiwa',  from: 'Japan' },
  { hi: 'Namaste',     from: 'India' },
  { hi: 'Sawasdee',    from: 'Thailand' },
  { hi: 'Merhaba',     from: 'Türkiye' },
  { hi: 'Salaam',      from: 'Lebanon' },
  { hi: 'Annyeong',    from: 'Korea' },
  { hi: 'Olá',         from: 'Brazil' },
  { hi: 'Hej',         from: 'Sweden' },
  { hi: 'Jambo',       from: 'Kenya' },
  { hi: 'Shalom',      from: 'Israel' },
  { hi: 'Xin chào',    from: 'Vietnam' },
  { hi: 'Guten Tag',   from: 'Germany' },
];
function useRotatingGreeting() {
  // Advance once per app-open. Stored in localStorage; bumped on first mount.
  return React.useMemo(() => {
    let idx = 0;
    try {
      const stored = parseInt(localStorage.getItem('tb_greet_idx') || '-1', 10);
      idx = (isNaN(stored) ? -1 : stored) + 1;
      if (idx >= GREETINGS.length) idx = 0;
      localStorage.setItem('tb_greet_idx', String(idx));
    } catch { idx = Math.floor(Math.random() * GREETINGS.length); }
    return GREETINGS[idx];
  }, []);
}

function HomeScreen({ go }) {
  const greeting = useRotatingGreeting();
  return (
    <div style={{ padding: '8px 22px 20px' }}>
      <div style={{ marginTop: 6 }}>
        <div className="eyebrow">Logbook</div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div className="script-note" style={{ marginBottom: 4 }}>{greeting.hi}, Maya —</div>
        <h1 className="h1">Where shall we<br/>cook tonight?</h1>
      </div>

      {/* Pantry suggests card */}
      <div className="card" style={{ marginTop: 22, padding: 18, position: 'relative', overflow: 'hidden' }}>
        <div className="tape" style={{ top: -8, left: 30, transform: 'rotate(-4deg)' }} />
        <div className="eyebrow" style={{ color: 'var(--terracotta)' }}>Today, from your pantry</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 10, alignItems: 'flex-end' }}>
          <div className="food-photo" style={{ width: 86, height: 86, flexShrink: 0, backgroundImage: `url(${RECIPES.find(r => r.id === 'shakshuka').photo})` }} />
          <div style={{ flex: 1 }}>
            <h2 className="h2" style={{ fontSize: 22 }}>Shakshuka</h2>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Tunisia · 30 min</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, alignItems: 'center' }}>
              <div style={{ height: 4, flex: 1, background: 'var(--paper-3)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: '94%', height: '100%', background: 'var(--terracotta)' }} />
              </div>
              <span className="mono" style={{ fontSize: 10, fontWeight: 700, color: 'var(--terracotta)' }}>94%</span>
            </div>
          </div>
        </div>
        <button className="btn-primary" style={{ width: '100%', marginTop: 14 }} onClick={() => go('recipe', RECIPES[0])}>
          Cook this →
        </button>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 22 }}>
        <button className="card" style={{ padding: 14, textAlign: 'left', cursor: 'pointer' }} onClick={() => go('import')}>
          <Icon name="link" size={20} />
          <div style={{ marginTop: 6, fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Import recipe</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>TikTok · IG · Pinterest · web</div>
        </button>
        <button className="card" style={{ padding: 14, textAlign: 'left', cursor: 'pointer', background: 'var(--terracotta)', color: 'var(--paper)', borderColor: 'var(--terracotta)' }} onClick={() => go('matches')}>
          <Icon name="compass" size={20} stroke="var(--paper)" />
          <div style={{ marginTop: 6, fontSize: 13, fontWeight: 600 }}>Explore unstamped</div>
          <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>Recipes from new places</div>
        </button>
      </div>

      {/* View my recipes */}
      <button
        onClick={() => go('matches')}
        style={{
          width: '100%', marginTop: 18,
          background: 'transparent',
          border: '1px dashed var(--ink-3)',
          borderRadius: 100,
          padding: '12px 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
          color: 'var(--ink)',
        }}>
        View my recipes
        <Icon name="arrow-right" size={15} />
      </button>

      {/* Recommended */}
      <div style={{ marginTop: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div className="eyebrow">From your last trip · Italy</div>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }} className="scroll-area">
          {RECIPES.filter(r => ['ribollita', 'shakshuka', 'pho'].includes(r.id)).map(r => (
            <div key={r.id} className="card" style={{ width: 160, flexShrink: 0, padding: 10, cursor: 'pointer' }} onClick={() => go('recipe', r)}>
              <div className={r.photo ? 'food-photo' : 'food-ph'} data-label={r.id} style={{ width: '100%', height: 110, backgroundImage: r.photo ? `url(${r.photo})` : undefined }} />
              <div className="h3" style={{ fontSize: 16, marginTop: 8 }}>{r.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{r.origin}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────── PANTRY ─────────
function PantryScreen({ go }) {
  const [items, setItems] = React.useState(PANTRY);
  const [tab, setTab] = React.useState('all');
  const [addMode, setAddMode] = React.useState(null); // 'search' | 'barcode' | 'receipt'
  const cats = [
    { id: 'all', label: 'All' },
    { id: 'spices', label: 'Spices' },
    { id: 'pantry', label: 'Dry' },
    { id: 'produce', label: 'Produce' },
    { id: 'fridge', label: 'Fridge' },
  ];
  const filtered = items.filter(i => tab === 'all' || i.cat === tab);
  const haveCount = items.filter(i => i.have).length;

  return (
    <div style={{ padding: '8px 22px 24px', position: 'relative' }}>
      <div className="eyebrow" style={{ marginTop: 6 }}>The Cupboard</div>
      <h1 className="h1" style={{ marginTop: 4 }}>Pantry</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10 }}>
        <div className="script-note" style={{ fontSize: 18 }}>{haveCount} ingredients</div>
        <div style={{ flex: 1, height: 1 }} className="dashed" />
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{Math.round(haveCount / 16 * 100)}% stocked</div>
      </div>

      {/* Add buttons */}
      <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
        <button className="card" style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }} onClick={() => setAddMode('search')}>
          <Icon name="search" size={18} />
          <span style={{ fontSize: 11, color: 'var(--ink-2)' }}>Search</span>
        </button>
        <button className="card" style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }} onClick={() => setAddMode('barcode')}>
          <Icon name="scan" size={18} />
          <span style={{ fontSize: 11, color: 'var(--ink-2)' }}>Barcode</span>
        </button>
        <button className="card" style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }} onClick={() => setAddMode('receipt')}>
          <Icon name="camera" size={18} />
          <span style={{ fontSize: 11, color: 'var(--ink-2)' }}>Receipt</span>
        </button>
      </div>

      {/* Cat tabs */}
      <div style={{ display: 'flex', gap: 6, marginTop: 18, overflowX: 'auto' }} className="scroll-area">
        {cats.map(c => (
          <button key={c.id} className={'chip' + (tab === c.id ? ' active' : '')} onClick={() => setTab(c.id)}>{c.label}</button>
        ))}
      </div>

      {/* Items */}
      <div style={{ marginTop: 16 }}>
        {filtered.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px dashed var(--rule)' }}>
            <button
              className={'cb ' + (it.have ? 'on' : '')}
              onClick={() => setItems(items.map(x => x.name === it.name ? { ...x, have: !x.have } : x))}
            >
              {it.have && <Icon name="check" size={14} strokeWidth={2.4} />}
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: 'var(--ink)', fontWeight: it.have ? 500 : 400, opacity: it.have ? 1 : 0.5 }}>{it.name}</div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>{it.cat}</div>
            </div>
            {it.have && <span className="mono" style={{ fontSize: 10, color: 'var(--sage)' }}>✓ in stock</span>}
          </div>
        ))}
      </div>

      {/* Match CTA — no count, since the Recipes hub is curated, not a strict count */}
      <button className="btn-primary" style={{ width: '100%', marginTop: 24 }} onClick={() => go('matches')}>
        See matches →
      </button>

      {addMode && <AddIngredientSheet mode={addMode} onClose={() => setAddMode(null)} onAdd={(n) => { setItems([...items, { name: n, cat: 'pantry', have: true }]); setAddMode(null); }} />}
    </div>
  );
}

// Sheet contents change based on which add-button the user tapped.
// Search → typed search. Barcode → simulated camera scanner.
// Receipt → simulated photo-of-receipt OCR with parsed lines.
function AddIngredientSheet({ mode, onClose, onAdd }) {
  const [q, setQ] = React.useState('');
  const sugg = ['Coriander', 'Star anise', 'Tahini', 'Coconut milk', 'Fish sauce', 'Saffron'].filter(s => s.toLowerCase().includes(q.toLowerCase()));

  // Header content per mode
  const headers = {
    search:  { eyebrow: 'Add to pantry',     title: 'Search ingredients' },
    barcode: { eyebrow: 'Scan a barcode',    title: 'Point at the label' },
    receipt: { eyebrow: 'Scan a receipt',    title: 'Snap your grocery slip' },
  };
  const h = headers[mode] || headers.search;

  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet" style={{ padding: '0 22px 22px' }}>
        <div className="sheet-handle" />
        <div className="eyebrow" style={{ marginTop: 8 }}>{h.eyebrow}</div>
        <h2 className="h2" style={{ fontSize: 22, marginTop: 4 }}>{h.title}</h2>

        {mode === 'search' && (<>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--paper-2)', borderRadius: 12, marginTop: 12 }}>
            <Icon name="search" size={18} />
            <input
              autoFocus
              placeholder="Type an ingredient…"
              value={q}
              onChange={e => setQ(e.target.value)}
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14, color: 'var(--ink)', fontFamily: 'Inter, sans-serif' }}
            />
            <Icon name="mic" size={18} />
          </div>
          <div style={{ marginTop: 14 }}>
            {sugg.map(s => (
              <button key={s} onClick={() => onAdd(s)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 4px', width: '100%', border: 'none', background: 'transparent', textAlign: 'left', borderBottom: '1px dashed var(--rule)', cursor: 'pointer' }}>
                <Icon name="plus" size={16} stroke="var(--terracotta)" />
                <span style={{ fontSize: 14, color: 'var(--ink)' }}>{s}</span>
              </button>
            ))}
          </div>
        </>)}

        {mode === 'barcode' && (<>
          {/* Simulated viewfinder */}
          <div style={{
            marginTop: 14, position: 'relative',
            width: '100%', height: 220,
            background: '#1a1208', borderRadius: 14, overflow: 'hidden',
            border: '1px solid var(--rule)',
          }}>
            {/* Corner brackets */}
            {[[8,8,'tl'],[null,8,'tr'],[8,null,'bl'],[null,null,'br']].map(([l,t,k]) => (
              <div key={k} style={{
                position: 'absolute',
                left: l, top: t, right: l===null ? 8 : undefined, bottom: t===null ? 8 : undefined,
                width: 22, height: 22,
                borderTop: t!=null ? '2px solid #f3e9d7' : 'none',
                borderLeft: l!=null ? '2px solid #f3e9d7' : 'none',
                borderRight: l==null ? '2px solid #f3e9d7' : 'none',
                borderBottom: t==null ? '2px solid #f3e9d7' : 'none',
              }} />
            ))}
            {/* Scan beam */}
            <div style={{
              position: 'absolute', left: 30, right: 30, top: '50%',
              height: 2, background: '#c25a3b',
              boxShadow: '0 0 18px #c25a3b',
            }} />
            {/* Mock barcode lines */}
            <div style={{ position: 'absolute', left: 50, right: 50, top: '50%', transform: 'translateY(-30px)', display: 'flex', gap: 2, alignItems: 'flex-end', height: 60, opacity: 0.7 }}>
              {Array.from({length: 36}).map((_, i) => (
                <div key={i} style={{ width: i % 4 === 0 ? 3 : 1, height: 60, background: '#f3e9d7' }} />
              ))}
            </div>
            <div className="mono" style={{ position: 'absolute', left: 0, right: 0, bottom: 14, textAlign: 'center', color: '#c9b691', fontSize: 9, letterSpacing: '0.18em' }}>
              SCANNING…
            </div>
          </div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 12, letterSpacing: '0.12em', textAlign: 'center' }}>
            HOLD THE LABEL INSIDE THE FRAME
          </div>
          <button className="btn-primary" style={{ width: '100%', marginTop: 14 }} onClick={() => onAdd('Coconut milk (400g)')}>
            Use detected item →
          </button>
        </>)}

        {mode === 'receipt' && (<>
          {/* Simulated receipt OCR */}
          <div style={{
            marginTop: 14, padding: 14,
            background: 'var(--paper-2)', border: '1px dashed var(--rule)',
            borderRadius: 10,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.7,
          }}>
            <div style={{ textAlign: 'center', fontFamily: 'DM Serif Display, serif', fontSize: 16, color: 'var(--ink)' }}>SAFEWAY · OAKLAND</div>
            <div style={{ borderTop: '1px dashed var(--rule)', margin: '6px 0' }} />
            {[
              ['ORG TOMATO 28OZ', '3.99'],
              ['EGGS LRG DZ',     '4.49'],
              ['BABY SPINACH',    '2.99'],
              ['CILANTRO BUNCH',  '0.99'],
              ['STAR ANISE 1OZ',  '5.49'],
            ].map(([name, price]) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{name}</span><span>${price}</span>
              </div>
            ))}
          </div>
          <div className="script-note" style={{ fontSize: 14, marginTop: 10 }}>5 ingredients found — add all?</div>
          <button className="btn-primary" style={{ width: '100%', marginTop: 12 }} onClick={() => onAdd('Star anise')}>
            Add 5 ingredients to pantry →
          </button>
        </>)}
      </div>
    </>
  );
}

// ───────── MATCHES ─────────
const FILTER_DEFAULTS = {
  spiceLevel: [],   // 'none' | 'mild' | 'medium' | 'hot' | 'fiery'
  cookTime: [],     // 'under15' | 'under30' | 'under60' | 'over60'
  difficulty: [],   // 'easy' | 'medium' | 'hard'
  diet: [],         // 'vegetarian' | 'vegan' | 'meat'
  country: [],      // country codes
  course: [],       // 'breakfast' | 'lunch' | 'dinner' | 'soup' | 'side' | 'dessert'
};
const FILTER_GROUPS = [
  {
    key: 'cookTime',
    label: 'Cook time',
    icon: 'clock',
    options: [
      { id: 'under15', label: 'Under 15 min', sub: 'quick wins' },
      { id: 'under30', label: 'Under 30 min', sub: 'weeknight' },
      { id: 'under60', label: 'Under 1 hour', sub: 'most dinners' },
      { id: 'over60',  label: 'Over 1 hour',  sub: 'weekend project' },
    ],
  },
  {
    key: 'country',
    label: 'Country',
    icon: 'globe',
    grouped: true,
    continents: [
      {
        id: 'africa', label: 'Africa',
        options: [
          { id: 'EG', label: 'Egypt',    sub: 'North African' },
          { id: 'ET', label: 'Ethiopia', sub: 'East African' },
          { id: 'MA', label: 'Morocco',  sub: 'Maghrebi' },
          { id: 'NG', label: 'Nigeria',  sub: 'West African' },
          { id: 'SN', label: 'Senegal',  sub: 'West African' },
          { id: 'TN', label: 'Tunisia',  sub: 'Maghrebi' },
        ],
      },
      {
        id: 'asia', label: 'Asia',
        options: [
          { id: 'CN', label: 'China',     sub: 'East Asian' },
          { id: 'IN', label: 'India',     sub: 'South Asian' },
          { id: 'ID', label: 'Indonesia', sub: 'Southeast Asian' },
          { id: 'IR', label: 'Iran',      sub: 'Persian' },
          { id: 'JP', label: 'Japan',     sub: 'East Asian' },
          { id: 'KR', label: 'Korea',     sub: 'East Asian' },
          { id: 'LB', label: 'Lebanon',   sub: 'Levantine' },
          { id: 'TH', label: 'Thailand',  sub: 'Southeast Asian' },
          { id: 'TR', label: 'Türkiye',   sub: 'Anatolian' },
          { id: 'VN', label: 'Vietnam',   sub: 'Southeast Asian' },
        ],
      },
      {
        id: 'central-caribbean', label: 'Central America & Caribbean',
        options: [
          { id: 'CR', label: 'Costa Rican', sub: 'Central American' },
          { id: 'CU', label: 'Cuban',      sub: 'Caribbean' },
          { id: 'GT', label: 'Guatemalan', sub: 'Central American' },
          { id: 'JM', label: 'Jamaican',   sub: 'Caribbean' },
        ],
      },
      {
        id: 'europe', label: 'Europe',
        options: [
          { id: 'FR', label: 'France',  sub: 'Western European' },
          { id: 'GR', label: 'Greece',  sub: 'Mediterranean' },
          { id: 'IT', label: 'Italy',   sub: 'Mediterranean' },
          { id: 'PL', label: 'Poland',  sub: 'Eastern European' },
          { id: 'ES', label: 'Spain',   sub: 'Iberian' },
          { id: 'SE', label: 'Sweden',  sub: 'Nordic' },
          { id: 'GB', label: 'UK',      sub: 'British Isles' },
        ],
      },
      {
        id: 'north-america', label: 'North America',
        options: [
          { id: 'US', label: 'American', sub: 'United States' },
          { id: 'CA', label: 'Canadian', sub: 'Canada' },
          { id: 'MX', label: 'Mexican',  sub: 'Mesoamerican' },
        ],
      },
      {
        id: 'oceania', label: 'Oceania',
        options: [
          { id: 'AU', label: 'Australian',  sub: 'Pacific' },
          { id: 'NZ', label: 'New Zealand', sub: 'Pacific' },
        ],
      },
      {
        id: 'south-america', label: 'South America',
        options: [
          { id: 'AR', label: 'Argentine',  sub: 'Southern Cone' },
          { id: 'BR', label: 'Brazilian',  sub: 'Lusophone' },
          { id: 'CO', label: 'Colombian',  sub: 'Andean' },
          { id: 'PE', label: 'Peruvian',   sub: 'Andean' },
        ],
      },
    ],
  },
  {
    key: 'course',
    label: 'Course',
    icon: 'book',
    options: [
      { id: 'breakfast', label: 'Breakfast',   sub: 'morning' },
      { id: 'dessert',   label: 'Dessert',     sub: 'sweet finish' },
      { id: 'dinner',    label: 'Dinner',      sub: 'main event' },
      { id: 'lunch',     label: 'Lunch',       sub: 'midday' },
      { id: 'side',      label: 'Side dish',   sub: 'plus-ones' },
      { id: 'soup',      label: 'Soup & stew', sub: 'in a bowl' },
    ],
  },
  {
    key: 'diet',
    label: 'Diet',
    icon: 'sparkle',
    options: [
      { id: 'meat',       label: 'Not vegetarian', sub: 'show me the meat' },
      { id: 'vegan',      label: 'Vegan',          sub: 'fully plant-based' },
      { id: 'vegetarian', label: 'Vegetarian',     sub: 'no meat, no fish' },
    ],
  },
  {
    key: 'difficulty',
    label: 'Difficulty',
    icon: 'flame',
    options: [
      { id: 'easy',   label: 'Easy',   sub: 'one-pan, beginner' },
      { id: 'hard',   label: 'Hard',   sub: 'cheffy, ambitious' },
      { id: 'medium', label: 'Medium', sub: 'a few moving parts' },
    ],
  },
  {
    key: 'spiceLevel',
    label: 'Spice level',
    icon: 'flame',
    options: [
      { id: 'fiery',  label: 'Fiery',   sub: 'bring the milk' },
      { id: 'hot',    label: 'Hot',     sub: 'sweat starting' },
      { id: 'medium', label: 'Medium',  sub: 'noticeable kick' },
      { id: 'mild',   label: 'Mild',    sub: 'a whisper of warmth' },
      { id: 'none',   label: 'No heat', sub: 'gentle, kid-friendly' },
    ],
  },
];

// ───────── RECIPES · UNIFIED HUB ─────────
// Single hub combining what used to be Matches + Saved + Imported.
// Sub-tabs let the user pivot the same list view without leaving the screen.
function MatchesScreen({ go, goBack }) {
  const [subtab, setSubtab] = React.useState('matched'); // 'matched' | 'saved' | 'imported'
  const [filters, setFilters] = React.useState(FILTER_DEFAULTS);
  const [filterOpen, setFilterOpen] = React.useState(false);
  // Pending = filters being edited inside the open sheet. We commit on Apply
  // so the main list doesn't churn under the user mid-tweak — but the sheet's
  // own preview ("Show N recipes") updates live.
  const [pending, setPending] = React.useState(filters);

  const totalFilters = Object.values(filters).reduce((a, arr) => a + arr.length, 0);
  const totalPending = Object.values(pending).reduce((a, arr) => a + arr.length, 0);

  const toggle = (group, id) => {
    setFilters(f => {
      const arr = f[group];
      const next = arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id];
      return { ...f, [group]: next };
    });
  };
  const togglePending = (group, id) => {
    setPending(f => {
      const arr = f[group];
      const next = arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id];
      return { ...f, [group]: next };
    });
  };

  const clearAll = () => setFilters(FILTER_DEFAULTS);
  const clearPending = () => setPending(FILTER_DEFAULTS);

  // Filter the list by sub-tab and active filters (matched applies pantry
  // matching, saved/imported are unfiltered placeholder slices).
  const baseList = (
    subtab === 'matched'  ? RECIPES :
    subtab === 'saved'    ? RECIPES.filter(r => ['shakshuka','ribollita','pho'].includes(r.id)) :
    /* imported */          RECIPES.filter(r => ['pho'].includes(r.id))
  );
  // Apply (very light) filter logic so counts feel alive. Real app would do
  // proper matching against tags/country/etc.
  const applyFilters = (list, f) => {
    return list.filter(r => {
      if (f.cookTime.length) {
        const t = r.time;
        const ok = f.cookTime.some(k =>
          k === 'under15' ? t <= 15 :
          k === 'under30' ? t <= 30 :
          k === 'under60' ? t <= 60 :
          k === 'over60'  ? t > 60 : true);
        if (!ok) return false;
      }
      if (f.difficulty.length && !f.difficulty.includes(r.difficulty?.toLowerCase())) return false;
      // Country/diet/course/spiceLevel: not modeled on RECIPES; treat as pass-through.
      return true;
    });
  };
  const filtered = applyFilters(baseList, filters);
  const pendingFiltered = applyFilters(baseList, pending);

  const subtabs = [
    { id: 'matched',  label: 'Matched',  sub: 'to your pantry' },
    { id: 'saved',    label: 'Saved',    sub: 'bookmarks' },
    { id: 'imported', label: 'Imported', sub: 'links & socials' },
  ];

  return (
    <div style={{ padding: '8px 22px 24px', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
        <button onClick={goBack} aria-label="Back" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
          <Icon name="arrow-left" size={20} />
        </button>
        <div className="eyebrow" style={{ flex: 1 }}>Recipes</div>
        <button
          onClick={() => { setPending(filters); setFilterOpen(true); }}
          style={{
            background: totalFilters > 0 ? 'var(--ink)' : 'transparent',
            color: totalFilters > 0 ? 'var(--paper)' : 'var(--ink)',
            border: '1px solid ' + (totalFilters > 0 ? 'var(--ink)' : 'var(--rule)'),
            borderRadius: 100, padding: '6px 12px',
            display: 'flex', alignItems: 'center', gap: 6,
            cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
          <Icon name="filter" size={13} />
          <span>Filter{totalFilters > 0 ? ` · ${totalFilters}` : ''}</span>
        </button>
      </div>

      {/* Sub-tab switcher */}
      <div style={{ display: 'flex', gap: 6, marginTop: 14, padding: 4, background: 'var(--paper-2)', borderRadius: 100, border: '1px solid var(--rule)' }}>
        {subtabs.map(s => {
          const on = s.id === subtab;
          return (
            <button
              key={s.id}
              onClick={() => setSubtab(s.id)}
              style={{
                flex: 1, padding: '8px 10px',
                background: on ? 'var(--ink)' : 'transparent',
                color: on ? 'var(--paper)' : 'var(--ink-2)',
                border: 'none', borderRadius: 100, cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600,
                transition: 'all 160ms',
              }}>
              {s.label}
            </button>
          );
        })}
      </div>

      <h1 className="h1" style={{ fontSize: 32, marginTop: 18, lineHeight: 1.0 }}>
        {filtered.length} {filtered.length === 1 ? 'recipe' : 'recipes'},
        <br/>
        <span style={{ color: 'var(--ink-2)' }}>{subtabs.find(s => s.id === subtab).sub}.</span>
      </h1>

      {/* Active filter chips */}
      {totalFilters > 0 && (
        <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap' }}>
          {Object.entries(filters).flatMap(([group, ids]) =>
            ids.map(id => {
              const grp = FILTER_GROUPS.find(g => g.key === group);
              const opt = grp.grouped
                ? grp.continents.flatMap(c => c.options).find(o => o.id === id)
                : grp.options.find(o => o.id === id);
              if (!opt) return null;
              return (
                <button key={group + id} className="chip active" onClick={() => toggle(group, id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  {opt.label}
                  <Icon name="close" size={11} strokeWidth={2.2} />
                </button>
              );
            })
          )}
          <button onClick={clearAll} className="chip" style={{ borderStyle: 'dashed' }}>clear all</button>
        </div>
      )}

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.length === 0 && (
          <div style={{
            padding: '36px 18px', textAlign: 'center',
            border: '1px dashed var(--rule)', borderRadius: 12,
            background: 'var(--paper-2)',
          }}>
            <div className="script-note" style={{ fontSize: 18, color: 'var(--ink-2)' }}>No recipes match yet.</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em', marginTop: 6 }}>
              {totalFilters > 0 ? 'TRY CLEARING A FILTER →' : 'PICK A DIFFERENT TAB →'}
            </div>
          </div>
        )}
        {filtered.map(r => (
          <button key={r.id} className="card fade-in" style={{ padding: 12, display: 'flex', gap: 12, textAlign: 'left', cursor: 'pointer', position: 'relative' }} onClick={() => go('cook', r)}>
            <div className={r.photo ? 'food-photo' : 'food-ph'} data-label={r.id} style={{ width: 90, height: 90, flexShrink: 0, backgroundImage: r.photo ? `url(${r.photo})` : undefined }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.12em' }}>{r.flag} · {r.origin.split('·')[0].trim().toUpperCase()}</div>
              </div>
              <div className="h3" style={{ fontSize: 18, marginTop: 2 }}>{r.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-2)', marginTop: 4, lineHeight: 1.4 }}>{r.blurb}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.matchPct > 85 ? 'var(--sage)' : r.matchPct > 70 ? 'var(--turmeric)' : 'var(--terracotta)' }} />
                  <span className="mono" style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink)' }}>{r.matchPct}%</span>
                </div>
                <span style={{ fontSize: 10, color: 'var(--ink-3)' }}>·</span>
                <span style={{ fontSize: 10, color: 'var(--ink-3)' }}>{r.time}m</span>
                {r.missing.length > 0 && (
                  <>
                    <span style={{ fontSize: 10, color: 'var(--ink-3)' }}>·</span>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--terracotta)' }}>need {r.missing.length}</span>
                  </>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filterOpen && (
        <FilterSheet
          filters={pending}
          toggle={togglePending}
          clearAll={clearPending}
          resultCount={pendingFiltered.length}
          onApply={() => { setFilters(pending); setFilterOpen(false); }}
          onClose={() => setFilterOpen(false)}
        />
      )}
    </div>
  );
}

// ───────── FILTER SHEET ─────────
function ContinentAccordions({ group, filters, toggle }) {
  const selected = filters[group.key];
  const [open, setOpen] = React.useState(() => {
    // open continents that already have a selection
    const init = {};
    group.continents.forEach(c => {
      init[c.id] = c.options.some(o => selected.includes(o.id));
    });
    return init;
  });

  const continentCount = (c) => c.options.filter(o => selected.includes(o.id)).length;

  const toggleAllInContinent = (c) => {
    const ids = c.options.map(o => o.id);
    const allOn = ids.every(id => selected.includes(id));
    // toggle each so result matches "all on" -> "all off" else "all on"
    ids.forEach(id => {
      const isOn = selected.includes(id);
      if (allOn && isOn) toggle(group.key, id);
      else if (!allOn && !isOn) toggle(group.key, id);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {group.continents.map(c => {
        const count = continentCount(c);
        const isOpen = open[c.id];
        const allOn = c.options.every(o => selected.includes(o.id));
        return (
          <div key={c.id} style={{ border: '1px solid var(--rule)', borderRadius: 10, overflow: 'hidden', background: count > 0 ? 'var(--paper-2)' : 'transparent' }}>
            {/* Header row */}
            <button
              onClick={() => setOpen(o => ({ ...o, [c.id]: !o[c.id] }))}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 12px', background: 'transparent', border: 'none',
                cursor: 'pointer', textAlign: 'left',
              }}>
              <div className="serif" style={{ fontSize: 15, color: 'var(--ink)', flex: 1 }}>{c.label}</div>
              {count > 0 && (
                <span className="mono" style={{
                  fontSize: 9, color: 'var(--terracotta)', letterSpacing: '0.12em',
                  background: 'var(--paper)', border: '1px solid var(--terracotta)',
                  padding: '2px 6px', borderRadius: 100,
                }}>{count} ON</span>
              )}
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>
                {c.options.length}
              </span>
              <span style={{ display: 'inline-flex', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.18s', color: 'var(--ink-3)' }}>
                <Icon name="arrow-right" size={14} />
              </span>
            </button>

            {/* Body */}
            {isOpen && (
              <div className="fade-in" style={{ padding: '0 12px 12px' }}>
                {/* Select-all helper */}
                <button
                  onClick={() => toggleAllInContinent(c)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    padding: '4px 0 10px', color: 'var(--ink-2)',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                  }}>
                  <div style={{
                    width: 14, height: 14, borderRadius: 4,
                    border: '1.5px solid ' + (allOn ? 'var(--terracotta)' : 'var(--ink-3)'),
                    background: allOn ? 'var(--terracotta)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff5e6',
                  }}>
                    {allOn && <Icon name="check" size={9} strokeWidth={3} />}
                  </div>
                  {allOn ? 'Deselect all' : 'Select all in ' + c.label}
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {c.options.map(opt => {
                    const on = selected.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => toggle(group.key, opt.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '8px 10px',
                          background: on ? 'var(--paper)' : 'transparent',
                          border: '1px solid ' + (on ? 'var(--terracotta)' : 'var(--rule)'),
                          borderRadius: 8,
                          cursor: 'pointer', textAlign: 'left',
                        }}>
                        <div className={'cb' + (on ? ' on' : '')} style={{ width: 16, height: 16, borderRadius: 4 }}>
                          {on && <Icon name="check" size={10} strokeWidth={2.8} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="serif" style={{ fontSize: 13, color: 'var(--ink)', lineHeight: 1.05 }}>{opt.label}</div>
                          {opt.sub && (
                            <div className="mono" style={{ fontSize: 8, color: 'var(--ink-3)', letterSpacing: '0.08em', marginTop: 2, textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {opt.sub}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FilterSheet({ filters, toggle, clearAll, onClose, onApply, resultCount }) {
  const totalFilters = Object.values(filters).reduce((a, arr) => a + arr.length, 0);
  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet" style={{ maxHeight: '90%' }}>
        <div className="sheet-handle" />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 22px 14px', borderBottom: '1px dashed var(--rule)' }}>
          <div style={{ flex: 1 }}>
            <div className="eyebrow">Refine the search</div>
            <h2 className="h2" style={{ fontSize: 26, marginTop: 4 }}>Filters</h2>
          </div>
          {totalFilters > 0 && (
            <button onClick={clearAll} style={{
              background: 'transparent', border: '1px solid var(--rule)',
              borderRadius: 100, padding: '6px 12px',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--ink-2)', cursor: 'pointer',
            }}>Clear · {totalFilters}</button>
          )}
          <button onClick={onClose} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: 6, color: 'var(--ink)',
          }}>
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Scrollable groups */}
        <div className="scroll-area" style={{ flex: 1, padding: '8px 22px 10px' }}>
          {FILTER_GROUPS.map((g, gi) => (
            <div key={g.key} style={{ marginTop: gi === 0 ? 8 : 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Icon name={g.icon} size={15} stroke="var(--terracotta)" />
                <div className="serif" style={{ fontSize: 18, color: 'var(--ink)', flex: 1 }}>{g.label}</div>
                {filters[g.key].length > 0 && (
                  <span className="mono" style={{ fontSize: 9, color: 'var(--terracotta)', letterSpacing: '0.14em' }}>
                    {filters[g.key].length} ON
                  </span>
                )}
              </div>

              {/* Grouped continent accordions for country; flat list otherwise */}
              {g.grouped ? (
                <ContinentAccordions group={g} filters={filters} toggle={toggle} />
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
                  {g.options.map(opt => {
                    const on = filters[g.key].includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => toggle(g.key, opt.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '11px 12px',
                          background: on ? 'var(--paper-2)' : 'transparent',
                          border: '1px solid ' + (on ? 'var(--terracotta)' : 'var(--rule)'),
                          borderRadius: 10,
                          cursor: 'pointer', textAlign: 'left',
                          transition: 'all 0.12s',
                        }}>
                        <div className={'cb' + (on ? ' on' : '')} style={{ width: 20, height: 20 }}>
                          {on && <Icon name="check" size={12} strokeWidth={2.6} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="serif" style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.1 }}>{opt.label}</div>
                          {opt.sub && (
                            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.1em', marginTop: 3, textTransform: 'uppercase' }}>
                              {opt.sub}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <div style={{ height: 12 }} />
        </div>

        {/* Footer apply */}
        <div style={{ padding: '12px 22px 18px', borderTop: '1px solid var(--rule)', background: 'var(--paper)', flexShrink: 0 }}>
          {/* Live result preview — updates as filters toggle */}
          {typeof resultCount === 'number' && (
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.14em', marginBottom: 8, textAlign: 'center' }}>
              {totalFilters === 0 ? 'NO FILTERS APPLIED' : `${totalFilters} FILTER${totalFilters===1?'':'S'} APPLIED`}
            </div>
          )}
          <button
            className="btn-primary"
            style={{ width: '100%' }}
            onClick={onApply || onClose}
            disabled={typeof resultCount === 'number' && resultCount === 0}
          >
            {typeof resultCount === 'number'
              ? `Show ${resultCount} ${resultCount === 1 ? 'recipe' : 'recipes'} →`
              : 'Show recipes →'}
          </button>
        </div>
      </div>
    </>
  );
}
// ───────── NOTES SHEET ─────────
function NotesSheet({ initial, onClose, onSave }) {
  const [text, setText] = React.useState(initial || '');
  const taRef = React.useRef(null);
  React.useEffect(() => {
    // autofocus
    const t = setTimeout(() => taRef.current && taRef.current.focus(), 50);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute', inset: 0, zIndex: 50,
        background: 'rgba(40,30,20,0.45)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        animation: 'fadein 180ms ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          background: 'var(--paper)',
          borderTopLeftRadius: 20, borderTopRightRadius: 20,
          padding: '14px 22px 22px',
          boxShadow: '0 -8px 24px rgba(0,0,0,0.18)',
          animation: 'slideup 240ms cubic-bezier(0.2, 0.7, 0.2, 1)',
          maxHeight: '88%',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Grabber */}
        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--rule)', margin: '0 auto 14px' }} />

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
          <div className="eyebrow" style={{ color: 'var(--terracotta)' }}>My notes</div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', padding: 4, cursor: 'pointer', color: 'var(--ink-3)' }}
            aria-label="Close notes"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
        <h2 className="h2" style={{ marginTop: 4, marginBottom: 12 }}>
          {initial ? 'Edit your notes' : 'Add a note'}
        </h2>

        <textarea
          ref={taRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Subbed cumin for caraway — kids loved it. Cook the onions longer next time…"
          style={{
            width: '100%',
            minHeight: 192, // 6 lines × 32px
            border: '1px solid var(--rule)',
            borderRadius: 12,
            // top padding tunes baseline to sit on the rule
            padding: '10px 14px 14px',
            fontFamily: "'Caveat', 'Comic Sans MS', cursive",
            fontSize: 24,
            lineHeight: '32px',
            color: 'var(--ink)',
            background: '#fbf6ec',
            resize: 'vertical',
            outline: 'none',
            boxSizing: 'border-box',
            // ruled-paper: one rule per line-height (32px), aligned with text baseline
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(120,80,40,0.22) 31px, rgba(120,80,40,0.22) 32px)',
            backgroundPosition: '0 10px', // match top padding so first rule sits under first line
            backgroundAttachment: 'local',
          }}
        />
        <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 6, fontFamily: "'JetBrains Mono', monospace" }}>
          {text.length} characters · saved to this recipe
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button
            className="btn-ghost"
            style={{ flex: 1 }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn-primary"
            style={{ flex: 2 }}
            onClick={() => onSave(text)}
          >
            {initial ? 'Save changes' : 'Save note'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ───────── COOK MODE ─────────
// Single scrollable cook page: hero → ingredients (restated) → all steps stacked
// with photos sourced from the imported recipe (Unsplash placeholders here)
function CookScreen({ go, goBack, recipe, note, onSaveNote }) {
  const r = recipe || RECIPES[0];
  const [handsFree, setHandsFree] = React.useState(false);
  const [activeTimer, setActiveTimer] = React.useState(null); // index of step with running timer
  const [notesOpen, setNotesOpen] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [shopAdded, setShopAdded] = React.useState(false);
  const steps = [
    {
      time: '2 min',
      title: 'Bloom the spices',
      body: 'Warm 2 tbsp olive oil in a wide skillet over medium. Add cumin and paprika and let them sizzle for 30 seconds — until fragrant.',
      tip: 'Heating spices in oil is called a "tarka." It unlocks fat-soluble flavor.',
      photo: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80&auto=format', // spices in oil
    },
    {
      time: '5 min',
      title: 'Soften the onion',
      body: 'Add diced onion and a pinch of salt. Cook until translucent, about 5 minutes, stirring now and then.',
      photo: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800&q=80&auto=format', // sautéed onion
    },
    {
      time: '8 min',
      title: 'Build the sauce',
      body: 'Pour in the canned tomatoes, breaking them up with a wooden spoon. Simmer until jammy.',
      photo: 'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=800&q=80&auto=format', // tomato sauce
    },
    {
      time: '8 min',
      title: 'Crack the eggs',
      body: 'Make 4 wells in the sauce. Crack an egg into each. Cover and cook until whites are set but yolks still wobble.',
      tip: 'Cover the pan to steam the tops of the eggs — no flipping needed.',
      photo: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&q=80&auto=format', // shakshuka eggs
    },
    {
      time: '1 min',
      title: 'Garnish & serve',
      body: 'Scatter fresh parsley if you have it, crack pepper, drizzle olive oil. Serve with crusty bread.',
      photo: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800&q=80&auto=format', // finished
    },
  ];
  const heroPhoto = r.photo || 'https://images.unsplash.com/photo-1590412200988-a436970781fa?w=1080&q=80&auto=format';

  // Serving size — base recipe is for 4 servings
  const BASE_SERVES = 4;
  const [serves, setServes] = React.useState(BASE_SERVES);

  // Ingredient amounts at base (4 servings). Lookup by ingredient name.
  // Falls back to "to taste" for anything not in the table.
  const AMOUNTS = {
    // shakshuka
    'eggs': { qty: 4, unit: '' },
    'tomatoes': { qty: 1, unit: 'can (28 oz)' },
    'cumin': { qty: 1, unit: 'tsp' },
    'paprika': { qty: 1, unit: 'tsp' },
    'onion': { qty: 1, unit: 'medium' },
    'garlic': { qty: 3, unit: 'cloves' },
    'fresh parsley': { qty: 2, unit: 'tbsp, chopped' },
    // dal
    'red lentils': { qty: 1, unit: 'cup' },
    'turmeric': { qty: 0.5, unit: 'tsp' },
    'ginger': { qty: 1, unit: 'tbsp, grated' },
    'curry leaves': { qty: 8, unit: 'leaves' },
    'ghee': { qty: 2, unit: 'tbsp' },
    // pozole
    'chicken': { qty: 1, unit: 'lb' },
    'oregano': { qty: 1, unit: 'tsp, dried' },
    'lime': { qty: 2, unit: '' },
    'hominy': { qty: 1, unit: 'can (15 oz)' },
    'tomatillos': { qty: 0.5, unit: 'lb' },
    'cilantro': { qty: 0.25, unit: 'cup' },
    // bibimbap
    'rice': { qty: 1, unit: 'cup, cooked' },
    'spinach': { qty: 2, unit: 'cups' },
    'carrots': { qty: 1, unit: 'medium, julienned' },
    'soy sauce': { qty: 2, unit: 'tbsp' },
    'gochujang': { qty: 2, unit: 'tbsp' },
    'sesame oil': { qty: 1, unit: 'tsp' },
    // ribollita
    'cannellini': { qty: 1, unit: 'can (15 oz)' },
    'rosemary': { qty: 1, unit: 'sprig' },
    'olive oil': { qty: 3, unit: 'tbsp' },
    'cavolo nero': { qty: 1, unit: 'bunch' },
    'stale bread': { qty: 4, unit: 'slices' },
    // pho
    'cinnamon': { qty: 1, unit: 'stick' },
    'star anise': { qty: 3, unit: 'pods' },
    'rice noodles': { qty: 8, unit: 'oz' },
    'fish sauce': { qty: 2, unit: 'tbsp' },
  };

  // Format a scaled quantity nicely — fractions for common values, otherwise decimal
  const fmtQty = (q) => {
    if (q === 0) return '0';
    const rounded = Math.round(q * 8) / 8; // nearest 1/8
    const whole = Math.floor(rounded);
    const frac = rounded - whole;
    const fracMap = { 0.125: '⅛', 0.25: '¼', 0.375: '⅜', 0.5: '½', 0.625: '⅝', 0.75: '¾', 0.875: '⅞' };
    const fracStr = fracMap[frac];
    if (whole === 0 && fracStr) return fracStr;
    if (fracStr) return `${whole} ${fracStr}`;
    return String(rounded);
  };

  const ingredientLine = (name) => {
    const a = AMOUNTS[name];
    if (!a) return { name, amount: 'to taste' };
    const scaled = a.qty * (serves / BASE_SERVES);
    return { name, amount: `${fmtQty(scaled)}${a.unit ? ' ' + a.unit : ''}`.trim() };
  };

  // Ingredient checklist (combined have + missing, ticked persistently)
  const allIngredients = [...r.have, ...r.missing];
  const [checked, setChecked] = React.useState({});
  const toggle = (i) => setChecked(c => ({ ...c, [i]: !c[i] }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Sticky top bar */}
      <div style={{
        padding: '6px 18px 8px',
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--paper)', borderBottom: '1px solid var(--rule)',
        flexShrink: 0, position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={goBack || (() => go('home'))} aria-label="Back" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
          <Icon name="arrow-left" size={20} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="serif" style={{ fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
          <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.12em' }}>{steps.length} STEPS · {r.time}M TOTAL</div>
        </div>
        <button
          onClick={() => setHandsFree(h => !h)}
          aria-label={handsFree ? 'Disable hands-free mode' : 'Enable hands-free mode'}
          aria-pressed={handsFree}
          style={{
            background: handsFree ? 'var(--terracotta)' : 'transparent',
            border: handsFree ? 'none' : '1px solid transparent',
            borderRadius: '50%', width: 32, height: 32,
            cursor: 'pointer', padding: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 160ms',
          }}
        >
          <Icon name="mic" size={18} stroke={handsFree ? '#fff' : 'currentColor'} />
        </button>
      </div>

      <div className="scroll-area" style={{ flex: 1 }}>
        {/* Hero image */}
        <div style={{
          width: '100%', height: 200,
          backgroundImage: `url(${heroPhoto})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          position: 'relative',
        }} />

        <div style={{ padding: '20px 22px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--terracotta)', letterSpacing: '0.16em' }}>FROM {r.origin.toUpperCase()}</div>
              <h1 className="h1" style={{ marginTop: 4, fontSize: 36, lineHeight: 1.0 }}>{r.name}</h1>
            </div>
            <button
              onClick={() => setSaved(s => !s)}
              aria-label={saved ? 'Remove from saved' : 'Save recipe'}
              aria-pressed={saved}
              style={{
                flexShrink: 0, width: 38, height: 38, borderRadius: '50%',
                background: saved ? 'var(--terracotta)' : 'var(--paper-2)', border: '1px solid var(--rule)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <Icon name="bookmark" size={16} stroke={saved ? '#fff' : 'currentColor'} fill={saved ? '#fff' : 'none'} />
            </button>
          </div>
          <div className="script-note" style={{ marginTop: 8, fontSize: 17 }}>"{r.blurb}"</div>

          {/* Meta strip — absorbed from recipe detail */}
          <div style={{ display: 'flex', gap: 0, marginTop: 18, padding: '14px 0', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
            {[
              { k: 'TIME', v: `${r.time}m` },
              { k: 'LEVEL', v: r.difficulty },
              { k: 'MATCH', v: `${r.matchPct}%` },
            ].map((m, i) => (
              <div key={m.k} style={{ flex: 1, textAlign: 'center', borderRight: '1px dashed var(--rule)' }}>
                <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>{m.k}</div>
                <div className="serif" style={{ fontSize: 18, marginTop: 4 }}>{m.v}</div>
              </div>
            ))}
            {/* SERVES — interactive stepper */}
            <div style={{ flex: 1.1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>SERVES</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <button
                  onClick={() => setServes(s => Math.max(1, s - 1))}
                  aria-label="Decrease servings"
                  disabled={serves <= 1}
                  style={{
                    width: 22, height: 22, borderRadius: '50%',
                    border: '1px solid var(--rule)', background: 'var(--paper-2)',
                    cursor: serves <= 1 ? 'not-allowed' : 'pointer', padding: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--ink-2)', fontSize: 14, lineHeight: 1,
                    opacity: serves <= 1 ? 0.4 : 1,
                  }}>−</button>
                <div className="serif" style={{ fontSize: 18, minWidth: 18, textAlign: 'center' }}>{serves}</div>
                <button
                  onClick={() => setServes(s => Math.min(12, s + 1))}
                  aria-label="Increase servings"
                  disabled={serves >= 12}
                  style={{
                    width: 22, height: 22, borderRadius: '50%',
                    border: '1px solid var(--rule)', background: 'var(--paper-2)',
                    cursor: serves >= 12 ? 'not-allowed' : 'pointer', padding: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--ink-2)', fontSize: 14, lineHeight: 1,
                    opacity: serves >= 12 ? 0.4 : 1,
                  }}>+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients restated */}
        <div style={{ padding: '12px 22px 0' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 12, gap: 12 }}>
            <div className="eyebrow">Ingredients · check as you prep</div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.14em', whiteSpace: 'nowrap' }}>
              FOR {serves} {serves === 1 ? 'SERVING' : 'SERVINGS'}
            </div>
          </div>
          <div style={{
            marginTop: 12,
            background: 'var(--paper-2)',
            borderRadius: 10,
            border: '1px dashed var(--rule)',
            padding: '8px 14px',
          }}>
            {allIngredients.map(i => {
              const isChecked = !!checked[i];
              const isHave = r.have.includes(i);
              const line = ingredientLine(i);
              return (
                <div key={i} onClick={() => toggle(i)} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 0',
                  borderBottom: i === allIngredients[allIngredients.length - 1] ? 'none' : '1px dashed var(--rule)',
                  cursor: 'pointer',
                }}>
                  <div className={`cb ${isChecked ? 'on' : ''}`} style={{
                    width: 18, height: 18, flexShrink: 0,
                    borderColor: isHave ? 'var(--sage)' : 'var(--terracotta)',
                  }}>
                    {isChecked && <Icon name="check" size={11} strokeWidth={2.5}/>}
                  </div>
                  {/* Amount column — fixed width so names align */}
                  <div className="mono" style={{
                    width: 78, flexShrink: 0,
                    fontSize: 11, fontWeight: 600,
                    color: isChecked ? 'var(--ink-3)' : 'var(--ink-2)',
                    letterSpacing: '0.04em',
                    textDecoration: isChecked ? 'line-through' : 'none',
                  }}>{line.amount}</div>
                  <span style={{
                    flex: 1, minWidth: 0,
                    fontSize: 14,
                    color: isChecked ? 'var(--ink-3)' : 'var(--ink)',
                    textDecoration: isChecked ? 'line-through' : 'none',
                  }}>{line.name}</span>
                  <span className="mono" style={{
                    fontSize: 9, flexShrink: 0,
                    color: isHave ? 'var(--sage)' : 'var(--terracotta)',
                    letterSpacing: '0.1em',
                  }}>{isHave ? 'HAVE' : 'NEED'}</span>
                </div>
              );
            })}
            {/* Pantry staples — always required, scale with servings */}
            {(() => {
              const staples = [
                { name: 'olive oil', qty: 2, unit: 'tbsp' },
                { name: 'salt', qty: 0.5, unit: 'tsp' },
                { name: 'black pepper', qty: 0.25, unit: 'tsp' },
              ].filter(s => !r.have.includes(s.name) && !r.missing.includes(s.name));
              return staples.map((s, idx) => {
                const key = `__staple_${s.name}`;
                const isChecked = !!checked[key];
                const scaled = s.qty * (serves / BASE_SERVES);
                const amount = `${fmtQty(scaled)} ${s.unit}`;
                return (
                  <div key={key} onClick={() => toggle(key)} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 0',
                    borderTop: idx === 0 ? '1px dashed var(--rule)' : 'none',
                    borderBottom: idx === staples.length - 1 ? 'none' : '1px dashed var(--rule)',
                    cursor: 'pointer',
                  }}>
                    <div className={`cb ${isChecked ? 'on' : ''}`} style={{
                      width: 18, height: 18, flexShrink: 0,
                      borderColor: 'var(--ink-3)',
                    }}>
                      {isChecked && <Icon name="check" size={11} strokeWidth={2.5}/>}
                    </div>
                    <div className="mono" style={{
                      width: 78, flexShrink: 0,
                      fontSize: 11, fontWeight: 600,
                      color: isChecked ? 'var(--ink-3)' : 'var(--ink-2)',
                      letterSpacing: '0.04em',
                      textDecoration: isChecked ? 'line-through' : 'none',
                    }}>{amount}</div>
                    <span style={{
                      flex: 1, minWidth: 0,
                      fontSize: 14,
                      color: isChecked ? 'var(--ink-3)' : 'var(--ink)',
                      textDecoration: isChecked ? 'line-through' : 'none',
                    }}>{s.name}</span>
                    <span className="mono" style={{
                      fontSize: 9, flexShrink: 0,
                      color: 'var(--ink-3)',
                      letterSpacing: '0.1em',
                    }}>STAPLE</span>
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* Steps stacked vertically */}
        <div style={{ padding: '8px 22px 0' }}>
          <div className="eyebrow" style={{ marginTop: 28 }}>Method · {steps.length} steps</div>
        </div>

        {steps.map((s, i) => (
          <div key={i} style={{ padding: '12px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
              <div className="serif" style={{
                fontSize: 22, color: 'var(--terracotta)', lineHeight: 1.1,
                flexShrink: 0,
              }}>{String(i + 1).padStart(2, '0')}</div>
              <div style={{ flex: 1 }}>
                <h2 className="h2" style={{ fontSize: 22, lineHeight: 1.1, margin: 0 }}>{s.title}</h2>
              </div>
            </div>

            {/* Step photo from imported recipe site */}
            <div style={{
              width: '100%', height: 160,
              backgroundImage: `url(${s.photo})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              borderRadius: 10,
              border: '1px solid var(--rule)',
              marginTop: 4, marginBottom: 14,
            }} />

            <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink)' }}>
              {s.body}
            </div>

            {s.tip && (
              <div style={{
                marginTop: 14, padding: 14,
                borderLeft: '3px solid var(--turmeric)',
                background: 'var(--paper-2)', borderRadius: '0 10px 10px 0',
              }}>
                <div className="mono" style={{ fontSize: 9, color: 'var(--turmeric)', letterSpacing: '0.16em', fontWeight: 700 }}>POSTCARD</div>
                <div className="script" style={{ fontSize: 17, color: 'var(--ink)', marginTop: 4, lineHeight: 1.3 }}>{s.tip}</div>
              </div>
            )}

            {/* Inline timer chip if step has a duration */}
            {s.time && (
              <button
                onClick={() => setActiveTimer(t => t === i ? null : i)}
                aria-pressed={activeTimer === i}
                style={{
                  marginTop: 14,
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '8px 14px',
                  border: '1px solid ' + (activeTimer === i ? 'var(--terracotta)' : 'var(--rule)'),
                  borderRadius: 999,
                  background: activeTimer === i ? 'var(--terracotta)' : 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: activeTimer === i ? '#fff' : 'var(--ink-2)',
                  transition: 'all 160ms',
                }}
              >
                <Icon name="clock" size={13} stroke={activeTimer === i ? '#fff' : 'currentColor'} />
                {activeTimer === i ? `RUNNING · ${s.time.toUpperCase()}` : `START ${s.time.toUpperCase()} TIMER`}
              </button>
            )}

          </div>
        ))}

        {/* Notes — handwritten block, absorbed from recipe detail */}
        <div style={{ padding: '24px 22px 0' }}>
          <div style={{ paddingTop: 20, borderTop: '1px dashed var(--rule)' }}>
            {note ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div className="eyebrow" style={{ color: 'var(--terracotta)' }}>My notes</div>
                  <button
                    onClick={() => setNotesOpen(true)}
                    style={{ background: 'transparent', border: '1px solid var(--rule)', borderRadius: 999, padding: '4px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--ink-2)' }}
                  >
                    <span className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Edit</span>
                  </button>
                </div>
                <div className="script" style={{ fontSize: 22, lineHeight: 1.25, color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>
                  {note}
                </div>
              </div>
            ) : (
              <button className="btn-ghost" style={{ width: '100%' }} onClick={() => setNotesOpen(true)}>
                Add notes…
              </button>
            )}
          </div>
          <button
            className="btn-ghost"
            style={{ width: '100%', marginTop: 12 }}
            onClick={() => setShopAdded(true)}
            disabled={shopAdded}
          >
            {shopAdded ? '✓ Added to shopping list' : 'Add missing to shopping list'}
          </button>
        </div>

        {/* Finish block */}
        <div style={{ padding: '24px 22px 24px' }}>
          <div style={{
            padding: '24px 20px',
            background: 'var(--paper-3)',
            borderRadius: 12,
            border: '1px solid var(--rule)',
            textAlign: 'center',
          }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--terracotta)', letterSpacing: '0.2em' }}>YOU'VE ARRIVED</div>
            <div className="script" style={{ fontSize: 24, color: 'var(--ink)', marginTop: 6 }}>
              From {r.origin}, with love.
            </div>
            <button className="btn-primary" style={{ width: '100%', marginTop: 18 }} onClick={goBack || (() => go('home'))}>
              Plate & stamp passport ★
            </button>
          </div>
        </div>
      </div>

      {notesOpen && (
        <NotesSheet
          initial={note || ''}
          onClose={() => setNotesOpen(false)}
          onSave={(t) => { onSaveNote && onSaveNote(t); setNotesOpen(false); }}
        />
      )}
    </div>
  );
}

// ───────── ONBOARDING (FPO WIREFRAMES) ─────────
// These are spec wireframes — not hi-fi. Each screen lays out the
// composition with FPO boxes for media (with dimension callouts), FPO
// text rectangles labeled with hierarchy/size/weight, and the dot
// indicator with a position spec. Designed at 360×760 phone canvas.
//
// Color palette: monochrome paper + ink rules so the wireframe reads
// distinct from hi-fi screens. No live photography.

// — Wireframe primitives —————————————————————————————

// Diagonal-line filled box for image/video FPOs
function FPOBox({ w, h, label, kind = 'IMAGE', spec, style }) {
  // kind: 'IMAGE' | 'VIDEO' | 'ICON'
  const stripes = `repeating-linear-gradient(135deg, var(--rule) 0 1px, transparent 1px 8px)`;
  return (
    <div style={{
      width: w === '100%' ? '100%' : w,
      height: h,
      border: '1.5px dashed var(--ink-2)',
      background: stripes,
      backgroundColor: 'var(--paper-2)',
      position: 'relative',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      {/* Crossed-out frame to make it read as 'placeholder' */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <line x1="0" y1="0" x2="100" y2="100" stroke="var(--ink-2)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="var(--ink-2)" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      </svg>
      <div style={{
        position: 'relative', textAlign: 'center',
        background: 'var(--paper)',
        border: '1px solid var(--rule)',
        padding: '6px 10px',
        maxWidth: '85%',
      }}>
        <div className="mono" style={{ fontSize: 9, color: 'var(--terracotta)', letterSpacing: '0.18em', fontWeight: 700 }}>
          {kind} · FPO
        </div>
        {label && (
          <div className="mono" style={{ fontSize: 9.5, color: 'var(--ink)', marginTop: 3, fontWeight: 600 }}>
            {label}
          </div>
        )}
        {spec && (
          <div className="mono" style={{ fontSize: 8.5, color: 'var(--ink-3)', marginTop: 3, letterSpacing: '0.04em', lineHeight: 1.3 }}>
            {spec}
          </div>
        )}
      </div>
    </div>
  );
}

// FPO text rectangle: gray bar(s) with a tiny spec tag in the corner
function FPOText({ tag, lines = 1, width = '100%', size = 14, weight = 400, font = 'sans', leading = 1.4, align = 'left', style }) {
  // Visual height = size * leading * lines + a touch of padding
  const fonts = {
    serif: "'DM Serif Display', serif",
    sans: "'Inter', sans-serif",
    script: "'Caveat', cursive",
    mono: "'JetBrains Mono', monospace",
  };
  return (
    <div style={{ position: 'relative', width, ...style }}>
      {/* Stack of gray bars representing text lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: size * (leading - 1) * 0.6, alignItems: align === 'center' ? 'center' : 'flex-start' }}>
        {Array.from({ length: lines }).map((_, i) => {
          const isLast = i === lines - 1 && lines > 1;
          return (
            <div key={i} style={{
              height: size * 0.7,
              width: lines === 1 ? '100%' : (isLast ? '62%' : '100%'),
              background: 'var(--ink-3)',
              opacity: 0.32,
              borderRadius: 1,
            }} />
          );
        })}
      </div>
      {/* Spec tag */}
      {tag && (
        <div className="mono" style={{
          position: 'absolute', top: -10, right: 0,
          fontSize: 7.5, color: 'var(--terracotta)', letterSpacing: '0.06em',
          background: 'var(--paper)', padding: '0 4px',
          fontWeight: 700,
        }}>
          {tag}
        </div>
      )}
    </div>
  );
}

// FPO button — outline rectangle with a spec tag
function FPOButton({ label = 'PRIMARY · 48h', filled = true, style, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', height: 48,
      background: filled ? 'var(--ink)' : 'transparent',
      border: filled ? 'none' : '1px solid var(--ink-2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', cursor: onClick ? 'pointer' : 'default',
      padding: 0, font: 'inherit',
      ...style,
    }}>
      <div className="mono" style={{
        fontSize: 9, letterSpacing: '0.16em',
        color: filled ? 'var(--paper)' : 'var(--ink-2)',
        fontWeight: 700,
      }}>
        {label}
      </div>
    </button>
  );
}

// Annotation callout — small marker arrow + text, anchors to a spot on the screen
function Annotation({ x, y, w = 120, label, side = 'right' }) {
  // Renders absolutely positioned to phone container.
  // x/y are the anchor point (where the marker sits on the screen).
  // The label flows out to the right (side='right') or left.
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      pointerEvents: 'none', zIndex: 10,
    }}>
      {/* Small dot anchor */}
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: 'var(--terracotta)',
        border: '1.5px solid var(--paper)',
        position: 'absolute', left: -4, top: -4,
      }} />
      {/* Connector line */}
      <div style={{
        position: 'absolute',
        left: side === 'right' ? 4 : -w - 4,
        top: 0,
        width: w, height: 1,
        background: 'var(--terracotta)',
      }} />
      {/* Label */}
      <div className="mono" style={{
        position: 'absolute',
        left: side === 'right' ? w + 8 : -w - 8,
        transform: side === 'right' ? 'translateY(-50%)' : 'translate(-100%, -50%)',
        top: 0,
        fontSize: 8.5, color: 'var(--terracotta)',
        letterSpacing: '0.04em', lineHeight: 1.35,
        whiteSpace: 'nowrap',
      }}>
        {label}
      </div>
    </div>
  );
}

// Dot indicator — drawn ourselves with a spec callout next to it
function FPODotIndicator({ active, total = 3, specLabel }) {
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: i === active ? 22 : 6, height: 6, borderRadius: 3,
            background: i === active ? 'var(--ink)' : 'var(--ink-3)',
            opacity: i === active ? 1 : 0.35,
          }} />
        ))}
      </div>
      {specLabel && (
        <div className="mono" style={{
          fontSize: 7.5, color: 'var(--terracotta)', letterSpacing: '0.08em', fontWeight: 700,
        }}>
          {specLabel}
        </div>
      )}
    </div>
  );
}

// Wireframe shell — paper bg, padding, dot indicator pinned bottom
function WireShell({ children, dotIndex, screenTitle }) {
  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      padding: '24px 24px 24px',
      position: 'relative',
      background: 'var(--paper)',
    }}>
      {/* Tiny screen title in top-left, the way wires get labeled */}
      <div className="mono" style={{
        position: 'absolute', top: 8, left: 12,
        fontSize: 8, color: 'var(--terracotta)',
        letterSpacing: '0.16em', fontWeight: 700,
      }}>
        WIRE · {screenTitle}
      </div>
      {/* Margin guides — 24px gutter dashed */}
      <div style={{
        position: 'absolute', inset: '0 24px',
        borderLeft: '1px dashed rgba(194,90,59,0.12)',
        borderRight: '1px dashed rgba(194,90,59,0.12)',
        pointerEvents: 'none',
      }} />
      {children}
      <div style={{ marginTop: 'auto', paddingTop: 18 }}>
        <FPODotIndicator
          active={dotIndex}
          total={3}
          specLabel={`PAGE ${dotIndex + 1}/3 · 6×6 dot · 22×6 active · gap 8 · 24px from bottom`}
        />
      </div>
    </div>
  );
}

// ── Page 1 · Welcome ───────────────────────────────────
function OnboardingScreen1({ go }) {
  return (
    <WireShell dotIndex={0} screenTitle="01 · WELCOME">
      {/* Eyebrow */}
      <FPOText tag="EYEBROW · MONO 11/0.18em" lines={1} size={12} width={140} style={{ marginTop: 18 }} />

      {/* Hero media — full bleed, near-square */}
      <div style={{ marginTop: 16 }}>
        <FPOBox
          w="100%" h={300}
          kind="VIDEO"
          label="Brand mark · looping intro"
          spec={`1080×1080 (1:1) · ~6s loop\nVIDEO: WebM (VP9 + alpha) or HEVC w/alpha\nFallback poster: 1080×1080 PNG\nautoplay · muted · playsinline · loop`}
        />
      </div>

      {/* H1 — large serif, 2 lines */}
      <div style={{ marginTop: 22 }}>
        <FPOText tag="H1 · DM SERIF 36/1.05" lines={3} size={32} leading={1.05} weight={400} />
      </div>

      {/* Body / sub */}
      <div style={{ marginTop: 14 }}>
        <FPOText tag="BODY · INTER 14/1.45 · 320 max" lines={2} size={14} leading={1.45} />
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Primary + secondary buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 18 }}>
        <FPOButton label="PRIMARY · 48h · 'Begin →'" filled={true} onClick={() => go('onboarding2')} />
        <FPOButton label="GHOST · 12pt · 'I have a passport · Sign in'" filled={false} onClick={() => go('home')} />
      </div>
    </WireShell>
  );
}

// ── Page 2 · Pantry permission ─────────────────────────
function OnboardingScreen2({ go }) {
  return (
    <WireShell dotIndex={1} screenTitle="02 · PANTRY">
      {/* Eyebrow */}
      <FPOText tag="EYEBROW · MONO 11/0.18em" lines={1} size={12} width={200} style={{ marginTop: 18 }} />

      {/* H1 — 2 lines */}
      <div style={{ marginTop: 12 }}>
        <FPOText tag="H1 · DM SERIF 30/1.08" lines={2} size={28} leading={1.08} />
      </div>

      {/* Body */}
      <div style={{ marginTop: 12 }}>
        <FPOText tag="BODY · INTER 13/1.5" lines={3} size={13} leading={1.5} />
      </div>

      {/* Inline media — animated demo of pantry-snap interaction */}
      <div style={{ marginTop: 18 }}>
        <FPOBox
          w="100%" h={170}
          kind="VIDEO"
          label="Pantry-snap demo loop"
          spec={`312×170 (auto-fit, ~16:9 crop)\nVIDEO: WebM/VP9 alpha or .mov ProRes 4444\n~4s seamless loop · muted · loop\nDevice-frame baked in · transparent BG`}
        />
      </div>

      {/* Two action cards (snap + manual list) */}
      <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
        {[
          { title: 'CARD · primary CTA · 72h', sub: '52×52 ICON · IMG/SVG · Aa 17/serif · Aa 9/mono' },
          { title: 'CARD · secondary · 72h', sub: '52×52 ICON · IMG/SVG · Aa 17/serif · Aa 9/mono' },
        ].map((c, i) => (
          <div key={i} style={{
            border: '1px solid var(--rule)',
            background: 'var(--paper)',
            padding: 12, position: 'relative',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <FPOBox w={40} h={40} kind="ICON" label="" spec="40×40" style={{ flex: '0 0 auto' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <FPOText lines={1} size={13} />
              <FPOText lines={1} size={9} width="60%" />
            </div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--terracotta)', letterSpacing: '0.06em' }}>›</div>
            <div className="mono" style={{
              position: 'absolute', top: -8, right: 6,
              fontSize: 7.5, color: 'var(--terracotta)', background: 'var(--paper)',
              padding: '0 4px', letterSpacing: '0.04em', fontWeight: 700,
            }}>{c.title}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <FPOText tag="MICROCOPY · MONO 9/0.12em · centered · privacy" lines={1} size={9} width="80%" style={{ margin: '0 auto' }} />
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ marginTop: 14 }}>
        <FPOButton label="GHOST · 'Skip for now'" filled={false} onClick={() => go('onboarding3')} />
      </div>
    </WireShell>
  );
}

// ── Page 3 · Taste profile ─────────────────────────────
function OnboardingScreen3({ go }) {
  return (
    <WireShell dotIndex={2} screenTitle="03 · TASTE">
      {/* Eyebrow */}
      <FPOText tag="EYEBROW · MONO 11/0.18em" lines={1} size={12} width={200} style={{ marginTop: 18 }} />

      {/* H1 */}
      <div style={{ marginTop: 12 }}>
        <FPOText tag="H1 · DM SERIF 28/1.1" lines={2} size={26} leading={1.1} />
      </div>

      {/* Body */}
      <div style={{ marginTop: 10 }}>
        <FPOText tag="BODY · INTER 13/1.5" lines={2} size={13} leading={1.5} />
      </div>

      {/* 2×3 grid of taste-family cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
        marginTop: 18, position: 'relative',
      }}>
        <div className="mono" style={{
          position: 'absolute', top: -16, right: 0,
          fontSize: 7.5, color: 'var(--terracotta)', letterSpacing: '0.06em', fontWeight: 700,
        }}>
          GRID · 2 col · gap 8 · card 144×100
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            border: '1px solid var(--rule)',
            background: i < 2 ? 'var(--paper-3)' : 'var(--paper)',
            borderColor: i < 2 ? 'var(--ink-2)' : 'var(--rule)',
            borderWidth: i < 2 ? 1.5 : 1,
            height: 100, padding: 10,
            display: 'flex', flexDirection: 'column', gap: 6,
            position: 'relative',
          }}>
            {/* Color dot — 22×22 */}
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              border: '1px dashed var(--ink-2)',
              background: i < 2 ? 'var(--ink-2)' : 'transparent',
              position: 'relative',
            }}>
              {i === 0 && (
                <div className="mono" style={{
                  position: 'absolute', left: 28, top: 4, whiteSpace: 'nowrap',
                  fontSize: 7, color: 'var(--terracotta)', letterSpacing: '0.04em',
                }}>22×22 · checked</div>
              )}
            </div>
            <FPOText lines={1} size={13} />
            <FPOText lines={1} size={8.5} width="80%" />
          </div>
        ))}
      </div>

      {/* Counter */}
      <div style={{ marginTop: 12 }}>
        <FPOText tag="COUNTER · MONO 9/0.12em · centered" lines={1} size={9} width="55%" style={{ margin: '0 auto' }} />
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ marginTop: 14 }}>
        <FPOButton label="PRIMARY · 48h · 'Done — Stamp my passport ★' (→ Home)" filled={true} onClick={() => go('home')} />
        <div className="mono" style={{ fontSize: 8.5, color: 'var(--terracotta)', letterSpacing: '0.06em', marginTop: 6, textAlign: 'center', fontWeight: 700 }}>
          DONE STATE · hands off to product · first-run only
        </div>
      </div>
    </WireShell>
  );
}

Object.assign(window, {
  HomeScreen, PantryScreen, MatchesScreen, FilterSheet, CookScreen, NotesSheet,
  OnboardingScreen1, OnboardingScreen2, OnboardingScreen3,
});
