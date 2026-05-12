// screens-b.jsx — Spice Library, Spice Detail, Discover Map, Import, Learning, Profile

// ───────── PHOTO UPLOAD HELPERS ─────────
// Shared utility for the Profile screen: pick from camera/library, strip
// metadata via canvas re-encode, resize, and persist as data URLs in
// localStorage. NEVER preserves EXIF / GPS — we re-render to a clean canvas.
const SNAPS_KEY = 'tb.snaps.v1';
const AVATAR_KEY = 'tb.avatar.v1';

function loadSnaps() {
  try { return JSON.parse(localStorage.getItem(SNAPS_KEY) || '[]'); }
  catch (_) { return []; }
}
function saveSnaps(arr) {
  try { localStorage.setItem(SNAPS_KEY, JSON.stringify(arr)); } catch (_) {}
}
function loadAvatar() {
  try { return localStorage.getItem(AVATAR_KEY) || null; } catch (_) { return null; }
}
function saveAvatar(dataUrl) {
  try {
    if (dataUrl) localStorage.setItem(AVATAR_KEY, dataUrl);
    else localStorage.removeItem(AVATAR_KEY);
  } catch (_) {}
}

// Re-encode through a canvas — drops ALL EXIF (GPS, camera, time, orientation).
// We honor the EXIF orientation flag during decode so portrait photos aren't
// stored sideways, but we don't carry the flag forward.
async function fileToCleanDataUrl(file, maxDim = 1200, quality = 0.82, square = false) {
  let bitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch (_) {
    bitmap = await createImageBitmap(file);
  }
  let w, h, sx = 0, sy = 0, sw = bitmap.width, sh = bitmap.height;
  if (square) {
    const side = Math.min(bitmap.width, bitmap.height);
    sx = (bitmap.width - side) / 2;
    sy = (bitmap.height - side) / 2;
    sw = sh = side;
    w = h = Math.min(side, maxDim);
  } else {
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    w = Math.round(bitmap.width * scale);
    h = Math.round(bitmap.height * scale);
  }
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, w, h);
  return canvas.toDataURL('image/jpeg', quality);
}

