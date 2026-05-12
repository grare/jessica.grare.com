// screens-a.jsx — Home, Pantry, Matches, Recipe Detail, Cook Mode

// ───────── HOME / PASSPORT ─────────
function HomeScreen({ go }) {
  const stamps = [
    { c: 'TUNIS', col: 'var(--stamp-red)' },
    { c: 'JEONJU', col: 'var(--stamp-blue)' },
    { c: 'FIRENZE', col: 'var(--sage)' },
    { c: 'AMRITSAR', col: 'var(--turmeric)' },
  ];
  return (
    <div style={{ padding: '8px 22px 20px' }}>
      <div style={{ marginTop: 6 }}>
        <div className="eyebrow">Passport № 047 · Issued 2024</div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div className="script-note" style={{ marginBottom: 4 }}>Buongiorno, Maya —</div>
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

      {/* Travel passport stamps */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 12 }}>
        <div className="eyebrow">Recent travels</div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>21 / 80 cuisines</div>
      </div>
      <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '12px 4px', marginLeft: -4 }} className="scroll-area">
        {stamps.map((s, i) => (
          <div key={s.c} className="stamp" style={{
            width: 78, height: 78, color: s.col, fontSize: 9, flexShrink: 0,
            transform: `rotate(${[-6, 4, -3, 7][i]}deg)`,
          }}>
            <div>{s.c}</div>
            <div style={{ fontSize: 7, opacity: 0.7, marginTop: 2 }}>★ 2026 ★</div>
          </div>
        ))}
        <div style={{
          width: 78, height: 78, flexShrink: 0,
          border: '1.5px dashed var(--ink-3)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--ink-3)',
        }}>
          <Icon name="plus" size={20} />
        </div>
      </div>
    </div>
  );
}

// ───────── PANTRY ─────────
function PantryScreen({ go }) {
  const [items, setItems] = React.useState(PANTRY);
  const [tab, setTab] = React.useState('all');
  const [showAdd, setShowAdd] = React.useState(false);
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
        <button className="card" style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }} onClick={() => setShowAdd(true)}>
          <Icon name="search" size={18} />
          <span style={{ fontSize: 11, color: 'var(--ink-2)' }}>Search</span>
        </button>
        <button className="card" style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }} onClick={() => setShowAdd(true)}>
          <Icon name="scan" size={18} />
          <span style={{ fontSize: 11, color: 'var(--ink-2)' }}>Barcode</span>
        </button>
        <button className="card" style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }} onClick={() => setShowAdd(true)}>
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

      {/* Match CTA */}
      <button className="btn-primary" style={{ width: '100%', marginTop: 24 }} onClick={() => go('matches')}>
        Find {Math.floor(haveCount * 1.5)} recipes I can cook →
      </button>

      {showAdd && <AddIngredientSheet onClose={() => setShowAdd(false)} onAdd={(n) => { setItems([...items, { name: n, cat: 'pantry', have: true }]); setShowAdd(false); }} />}
    </div>
  );
}

