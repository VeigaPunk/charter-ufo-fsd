/* PLAZIR-27 — Rio-style split TUI for the two plans.
   rioterm wasm needs a bundler (npm i rioterm / wasm-pack). GH Pages here is
   static, no COOP/COEP: paint the same split with a line-grid pump at 76 tps.
   Full files. No ellipses. Left = native grok. Right = kimi k3 + wwkd. */
(() => {
  'use strict';

  const TPS = 76;
  const ROOT = new URL('.', document.currentScript.src);
  const FILES = {
    left: new URL('native-grok-plan.md', ROOT).href,
    right: new URL('kimi-k3-wwkd-plan.md', ROOT).href,
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function lineDiff(aText, bText) {
    const A = aText.split('\n');
    const B = bText.split('\n');
    const n = A.length;
    const m = B.length;
    const dp = Array.from({ length: n + 1 }, () => new Int16Array(m + 1));
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i][j] = A[i] === B[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    const left = [];
    const right = [];
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
      if (A[i] === B[j]) {
        left.push({ s: A[i], k: 'eq' });
        right.push({ s: B[j], k: 'eq' });
        i++;
        j++;
      } else if (dp[i + 1][j] >= dp[i][j + 1]) {
        left.push({ s: A[i++], k: 'del' });
      } else {
        right.push({ s: B[j++], k: 'add' });
      }
    }
    while (i < n) left.push({ s: A[i++], k: 'del' });
    while (j < m) right.push({ s: B[j++], k: 'add' });
    return { left, right };
  }

  function pane(screen, bar) {
    const state = { tagged: [], i: 0, done: false };
    const paint = () => {
      const vis = 56;
      const start = Math.max(0, state.i - vis);
      let html = '';
      for (let n = start; n < state.i; n++) {
        const { s, k } = state.tagged[n];
        html += `<span class="rd-${k}">${esc(s)}</span>\n`;
      }
      screen.innerHTML = html + '<span class="rd-cur">█</span>';
      screen.scrollTop = screen.scrollHeight;
      const pct = state.tagged.length
        ? Math.min(100, Math.floor((state.i / state.tagged.length) * 100))
        : 0;
      bar.textContent = `${pct}% · ${state.i}/${state.tagged.length} ln · ${TPS}tps`;
    };
    const step = () => {
      if (state.i >= state.tagged.length) {
        state.done = true;
        return false;
      }
      state.i++;
      return true;
    };
    const fill = () => {
      state.i = state.tagged.length;
      state.done = true;
      paint();
    };
    return { state, paint, step, fill };
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
      <div class="rd-win" role="dialog" aria-modal="true" aria-label="rio split — the two plans">
        <div class="rd-chrome">
          <span class="rd-dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="rd-title">rio — split · 76tps · complete stdout</span>
          <button type="button" class="rd-x" data-rd-close>esc</button>
        </div>
        <p class="rd-lede">
          Left is what native Grok <b>filed</b> after quoting one line.
          Right is the <b>complete</b> Kimi K3 Max + wwkd consult.
          Both panes load at ${TPS} lines/sec. No ellipses.
          Outbound:
          <a href="${FILES.left}">native-grok-plan.md</a>
          ·
          <a href="${FILES.right}">kimi-k3-wwkd-plan.md</a>
          ·
          <a href="${new URL('.', ROOT).href}">the two plans</a>
          · space = skip to end
        </p>
        <div class="rd-split">
          <div class="rd-col">
            <div class="rd-bar"><span class="rd-name">native grok filed</span><span class="rd-stat" id="rd-lstat">idle</span></div>
            <pre class="rd-screen" id="rd-left"></pre>
          </div>
          <div class="rd-col">
            <div class="rd-bar"><span class="rd-name">kimi k3 + wwkd stdout</span><span class="rd-stat" id="rd-rstat">idle</span></div>
            <pre class="rd-screen" id="rd-right"></pre>
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
    let a;
    let b;
    try {
      [a, b] = await Promise.all([
        fetch(FILES.left).then((r) => {
          if (!r.ok) throw new Error(FILES.left + ' ' + r.status);
          return r.text();
        }),
        fetch(FILES.right).then((r) => {
          if (!r.ok) throw new Error(FILES.right + ' ' + r.status);
          return r.text();
        }),
      ]);
    } catch (err) {
      document.getElementById('rd-left').textContent = String(err);
      return;
    }
    const tagged = lineDiff(a, b);
    L.state.tagged = tagged.left;
    R.state.tagged = tagged.right;
    if (reduce) {
      L.fill();
      R.fill();
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
        L.paint();
        R.paint();
      }
      if (L.state.done && R.state.done) {
        raf = 0;
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
    L.fill();
    R.fill();
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