// Camera-vs-library prompt sheet. Renders a small modal asking which source.
// "Camera" sets capture="environment" so the OS opens the rear camera and
// implicitly asks for permission. "Library" omits capture for a normal picker.
function PhotoSourceSheet({ open, onPick, onClose, title = 'Add a photo' }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, background: 'rgba(42,29,18,0.55)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      zIndex: 100, animation: 'tb-fade-in 160ms ease-out',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: '100%', background: 'var(--paper)',
        borderTopLeftRadius: 16, borderTopRightRadius: 16,
        padding: '18px 18px 22px', boxShadow: '0 -4px 24px rgba(0,0,0,0.18)',
      }}>
        <div style={{ width: 36, height: 4, background: 'var(--rule)', borderRadius: 2, margin: '0 auto 14px' }} />
        <div className="serif" style={{ fontSize: 20, textAlign: 'center' }}>{title}</div>
        <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.14em', textAlign: 'center', marginTop: 4 }}>
          PHOTO METADATA IS STRIPPED · NO LOCATION SAVED
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
          <button className="btn-primary" style={{ width: '100%' }} onClick={() => onPick('camera')}>
            Take a photo
          </button>
          <button className="btn-ghost" style={{ width: '100%' }} onClick={() => onPick('library')}>
            Choose from library
          </button>
          <button onClick={onClose} style={{
            background: 'transparent', border: 'none', color: 'var(--ink-3)',
            fontFamily: 'Inter, sans-serif', fontSize: 13, padding: 8, cursor: 'pointer',
          }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ───────── SPICE LIBRARY ─────────
function LearnScreen({ go }) {
  const [tab, setTab] = React.useState('spices');

  return (
    <div style={{ padding: '8px 22px 24px' }}>
      <div className="eyebrow" style={{ marginTop: 6 }}>Field Notes</div>
      <h1 className="h1">Learn</h1>
      <div className="script-note" style={{ marginTop: 6 }}>spices, dishes & little stories</div>

      <div style={{ display: 'flex', gap: 6, marginTop: 18 }}>
        {[{i:'spices',l:'Spices'},{i:'dishes',l:'Dishes'},{i:'techniques',l:'Techniques'}].map(t => (
          <button key={t.i} className={'chip' + (tab === t.i ? ' active' : '')} onClick={() => setTab(t.i)}>{t.l}</button>
        ))}
      </div>

      {tab === 'spices' && <LearnSpices go={go} />}
      {tab === 'dishes' && <LearnAtlas go={go} mode="dishes" />}
      {tab === 'techniques' && <LearnAtlas go={go} mode="techniques" />}
    </div>
  );
}

// ───────── LEARN · SPICES TAB ─────────
function LearnSpices({ go }) {
  const [query, setQuery] = React.useState('');
  const [showAll, setShowAll] = React.useState(false);

  const pantryNames = new Set(PANTRY.filter(p => p.have).map(p => p.name.toLowerCase()));
  const inPantry = (s) => pantryNames.has(s.name.toLowerCase());

  const q = query.trim().toLowerCase();
  const matches = SPICES.filter(s => {
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      s.origin.toLowerCase().includes(q) ||
      s.taste.toLowerCase().includes(q) ||
      s.regions.some(r => r.toLowerCase().includes(q)) ||
      s.pairs.some(p => p.toLowerCase().includes(q))
    );
  });

  const beyondPantry = SPICES.filter(s => !inPantry(s)).slice(0, 4);
  const visibleMatches = showAll || q ? matches : matches.slice(0, 4);
  const hasMore = !q && !showAll && matches.length > 4;

  return (
    <>
      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--paper-2)', borderRadius: 12, marginTop: 16, border: '1px solid var(--rule)' }}>
        <Icon name="search" size={18} stroke="var(--ink-3)" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search spices, ingredients, regions…"
          style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'var(--ink)' }}
        />
        {query && (
          <button onClick={() => setQuery('')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
            <Icon name="close" size={16} stroke="var(--ink-3)" />
          </button>
        )}
      </div>

      {/* Daily card — hide while searching */}
      {!q && (
        <div className="card" style={{ marginTop: 18, padding: 18, position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, var(--paper-2), var(--paper-3))' }}>
          <div className="tape" style={{ top: -8, right: 24, transform: 'rotate(6deg)' }} />
          <div className="mono" style={{ fontSize: 9, color: 'var(--terracotta)', letterSpacing: '0.18em' }}>★ TODAY'S CARD · DAY 47</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}>
            <div className="spice-disc" style={{ width: 72, height: 72, background: '#6b3a4f' }}>
              <span style={{ fontSize: 22 }}>八</span>
            </div>
            <div>
              <h2 className="h2" style={{ fontSize: 24 }}>Star Anise</h2>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>八角 · Bā jiǎo · China</div>
            </div>
          </div>
          <div className="script" style={{ fontSize: 17, marginTop: 12, lineHeight: 1.4, color: 'var(--ink-2)' }}>
            A small wooden flower with eight points. The cinnamon's strange cousin.
          </div>
          <button className="btn-primary" style={{ width: '100%', marginTop: 14 }} onClick={() => go('spice', SPICES.find(s => s.id === 'staranise'))}>
            Open the card →
          </button>
        </div>
      )}

      {/* Library grid */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 24, marginBottom: 14 }}>
        <div className="eyebrow">{q ? `Results · ${matches.length}` : `The Spice Drawer · ${SPICES.length}`}</div>
        {q && matches.length === 0 && <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)' }}>NO MATCHES</div>}
      </div>
      {matches.length === 0 && q ? (
        <div style={{ padding: 24, textAlign: 'center', border: '1px dashed var(--rule)', borderRadius: 12 }}>
          <div className="script-note" style={{ fontSize: 18 }}>nothing in the drawer for "{query}"</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 6 }}>try a region, a taste, or a dish</div>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {visibleMatches.map(s => (
              <button key={s.id} className="card" style={{ padding: 14, textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, position: 'relative' }} onClick={() => go('spice', s)}>
                {!inPantry(s) && (
                  <div style={{ position: 'absolute', top: 10, right: 10, width: 6, height: 6, borderRadius: '50%', background: 'var(--terracotta)' }} title="not in pantry" />
                )}
                <div className="spice-disc" style={{ width: 48, height: 48, background: s.color }}>
                  <span style={{ fontSize: 14 }}>{s.script[0]}</span>
                </div>
                <div>
                  <div className="serif" style={{ fontSize: 16, lineHeight: 1.1 }}>{s.name}</div>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.12em', marginTop: 2 }}>{s.origin.toUpperCase()}</div>
                </div>
                <div style={{ display: 'flex', gap: 2, marginTop: 'auto' }}>
                  {[0,1,2,3].map(i => (
                    <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: i < s.heat ? 'var(--terracotta)' : 'var(--rule)' }} />
                  ))}
                </div>
              </button>
            ))}
          </div>
          {hasMore && (
            <button
              onClick={() => setShowAll(true)}
              style={{
                width: '100%', marginTop: 14,
                background: 'transparent',
                border: '1px dashed var(--ink-3)',
                borderRadius: 100,
                padding: '12px 18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500,
                color: 'var(--ink)',
              }}>
              Show more · {matches.length - 4} spices
              <Icon name="arrow-right" size={15} />
            </button>
          )}
          {showAll && !q && matches.length > 4 && (
            <button
              onClick={() => setShowAll(false)}
              style={{
                width: '100%', marginTop: 14,
                background: 'transparent',
                border: 'none',
                padding: '8px 18px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
                color: 'var(--ink-3)',
              }}>
              Show less
            </button>
          )}
        </>
      )}

      {/* Beyond your pantry — moved below the drawer */}
      {!q && beyondPantry.length > 0 && (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 28, marginBottom: 4 }}>
            <div className="eyebrow">Beyond your pantry</div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>{beyondPantry.length} TO TRY</div>
          </div>
          <div className="script-note" style={{ fontSize: 14, marginBottom: 12 }}>spices you haven't met yet</div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, marginLeft: -22, marginRight: -22, paddingLeft: 22, paddingRight: 22 }} className="scroll-area">
            {beyondPantry.map(s => (
              <button key={s.id} className="card" style={{ width: 150, flexShrink: 0, padding: 12, cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }} onClick={() => go('spice', s)}>
                <div style={{ position: 'absolute', top: 8, right: 8, fontSize: 8, fontFamily: 'JetBrains Mono', color: 'var(--terracotta)', letterSpacing: '0.12em', padding: '2px 6px', border: '1px solid var(--terracotta)', borderRadius: 100 }}>NEW</div>
                <div className="spice-disc" style={{ width: 52, height: 52, background: s.color }}>
                  <span style={{ fontSize: 14 }}>{s.script[0]}</span>
                </div>
                <div>
                  <div className="serif" style={{ fontSize: 15, lineHeight: 1.1 }}>{s.name}</div>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.12em', marginTop: 3 }}>{s.origin.toUpperCase()}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-2)', lineHeight: 1.3, marginTop: 'auto' }}>{s.taste}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
}

