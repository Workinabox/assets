/* ============================================================
   Workinabox — logo mark variants
   Three marks, rendered into [data-logo-slot] elements.
   - brain : the original (imported logo.svg — gear + brain in a box)
   - cube  : isometric outline cube with a solid orange cube nested inside
   - drop  : frontal open-top container with an orange unit resting inside
   Inline SVG variants use `stroke` taken from the slot's surface class
   (on-paper -> ink, on-ink -> paper) so they adapt to every palette.
   ============================================================ */
(function () {
  // Build a flat-toothed gear outline path.
  function gearPath(cx, cy, rOut, rIn, teeth) {
    const step = (Math.PI * 2) / teeth;
    let d = '';
    for (let i = 0; i < teeth; i++) {
      const t0 = i * step;
      const pts = [[rIn, t0], [rOut, t0 + 0.18 * step], [rOut, t0 + 0.40 * step], [rIn, t0 + 0.58 * step]];
      pts.forEach((p, j) => {
        const x = cx + p[0] * Math.cos(p[1]);
        const y = cy + p[0] * Math.sin(p[1]);
        d += (i === 0 && j === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
      });
    }
    return d + 'Z';
  }

  // The three work icons (cog on top face, briefcase on left, laptop on right).
  function toolIcons(s, iw) {
    return `<g stroke="${s}" stroke-width="${iw}" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="${gearPath(100, 64, 15, 11, 8)}"/>
      <circle cx="100" cy="64" r="4"/>
      <rect x="52" y="110" width="28" height="20" rx="3"/>
      <path d="M60 110 L60 106 Q60 103 63 103 L69 103 Q72 103 72 106 L72 110"/>
      <path d="M52 117 L80 117"/>
      <rect x="120" y="107" width="28" height="16" rx="2"/>
      <path d="M116 126 L152 126 L148 131 L120 131 Z"/>
    </g>`;
  }

  const MARKS = {
    brain() {
      return '<img src="images/logo-mark.svg" alt="Workinabox mark" />';
    },
    toolbox(o) {
      // The original iso box — one work icon centered on each face: cog (top),
      // briefcase (left face), laptop (right face). Monochrome, surface-adaptive.
      const s = o.stroke, w = o.sw, iw = Math.max(2, o.sw * 0.9);
      return `<svg viewBox="0 0 200 200" fill="none" aria-label="Workinabox mark">
        <g stroke="${s}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round">
          <path d="M100 28 L168 64 L100 100 L32 64 Z"/>
          <path d="M32 64 L100 100 L100 172 L32 136 Z"/>
          <path d="M168 64 L100 100 L100 172 L168 136 Z"/>
        </g>
        ${toolIcons(s, iw)}
      </svg>`;
    },
    toolboxAlt(o) {
      // Same mark, outer box edges alternating ink / orange around the perimeter.
      const s = o.stroke, w = o.sw, iw = Math.max(2, o.sw * 0.9);
      const O = 'var(--orange)';
      const edge = (d, c) => `<path d="${d}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
      return `<svg viewBox="0 0 200 200" fill="none" aria-label="Workinabox mark">
        ${edge('M100 28 L168 64', O)}
        ${edge('M168 64 L168 136', s)}
        ${edge('M168 136 L100 172', O)}
        ${edge('M100 172 L32 136', s)}
        ${edge('M32 136 L32 64', O)}
        ${edge('M32 64 L100 28', s)}
        <path d="M32 64 L100 100 M168 64 L100 100 M100 100 L100 172"
              stroke="${s}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>
        ${toolIcons(s, iw)}
      </svg>`;
    }
  };

  window.WIAB_MARKS = MARKS;

  window.renderLogos = function (variant) {
    if (!MARKS[variant]) variant = 'brain';
    const scale = window.__wiabLineScale || 1;
    document.querySelectorAll('[data-logo-slot]').forEach(function (el) {
      const onInk = el.classList.contains('on-ink');
      const stroke = onInk ? 'var(--paper)' : 'var(--ink)';
      const sw = parseFloat(el.dataset.sw || '6') * scale;
      el.innerHTML = MARKS[variant]({ stroke: stroke, sw: sw });
    });
  };

  // Initial paint (React will re-apply the persisted choice once it mounts)
  window.renderLogos('brain');
})();