function AddIngredientSheet({ onClose, onAdd }) {
  const [q, setQ] = React.useState('');
  const sugg = ['Coriander', 'Star anise', 'Tahini', 'Coconut milk', 'Fish sauce', 'Saffron'].filter(s => s.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet" style={{ padding: '0 22px 22px' }}>
        <div className="sheet-handle" />
        <div className="eyebrow" style={{ marginTop: 8 }}>Add to pantry</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--paper-2)', borderRadius: 12, marginTop: 10 }}>
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

function MatchesScreen({ go }) {
  const [filters, setFilters] = React.useState(FILTER_DEFAULTS);
  const [filterOpen, setFilterOpen] = React.useState(false);

  const totalFilters = Object.values(filters).reduce((a, arr) => a + arr.length, 0);

  const toggle = (group, id) => {
    setFilters(f => {
      const arr = f[group];
      const next = arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id];
      return { ...f, [group]: next };
    });
  };

  const clearAll = () => setFilters(FILTER_DEFAULTS);

  return (
    <div style={{ padding: '8px 22px 24px', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
        <button onClick={() => go('home')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
          <Icon name="arrow-left" size={20} />
        </button>
        <div className="eyebrow" style={{ flex: 1 }}>Matched to your pantry</div>
        <button
          onClick={() => setFilterOpen(true)}
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
      <h1 className="h1" style={{ fontSize: 32, marginTop: 12 }}>14 recipes,<br/>15 ingredients.</h1>

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
        {RECIPES.map(r => (
          <button key={r.id} className="card fade-in" style={{ padding: 12, display: 'flex', gap: 12, textAlign: 'left', cursor: 'pointer', position: 'relative' }} onClick={() => go('recipe', r)}>
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
          filters={filters}
          toggle={toggle}
          clearAll={clearAll}
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

function FilterSheet({ filters, toggle, clearAll, onClose }) {
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
          <button className="btn-primary" style={{ width: '100%' }} onClick={onClose}>
            Show recipes →
          </button>
        </div>
      </div>
    </>
  );
}
// ───────── RECIPE DETAIL ─────────
function RecipeScreen({ go, recipe, backTo, note, onSaveNote }) {
  const r = recipe || RECIPES[0];
  const back = backTo || 'matches';
  const [notesOpen, setNotesOpen] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [shopAdded, setShopAdded] = React.useState(false);
  return (
    <div style={{ position: 'relative' }}>
      {/* Hero */}
      <div className={r.photo ? 'food-photo' : 'food-ph'} data-label={`${r.id} hero`} style={{ width: '100%', height: 240, borderRadius: 0, backgroundImage: r.photo ? `url(${r.photo})` : undefined }} />
      <button onClick={() => go(back)} style={{
        position: 'absolute', top: 14, left: 14,
        width: 40, height: 40, borderRadius: '50%',
        background: 'rgba(243,233,215,0.9)', border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <Icon name="arrow-left" size={18} />
      </button>
      <button
        onClick={() => setSaved(s => !s)}
        aria-label={saved ? 'Remove from saved' : 'Save recipe'}
        aria-pressed={saved}
        style={{
          position: 'absolute', top: 14, right: 14,
          width: 40, height: 40, borderRadius: '50%',
          background: saved ? 'var(--terracotta)' : 'rgba(243,233,215,0.9)', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          transition: 'background 160ms',
        }}
      >
        <Icon name="bookmark" size={18} stroke={saved ? '#fff' : 'currentColor'} fill={saved ? '#fff' : 'none'} />
      </button>

      {/* Stamp */}
      <div className="stamp stamp-in" style={{
        position: 'absolute', top: 30, right: 30,
        width: 92, height: 92, color: 'var(--stamp-red)', fontSize: 11,
      }}>
        <div>{r.stamp}</div>
        <div style={{ fontSize: 8, opacity: 0.7, marginTop: 2 }}>★ ARRIVED ★</div>
      </div>

      <div style={{ padding: '20px 22px 24px' }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--terracotta)', letterSpacing: '0.16em' }}>FROM {r.origin.toUpperCase()}</div>
        <h1 className="h1" style={{ marginTop: 6 }}>{r.name}</h1>
        <div className="script-note" style={{ marginTop: 8 }}>"{r.blurb}"</div>

        {/* Meta strip */}
        <div style={{ display: 'flex', gap: 0, marginTop: 22, padding: '14px 0', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
          {[
            { k: 'TIME', v: `${r.time}m` },
            { k: 'LEVEL', v: r.difficulty },
            { k: 'MATCH', v: `${r.matchPct}%` },
            { k: 'SERVES', v: '4' },
          ].map((m, i) => (
            <div key={m.k} style={{ flex: 1, textAlign: 'center', borderRight: i < 3 ? '1px dashed var(--rule)' : 'none' }}>
              <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>{m.k}</div>
              <div className="serif" style={{ fontSize: 18, marginTop: 4 }}>{m.v}</div>
            </div>
          ))}
        </div>

        {/* Ingredients */}
        <div className="eyebrow" style={{ marginTop: 22 }}>Ingredients</div>
        <div style={{ marginTop: 12 }}>
          {r.have.map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
              <div className="cb on" style={{ width: 18, height: 18 }}><Icon name="check" size={11} strokeWidth={2.5}/></div>
              <span style={{ fontSize: 14, color: 'var(--ink)' }}>{i}</span>
              <span className="mono" style={{ fontSize: 9, color: 'var(--sage)', marginLeft: 'auto', letterSpacing: '0.1em' }}>HAVE</span>
            </div>
          ))}
          {r.missing.map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0' }}>
              <div className="cb" style={{ width: 18, height: 18, borderColor: 'var(--terracotta)' }} />
              <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>{i}</span>
              <span className="mono" style={{ fontSize: 9, color: 'var(--terracotta)', marginLeft: 'auto', letterSpacing: '0.1em' }}>NEED</span>
            </div>
          ))}
        </div>

        {/* Spice spotlight */}
        <div className="eyebrow" style={{ marginTop: 24 }}>Spices in this dish</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 14, justifyContent: 'space-around' }}>
          {r.spices.map((s, i) => (
            <div key={s} style={{ textAlign: 'center' }}>
              <div className="spice-disc" style={{ background: ['#9e6b3a', '#d99a2b', '#c25a3b', '#6b3a4f'][i % 4] }}>
                <span style={{ fontSize: 16 }}>{s[0].toUpperCase()}</span>
              </div>
              <div className="serif" style={{ fontSize: 12, marginTop: 8 }}>{s}</div>
            </div>
          ))}
        </div>

        <button className="btn-primary" style={{ width: '100%', marginTop: 28 }} onClick={() => go('cook', r)}>
          Start cooking →
        </button>
        <button
          className="btn-ghost"
          style={{ width: '100%', marginTop: 10 }}
          onClick={() => setShopAdded(true)}
          disabled={shopAdded}
        >
          {shopAdded ? '✓ Added to shopping list' : 'Add missing to shopping list'}
        </button>

        {/* Recipe notes — handwritten block at bottom */}
        <div style={{ marginTop: 28, paddingTop: 22, borderTop: '1px dashed var(--rule)' }}>
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
            <button
              className="btn-ghost"
              style={{ width: '100%' }}
              onClick={() => setNotesOpen(true)}
            >
              Add notes...
            </button>
          )}
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
function CookScreen({ go, recipe }) {
  const r = recipe || RECIPES[0];
  const [handsFree, setHandsFree] = React.useState(false);
  const [activeTimer, setActiveTimer] = React.useState(null); // index of step with running timer
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
        <button onClick={() => go('recipe', r)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
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
        }}>
          <div className="stamp" style={{
            position: 'absolute', top: 18, right: 18,
            width: 76, height: 76, color: 'var(--stamp-red)', fontSize: 9,
            background: 'rgba(243,233,215,0.85)',
          }}>
            <div>{r.stamp}</div>
            <div style={{ fontSize: 7, opacity: 0.7, marginTop: 2 }}>★ COOKING ★</div>
          </div>
        </div>

        <div style={{ padding: '20px 22px 8px' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--terracotta)', letterSpacing: '0.16em' }}>FROM {r.origin.toUpperCase()}</div>
          <h1 className="h1" style={{ marginTop: 4, fontSize: 36, lineHeight: 1.0 }}>{r.name}</h1>
          <div className="script-note" style={{ marginTop: 8, fontSize: 17 }}>"{r.blurb}"</div>
        </div>

        {/* Ingredients restated */}
        <div style={{ padding: '12px 22px 0' }}>
          <div className="eyebrow" style={{ marginTop: 12 }}>Ingredients · check as you prep</div>
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
              return (
                <div key={i} onClick={() => toggle(i)} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 0',
                  borderBottom: i === allIngredients[allIngredients.length - 1] ? 'none' : '1px dashed var(--rule)',
                  cursor: 'pointer',
                }}>
                  <div className={`cb ${isChecked ? 'on' : ''}`} style={{
                    width: 18, height: 18,
                    borderColor: isHave ? 'var(--sage)' : 'var(--terracotta)',
                  }}>
                    {isChecked && <Icon name="check" size={11} strokeWidth={2.5}/>}
                  </div>
                  <span style={{
                    fontSize: 14,
                    color: isChecked ? 'var(--ink-3)' : 'var(--ink)',
                    textDecoration: isChecked ? 'line-through' : 'none',
                  }}>{i}</span>
                  <span className="mono" style={{
                    fontSize: 9,
                    color: isHave ? 'var(--sage)' : 'var(--terracotta)',
                    marginLeft: 'auto', letterSpacing: '0.1em',
                  }}>{isHave ? 'HAVE' : 'NEED'}</span>
                </div>
              );
            })}
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

        {/* Finish block */}
        <div style={{ padding: '32px 22px 24px' }}>
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
            <button className="btn-primary" style={{ width: '100%', marginTop: 18 }} onClick={() => go('home')}>
              Plate & stamp passport ★
            </button>
            <button
              className="btn-ghost"
              style={{ width: '100%', marginTop: 8 }}
              onClick={() => go('recipe', r)}
            >
              Add notes to this recipe
            </button>
          </div>
        </div>
      </div>
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
        <FPOButton label="PRIMARY · 48h · 'Stamp my passport ★'" filled={true} onClick={() => go('home')} />
      </div>
    </WireShell>
  );
}

Object.assign(window, {
  HomeScreen, PantryScreen, MatchesScreen, FilterSheet, RecipeScreen, CookScreen,
  OnboardingScreen1, OnboardingScreen2, OnboardingScreen3,
});
