// icons.jsx — minimal stroke icons for TravelBite

function Icon({ name, size = 22, stroke = 'currentColor', strokeWidth = 1.6, fill = 'none' }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill, stroke, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  // Custom 100×100 viewBox icons (uploaded SVGs). Outer-stroke style to match the supplied set.
  const big = { width: size, height: size, viewBox: '0 0 100 100', fill: 'none', stroke, strokeWidth: 4, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'nav-home': return (
      <svg {...big}>
        <path d="M50,7.75L4.45,100h91.1L50,7.75z"/>
        <line x1="54.97" y1="21.32" x2="45.7" y2="1.78"/>
        <line x1="44.95" y1="21.32" x2="54.22" y2="1.78"/>
        <path d="M50,55.99L28.27,100h43.45L50,55.99z"/>
      </svg>
    );
    case 'nav-pantry': return (
      <svg {...big}>
        <path d="M68.64,27.51H31.42l-6.33,63.44c-0.49,4.92,3.37,9.18,8.31,9.18h33.25c4.94,0,8.8-4.27,8.31-9.18L68.64,27.51z"/>
        <path d="M70.65,20.72H29.41c-2.41,0-4.36,1.95-4.36,4.36v0.31c0,2.41,1.95,4.36,4.36,4.36h41.24c2.41,0,4.36-1.95,4.36-4.36v-0.31C75.02,22.67,73.06,20.72,70.65,20.72z"/>
        <path d="M62.59,0H37.48c-4.16,0-7.52,3.37-7.52,7.52v7.38c0,4.16,3.37,7.52,7.52,7.52h25.11c4.16,0,7.52-3.37,7.52-7.52V7.52C70.11,3.37,66.74,0,62.59,0z"/>
        <line x1="29.95" y1="59.45" x2="70.11" y2="59.45"/>
        <line x1="39.95" y1="36.24" x2="35.91" y2="85.65"/>
        <circle cx="40.21" cy="7.55" r="2.5" fill={stroke} stroke="none"/>
        <circle cx="50.03" cy="7.55" r="2.5" fill={stroke} stroke="none"/>
        <circle cx="59.86" cy="7.55" r="2.5" fill={stroke} stroke="none"/>
      </svg>
    );
    case 'nav-recipes': return (
      <svg {...big}>
        <path d="M49.22,11.98c-5.18,0.02-10.14,3.43-11.98,8.22c0,0.01-0.14,0.02-0.32,0.02c-0.31,0-0.76-0.01-0.92-0.01c-0.03,0-0.04,0-0.06,0c-0.45,0.03-0.9,0.08-1.35,0.15c-0.89,0.15-1.77,0.39-2.61,0.72c-1.65,0.65-3.2,1.63-4.43,2.91c-2.43,2.53-3.73,6.05-3.55,9.56c0.03,0.63,0.11,1.25,0.24,1.87c0.86,4.06,3.84,7.6,7.69,9.14h17.24h17.28c4.65-1.86,7.81-6.76,7.9-11.73c0.02-0.89-0.07-1.79-0.26-2.66c-1.22-5.6-6.69-9.94-12.4-9.94c-0.17,0-0.35,0-0.52,0.01C59.34,15.42,54.37,11.99,49.22,11.98z"/>
        <path d="M66.47,41.97h-17.3H31.94c-0.01,2.03-0.01,4.05-0.02,6.08c0,0.81,0,1.66,0.37,2.38c0.41,0.81,1.2,1.35,2.01,1.78c1.96,1.04,4.13,1.6,6.31,2c2.82,0.52,5.69,0.78,8.56,0.78c2.9,0,5.8-0.26,8.65-0.79c2.17-0.4,4.33-0.96,6.28-2c0.8-0.43,1.59-0.97,2-1.78c0.38-0.75,0.38-1.61,0.37-2.44c-0.01-0.91-0.01-1.83-0.01-2.74c0-0.96-0.01-1.92-0.01-2.89C66.47,42.23,66.47,42.1,66.47,41.97z"/>
        <path d="M76.2,98.24H22.14c-5.66,0-10.25-4.59-10.25-10.25V12.56c0-5.66,4.59-10.25,10.25-10.25H76.2c5.66,0,10.25,4.59,10.25,10.25v75.42C86.45,93.65,81.86,98.24,76.2,98.24z"/>
        <line x1="20.33" y1="65.47" x2="78.01" y2="65.47"/>
        <line x1="20.33" y1="75.47" x2="78.01" y2="76.47"/>
        <line x1="20.33" y1="86.47" x2="78.01" y2="87.47"/>
      </svg>
    );
    case 'nav-learn': return (
      <svg {...big}>
        <line x1="32.71" y1="39.09" x2="32.71" y2="97.45"/>
        <path d="M60.43,97.45V1.34c0,0,29.87,36.73,0,69.21"/>
        <path d="M47.17,1.34v19.58v7.08c0,5.7-4.66,10.33-10.41,10.33h-8.09c-5.75,0-10.41-4.62-10.41-10.33v-6.2V1.34"/>
        <line x1="28.47" y1="1.34" x2="28.47" y2="37.19"/>
        <line x1="36.96" y1="1.34" x2="36.96" y2="37.19"/>
      </svg>
    );
    case 'nav-me': return (
      <svg {...big}>
        <path d="M2.26,87.83V45.11c0-5.66,4.59-10.25,10.25-10.25h75.42c5.66,0,10.25,4.59,10.25,10.25v42.72c0,5.66-4.59,10.25-10.25,10.25H12.51C6.84,98.08,2.26,93.49,2.26,87.83z"/>
        <path d="M29.7,70.26L26,57.22c-0.32-1.11,0.33-2.27,1.44-2.58l18.23-5.16c1.11-0.32,2.27,0.33,2.58,1.44l3.69,13.04c0.32,1.11-0.33,2.27-1.44,2.58l-18.23,5.16C31.17,72.02,30.01,71.38,29.7,70.26z"/>
        <line x1="24.72" y1="36.24" x2="24.72" y2="98.08"/>
        <line x1="74.72" y1="36.24" x2="75.72" y2="98.08"/>
        <path d="M24.72,37.76V23.71v-5.08c0-4.09,8.06-7.41,18.01-7.41h13.99c9.94,0,18.01,3.32,18.01,7.41v4.45v14.69"/>
        <circle cx="63.03" cy="85.5" r="10.08"/>
      </svg>
    );
    case 'home': return <svg {...p}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>;
    case 'pantry': return <svg {...p}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M9 3v18M15 3v18"/></svg>;
    case 'globe': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'book': return <svg {...p}><path d="M4 4h6a4 4 0 0 1 4 4v13M20 4h-6a4 4 0 0 0-4 4v13M4 4v17h16V4"/></svg>;
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>;
    case 'search': return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'arrow-right': return <svg {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'arrow-left': return <svg {...p}><path d="M19 12H5M11 5l-7 7 7 7"/></svg>;
    case 'check': return <svg {...p}><path d="M5 12l4 4L19 6"/></svg>;
    case 'close': return <svg {...p}><path d="M6 6l12 12M6 18L18 6"/></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'fire': return <svg {...p}><path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 1 1 2 2 3 0z"/></svg>;
    case 'spice': return <svg {...p}><circle cx="12" cy="12" r="3"/><circle cx="6" cy="6" r="1.5"/><circle cx="18" cy="6" r="1.5"/><circle cx="6" cy="18" r="1.5"/><circle cx="18" cy="18" r="1.5"/></svg>;
    case 'recipes': return <svg {...p}><path d="M7 3v8M11 3v4a2 2 0 0 1-2 2H5M9 11v10M16 3c-2 0-3 2-3 5s1 5 3 5v8"/></svg>;
    case 'scan': return <svg {...p}><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16"/></svg>;
    case 'link': return <svg {...p}><path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1"/></svg>;
    case 'tiktok': return <svg {...p} fill={stroke} stroke="none"><path d="M16 3v3a4 4 0 0 0 4 4v3a7 7 0 0 1-4-1.3V16a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V3z"/></svg>;
    case 'pinterest': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M11 7c2 0 4 1 4 4 0 2-1 4-3 4-1 0-2-.5-2-1.5L8.5 20M11 11l-1 4"/></svg>;
    case 'instagram': return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>;
    case 'youtube': return <svg {...p}><rect x="2" y="6" width="20" height="12" rx="3"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/></svg>;
    case 'camera': return <svg {...p}><path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/></svg>;
    case 'compass': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-5 2 2-5z" fill="currentColor"/></svg>;
    case 'pin': return <svg {...p}><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
    case 'flame': return <svg {...p}><path d="M12 22a6 6 0 0 1-6-6c0-4 3-5 3-10 1 2 4 3 4 7 2-1 3-2 3-4 1 2 2 4 2 7a6 6 0 0 1-6 6z"/></svg>;
    case 'star': return <svg {...p}><path d="m12 3 3 6 6 1-4.5 4 1 6L12 17l-5.5 3 1-6L3 10l6-1z"/></svg>;
    case 'bookmark': return <svg {...p}><path d="M6 4h12v17l-6-4-6 4z"/></svg>;
    case 'heart': return <svg {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>;
    case 'play': return <svg {...p}><path d="M7 4v16l13-8z" fill="currentColor"/></svg>;
    case 'sun': return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></svg>;
    case 'moon': return <svg {...p}><path d="M20 14a8 8 0 1 1-10-10 7 7 0 0 0 10 10z"/></svg>;
    case 'filter': return <svg {...p}><path d="M3 5h18M6 12h12M10 19h4"/></svg>;
    case 'menu': return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'mic': return <svg {...p}><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>;
    case 'sparkle': return <svg {...p}><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="6"/></svg>;
  }
}

window.Icon = Icon;
