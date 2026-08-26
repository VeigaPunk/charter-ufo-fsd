/* PLAZIR-27 — i18n engine. vanilla, no deps.
   locales/{lng}.json -> [data-i18n] innerHTML binding.
   persistence: localStorage 'plazir-lang'. fallback: en.
   Kimi badge: zh-CN → kimi.com + referral; all other langs → kimi.ai + referral. */
(() => {
  'use strict';
  const LOCALES = ['en', 'zh-CN', 'ja', 'id', 'ms', 'th', 'vi', 'fil', 'my', 'km'];
  const STORE = 'plazir-lang';
  const KIMI_INVITE_PATH = '/activities/invite/share?scenario=invite&from=share_poster&invitation_code=W6NGNP';
  const kimiHref = (lng) =>
    'https://www.' + (lng === 'zh-CN' ? 'kimi.com' : 'kimi.ai') + KIMI_INVITE_PATH;
  let dict = {};

  const detect = () => {
    const saved = localStorage.getItem(STORE);
    if (saved && LOCALES.includes(saved)) return saved;
    const nav = (navigator.language || 'en').toLowerCase();
    if (nav.startsWith('zh')) return 'zh-CN';
    if (nav.startsWith('ja')) return 'ja';
    if (nav.startsWith('id')) return 'id';
    if (nav.startsWith('ms')) return 'ms';
    if (nav.startsWith('th')) return 'th';
    if (nav.startsWith('vi')) return 'vi';
    if (nav.startsWith('tl') || nav.startsWith('fil')) return 'fil';
    if (nav.startsWith('my')) return 'my';
    if (nav.startsWith('km')) return 'km';
    return 'en';
  };

  const applyKimiBadge = (lng) => {
    const badge = document.getElementById('kimi-badge');
    if (!badge) return;
    const href = (dict && dict['badge.href']) || kimiHref(lng || 'en');
    badge.setAttribute('href', href);
    badge.setAttribute('rel', 'sponsored nofollow noopener');
    badge.setAttribute('data-kimi-tld', href.includes('kimi.com') ? 'com' : 'ai');
  };

  const apply = (lng) => {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const v = dict[el.getAttribute('data-i18n')];
      if (typeof v === 'string') el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const v = dict[el.getAttribute('data-i18n-alt')];
      if (typeof v === 'string') el.setAttribute('alt', v);
    });
    if (dict['meta.title']) document.title = dict['meta.title'];
    const md = document.querySelector('meta[name="description"]');
    if (md && dict['meta.desc']) md.setAttribute('content', dict['meta.desc']);
    applyKimiBadge(lng || document.documentElement.getAttribute('lang') || 'en');
  };

  const setLang = async (lng) => {
    if (!LOCALES.includes(lng)) lng = 'en';
    try {
      const res = await fetch('locales/' + lng + '.json');
      if (!res.ok) throw new Error(res.status);
      dict = await res.json();
    } catch (e) {
      if (lng !== 'en') return setLang('en');
      dict = {};
    }
    document.documentElement.setAttribute('lang', lng);
    localStorage.setItem(STORE, lng);
    const sel = document.getElementById('langsel');
    if (sel && sel.value !== lng) sel.value = lng;
    apply(lng);
  };

  window.PLAZIR_I18N = { setLang, LOCALES, kimiHref };

  document.addEventListener('DOMContentLoaded', () => {
    const sel = document.getElementById('langsel');
    if (sel) sel.addEventListener('change', () => setLang(sel.value));
    // apply badge immediately from detect() before fetch returns (avoids stale .com flash for intl)
    applyKimiBadge(detect());
    setLang(detect());
  });
})();
