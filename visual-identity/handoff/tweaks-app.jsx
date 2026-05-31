// Workinabox identity — Tweaks app
// Three expressive controls that reshape the feel of the identity:
//   1) Palette mood    — Workshop / Blueprint / Carbon / Press
//   2) Type system     — Engineering / Industrial / Editorial
//   3) Density         — Spacious / Standard / Compact
//
// Tweak handlers set data-* attributes on <html>; CSS variant rules in styles.css
// do the rest.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "logo": "brain",
  "weight": 1,
  "palette": "workshop",
  "type": "engineering",
  "density": "standard"
}/*EDITMODE-END*/;

function applyTweaks(t) {
  const r = document.documentElement;
  // line weight (scales logo + icon strokes)
  const scale = t.weight || 1;
  window.__wiabLineScale = scale;
  r.style.setProperty('--line-scale', scale);
  // logo mark
  r.setAttribute('data-logo', t.logo || 'brain');
  if (window.renderLogos) window.renderLogos(t.logo || 'brain');
  // palette
  if (t.palette === 'workshop') r.removeAttribute('data-palette');
  else r.setAttribute('data-palette', t.palette);
  // type
  if (t.type === 'engineering') r.removeAttribute('data-type');
  else r.setAttribute('data-type', t.type);
  // density
  if (t.density === 'standard') r.removeAttribute('data-density');
  else r.setAttribute('data-density', t.density);
}