// ───────── SPICE DETAIL ─────────
function SpiceScreen({ go, spice }) {
  const s = spice || SPICES[0];
  return (
    <div>
      {/* Header */}
      <div style={{ padding: '8px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
          <button onClick={() => go('learn')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
            <Icon name="arrow-left" size={20} />
          </button>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.16em', flex: 1 }}>SPICE №{(SPICES.indexOf(s)+1).toString().padStart(2,'0')}</div>
          <Icon name="bookmark" size={20} />
        </div>
      </div>

      {/* Big disc + card layout */}
      <div style={{ padding: '20px 22px 0', textAlign: 'center', position: 'relative' }}>
        <div className="spice-disc" style={{ width: 160, height: 160, margin: '0 auto', background: s.color, position: 'relative' }}>
          <span style={{ fontSize: 56, fontFamily: 'DM Serif Display, serif' }}>{s.script.length < 4 ? s.script : s.script[0]}</span>
        </div>
        <h1 className="h1" style={{ marginTop: 18, fontSize: 44 }}>{s.name}</h1>
        <div className="script-note" style={{ fontSize: 24, marginTop: 4 }}>{s.script}</div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.18em', marginTop: 6 }}>FROM {s.origin.toUpperCase()}</div>
      </div>

      {/* Card grid */}
      <div style={{ padding: '24px 22px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="card" style={{ padding: 14 }}>
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.16em' }}>TASTE</div>
            <div className="serif" style={{ fontSize: 16, marginTop: 6, lineHeight: 1.2 }}>{s.taste}</div>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.16em' }}>HEAT</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
              {[0,1,2,3,4].map(i => (
                <Icon key={i} name="flame" size={14} stroke={i < s.heat ? 'var(--terracotta)' : 'var(--ink-3)'} />
              ))}
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 6 }}>{['NONE','MILD','WARM','HOT','FIERY'][s.heat]}</div>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.16em' }}>PAIRS WITH</div>
            <div style={{ marginTop: 6 }}>
              {s.pairs.map(p => (
                <div key={p} className="serif" style={{ fontSize: 14 }}>· {p}</div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.16em' }}>FOUND IN</div>
            <div style={{ marginTop: 6 }}>
              {s.regions.map(r => (
                <div key={r} className="serif" style={{ fontSize: 14 }}>· {r}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Postcard tale */}
        <div style={{ marginTop: 20, padding: 18, border: '1px dashed var(--ink-3)', borderRadius: 8, background: 'var(--paper-2)', position: 'relative' }}>
          <div className="mono" style={{ fontSize: 9, color: 'var(--terracotta)', letterSpacing: '0.18em', fontWeight: 700 }}>★ A POSTCARD</div>
          <div className="script" style={{ fontSize: 20, marginTop: 8, lineHeight: 1.35, color: 'var(--ink)' }}>
            {s.tale}
          </div>
          <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', textAlign: 'right', marginTop: 10 }}>— TRAVELBITE NOTES</div>
        </div>

        {/* Used in */}
        <div className="eyebrow" style={{ marginTop: 24 }}>Cook with it</div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginTop: 12, paddingBottom: 4 }} className="scroll-area">
          {RECIPES.slice(0, 3).map(r => (
            <button key={r.id} className="card" style={{ width: 130, flexShrink: 0, padding: 8, cursor: 'pointer' }} onClick={() => go('recipe', r)}>
              <div className={r.photo ? 'food-photo' : 'food-ph'} data-label={r.id} style={{ width: '100%', height: 80, backgroundImage: r.photo ? `url(${r.photo})` : undefined }} />
              <div className="serif" style={{ fontSize: 13, marginTop: 6 }}>{r.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────── DISCOVER / TRAVEL MAP ─────────
function DiscoverScreen({ go }) {
  const [active, setActive] = React.useState(CUISINES[0].id);
  const a = CUISINES.find(c => c.id === active);
  return (
    <div style={{ padding: '8px 22px 24px' }}>
      <div className="eyebrow" style={{ marginTop: 6 }}>Atlas of flavor</div>
      <h1 className="h1">Travel by taste</h1>

      {/* Map */}
      <div className="card" style={{ marginTop: 18, padding: 14, position: 'relative', overflow: 'hidden', background: 'var(--paper-2)' }}>
        <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.16em' }}>WORLD · YOU ARE HERE ⊕</div>
        <div style={{ position: 'relative', width: '100%', height: 200, marginTop: 8 }}>
          {/* Atlas base map — light & dark variants, theme-switched via CSS */}
          <img src="atlas-light.jpg" alt="" className="atlas-map atlas-light" />
          <img src="atlas-dark.jpg"  alt="" className="atlas-map atlas-dark" />
          {/* Dotted journey line through visited cuisines */}
          <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <path d="M20 32 Q35 24 50 26 Q53 18 70 26 Q76 24 82 18" stroke="var(--terracotta)" strokeWidth="0.4" strokeDasharray="1,1.2" fill="none" opacity="0.7"/>
          </svg>
          {/* Cuisine pins */}
          {CUISINES.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{
              position: 'absolute', left: `${c.x}%`, top: `${c.y}%`,
              transform: 'translate(-50%, -50%)',
              width: active === c.id ? 32 : 22, height: active === c.id ? 32 : 22,
              borderRadius: '50%',
              background: c.color, border: '2px solid var(--paper)',
              boxShadow: active === c.id ? `0 0 0 4px ${c.color}33` : '0 1px 3px rgba(0,0,0,0.2)',
              cursor: 'pointer', padding: 0,
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 9, fontWeight: 700,
            }}>{c.visited}</button>
          ))}
        </div>
      </div>

      {/* Active cuisine card */}
      <div className="card fade-in" key={active} style={{ marginTop: 16, padding: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div className="stamp" style={{ width: 64, height: 64, color: a.color, fontSize: 8, flexShrink: 0 }}>
            <div>{a.name.toUpperCase().slice(0, 7)}</div>
            <div style={{ fontSize: 6, opacity: 0.7, marginTop: 1 }}>★ ★ ★</div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>{a.region.toUpperCase()}</div>
            <h2 className="h2" style={{ fontSize: 24, marginTop: 4 }}>{a.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <div style={{ flex: 1, height: 4, background: 'var(--paper-3)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${a.visited / a.of * 100}%`, height: '100%', background: a.color }} />
              </div>
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-2)' }}>{a.visited}/{a.of}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
          {['cumin', 'paprika', 'preserved lemon', 'mint'].map(t => (
            <span key={t} className="chip" style={{ fontSize: 11 }}>{t}</span>
          ))}
        </div>
        <button className="btn-primary" style={{ width: '100%', marginTop: 14 }} onClick={() => go('matches')}>
          Explore unstamped recipes →
        </button>
      </div>

      {/* Most-stamped */}
      <div className="eyebrow" style={{ marginTop: 24 }}>Most stamped</div>
      <div style={{ marginTop: 12 }}>
        {CUISINES.sort((a,b) => b.visited - a.visited).slice(0, 3).map((c, i) => (
          <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px dashed var(--rule)' }}>
            <div className="serif" style={{ fontSize: 22, color: 'var(--ink-3)', width: 22 }}>{i+1}</div>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: c.color }} />
            <div style={{ flex: 1 }}>
              <div className="serif" style={{ fontSize: 16 }}>{c.name}</div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)' }}>{c.visited} STAMPS</div>
            </div>
            <Icon name="arrow-right" size={16} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────── IMPORT SHEET ─────────
function ImportSheet({ onClose, go }) {
  const [step, setStep] = React.useState(0); // 0 sources, 1 paste, 2 parsing, 3 done
  const [src, setSrc] = React.useState(null);
  const [url, setUrl] = React.useState('');

  const sources = [
    { id: 'tiktok', name: 'TikTok', icon: 'tiktok', color: '#1a1a1a' },
    { id: 'instagram', name: 'Instagram', icon: 'instagram', color: '#c25a3b' },
    { id: 'pinterest', name: 'Pinterest', icon: 'pinterest', color: '#b03a2e' },
    { id: 'youtube', name: 'YouTube', icon: 'youtube', color: '#a64627' },
    { id: 'web', name: 'Any website', icon: 'link', color: 'var(--sage)' },
    { id: 'photo', name: 'Photo / cookbook', icon: 'camera', color: 'var(--turmeric)' },
  ];

  const startParse = () => {
    setStep(2);
    setTimeout(() => setStep(3), 1800);
  };

  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet" style={{ paddingBottom: 22, maxHeight: '88%' }}>
        <div className="sheet-handle" />
        <div style={{ padding: '8px 22px 22px', flex: 1, overflow: 'auto' }} className="scroll-area">

          {step === 0 && (
            <div>
              <div className="eyebrow">Import a recipe</div>
              <h2 className="h2" style={{ marginTop: 6 }}>Where's it from?</h2>
              <div className="script-note" style={{ marginTop: 6 }}>we'll do the rest</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 18 }}>
                {sources.map(s => (
                  <button key={s.id} className="card" style={{ padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, cursor: 'pointer', textAlign: 'left' }} onClick={() => { setSrc(s); setStep(1); }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                      <Icon name={s.icon} size={18} />
                    </div>
                    <div className="serif" style={{ fontSize: 15 }}>{s.name}</div>
                  </button>
                ))}
              </div>
              <div className="card" style={{ marginTop: 16, padding: 14, display: 'flex', gap: 10, alignItems: 'center', background: 'var(--paper-3)' }}>
                <Icon name="sparkle" size={18} stroke="var(--terracotta)" />
                <div style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.4 }}>
                  Or share to TravelBite from any app — we listen for links and videos.
                </div>
              </div>
            </div>
          )}

          {step === 1 && src && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={() => setStep(0)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}><Icon name="arrow-left" size={20}/></button>
                <div className="eyebrow">From {src.name}</div>
              </div>
              <h2 className="h2" style={{ marginTop: 8 }}>Paste a link</h2>
              <div style={{ marginTop: 18, padding: 14, background: 'var(--paper-2)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, border: '1px solid var(--rule)' }}>
                <Icon name={src.icon} size={18} stroke="var(--ink-3)"/>
                <input
                  autoFocus
                  placeholder={`https://${src.id}.com/…`}
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}
                />
                <button onClick={() => setUrl('https://' + src.id + '.com/p/recipe-shakshuka-vibes')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--ink-3)', fontSize: 11, fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>Paste</button>
              </div>
              <button className="btn-primary" style={{ width: '100%', marginTop: 18, opacity: url ? 1 : 0.5 }} disabled={!url} onClick={startParse}>
                Parse it →
              </button>
              <div className="card" style={{ marginTop: 14, padding: 12, display: 'flex', gap: 10, background: 'var(--paper-3)' }}>
                <Icon name="sparkle" size={16} stroke="var(--turmeric)"/>
                <div style={{ fontSize: 11, color: 'var(--ink-2)', lineHeight: 1.4 }}>
                  We'll watch the video, transcribe the cook, and pull a clean ingredient list.
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ textAlign: 'center', padding: '40px 12px' }}>
              <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <div className="spice-disc" style={{ width: 80, height: 80, background: 'var(--terracotta)', animation: 'fadein 0.4s' }}>
                  <Icon name="sparkle" size={28} stroke="#fff" />
                </div>
                <div className="script-note" style={{ fontSize: 22 }}>reading the recipe…</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.16em' }}>
                  TRANSCRIBING · EXTRACTING · MATCHING
                </div>
                <div style={{ width: 200, height: 3, background: 'var(--rule)', borderRadius: 2, overflow: 'hidden', marginTop: 8 }}>
                  <div style={{ width: '70%', height: '100%', background: 'var(--terracotta)', animation: 'fadein 1.6s' }} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="fade-in">
              <div className="mono" style={{ fontSize: 10, color: 'var(--sage)', letterSpacing: '0.16em' }}>★ IMPORTED · 14 INGREDIENTS · 5 STEPS</div>
              <h2 className="h2" style={{ marginTop: 6 }}>Smoky Tomato Eggs</h2>
              <div className="script-note" style={{ marginTop: 4 }}>looks a lot like shakshuka.</div>

              <div className="card" style={{ marginTop: 16, padding: 14, display: 'flex', gap: 12 }}>
                <div className="food-ph" data-label="imported" style={{ width: 80, height: 80, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 11, lineHeight: 1.5, color: 'var(--ink-2)' }}>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.12em' }}>FROM @PASTAGRANNIES · 1.2M VIEWS</div>
                  <div style={{ marginTop: 6 }}>"Crack 4 eggs into a bubbling pan of garlic-y tomatoes, cumin and a heavy hand of paprika…"</div>
                </div>
              </div>

              <div className="eyebrow" style={{ marginTop: 18 }}>Match to your pantry</div>
              <div className="card" style={{ marginTop: 10, padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="serif" style={{ fontSize: 28 }}>92%</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: 'var(--ink)' }}>You have 12 of 14 ingredients</div>
                    <div className="mono" style={{ fontSize: 9, color: 'var(--terracotta)', letterSpacing: '0.12em', marginTop: 2 }}>NEED · FRESH PARSLEY · FETA</div>
                  </div>
                </div>
              </div>

              <button className="btn-primary" style={{ width: '100%', marginTop: 18 }} onClick={() => { onClose(); go('recipe', RECIPES[0]); }}>
                Save & cook →
              </button>
              <button className="btn-ghost" style={{ width: '100%', marginTop: 8 }} onClick={onClose}>
                Save for later
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ───────── PROFILE / TRAVELER ─────────
function MeScreen({ go }) {
  const [active, setActive] = React.useState(CUISINES[0].id);
  const a = CUISINES.find(c => c.id === active);
  const totalCuisines = CUISINES.reduce((sum, c) => sum + c.of, 0);
  const visitedCuisines = CUISINES.reduce((sum, c) => sum + c.visited, 0);

  // ── Avatar (profile picture) ──
  const [avatar, setAvatar] = React.useState(loadAvatar);
  const [avatarSheet, setAvatarSheet] = React.useState(false);
  const avatarInputRef = React.useRef(null);

  // ── Snaps gallery ──
  const [snaps, setSnaps] = React.useState(loadSnaps);
  const [snapSheet, setSnapSheet] = React.useState(false);
  const [galleryFull, setGalleryFull] = React.useState(false);  // full-page view
  const [lightbox, setLightbox] = React.useState(null);          // shadowbox view: snap object or null
  const [captionPending, setCaptionPending] = React.useState([]); // newly uploaded snaps awaiting caption
  const snapInputRef = React.useRef(null);

  // Pending source choice — 'avatar' or 'snap'. Set when the user opens a sheet.
  const [pendingTarget, setPendingTarget] = React.useState(null);

  function openSheet(target) {
    setPendingTarget(target);
    if (target === 'avatar') setAvatarSheet(true);
    else setSnapSheet(true);
  }

  function pickSource(source) {
    const input = pendingTarget === 'avatar' ? avatarInputRef.current : snapInputRef.current;
    if (!input) return;
    if (source === 'camera') input.setAttribute('capture', 'environment');
    else input.removeAttribute('capture');
    setAvatarSheet(false);
    setSnapSheet(false);
    // Slight defer so the sheet can unmount before the OS picker steals focus.
    setTimeout(() => input.click(), 80);
  }

  async function onAvatarFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const url = await fileToCleanDataUrl(file, 256, 0.85, /*square*/true);
    setAvatar(url);
    saveAvatar(url);
  }

  async function onSnapFile(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;
    const fresh = [];
    for (const f of files) {
      const url = await fileToCleanDataUrl(f, 1000, 0.8, /*square*/true);
      fresh.push({ id: `s${Date.now()}-${Math.random().toString(36).slice(2,7)}`, url, t: Date.now(), caption: '' });
    }
    // Commit to gallery immediately so the user sees the photo, then queue
    // the caption sheet — they can also Skip to leave it blank.
    const next = [...fresh, ...snaps];
    setSnaps(next);
    saveSnaps(next);
    setCaptionPending(fresh);
  }

  function setCaption(id, caption) {
    setSnaps(prev => {
      const next = prev.map(s => s.id === id ? { ...s, caption } : s);
      saveSnaps(next);
      // Keep lightbox in sync if the edited snap is open.
      setLightbox(lb => lb && lb.id === id ? { ...lb, caption } : lb);
      return next;
    });
  }

  function removeSnap(id) {
    const next = snaps.filter(s => s.id !== id);
    setSnaps(next);
    saveSnaps(next);
    setLightbox(null);
  }

  // Render a single snap tile (used in both grid views).
  const SnapTile = ({ snap, onClick }) => (
    <button onClick={onClick} style={{
      position: 'relative', width: '100%', aspectRatio: 1, padding: 0,
      border: '1px solid var(--rule)', borderRadius: 6, overflow: 'hidden',
      background: 'var(--paper-3)', cursor: 'pointer',
    }}>
      <img src={snap.url} alt={snap.caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      {snap.caption && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '14px 6px 4px',
          background: 'linear-gradient(to top, rgba(20,12,6,0.78) 0%, rgba(20,12,6,0) 100%)',
          color: 'var(--paper)',
          fontFamily: '"Caveat", cursive', fontSize: 14, lineHeight: 1.05,
          textAlign: 'center',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          pointerEvents: 'none',
        }}>
          {snap.caption}
        </div>
      )}
    </button>
  );

  const AddTile = ({ onClick, label = '+' }) => (
    <button onClick={onClick} style={{
      width: '100%', aspectRatio: 1, padding: 0,
      border: '1.5px dashed var(--rule)', borderRadius: 6,
      background: 'var(--paper-2)', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 4,
      color: 'var(--ink-3)', fontFamily: 'DM Serif Display, serif', fontSize: 36, lineHeight: 1,
    }}>
      <div>{label}</div>
      <div className="mono" style={{ fontSize: 8, letterSpacing: '0.16em' }}>ADD A SNAP</div>
    </button>
  );

  // ── Full-page gallery view ──
  if (galleryFull) {
    return (
      <div style={{ padding: '8px 22px 24px', position: 'relative' }}>
        <button onClick={() => setGalleryFull(false)} style={{
          display: 'flex', alignItems: 'center', gap: 8, background: 'transparent',
          border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ink-2)',
          fontFamily: 'Inter, sans-serif', fontSize: 12,
        }}>
          <Icon name="arrow-left" size={16} stroke="var(--ink-2)" />
          Passport
        </button>
        <div className="eyebrow" style={{ marginTop: 14 }}>Memories</div>
        <h1 className="h1" style={{ fontSize: 38, lineHeight: 1 }}>Snaps from<br/>Off the Grid</h1>
        <div className="script-note" style={{ fontSize: 16, marginTop: 6 }}>
          {snaps.length} {snaps.length === 1 ? 'memory' : 'memories'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 18 }}>
          <AddTile onClick={() => openSheet('snap')} />
          {snaps.map(s => <SnapTile key={s.id} snap={s} onClick={() => setLightbox(s)} />)}
        </div>
        <input ref={snapInputRef} type="file" accept="image/*" multiple hidden onChange={onSnapFile} />
        <PhotoSourceSheet open={snapSheet} onClose={() => setSnapSheet(false)} onPick={pickSource} title="Add a snap" />
        {captionPending.length > 0 && (
          <CaptionSheet
            queue={captionPending}
            onSave={(id, text) => setCaption(id, text)}
            onDone={() => setCaptionPending([])}
          />
        )}
        {lightbox && <Shadowbox snap={lightbox} onClose={() => setLightbox(null)} onRemove={() => removeSnap(lightbox.id)} onCaption={(t) => setCaption(lightbox.id, t)} />}
      </div>
    );
  }

  // Up to 9 tiles on the passport (3 rows × 3 cols), with the last cell as the
  // "+" upload tile, so the grid is always 3 visible rows.
  const previewSnaps = snaps.slice(0, 8);
  const fillerCount = Math.max(0, 8 - previewSnaps.length);

  return (
    <div style={{ padding: '8px 22px 24px', position: 'relative' }}>
      <div className="eyebrow" style={{ marginTop: 6 }}>Cook's passport</div>

      {/* Title row — name on left, avatar on right */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <h1 className="h1" style={{ margin: 0 }}>Maya R.</h1>

        {/* ── Avatar circle (right-aligned to match rank card below) ── */}
        <button
          onClick={() => openSheet('avatar')}
          aria-label={avatar ? 'Change profile photo' : 'Upload profile photo'}
          style={{
            flex: '0 0 auto', width: 64, height: 64, borderRadius: '50%',
            border: '1.5px dashed var(--rule)', background: 'var(--paper-2)',
            padding: 0, cursor: 'pointer', overflow: 'hidden', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          {avatar ? (
            <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            // Unisex traveler — figure with a brim hat + slung bag
            <svg viewBox="0 0 40 40" width="38" height="38" aria-hidden="true">
              <g fill="none" stroke="var(--ink-3)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="20" cy="11" rx="3.6" ry="3.8"/>
                <path d="M12 13 Q20 9 28 13"/>
                <path d="M14 27 Q14 19 20 19 Q26 19 26 27"/>
                <path d="M14 27 L14 32 M26 27 L26 32"/>
                <path d="M24 21 L31 25 L29 30"/>
                <circle cx="29" cy="30" r="1.4" fill="var(--ink-3)"/>
              </g>
            </svg>
          )}
          {!avatar && (
            <div style={{
              position: 'absolute', right: -2, bottom: -2, width: 22, height: 22,
              borderRadius: '50%', background: 'var(--terracotta)', color: 'var(--paper)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'DM Serif Display, serif', fontSize: 16, lineHeight: 1,
              border: '2px solid var(--paper)',
            }}>+</div>
          )}
        </button>
        <input ref={avatarInputRef} type="file" accept="image/*" hidden onChange={onAvatarFile} />
      </div>

      {/* Rank card — full-width, Apprentice Wanderer fits on one line */}
      <div className="card" style={{ marginTop: 18, padding: 18, position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div className="spice-disc" style={{ width: 64, height: 64, background: 'var(--terracotta)', position: 'relative', flex: '0 0 auto' }}>
            <svg viewBox="0 0 64 64" width="48" height="48" style={{ display: 'block' }}>
              <g fill="none" stroke="var(--paper)" strokeWidth="1.4" strokeLinejoin="round">
                <path d="M32 6 L36 11 L42 9 L43 15 L49 17 L47 23 L52 27 L48 32 L52 37 L47 41 L49 47 L43 49 L42 55 L36 53 L32 58 L28 53 L22 55 L21 49 L15 47 L17 41 L12 37 L16 32 L12 27 L17 23 L15 17 L21 15 L22 9 L28 11 Z" />
                <circle cx="32" cy="32" r="14" />
              </g>
              <g fill="var(--paper)" stroke="none">
                <path d="M32 22 L34 29 L41 29 L35.5 33 L37.5 40 L32 36 L26.5 40 L28.5 33 L23 29 L30 29 Z" />
              </g>
              <g fill="var(--paper)" opacity="0.9">
                <path d="M24 49 L20 60 L26 56 L28 53 Z" />
                <path d="M40 49 L44 60 L38 56 L36 53 Z" />
              </g>
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="serif" style={{ fontSize: 18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Apprentice Wanderer</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.12em', marginTop: 2 }}>21 STAMPS · 47-DAY STREAK</div>
            <div style={{ height: 4, background: 'var(--paper-3)', borderRadius: 2, marginTop: 8, overflow: 'hidden' }}>
              <div style={{ width: '36%', height: '100%', background: 'var(--terracotta)' }} />
            </div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', marginTop: 4 }}>14 STAMPS TO "GLOBETROTTER"</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
        {[
          { k: '21', l: 'cuisines' },
          { k: '67', l: 'cooked' },
          { k: '12', l: 'spices' },
        ].map(s => (
          <div key={s.l} className="card" style={{ padding: 12, textAlign: 'center' }}>
            <div className="serif" style={{ fontSize: 28 }}>{s.k}</div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.12em' }}>{s.l.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Cuisines row + Map (under it) */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 26 }}>
        <div className="eyebrow">Atlas of flavor</div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{visitedCuisines} / {totalCuisines} cuisines</div>
      </div>

      <div className="card" style={{ marginTop: 12, padding: 14, position: 'relative', overflow: 'hidden', background: 'var(--paper-2)' }}>
        <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.16em' }}>WORLD · YOU ARE HERE ⊕</div>
        <div style={{ position: 'relative', width: '100%', height: 200, marginTop: 8 }}>
          {/* Atlas base map — light & dark variants, theme-switched via CSS */}
          <img src="atlas-light.jpg" alt="" className="atlas-map atlas-light" />
          <img src="atlas-dark.jpg"  alt="" className="atlas-map atlas-dark" />
          {/* Dotted journey line through visited cuisines */}
          <svg viewBox="0 0 100 60" preserveAspectRatio="none" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <path d="M20 32 Q35 24 50 26 Q53 18 70 26 Q76 24 82 18" stroke="var(--terracotta)" strokeWidth="0.4" strokeDasharray="1,1.2" fill="none" opacity="0.7"/>
          </svg>
          {CUISINES.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{
              position: 'absolute', left: `${c.x}%`, top: `${c.y}%`,
              transform: 'translate(-50%, -50%)',
              width: active === c.id ? 32 : 22, height: active === c.id ? 32 : 22,
              borderRadius: '50%',
              background: c.color, border: '2px solid var(--paper)',
              boxShadow: active === c.id ? `0 0 0 4px ${c.color}33` : '0 1px 3px rgba(0,0,0,0.2)',
              cursor: 'pointer', padding: 0,
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 9, fontWeight: 700,
            }}>{c.visited}</button>
          ))}
        </div>
      </div>

      {/* Stamps collected */}
      <div className="eyebrow" style={{ marginTop: 26 }}>Stamps collected</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 14 }}>
        {RECIPES.map((r, i) => (
          <div key={r.id} className="stamp" style={{
            width: '100%', aspectRatio: 1, color: ['var(--stamp-red)','var(--stamp-blue)','var(--sage)','var(--turmeric)','var(--plum)','var(--terracotta)'][i % 6], fontSize: 8,
            transform: `rotate(${[-6, 4, -3, 7, -5, 2][i]}deg)`,
          }}>
            <div>{r.stamp.slice(0, 8)}</div>
            <div style={{ fontSize: 6, opacity: 0.7, marginTop: 1 }}>★ 2026 ★</div>
          </div>
        ))}
      </div>

      {/* Most stamped (under stamps collected) */}
      <div className="eyebrow" style={{ marginTop: 26 }}>Most stamped</div>
      <div style={{ marginTop: 12 }}>
        {[...CUISINES].sort((a,b) => b.visited - a.visited).slice(0, 3).map((c, i) => (
          <div key={c.id} style={{ borderBottom: '1px dashed var(--rule)' }}>
            <button
              onClick={() => setActive(c.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 0',
                background: 'transparent', border: 'none', outline: 'none',
                textAlign: 'left', cursor: 'pointer',
                font: 'inherit', color: 'inherit',
              }}>
              <div className="serif" style={{ fontSize: 22, color: 'var(--ink-3)', width: 22 }}>{i+1}</div>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: c.color }} />
              <div style={{ flex: 1 }}>
                <div className="serif" style={{ fontSize: 16, color: 'var(--ink-3)' }}>{c.name}</div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)' }}>{c.visited} STAMPS</div>
              </div>
              <Icon name="arrow-right" size={16} stroke="var(--ink-3)" />
            </button>
          </div>
        ))}
      </div>

      {/* ───────── Snaps from Off the Grid ───────── */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 28 }}>
        <div className="eyebrow">Snaps from Off the Grid</div>
        <button
          onClick={() => setGalleryFull(true)}
          style={{
            background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
            letterSpacing: '0.14em', color: 'var(--terracotta)', textTransform: 'uppercase',
          }}>VIEW ALL →</button>
      </div>
      <div className="script-note" style={{ fontSize: 14, marginTop: 4 }}>your own kitchen postcards</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 12 }}>
        {previewSnaps.map(s => <SnapTile key={s.id} snap={s} onClick={() => setLightbox(s)} />)}
        <AddTile onClick={() => openSheet('snap')} />
        {Array.from({ length: fillerCount }).map((_, i) => (
          <div key={`f${i}`} style={{
            width: '100%', aspectRatio: 1,
            border: '1px dashed var(--rule)', borderRadius: 6,
            background: 'var(--paper-2)', opacity: 0.45,
          }} />
        ))}
      </div>

      <input ref={snapInputRef} type="file" accept="image/*" multiple hidden onChange={onSnapFile} />

      {/* Source-pick sheets */}
      <PhotoSourceSheet open={avatarSheet} onClose={() => setAvatarSheet(false)} onPick={pickSource} title="Profile photo" />
      <PhotoSourceSheet open={snapSheet} onClose={() => setSnapSheet(false)} onPick={pickSource} title="Add a snap" />

      {/* Caption queue (post-upload) */}
      {captionPending.length > 0 && (
        <CaptionSheet
          queue={captionPending}
          onSave={(id, text) => setCaption(id, text)}
          onDone={() => setCaptionPending([])}
        />
      )}

      {/* Shadowbox lightbox */}
      {lightbox && <Shadowbox snap={lightbox} onClose={() => setLightbox(null)} onRemove={() => removeSnap(lightbox.id)} onCaption={(t) => setCaption(lightbox.id, t)} />}
    </div>
  );
}

// ───────── SHADOWBOX (lightbox) ─────────
function Shadowbox({ snap, onClose, onRemove, onCaption }) {
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(snap.caption || '');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    setDraft(snap.caption || '');
  }, [snap.id, snap.caption]);

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  function commit() {
    onCaption && onCaption(draft.trim());
    setEditing(false);
  }

  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, background: 'rgba(20,12,6,0.88)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 110, padding: 18,
      animation: 'tb-fade-in 160ms ease-out',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'relative', maxWidth: '100%', maxHeight: '100%',
        background: 'var(--paper)', padding: 10,
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
      }}>
        <img src={snap.url} alt={snap.caption || ''} style={{ display: 'block', maxWidth: '100%', maxHeight: '52vh', objectFit: 'contain' }} />

        {/* Caption row — click anywhere to edit */}
        <div style={{ marginTop: 10, padding: '6px 4px', minHeight: 30, position: 'relative' }}>
          {editing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <textarea
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, 120))}
                placeholder="how was it?"
                rows={2}
                style={{
                  width: '100%', resize: 'none',
                  fontFamily: '"Caveat", cursive', fontSize: 22, lineHeight: 1.15,
                  color: 'var(--ink)', background: 'var(--paper-2)',
                  border: '1px dashed var(--rule)', borderRadius: 4,
                  padding: '6px 10px', outline: 'none',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.12em' }}>
                  {draft.length}/120
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => { setDraft(snap.caption || ''); setEditing(false); }} style={{
                    background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
                    letterSpacing: '0.14em', color: 'var(--ink-3)', textTransform: 'uppercase',
                  }}>CANCEL</button>
                  <button onClick={commit} style={{
                    background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
                    letterSpacing: '0.14em', color: 'var(--terracotta)', textTransform: 'uppercase',
                  }}>SAVE</button>
                </div>
              </div>
            </div>
          ) : (
            <button onClick={() => setEditing(true)} style={{
              width: '100%', textAlign: 'left',
              background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
              fontFamily: '"Caveat", cursive', fontSize: 22, lineHeight: 1.15,
              color: snap.caption ? 'var(--ink)' : 'var(--ink-3)',
              fontStyle: snap.caption ? 'normal' : 'italic',
            }}>
              {snap.caption || 'add a caption…'}
            </button>
          )}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 6, paddingTop: 8, borderTop: '1px dashed var(--rule)', gap: 10,
        }}>
          <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
            {new Date(snap.t).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
          </div>
          <button onClick={onRemove} style={{
            background: 'transparent', border: 'none', padding: 0, cursor: 'pointer',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
            letterSpacing: '0.14em', color: 'var(--stamp-red)', textTransform: 'uppercase',
          }}>REMOVE</button>
        </div>
      </div>
      <button onClick={onClose} aria-label="Close" style={{
        position: 'absolute', top: 14, right: 14,
        width: 36, height: 36, borderRadius: '50%',
        background: 'var(--paper)', border: '1px solid var(--rule)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', padding: 0,
        fontFamily: 'DM Serif Display, serif', fontSize: 22, lineHeight: 1, color: 'var(--ink-2)',
      }}>×</button>
    </div>
  );
}

