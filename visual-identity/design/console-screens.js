/* ============================================================
   Workinabox console — 09.x screens
   One screen per left-menu item, rendered into #console-screens.
   ============================================================ */
(function () {
  const ICONS = {
    specs: '<path d="M6 3 L15 3 L19 7 L19 21 L6 21 Z M15 3 L15 7 L19 7 M9 12 L16 12 M9 16 L16 16 M9 8 L12 8"/>',
    board: '<rect x="3" y="4" width="5.5" height="16" rx="1"/><rect x="9.25" y="4" width="5.5" height="11" rx="1"/><rect x="15.5" y="4" width="5.5" height="7" rx="1"/>',
    agents: '<circle cx="12" cy="9" r="3.5"/><path d="M4.5 20 C 5 15.5 8.5 13.5 12 13.5 C 15.5 13.5 19 15.5 19.5 20"/>',
    repos: '<path d="M5 4 L5 18 a2 2 0 0 0 2 2 L19 20 L19 4 L7 4 a2 2 0 0 0 -2 2 a2 2 0 0 0 2 2 L19 8"/>',
    traces: '<circle cx="6" cy="6" r="1.5"/><circle cx="6" cy="18" r="1.5"/><path d="M6 7.5 L6 16.5"/><path d="M9 6 L20 6 M9 12 L17 12 M9 18 L14 18"/>',
    rooms: '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M6 11 a6 6 0 0 0 12 0 M12 17 L12 21 M9 21 L15 21"/>',
    security: '<path d="M12 3 L20 6 L20 12 C 20 16 16.5 19.5 12 21 C 7.5 19.5 4 16 4 12 L 4 6 Z M9 12 L11 14 L15 10"/>',
    pipelines: '<rect x="3" y="9" width="5" height="6" rx="1"/><rect x="9.5" y="9" width="5" height="6" rx="1"/><rect x="16" y="9" width="5" height="6" rx="1"/><path d="M8 12 L9.5 12 M14.5 12 L16 12"/>'
  };

  function navItem(key, label, count, active) {
    const c = count ? `<span class="count"${count.indexOf('live') > -1 ? ' style="color: var(--orange);"' : ''}>${count}</span>` : '';
    return `<a href="#"${active ? ' class="active"' : ''}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[key]}</svg>
      ${label}${c}</a>`;
  }

  function sidebar(active) {
    return `<aside class="gui-side">
      <div class="brand">
        <span class="logo-slot on-paper" data-logo-slot data-sw="14" style="width: 22px;"></span>
        <div class="lwm">Workin<span class="a">a</span>box</div>
      </div>
      <span class="group">Org · Gos &amp; co</span>
      ${navItem('specs', 'Specs', '23', active === 'specs')}
      ${navItem('board', 'Board', '42', active === 'board')}
      ${navItem('agents', 'Agents', '14', active === 'agents')}
      ${navItem('repos', 'Repos', '34', active === 'repos')}
      ${navItem('traces', 'Traces', '', active === 'traces')}
      <span class="group">Meetings</span>
      ${navItem('rooms', 'Rooms', '2 live', active === 'rooms')}
      <span class="group">System</span>
      ${navItem('security', 'Security gates', '', active === 'security')}
      ${navItem('pipelines', 'Pipelines', '', active === 'pipelines')}
    </aside>`;
  }

  function frame(s) {
    return `<div class="console-screen">
      <div class="console-screen-head">
        <span class="cn">09.${s.n}</span>
        <span class="ct">${s.title}</span>
        <span class="cd">${s.meta}</span>
      </div>
      <div class="gui-frame">
        <div class="gui-titlebar">
          <div class="dots"><span></span><span></span><span></span></div>
          <div class="url">${s.url}</div>
        </div>
        <div class="gui-body">
          ${sidebar(s.active)}
          <main class="gui-main">
            <header class="gui-main-head">
              <h1>${s.h1} <span class="crumb">${s.crumb}</span></h1>
              <div class="gui-toolbar">${s.tools || ''}</div>
            </header>
            ${s.main}
          </main>
          <aside class="gui-trace">${s.right}</aside>
        </div>
      </div>
    </div>`;
  }

  const T = {
    filter: (ph) => `<input class="input" placeholder="${ph}" style="width: 220px; font-size: 13px; padding: 7px 10px;" />`,
    ghost: (t) => `<button class="btn ghost small">${t}</button>`,
    primary: (t) => `<button class="btn primary small">${t}</button>`
  };

  // ---- shared bits -------------------------------------------------------
  const dot = (c) => `<span class="dot"${c ? ` style="background: ${c};"` : ''}></span>`;

  // ========================================================================
  // 09.1 — SPECS
  // ========================================================================
  const specsMain = `<div class="gui-list" style="gap: 10px;">
    ${[
      ['SPEC-018', 'Persistence & migrations', 'Move all repositories behind Postgres; reversible migrations gated in CI.', 'progress', 'In progress', '6 tasks'],
      ['SPEC-017', 'Public website — workinabox.ai', 'Marketing site + docs published from the docs/ repo. Request-access flow.', 'progress', 'In progress', '4 tasks'],
      ['SPEC-016', 'Observability baseline', 'OpenTelemetry traces and structured logs through every crate.', 'assigned', 'Assigned', '3 tasks'],
      ['SPEC-015', 'Mobile delivery', 'Signed TestFlight + Play internal builds on every tagged release.', 'assigned', 'Assigned', '2 tasks'],
      ['SPEC-014', 'Identity & access', 'Choose an IdP, integrate SSO, enforce org-scoped roles.', 'blocked', 'Blocked', '1 task'],
      ['SPEC-013', 'Local dev bootstrap', 'One command brings up the full stack for contributors.', 'completed', 'Completed', '4 tasks']
    ].map((r, i) => `<div class="gui-row${i === 0 ? ' sel' : ''}" style="grid-template-columns: 92px 1fr auto auto;">
      <span class="rid">${r[0]}</span>
      <span><span class="rt">${r[1]}</span><div class="rsub">${r[2]}</div></span>
      <span class="badge ${r[3]}">${r[4]}</span>
      <span class="rmeta">${r[5]}</span>
    </div>`).join('')}
  </div>`;
  const specsRight = `<div class="th">— Spec · SPEC-018</div>
    <div class="detail-kv">
      <div class="kv"><span class="k">Title</span><span class="v">Persistence &amp; migrations</span></div>
      <div class="kv"><span class="k">Author</span><span class="v">Mikkel (human) · operator</span></div>
      <div class="kv"><span class="k">Vertical</span><span class="v">Engineering</span></div>
    </div>
    <div>
      <div class="th" style="border: none; padding: 0 0 8px;">Objective</div>
      <p style="font-size: 13px; color: var(--ink-soft); margin: 0; line-height: 1.5;">Every aggregate is persisted in Postgres behind the existing repository traits, with reversible migrations verified in CI before merge.</p>
    </div>
    <div>
      <div class="th" style="border: none; padding: 0 0 8px;">Acceptance</div>
      <div class="detail-kv">
        <div class="kv"><span class="v mono">✓ traits unchanged at call sites</span></div>
        <div class="kv"><span class="v mono">✓ up + down migration tested</span></div>
        <div class="kv"><span class="v mono">· load test &lt; 50ms p95</span></div>
      </div>
    </div>
    <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid var(--rule); display: flex; gap: 8px;">
      <button class="btn ghost small" style="flex: 1;">Edit spec</button>
      <button class="btn primary small" style="flex: 1;">Generate tasks</button>
    </div>`;

  // ========================================================================
  // 09.2 — BOARD  (the original)
  // ========================================================================
  const col = (head, n, cards) => `<div class="col"><div class="col-head">${head} <span class="n">${n}</span></div>${cards}</div>`;
  const bcard = (id, t, who, c, meta, extra) => `<div class="gui-card${extra ? ' ' + extra : ''}">
    <span class="id">${id}</span><span class="t">${t}</span>
    <div class="f"><span class="a">${dot(c)}${who}</span><span>${meta}</span></div></div>`;
  const boardMain = `<div class="gui-board">
    ${col('Created', 9,
      bcard('TASK-0131', 'Documentation site published from docs/', 'unassigned', 'var(--ink-mute)', 'P3') +
      bcard('TASK-0130', 'Feature flag service for staging', 'unassigned', 'var(--ink-mute)', 'P2') +
      bcard('TASK-0129', 'Background job runner — design doc', 'unassigned', 'var(--ink-mute)', 'P2'))}
    ${col('Assigned', 6,
      bcard('TASK-0127', 'Single staging environment with public URL', 'ops-2', 'var(--schematic)', 'P1') +
      bcard('TASK-0125', 'Secrets manager fetched at boot', 'ops-1', 'var(--schematic)', 'P1') +
      bcard('TASK-0122', 'In-process domain event bus + outbox', 'backend-lead', 'var(--schematic)', 'P2'))}
    ${col('In progress', 8,
      bcard('TASK-0114', 'Postgres persistence behind repository traits', 'backend-lead', '', 'step 7/~12', 'high') +
      bcard('TASK-0119', 'Public website — workinabox.ai', 'web-1', '', 'step 3/~5', 'high') +
      bcard('TASK-0121', 'OpenTelemetry traces through every crate', 'platform-1', '', 'step 2/~6') +
      bcard('TASK-0124', 'Mobile CI: signed TestFlight + Play builds', 'mobile-1', '', 'step 4/~7'))}
    ${col('Blocked', 3,
      bcard('TASK-0118', 'Provision DNS for workinabox.ai &amp; .io', 'awaiting human', 'var(--crit)', '2h', 'blocked') +
      bcard('TASK-0123', 'Identity provider — choose &amp; integrate', 'escalated', 'var(--crit)', '1d', 'blocked'))}
    ${col('Completed', 16,
      bcard('TASK-0107', 'CI: build, test, fmt, clippy on every PR', 'ops-1', 'var(--ok)', '02:14') +
      bcard('TASK-0109', 'One-command local dev bootstrap', 'ops-1', 'var(--ok)', '04:42') +
      bcard('TASK-0111', 'Reproducible backend container image', 'backend-lead', 'var(--ok)', '01:08') +
      bcard('TASK-0113', 'Migration tooling + CI migration test', 'backend-lead', 'var(--ok)', '03:21'))}
  </div>`;
  const traceSteps = `<div class="trace-steps">
    <div class="trace-step done"><span class="ico">✓</span><div class="body"><span class="name">Query transformation</span><span class="det">HyDE · 1 reformulation</span></div></div>
    <div class="trace-step done"><span class="ico">✓</span><div class="body"><span class="name">Retrieval gate</span><span class="det">scope: backend, docs · pass</span></div></div>
    <div class="trace-step done"><span class="ico">✓</span><div class="body"><span class="name">Retrieval</span><span class="det">12 chunks · hybrid · RRF</span></div></div>
    <div class="trace-step done"><span class="ico">✓</span><div class="body"><span class="name">Rerank</span><span class="det">top 5 retained</span></div></div>
    <div class="trace-step done"><span class="ico">✓</span><div class="body"><span class="name">Prompt assembly</span><span class="det">2,418 input tokens</span></div></div>
    <div class="trace-step active"><span class="ico">7</span><div class="body"><span class="name">LLM call</span><span class="det">claude-sonnet · streaming…</span></div></div>
    <div class="trace-step"><span class="ico">8</span><div class="body"><span class="name">Reflection</span><span class="det">pending</span></div></div>
    <div class="trace-step"><span class="ico">9</span><div class="body"><span class="name">Tool execution</span><span class="det">pending — gate ready</span></div></div>
  </div>`;
  const boardRight = `<div class="th">— Live trace · TASK-0114</div>
    <div class="agent-card">
      <div class="row"><div class="avatar">BL</div><div><div class="name">backend-lead</div><div class="role">role · senior engineer</div></div><span class="badge progress status">Active</span></div>
      <div style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-mute); padding-top: 8px; border-top: 1px solid var(--rule);">turn 03 · step 07 · budget 31% · cost $0.42</div>
    </div>
    <div><div class="th" style="border: none; padding: 0 0 10px;">Inner loop</div>${traceSteps}</div>
    <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid var(--rule); display: flex; gap: 8px;">
      <button class="btn ghost small" style="flex: 1;">Pause</button>
      <button class="btn ghost small" style="flex: 1;">Escalate</button>
    </div>`;

  // ========================================================================
  // 09.3 — AGENTS
  // ========================================================================
  const agent = (av, name, role, status, sclass, task) => `<div class="agent-card">
    <div class="row"><div class="avatar">${av}</div><div><div class="name">${name}</div><div class="role">${role}</div></div><span class="badge ${sclass} status">${status}</span></div>
    <div style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-mute); padding-top: 8px; border-top: 1px solid var(--rule);">${task}</div>
  </div>`;
  const agentsMain = `<div class="gui-agents">
    ${agent('BL', 'backend-lead', 'role · senior engineer', 'Active', 'progress', 'TASK-0114 · step 7/~12')}
    ${agent('W1', 'web-1', 'role · frontend engineer', 'Active', 'progress', 'TASK-0119 · step 3/~5')}
    ${agent('P1', 'platform-1', 'role · platform engineer', 'Active', 'progress', 'TASK-0121 · step 2/~6')}
    ${agent('M1', 'mobile-1', 'role · mobile engineer', 'Active', 'progress', 'TASK-0124 · step 4/~7')}
    ${agent('O1', 'ops-1', 'role · devops', 'Idle', 'created', 'last: TASK-0113 · 03:21')}
    ${agent('O2', 'ops-2', 'role · devops', 'Assigned', 'assigned', 'TASK-0127 · queued')}
    ${agent('QA', 'qa-1', 'role · reviewer', 'Idle', 'created', 'reviews on demand')}
    ${agent('PM', 'planner', 'role · orchestrator', 'Active', 'progress', 'decomposing SPEC-018')}
  </div>`;
  const agentsRight = `<div class="th">— Agent · backend-lead</div>
    <div class="agent-card"><div class="row"><div class="avatar">BL</div><div><div class="name">backend-lead</div><div class="role">senior engineer</div></div><span class="badge progress status">Active</span></div></div>
    <div class="detail-kv">
      <div class="kv"><span class="k">Model</span><span class="v mono">claude-sonnet-4.6</span></div>
      <div class="kv"><span class="k">Tools</span><span class="v mono">repo.read · repo.write · shell · pg</span></div>
      <div class="kv"><span class="k">Reports to</span><span class="v">planner</span></div>
      <div class="kv"><span class="k">Budget today</span><span class="v mono">$3.10 / $10.00</span></div>
    </div>
    <div><div class="th" style="border: none; padding: 0 0 8px;">Recent turns</div>
      <div class="detail-kv">
        <div class="kv"><span class="v mono" style="color: var(--ok);">✓ TASK-0113 · migration test</span></div>
        <div class="kv"><span class="v mono" style="color: var(--ok);">✓ TASK-0111 · container image</span></div>
        <div class="kv"><span class="v mono" style="color: var(--orange-deep);">▸ TASK-0114 · running</span></div>
      </div>
    </div>`;

  // ========================================================================
  // 09.4 — REPOS
  // ========================================================================
  const repo = (name, lang, tasks, last, sel) => `<div class="gui-row${sel ? ' sel' : ''}" style="grid-template-columns: 1fr auto auto auto;">
    <span class="rt" style="font-family: var(--font-mono); font-size: 13px;">${name}</span>
    <span class="lang">${lang}</span>
    <span class="rmeta">${tasks}</span>
    <span class="rmeta">${last}</span>
  </div>`;
  const reposMain = `<div class="gui-list">
    ${repo('backend', 'Rust', '4 open', '12m ago', true)}
    ${repo('frontend', 'TypeScript', '2 open', '38m ago')}
    ${repo('app', 'React Native', '1 open', '2h ago')}
    ${repo('dev', 'Rust', '0 open', '1d ago')}
    ${repo('ui', 'TypeScript', '3 open', '4h ago')}
    ${repo('docs', 'Markdown', '2 open', '20m ago')}
    ${repo('website', 'Astro', '1 open', '38m ago')}
    ${repo('infra', 'HCL', '2 open', '3h ago')}
    ${repo('assets', '—', '0 open', '6d ago')}
    ${repo('.github', 'Markdown', '0 open', '1d ago')}
  </div>`;
  const reposRight = `<div class="th">— Repo · backend</div>
    <div class="detail-kv">
      <div class="kv"><span class="k">Language</span><span class="v">Rust · edition 2021</span></div>
      <div class="kv"><span class="k">Role</span><span class="v">Agent farm + API. The main process.</span></div>
      <div class="kv"><span class="k">Default branch</span><span class="v mono">main</span></div>
      <div class="kv"><span class="k">CI</span><span class="v mono" style="color: var(--ok);">passing · 02:14</span></div>
    </div>
    <div><div class="th" style="border: none; padding: 0 0 8px;">Active tasks</div>
      <div class="detail-kv">
        <div class="kv"><span class="v mono">TASK-0114 · persistence</span></div>
        <div class="kv"><span class="v mono">TASK-0122 · event bus</span></div>
        <div class="kv"><span class="v mono">TASK-0121 · otel traces</span></div>
      </div>
    </div>
    <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid var(--rule);">
      <button class="btn ghost small" style="width: 100%;">Open in editor</button>
    </div>`;

  // ========================================================================
  // 09.5 — TRACES
  // ========================================================================
  const trace = (id, task, agent, dur, outcome, oclass, sel) => `<div class="gui-row${sel ? ' sel' : ''}" style="grid-template-columns: 96px 1fr auto auto auto;">
    <span class="rid">${id}</span>
    <span class="rt">${task}</span>
    <span class="rmeta">${agent}</span>
    <span class="rmeta">${dur}</span>
    <span class="badge ${oclass}">${outcome}</span>
  </div>`;
  const tracesMain = `<div class="gui-list">
    ${trace('RUN-2291', 'Postgres persistence · turn 3', 'backend-lead', '· live', 'Running', 'progress', true)}
    ${trace('RUN-2288', 'Migration tooling + CI test', 'backend-lead', '03:21', 'Completed', 'completed')}
    ${trace('RUN-2284', 'Reproducible container image', 'backend-lead', '01:08', 'Completed', 'completed')}
    ${trace('RUN-2280', 'Choose identity provider', 'planner', '00:54', 'Escalated', 'blocked')}
    ${trace('RUN-2277', 'Local dev bootstrap', 'ops-1', '04:42', 'Completed', 'completed')}
    ${trace('RUN-2271', 'Draft staging IaC', 'ops-2', '02:02', 'Failed', 'failed')}
    ${trace('RUN-2268', 'CI fmt + clippy gate', 'ops-1', '02:14', 'Completed', 'completed')}
  </div>`;
  const tracesRight = `<div class="th">— Trace · RUN-2291</div>
    <div class="agent-card"><div class="row"><div class="avatar">BL</div><div><div class="name">backend-lead</div><div class="role">TASK-0114 · turn 3</div></div><span class="badge progress status">Running</span></div></div>
    <div><div class="th" style="border: none; padding: 0 0 10px;">Inner loop</div>${traceSteps}</div>`;

  // ========================================================================
  // 09.6 — ROOMS
  // ========================================================================
  const roomsMain = `<div style="display: flex; flex-direction: column; gap: 16px; overflow: hidden;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <span class="room-pill"><span class="lv"></span>LIVE · 00:14:22</span>
      <span style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-mute);">Weekly planning · engineering</span>
    </div>
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <span class="room-pill">Mikkel · operator</span>
      <span class="room-pill">planner</span>
      <span class="room-pill">backend-lead</span>
      <span class="room-pill">ops-1</span>
      <span class="room-pill">+2</span>
    </div>
    <div style="background: var(--paper); border: 1px solid var(--rule); border-radius: var(--r-md); padding: 14px 16px;">
      <div class="th" style="border: none; padding: 0 0 8px;">Transcript</div>
      <div class="room-line"><span class="who">Mikkel</span><span>Let's lock persistence this week. What's blocking the migration test?</span></div>
      <div class="room-line agent"><span class="who">backend-lead</span><span>Nothing now — the down-migration path is covered. I need a staging DB URL to run the load check.</span></div>
      <div class="room-line agent"><span class="who">planner</span><span>ops-2 owns staging (TASK-0127). I'll mark the load check as dependent on it.</span></div>
      <div class="room-line"><span class="who">Mikkel</span><span>Good. Ship behind the trait, hold the load test until staging is up.</span></div>
    </div>
  </div>`;
  const roomsRight = `<div class="th">— Room · notes</div>
    <div class="detail-kv">
      <div class="kv"><span class="k">Decisions</span><span class="v">Ship persistence behind traits now.</span></div>
      <div class="kv"><span class="v">Load test gated on staging (TASK-0127).</span></div>
    </div>
    <div><div class="th" style="border: none; padding: 0 0 8px;">Action items</div>
      <div class="detail-kv">
        <div class="kv"><span class="v mono">→ backend-lead · finish TASK-0114</span></div>
        <div class="kv"><span class="v mono">→ ops-2 · bring up staging</span></div>
      </div>
    </div>
    <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid var(--rule); display: flex; gap: 8px;">
      <button class="btn ghost small" style="flex: 1;">Mute</button>
      <button class="btn primary small" style="flex: 1;">Join</button>
    </div>`;

  // ========================================================================
  // 09.7 — SECURITY GATES
  // ========================================================================
  const gate = (icon, title, tag, decisions) => `<div class="gate-card">
    <div class="gh"><div class="gi"><svg viewBox="0 0 24 24">${icon}</svg></div><div><div class="gt">${title}</div><div class="gtag">${tag}</div></div></div>
    <div class="gdec">${decisions}</div>
  </div>`;
  const dec = (label, status, sclass, meta) => `<div class="d"><span class="badge ${sclass}" style="min-width: 78px;">${status}</span><span>${label}</span><span class="dm">${meta}</span></div>`;
  const securityMain = `<div class="gui-gates">
    ${gate(ICONS.specs, 'Input gate', 'validates incoming specs & prompts',
      dec('Spec SPEC-018 accepted', 'Allowed', 'completed', '12m') +
      dec('Prompt-injection pattern flagged', 'Blocked', 'blocked', '2h'))}
    ${gate(ICONS.traces, 'Retrieval gate', 'scopes what an agent may read',
      dec('backend-lead → repo: backend, docs', 'Allowed', 'completed', 'live') +
      dec('web-1 → secrets/* requested', 'Blocked', 'blocked', '40m'))}
    ${gate(ICONS.security, 'Execution gate', 'approves tools & destructive actions',
      dec('cargo test · sandboxed', 'Allowed', 'completed', '1m') +
      dec('DROP migration · prod', 'Hold', 'progress', 'awaiting human'))}
  </div>`;
  const securityRight = `<div class="th">— Decision · blocked</div>
    <div class="detail-kv">
      <div class="kv"><span class="k">Gate</span><span class="v">Retrieval</span></div>
      <div class="kv"><span class="k">Agent</span><span class="v mono">web-1</span></div>
      <div class="kv"><span class="k">Requested</span><span class="v mono">secrets/staging.env</span></div>
      <div class="kv"><span class="k">Rule</span><span class="v">frontend role may not read secrets/*</span></div>
      <div class="kv"><span class="k">Outcome</span><span class="v" style="color: var(--crit);">Blocked · logged</span></div>
    </div>
    <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid var(--rule); display: flex; gap: 8px;">
      <button class="btn ghost small" style="flex: 1;">Audit log</button>
      <button class="btn ghost small" style="flex: 1;">Edit rule</button>
    </div>`;

  // ========================================================================
  // 09.8 — PIPELINES
  // ========================================================================
  const stage = (label, state, cls) => `<div class="stage ${cls}"><div class="sl">${label}</div><div class="ss">${state}</div></div>`;
  const sep = '<span class="stage-sep">→</span>';
  const pipelinesMain = `<div class="pipe">
    <div class="pipe-run">
      <div class="ph"><span class="pn">backend · main</span><span class="pmeta">#2291 · live · 01:12</span></div>
      <div class="stage-row">${stage('Build', 'passed', 'ok')}${sep}${stage('Test', 'running', 'run')}${sep}${stage('Image', 'queued', '')}${sep}${stage('Deploy', 'queued', '')}</div>
    </div>
    <div class="pipe-run">
      <div class="ph"><span class="pn">frontend · main</span><span class="pmeta">#1188 · passed · 02:04</span></div>
      <div class="stage-row">${stage('Build', 'passed', 'ok')}${sep}${stage('Test', 'passed', 'ok')}${sep}${stage('Bundle', 'passed', 'ok')}${sep}${stage('Deploy', 'passed', 'ok')}</div>
    </div>
    <div class="pipe-run">
      <div class="ph"><span class="pn">app · release-1.0</span><span class="pmeta">#341 · passed · 06:31</span></div>
      <div class="stage-row">${stage('Build', 'passed', 'ok')}${sep}${stage('Test', 'passed', 'ok')}${sep}${stage('Sign', 'passed', 'ok')}${sep}${stage('TestFlight', 'passed', 'ok')}</div>
    </div>
    <div class="pipe-run">
      <div class="ph"><span class="pn">infra · staging</span><span class="pmeta">#77 · failed · 02:02</span></div>
      <div class="stage-row">${stage('Plan', 'passed', 'ok')}${sep}${stage('Apply', 'failed', '')}${sep}${stage('Smoke', 'skipped', '')}${sep}${stage('Notify', 'sent', 'ok')}</div>
    </div>
  </div>`;
  const pipelinesRight = `<div class="th">— Run · backend #2291</div>
    <div class="detail-kv">
      <div class="kv"><span class="k">Trigger</span><span class="v mono">push · backend-lead</span></div>
      <div class="kv"><span class="k">Commit</span><span class="v mono">a39f1c · persistence layer</span></div>
      <div class="kv"><span class="k">Stage</span><span class="v">Test · cargo test --workspace</span></div>
    </div>
    <div><div class="th" style="border: none; padding: 0 0 8px;">Log</div>
      <div class="detail-kv">
        <div class="kv"><span class="v mono" style="color: var(--ok);">✓ build · 0 warnings</span></div>
        <div class="kv"><span class="v mono">▸ test · 142 passed, running…</span></div>
        <div class="kv"><span class="v mono" style="color: var(--ink-mute);">· image · queued</span></div>
      </div>
    </div>`;

  // ========================================================================
  const screens = [
    { n: 1, title: 'Specs', meta: 'Human intent → tasks', url: 'app.workinabox.ai/orgs/gos/specs', active: 'specs', h1: 'Specs', crumb: '/ Gos &amp; co / 23 specs', tools: T.filter('Filter specs…') + T.primary('+ New spec'), main: specsMain, right: specsRight },
    { n: 2, title: 'Board', meta: 'Tasks across status', url: 'app.workinabox.ai/orgs/gos/board', active: 'board', h1: 'Board', crumb: '/ Gos &amp; co / vertical · engineering', tools: T.filter('Filter tasks…') + T.ghost('Group: status') + T.primary('+ Spec'), main: boardMain, right: boardRight },
    { n: 3, title: 'Agents', meta: 'The workforce', url: 'app.workinabox.ai/orgs/gos/agents', active: 'agents', h1: 'Agents', crumb: '/ Gos &amp; co / 14 agents · 5 active', tools: T.filter('Filter agents…') + T.primary('+ Agent'), main: agentsMain, right: agentsRight },
    { n: 4, title: 'Repos', meta: 'Where the work lands', url: 'app.workinabox.ai/orgs/gos/repos', active: 'repos', h1: 'Repos', crumb: '/ Gos &amp; co / 34 repositories', tools: T.filter('Filter repos…') + T.ghost('Sort: activity'), main: reposMain, right: reposRight },
    { n: 5, title: 'Traces', meta: 'Every run, audited', url: 'app.workinabox.ai/orgs/gos/traces', active: 'traces', h1: 'Traces', crumb: '/ Gos &amp; co / runs', tools: T.filter('Filter runs…') + T.ghost('Last 24h'), main: tracesMain, right: tracesRight },
    { n: 6, title: 'Rooms', meta: 'Voice meetings with agents', url: 'app.workinabox.ai/orgs/gos/rooms', active: 'rooms', h1: 'Rooms', crumb: '/ Gos &amp; co / 2 live', tools: T.ghost('History') + T.primary('+ Start room'), main: roomsMain, right: roomsRight },
    { n: 7, title: 'Security gates', meta: 'Input · retrieval · execution', url: 'app.workinabox.ai/orgs/gos/security', active: 'security', h1: 'Security gates', crumb: '/ Gos &amp; co / 3 gates', tools: T.ghost('Audit log'), main: securityMain, right: securityRight },
    { n: 8, title: 'Pipelines', meta: 'Build · test · deliver', url: 'app.workinabox.ai/orgs/gos/pipelines', active: 'pipelines', h1: 'Pipelines', crumb: '/ Gos &amp; co / 4 active', tools: T.filter('Filter pipelines…') + T.ghost('All repos'), main: pipelinesMain, right: pipelinesRight }
  ];

  const root = document.getElementById('console-screens');
  if (root) {
    root.innerHTML = screens.map(frame).join('');
    if (window.renderLogos) window.renderLogos(document.documentElement.getAttribute('data-logo') || 'brain');
  }
})();