// Apply immediately (before React mounts) so initial paint is correct
applyTweaks(TWEAK_DEFAULTS);

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => { applyTweaks(t); }, [t.logo, t.weight, t.palette, t.type, t.density]);

  // Re-render the marks whenever palette flips too (stroke vars are palette-relative,
  // but innerHTML must exist; this keeps slots correct after any change).
  React.useEffect(() => { if (window.renderLogos) window.renderLogos(t.logo || 'brain'); }, [t.palette]);

  const LogoSwatch = ({ v, label, note }) => {
    const active = (t.logo || 'brain') === v;
    const html = window.WIAB_MARKS[v]({ stroke: '#29261b', sw: 7 });
    return (
      <button
        onClick={() => setTweak('logo', v)}
        style={{
          all: 'unset',
          cursor: 'default',
          display: 'grid',
          gridTemplateColumns: '44px 1fr',
          gap: 11,
          padding: '8px 9px',
          borderRadius: 7,
          boxShadow: active ? '0 0 0 1px rgba(41,38,27,0.7)' : '0 0 0 0.5px rgba(0,0,0,0.08)',
          background: active ? 'rgba(255,255,255,0.7)' : 'transparent',
          alignItems: 'center',
          marginBottom: 5,
          transition: 'background 0.12s, box-shadow 0.12s'
        }}
        title={label}
      >
        <span
          style={{ display: 'block', width: 40, height: 40, lineHeight: 0, flex: 'none' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <span style={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'left' }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: '#29261b' }}>{label}</span>
          <span style={{ fontSize: 10.5, color: 'rgba(41,38,27,0.55)' }}>{note}</span>
        </span>
      </button>
    );
  };

  // Build little preview swatches/glyphs for each option so users see what changes
  const PaletteSwatch = ({ p, label, note, paper, ink, accent, rule }) => {
    const active = t.palette === p;
    return (
      <button
        onClick={() => setTweak('palette', p)}
        style={{
          all: 'unset',
          cursor: 'default',
          display: 'grid',
          gridTemplateColumns: '36px 1fr',
          gap: 10,
          padding: '7px 8px',
          borderRadius: 7,
          boxShadow: active ? '0 0 0 1px rgba(41,38,27,0.65)' : '0 0 0 0.5px rgba(0,0,0,0.08)',
          background: active ? 'rgba(255,255,255,0.7)' : 'transparent',
          alignItems: 'center',
          transition: 'background 0.12s, box-shadow 0.12s',
          marginBottom: 4
        }}
        title={label}
      >
        <span style={{
          display: 'block', width: 36, height: 36, borderRadius: 4,
          border: '0.5px solid ' + rule, background: paper,
          position: 'relative', overflow: 'hidden', flex: 'none'
        }}>
          <span style={{ position: 'absolute', left: 3, top: 3, width: 16, height: 30, background: ink, borderRadius: 2 }}/>
          <span style={{ position: 'absolute', right: 4, bottom: 4, width: 10, height: 10, background: accent, borderRadius: 999 }}/>
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'left' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#29261b' }}>{label}</span>
          <span style={{ fontSize: 10.5, color: 'rgba(41,38,27,0.55)' }}>{note}</span>
        </span>
      </button>
    );
  };

  const TypeSwatch = ({ key_, label, note, fontFamily, fontStyle, fontWeight, letterSpacing }) => {
    const active = t.type === key_;
    return (
      <button
        onClick={() => setTweak('type', key_)}
        style={{
          all: 'unset',
          cursor: 'default',
          display: 'grid',
          gridTemplateColumns: '40px 1fr',
          gap: 10,
          padding: '7px 8px',
          borderRadius: 7,
          boxShadow: active ? '0 0 0 1px rgba(41,38,27,0.65)' : '0 0 0 0.5px rgba(0,0,0,0.08)',
          background: active ? 'rgba(255,255,255,0.7)' : 'transparent',
          alignItems: 'center',
          marginBottom: 4,
          transition: 'background 0.12s, box-shadow 0.12s'
        }}
      >
        <span style={{
          fontFamily,
          fontStyle: fontStyle || 'normal',
          fontWeight: fontWeight || 500,
          letterSpacing: letterSpacing || '-0.02em',
          fontSize: 26, color: '#29261b', lineHeight: 1, textAlign: 'center'
        }}>Aa</span>
        <span style={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'left' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#29261b' }}>{label}</span>
          <span style={{ fontSize: 10.5, color: 'rgba(41,38,27,0.55)' }}>{note}</span>
        </span>
      </button>
    );
  };

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Logo mark" />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 0 8px' }}>
        <LogoSwatch v="brain"       label="Brain + gear" note="Original · the mind in the box" />
        <LogoSwatch v="toolbox"     label="Work box"     note="Box · briefcase, laptop, cog" />
        <LogoSwatch v="toolboxAlt"  label="Work box · alternating" note="Box edges alternate ink / orange" />
      </div>

      <TweakSection label="Line weight" />
      <TweakSlider
        label="Stroke"
        value={t.weight}
        min={0.1}
        max={2.4}
        step={0.1}
        unit="×"
        onChange={(v) => setTweak('weight', v)}
      />
      <div style={{ fontSize: 10.5, color: 'rgba(41,38,27,0.5)', padding: '2px 2px 6px', fontFamily: 'ui-monospace, monospace', letterSpacing: '0.03em' }}>
        Scales the logo mark + icon-system strokes.
      </div>

      <TweakSection label="Palette" />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 0 8px' }}>
        <PaletteSwatch p="workshop"  label="Workshop"  note="Warm cream, ink, orange"   paper="#F4EFE6" ink="#2A2622" accent="#E76F2C" rule="#D8D2C6" />
        <PaletteSwatch p="blueprint" label="Blueprint" note="Cool paper, navy, orange"  paper="#E9EEF4" ink="#1F2E47" accent="#E76F2C" rule="#C5CFDA" />
        <PaletteSwatch p="carbon"    label="Carbon"    note="Dark — orange pops"        paper="#221F1B" ink="#F2EFE8" accent="#F08246" rule="#3A3631" />
        <PaletteSwatch p="press"     label="Press"     note="Riso vermillion, near-black" paper="#F7F4EC" ink="#1A1815" accent="#D33820" rule="#CDC8BC" />
      </div>

      <TweakSection label="Type system" />
      <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 0 8px' }}>
        <TypeSwatch key_="engineering" label="Engineering" note="Space Grotesk · JetBrains Mono"
                    fontFamily="'Space Grotesk', sans-serif" fontWeight={500} letterSpacing="-0.025em" />
        <TypeSwatch key_="industrial"  label="Industrial"  note="Inter Tight · IBM Plex Mono"
                    fontFamily="'Inter Tight', sans-serif" fontWeight={700} letterSpacing="-0.045em" />
        <TypeSwatch key_="editorial"   label="Editorial"   note="Instrument Serif · Space Grotesk"
                    fontFamily="'Instrument Serif', serif" fontStyle="italic" fontWeight={400} letterSpacing="-0.015em" />
      </div>

      <TweakSection label="Density" />
      <TweakRadio
        value={t.density}
        options={['compact', 'standard', 'spacious']}
        onChange={(v) => setTweak('density', v)}
      />

      <div style={{
        marginTop: 10, padding: '10px 2px 0',
        borderTop: '0.5px solid rgba(0,0,0,0.08)',
        fontSize: 10, lineHeight: 1.5,
        color: 'rgba(41,38,27,0.5)',
        fontFamily: 'ui-monospace, monospace',
        letterSpacing: '0.04em',
        textTransform: 'uppercase'
      }}>
        Each control reshapes the whole document.
      </div>
    </TweaksPanel>
  );
}

const tweaksRoot = ReactDOM.createRoot(document.getElementById('tweaks-root'));
tweaksRoot.render(<TweaksApp />);