// ───────── CAPTION SHEET (post-upload caption queue) ─────────
// Walks through newly uploaded snaps one at a time, prompting for an
// optional Caveat-script caption. "Skip" leaves caption blank.
function CaptionSheet({ queue, onSave, onDone }) {
  const [idx, setIdx] = React.useState(0);
  const [draft, setDraft] = React.useState('');
  const inputRef = React.useRef(null);
  const cur = queue[idx];

  React.useEffect(() => {
    setDraft('');
    if (inputRef.current) {
      const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [idx]);

  if (!cur) return null;

  function next() {
    if (idx + 1 < queue.length) setIdx(idx + 1);
    else onDone();
  }
  function commit() {
    if (draft.trim()) onSave(cur.id, draft.trim());
    next();
  }

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(42,29,18,0.55)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      zIndex: 105, animation: 'tb-fade-in 160ms ease-out',
    }}>
      <div style={{
        width: '100%', background: 'var(--paper)',
        borderTopLeftRadius: 16, borderTopRightRadius: 16,
        padding: '18px 18px 22px', boxShadow: '0 -4px 24px rgba(0,0,0,0.18)',
      }}>
        <div style={{ width: 36, height: 4, background: 'var(--rule)', borderRadius: 2, margin: '0 auto 14px' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="serif" style={{ fontSize: 20 }}>Add a caption</div>
          {queue.length > 1 && (
            <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>
              {idx + 1} / {queue.length}
            </div>
          )}
        </div>
        <div className="script-note" style={{ fontSize: 14, marginTop: 2 }}>optional · one short line</div>

        <div style={{
          marginTop: 14, display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <img src={cur.url} alt="" style={{
            width: 88, height: 88, objectFit: 'cover', borderRadius: 6,
            border: '1px solid var(--rule)', flex: '0 0 auto',
          }} />
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value.slice(0, 120))}
            placeholder="how was it?"
            rows={3}
            style={{
              flex: 1, resize: 'none',
              fontFamily: '"Caveat", cursive', fontSize: 22, lineHeight: 1.15,
              color: 'var(--ink)', background: 'var(--paper-2)',
              border: '1px dashed var(--rule)', borderRadius: 6,
              padding: '8px 10px', outline: 'none',
              minHeight: 88,
            }}
          />
        </div>
        <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.12em', textAlign: 'right', marginTop: 4 }}>
          {draft.length}/120
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
          <button className="btn-primary" style={{ width: '100%' }} onClick={commit}>
            {idx + 1 < queue.length ? 'Save & next' : 'Save'}
          </button>
          <button onClick={next} style={{
            background: 'transparent', border: 'none',
            color: 'var(--ink-3)', fontFamily: 'Inter, sans-serif', fontSize: 13,
            padding: 8, cursor: 'pointer',
          }}>Skip</button>
        </div>
      </div>
    </div>
  );
}

// ───────── LEARN · ATLAS (Dishes & Techniques) ─────────
function LearnAtlas({ go, mode }) {
  // mode: 'dishes' | 'techniques'
  const [continentId, setContinentId] = React.useState(null);
  const [country, setCountry] = React.useState(null);

  const label = mode === 'dishes' ? 'dish' : 'technique';
  const labelPlural = mode === 'dishes' ? 'dishes' : 'techniques';

  // Country detail view
  if (country) {
    const items = country[mode] || [];
    const continent = ATLAS.find(c => c.id === continentId);
    return (
      <div style={{ marginTop: 18 }}>
        <button
          onClick={() => setCountry(null)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ink-2)', fontFamily: 'Inter, sans-serif', fontSize: 12 }}>
          <Icon name="arrow-left" size={16} stroke="var(--ink-2)" />
          {continent?.name}
        </button>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 14 }}>
          <div style={{ fontSize: 44, lineHeight: 1 }}>{flagFor(country.code)}</div>
          <div style={{ flex: 1 }}>
            <h2 className="h2" style={{ fontSize: 30, lineHeight: 1, marginBottom: 4 }}>{country.name}</h2>
            <div className="script-note" style={{ fontSize: 14 }}>{country.tagline}</div>
          </div>
        </div>
        <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.16em', marginTop: 22, marginBottom: 10 }}>
          {items.length} {items.length === 1 ? label.toUpperCase() : labelPlural.toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((it, i) => (
            <div key={i} className="card" style={{ padding: '17px 16px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                <h3 className="serif" style={{ fontSize: 19, lineHeight: 1.1, margin: 0 }}>{it.name}</h3>
                {it.type && <div className="mono" style={{ fontSize: 8, color: 'var(--ink-3)', letterSpacing: '0.14em', whiteSpace: 'nowrap' }}>{it.type.toUpperCase()}</div>}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)', marginTop: 6 }}>{it.note}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Continent → country list view
  if (continentId) {
    const continent = ATLAS.find(c => c.id === continentId);
    return (
      <div style={{ marginTop: 18 }}>
        <button
          onClick={() => setContinentId(null)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--ink-2)', fontFamily: 'Inter, sans-serif', fontSize: 12 }}>
          <Icon name="arrow-left" size={16} stroke="var(--ink-2)" />
          All continents
        </button>
        <h2 className="h2" style={{ fontSize: 32, marginTop: 12 }}>{continent.name}</h2>
        <div className="script-note" style={{ fontSize: 15, marginTop: 2 }}>pick a country</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
          {continent.countries.map(co => {
            const count = (co[mode] || []).length;
            return (
              <button
                key={co.code}
                className="card"
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, cursor: 'pointer', textAlign: 'left', background: 'var(--paper)' }}
                onClick={() => setCountry(co)}>
                <div style={{ fontSize: 32, lineHeight: 1 }}>{flagFor(co.code)}</div>
                <div style={{ flex: 1 }}>
                  <div className="serif" style={{ fontSize: 18, lineHeight: 1.1 }}>{co.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 3 }}>{co.tagline}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.14em' }}>{count}</div>
                  <Icon name="arrow-right" size={16} stroke="var(--ink-3)" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Continent overview
  return (
    <div style={{ marginTop: 18 }}>
      <div className="eyebrow">Atlas</div>
      <div className="script-note" style={{ fontSize: 15, marginTop: 4 }}>
        {mode === 'dishes' ? 'key dishes from around the world' : 'how kitchens move, region by region'}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
        {ATLAS.map(c => {
          const dishCount = c.countries.reduce((n, co) => n + (co[mode] || []).length, 0);
          const sampleFlags = c.countries.slice(0, 5).map(co => flagFor(co.code)).join(' ');
          return (
            <button
              key={c.id}
              className="card"
              style={{ padding: '16px 16px 11px', cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', overflow: 'hidden' }}
              onClick={() => setContinentId(c.id)}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <h3 className="h2" style={{ fontSize: 26, lineHeight: 1, margin: 0 }}>{c.name}</h3>
                <div className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.14em', marginLeft: 'auto' }}>
                  {c.countries.length} COUNTRIES · {dishCount} {labelPlural.toUpperCase()}
                </div>
              </div>
              <div style={{ fontSize: 22, letterSpacing: 4, lineHeight: 1 }}>{sampleFlags}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)', display: 'flex', alignItems: 'center', gap: 6 }}>
                {c.countries.map(co => co.name).join(' · ')}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ISO 3166-1 alpha-2 → flag emoji
function flagFor(code) {
  if (!code || code.length !== 2) return '🏳️';
  const A = 0x1F1E6;
  return String.fromCodePoint(A + code.charCodeAt(0) - 65) + String.fromCodePoint(A + code.charCodeAt(1) - 65);
}

Object.assign(window, { LearnScreen, LearnSpices, LearnAtlas, SpiceScreen, DiscoverScreen, ImportSheet, MeScreen });
