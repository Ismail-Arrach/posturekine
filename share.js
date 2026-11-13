/* ═══════════ Bouton de partage (réseaux sociaux) ═══════════
   Ajoute un bouton rond en bas de l'écran. Au clic : WhatsApp, Facebook, X, LinkedIn,
   Telegram, e-mail, copier le lien, et sur mobile le partage du téléphone (« Plus… »).
   Réglages sur la balise <script> :
     data-accent        couleur du bouton            (ex. #355b50)
     data-ink           couleur de l'icône du bouton (ex. #ffffff)
     data-side          left | right                 (défaut : left)
     data-mobile-bottom décalage sur mobile, pour ne pas cacher une barre fixe (ex. 5.6rem)
   La langue suit <html lang="…"> : ar, fr ou en. */
(function () {
  var me = document.currentScript || {}
  var ds = me.dataset || {}
  var accent = ds.accent || '#222'
  var ink = ds.ink || '#fff'
  var side = ds.side === 'right' ? 'right' : 'left'
  var mobileBottom = ds.mobileBottom || '1rem'

  var T = {
    fr: { open: 'Partager cette page', title: 'Partager', copy: 'Copier le lien', copied: 'Lien copié ✓', more: 'Plus…', mail: 'E-mail', close: 'Fermer' },
    en: { open: 'Share this page', title: 'Share', copy: 'Copy link', copied: 'Link copied ✓', more: 'More…', mail: 'Email', close: 'Close' },
    ar: { open: 'شارك هذه الصفحة', title: 'مشاركة', copy: 'نسخ الرابط', copied: 'تم نسخ الرابط ✓', more: 'المزيد…', mail: 'البريد', close: 'إغلاق' }
  }
  function t() { var l = (document.documentElement.lang || 'fr').slice(0, 2); return T[l] || T.fr }

  var I = {
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4"/>',
    whatsapp: '<path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z"/><path d="M9 8.3c-.4 2.6 3.1 6.7 6.6 6.6l.9-1.5-2-1-1 .8c-1-.5-1.9-1.4-2.4-2.4l.8-1-1-2z" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M15 3.5h-2.2C10.6 3.5 9.5 5 9.5 7.2V10H7v3.4h2.5V21h3.6v-7.6h2.6L16 10h-2.9V7.8c0-.7.3-1 1-1H16V3.6z" fill="currentColor" stroke="none"/>',
    x: '<path d="M4 4l16 16M20 4L4 20"/>',
    linkedin: '<path d="M6.5 10v8M6.5 6.2v.1M10.5 18v-8M10.5 13.5a3.2 3.2 0 0 1 6.4 0V18"/>',
    telegram: '<path d="M21 4L3 11.2l6 2.2 2.2 6.1 3.3-3.9 4.9 3.6z"/><path d="M9 13.4L21 4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    more: '<circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/>'
  }
  function svg(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + I[name] + '</svg>' }

  var css = '' +
    '.shr{position:fixed;bottom:calc(1.2rem + env(safe-area-inset-bottom));' + side + ':1.2rem;z-index:95;font-family:inherit;direction:ltr}' +
    '.shr__btn{width:3.1rem;height:3.1rem;border-radius:50%;border:0;display:grid;place-items:center;cursor:pointer;background:' + accent + ';color:' + ink + ';box-shadow:0 10px 30px rgba(0,0,0,.25);transition:transform .3s cubic-bezier(.2,.8,.2,1)}' +
    '.shr__btn:hover{transform:scale(1.08)}.shr__btn:focus-visible,.shr__item:focus-visible{outline:3px solid ' + accent + ';outline-offset:3px}' +
    '.shr__btn svg{width:1.35rem;height:1.35rem}' +
    '.shr__panel{position:absolute;bottom:calc(100% + .7rem);' + side + ':0;width:min(17.5rem,calc(100vw - 2rem));padding:1rem;border-radius:20px;background:#fff;color:#1d1d1f;box-shadow:0 24px 60px rgba(0,0,0,.28);opacity:0;visibility:hidden;transform:translateY(10px) scale(.97);transform-origin:bottom ' + side + ';transition:opacity .25s,transform .3s cubic-bezier(.2,.8,.2,1),visibility 0s .3s}' +
    '.shr.is-open .shr__panel{opacity:1;visibility:visible;transform:none;transition-delay:0s}' +
    '.shr__title{margin:0 0 .8rem;font-size:.95rem;font-weight:600;text-align:center}' +
    '.shr__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.7rem .3rem}' +
    '.shr__item{display:flex;flex-direction:column;align-items:center;gap:.35rem;padding:0;border:0;background:none;color:inherit;font:inherit;font-size:.7rem;line-height:1.2;text-align:center;text-decoration:none;cursor:pointer}' +
    '.shr__ico{width:2.7rem;height:2.7rem;border-radius:50%;display:grid;place-items:center;color:#fff;transition:transform .2s}' +
    '.shr__item:hover .shr__ico{transform:translateY(-2px)}.shr__ico svg{width:1.3rem;height:1.3rem}' +
    '.shr__toast{margin:.8rem 0 0;font-size:.8rem;text-align:center;color:#15803d;min-height:1em}' +
    '@media (max-width:640px){.shr{bottom:calc(' + mobileBottom + ' + env(safe-area-inset-bottom))}}' +
    '@media print{.shr{display:none}}' +
    '@media (prefers-reduced-motion:reduce){.shr__btn,.shr__panel,.shr__ico{transition:none}}'

  function meta(p) { var m = document.querySelector('meta[property="' + p + '"]'); return m ? m.content : '' }

  function build() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st)
    var L = t()
    var box = document.createElement('div'); box.className = 'shr'
    box.innerHTML =
      '<div class="shr__panel" role="dialog" aria-label="' + L.title + '"><p class="shr__title"></p><div class="shr__grid"></div><p class="shr__toast" aria-live="polite"></p></div>' +
      '<button class="shr__btn" type="button" aria-expanded="false" aria-label="' + L.open + '">' + svg('share') + '</button>'
    document.body.appendChild(box)
    var btn = box.querySelector('.shr__btn'), grid = box.querySelector('.shr__grid'), toast = box.querySelector('.shr__toast')

    function fill() {
      L = t()
      box.querySelector('.shr__title').textContent = L.title
      btn.setAttribute('aria-label', L.open)
      var url = location.href.split('#')[0] + (location.hash && location.hash.length > 1 ? location.hash : '')
      var title = meta('og:title') || document.title
      var u = encodeURIComponent(url), tt = encodeURIComponent(title)
      var items = [
        ['whatsapp', 'WhatsApp', '#25d366', 'https://wa.me/?text=' + tt + '%20' + u],
        ['facebook', 'Facebook', '#1877f2', 'https://www.facebook.com/sharer/sharer.php?u=' + u],
        ['x', 'X', '#111', 'https://twitter.com/intent/tweet?url=' + u + '&text=' + tt],
        ['linkedin', 'LinkedIn', '#0a66c2', 'https://www.linkedin.com/sharing/share-offsite/?url=' + u],
        ['telegram', 'Telegram', '#229ed9', 'https://t.me/share/url?url=' + u + '&text=' + tt],
        ['mail', L.mail, '#6b7280', 'mailto:?subject=' + tt + '&body=' + u],
        ['link', L.copy, '#374151', null]
      ]
      if (navigator.share && matchMedia('(pointer: coarse)').matches) items.push(['more', L.more, '#9ca3af', 'native'])
      grid.innerHTML = items.map(function (it) {
        var inner = '<span class="shr__ico" style="background:' + it[2] + '">' + svg(it[0]) + '</span><span>' + it[1] + '</span>'
        if (it[3] && it[3] !== 'native') return '<a class="shr__item" href="' + it[3] + '" target="_blank" rel="noopener noreferrer">' + inner + '</a>'
        return '<button class="shr__item" type="button" data-act="' + (it[3] || 'copy') + '">' + inner + '</button>'
      }).join('')
      grid.querySelector('[data-act="copy"]').onclick = function () {
        var done = function () { toast.textContent = L.copied; setTimeout(function () { toast.textContent = '' }, 2200) }
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(done, function () { prompt(L.copy, url) })
        else prompt(L.copy, url)
      }
      var nat = grid.querySelector('[data-act="native"]')
      if (nat) nat.onclick = function () { navigator.share({ title: title, url: url }).catch(function () {}) }
    }

    function open(v, byKeyboard) {
      if (v) fill()
      box.classList.toggle('is-open', v)
      btn.setAttribute('aria-expanded', String(v))
      if (v && byKeyboard) { var first = grid.querySelector('.shr__item'); if (first) first.focus() }
    }
    btn.addEventListener('click', function (e) { open(!box.classList.contains('is-open'), e.detail === 0) })
    document.addEventListener('click', function (e) { if (box.classList.contains('is-open') && !box.contains(e.target)) open(false) })
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('is-open')) { open(false); btn.focus() } })
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build)
  else build()
})()
