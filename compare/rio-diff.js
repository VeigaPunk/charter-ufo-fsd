/* PLAZIR-27 — Rio-style split: type mermaid at 76tps, then render SVG.
   Nodes click through to the complete plan files. No ellipses. */
(() => {
  'use strict';

  const TPS = 76;
  const ROOT = new URL('.', document.currentScript.src);
  const FILES = {
    leftMd: new URL('native-grok-plan.md', ROOT).href,
    rightMd: new URL('kimi-k3-wwkd-plan.md', ROOT).href,
    leftMmd: new URL('native-grok-plan.mmd', ROOT).href,
    rightMmd: new URL('kimi-k3-wwkd-plan.mmd', ROOT).href,
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let mermaidMod = null;
  async function mermaid() {
    if (mermaidMod) return mermaidMod;
    const mod = await import(
      'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs'
    );
    mermaidMod = mod.default;
    mermaidMod.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'dark',
      themeVariables: {
        darkMode: true,
        background: '#050505',
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: '13px',
        primaryColor: '#1a0c0c',
        primaryTextColor: '#d6d2c8',
        primaryBorderColor: '#e8332a',
        secondaryColor: '#0b0b0b',
        tertiaryColor: '#111111',
        lineColor: '#e8332a',
        textColor: '#d6d2c8',
        nodeTextColor: '#d6d2c8',
        mainBkg: '#1a0c0c',
        clusterBkg: '#0b0b0b',
        titleColor: '#e8332a',
        edgeLabelBackground: '#0b0b0b',
      },
    });
    return mermaidMod;
  }

  function withClicks(src, href) {
    const ids = new Set();
    const re = /^\s*([A-Za-z][\w]*)\[/gm;
    let m;
    while ((m = re.exec(src))) ids.add(m[1]);
    const extra = [...ids]
      .map((id) => `  click ${id} href "${href}" _blank`)
      .join('\n');
    return extra ? `${src.trim()}\n${extra}\n` : src;
  }

  function pane(screen, bar) {
    const state = { chars: [], i: 0, done: false, href: '', source: '' };
    const paintText = () => {
      const text = state.chars.slice(0, state.i).join('');
      screen.classList.remove('rd-mmd');
      screen.classList.add('rd-screen');
      screen.innerHTML =
        `<span class="rd-eq">${esc(text)}</span><span class="rd-cur">█</span>`;
      screen.scrollTop = screen.scrollHeight;
      const pct = state.chars.length
        ? Math.min(100, Math.floor((state.i / state.chars.length) * 100))
        : 0;
      bar.textContent = `${pct}% · mermaid src · ${TPS}tps`;
    };
    const step = () => {
      if (state.i >= state.chars.length) {
        state.done = true;
        return false;
      }
      state.i++;
      return true;
    };
    const fill = () => {
      state.i = state.chars.length;
      state.done = true;
    };
    const paintGraph = async () => {
      fill();
      bar.textContent = 'render mermaid…';
      try {
        const mm = await mermaid();
        const id = 'rdm-' + Math.random().toString(36).slice(2, 10);
        const src = withClicks(state.source, state.href);
        const { svg, bindFunctions } = await mm.render(id, src);
        screen.classList.remove('rd-screen');
        screen.classList.add('rd-mmd');
        screen.innerHTML = svg;
        bindFunctions?.(screen);
        bar.textContent = 'mermaid · click a node';
      } catch (err) {
        screen.classList.add('rd-screen');
        screen.textContent = String(err);
        bar.textContent = 'mermaid failed';
      }
    };
    return { state, paintText, step, fill, paintGraph };
  }

  function esc(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function mount() {
    if (document.getElementById('rd-modal')) return;
    const wrap = document.createElement('div');
    wrap.id = 'rd-modal';
    wrap.setAttribute('hidden', '');
    wrap.innerHTML = `
      <div class="rd-win" role="dialog" aria-modal="true" aria-label="rio split mermaid — the two plans">
        <div class="rd-chrome">
          <span class="rd-dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="rd-title">rio — split · mermaid · 76tps</span>
          <button type="button" class="rd-x" data-rd-close>esc</button>
        </div>
        <p class="rd-lede">
          Both graphs type at ${TPS} tps then <b>render in mermaid</b>.
          Click a node to open that plan.
          Outbound:
          <a href="${FILES.leftMd}">native-grok-plan.md</a>
          ·
          <a href="${FILES.rightMd}">kimi-k3-wwkd-plan.md</a>
          ·
          <a href="${FILES.leftMmd}">native-grok-plan.mmd</a>
          ·
          <a href="${FILES.rightMmd}">kimi-k3-wwkd-plan.mmd</a>
          ·
          <a href="${new URL('.', ROOT).href}">the two plans</a>
          · space = skip to graph
        </p>
        <div class="rd-split">
          <div class="rd-col">
            <div class="rd-bar"><span class="rd-name">native grok filed</span><span class="rd-stat" id="rd-lstat">idle</span></div>
            <div class="rd-screen" id="rd-left"></div>
          </div>
          <div class="rd-col">
            <div class="rd-bar"><span class="rd-name">kimi k3 + wwkd stdout</span><span class="rd-stat" id="rd-rstat">idle</span></div>
            <div class="rd-screen" id="rd-right"></div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(wrap);
    wrap.addEventListener('click', (e) => {
      if (e.target === wrap) close();
    });
    wrap.querySelector('[data-rd-close]').addEventListener('click', close);
  }

  let raf = 0;
  let L;
  let R;
  let open = false;

  async function start() {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    mount();
    const modal = document.getElementById('rd-modal');
    modal.removeAttribute('hidden');
    document.documentElement.classList.add('rd-lock');
    open = true;
    L = pane(
      document.getElementById('rd-left'),
      document.getElementById('rd-lstat'),
    );
    R = pane(
      document.getElementById('rd-right'),
      document.getElementById('rd-rstat'),
    );
    L.state.href = FILES.leftMd;
    R.state.href = FILES.rightMd;
    try {
      const [a, b] = await Promise.all([
        fetch(FILES.leftMmd).then((r) => {
          if (!r.ok) throw new Error(FILES.leftMmd + ' ' + r.status);
          return r.text();
        }),
        fetch(FILES.rightMmd).then((r) => {
          if (!r.ok) throw new Error(FILES.rightMmd + ' ' + r.status);
          return r.text();
        }),
      ]);
      L.state.source = a;
      R.state.source = b;
      L.state.chars = [...a];
      R.state.chars = [...b];
    } catch (err) {
      document.getElementById('rd-left').textContent = String(err);
      return;
    }
    if (reduce) {
      await Promise.all([L.paintGraph(), R.paintGraph()]);
      return;
    }
    let last = 0;
    let acc = 0;
    const frame = (ts) => {
      if (!open) return;
      if (!last) last = ts;
      acc += (ts - last) / 1000;
      last = ts;
      let n = Math.floor(acc * TPS);
      if (n > 0) {
        acc -= n / TPS;
        while (n-- > 0) {
          L.step();
          R.step();
        }
        L.paintText();
        R.paintText();
      }
      if (L.state.done && R.state.done) {
        raf = 0;
        Promise.all([L.paintGraph(), R.paintGraph()]);
        return;
      }
      raf = window.requestAnimationFrame(frame);
    };
    raf = window.requestAnimationFrame(frame);
  }

  function close() {
    open = false;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    const modal = document.getElementById('rd-modal');
    if (modal) modal.setAttribute('hidden', '');
    document.documentElement.classList.remove('rd-lock');
    if (location.hash === '#diff') {
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  function skip() {
    if (!open || !L || !R) return;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    Promise.all([L.paintGraph(), R.paintGraph()]);
  }

  window.addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      skip();
    }
  });

  window.addEventListener('hashchange', () => {
    if (location.hash === '#diff') start();
    else if (open) close();
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-rd-open]');
    if (!a) return;
    e.preventDefault();
    if (location.hash !== '#diff') location.hash = 'diff';
    else start();
  });

  if (location.hash === '#diff') start();
})();
