// ===== Menu, pied de page et barre mobile, communs à toutes les pages =====
// Pour ajouter ou renommer un soin, modifiez uniquement les deux listes ci-dessous.

const SOINS = [
  { slug: 'reeducation-traumatologique-orthopedique', name: 'Rééducation traumatologique et orthopédique', short: 'Après une blessure ou une chirurgie' },
  { slug: 'reeducation-neurologique', name: 'Rééducation neurologique', short: 'AVC, Parkinson, troubles de la marche' },
  { slug: 'reeducation-fonctionnelle-posturale', name: 'Rééducation fonctionnelle et posturale', short: 'Marche, équilibre, posture' },
  { slug: 'reeducation-musculosquelettique', name: 'Rééducation musculosquelettique', short: 'Douleurs musculaires et articulaires' },
  { slug: 'reeducation-pediatrique', name: 'Rééducation pédiatrique', short: 'Le développement moteur de l’enfant' },
]

const SPECIALITES = [
  { slug: 'scoliose-schroth-seas', name: 'Rééducation de la scoliose — Schroth & SEAS', short: 'Enfants, adolescents et adultes' },
  { slug: 'reeducation-du-dos', name: 'Rééducation du dos', short: 'Lombalgie, cervicalgie, hernie discale' },
  { slug: 'reeducation-perineale', name: 'Rééducation périnéale', short: 'Après l’accouchement, fuites, prolapsus' },
  { slug: 'kinesitherapie-a-domicile', name: 'Kinésithérapie à domicile', short: 'Des séances chez vous, sur demande' },
]

// ==========================================================================

const ROOT = document.body.dataset.root || ''
const CURRENT = document.body.dataset.slug || ''

const ICONS = {
  soins: '<path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/>',
  specialites: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  parcours: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  cabinet: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01"/>',
  contact: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
}
const icon = name => `<svg class="menu__icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`
const page = slug => `${ROOT}soins/${slug}.html`
const home = hash => `${ROOT}index.html${hash}`

function subMenu(id, items) {
  return `
    <div class="sub" id="${id}">
      <ul class="sub__list">
        ${items.map(s => `
          <li><a class="sub__link${s.slug === CURRENT ? ' is-current' : ''}" href="${page(s.slug)}"${s.slug === CURRENT ? ' aria-current="page"' : ''}>
            <span class="sub__name">${s.name}</span>
            <span class="sub__short">${s.short}</span>
          </a></li>`).join('')}
      </ul>
    </div>`
}

const headerHTML = `
<a class="skip-link" href="#main">Aller au contenu</a>
<div class="spine-progress" aria-hidden="true" data-spine-progress>${'<span></span>'.repeat(12)}</div>
<header class="header" data-header>
  <div class="header__inner">
    <a href="${home('#accueil')}" class="logo" aria-label="Posture Kiné, accueil">
      <span class="logo__chip"><img src="${ROOT}images/logo-emblem.png" alt="" width="64" height="64" /></span>
      <span class="logo__text">
        <span class="logo__name">Posture <em>Kiné</em></span>
        <span class="logo__sub">Votre allié en kinésithérapie</span>
      </span>
    </a>

    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-nav-toggle>
      <span class="sr-only">Menu</span>
      <span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span></span>
    </button>

    <nav id="primary-nav" class="nav" aria-label="Navigation principale">
      <ul class="menu">
        <li class="has-sub">
          <button class="menu__parent" type="button" aria-expanded="false" aria-controls="sub-soins" data-sub-toggle>${icon('soins')}Soins et rééducation<span class="menu__chev" aria-hidden="true"></span></button>
          ${subMenu('sub-soins', SOINS)}
        </li>
        <li class="has-sub">
          <button class="menu__parent" type="button" aria-expanded="false" aria-controls="sub-specialites" data-sub-toggle>${icon('specialites')}Nos spécialités<span class="menu__chev" aria-hidden="true"></span></button>
          ${subMenu('sub-specialites', SPECIALITES)}
        </li>
        <li><a href="${home('#mon-parcours')}">${icon('parcours')}Mon parcours</a></li>
        <li><a href="${home('#le-cabinet')}">${icon('cabinet')}Le cabinet</a></li>
        <li><a href="${home('#contact')}">${icon('contact')}Contact et accès</a></li>
      </ul>
      <div class="nav__extra">
        <a class="cta cta--rose" href="${home('#prendre-rendez-vous')}">Prendre rendez-vous</a>
        <a class="cta cta--line-light" href="#" data-whatsapp target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </nav>

    <a class="cta cta--forest header__rdv" href="${home('#prendre-rendez-vous')}">Prendre RDV</a>
  </div>
</header>`

const footerHTML = `
<footer class="footer">
  <div class="footer__inner">
    <div class="footer__top">
      <div class="footer__logo"><img src="${ROOT}images/logo-posture-kine.png" alt="Posture Kiné — Posture, Équilibre, Énergie" width="1049" height="1021" loading="lazy" /></div>
      <div class="footer__name"><p class="footer__brand">Posture <em>Kiné</em></p><p class="footer__owner">Votre allié en kinésithérapie · Yasmine Brini</p></div>
      <a class="footer__up" href="#main" aria-label="Revenir en haut">↑</a>
    </div>
    <div class="footer__cols">
      <div>
        <p class="footer__title">Adresse</p>
        <p data-address>Adresse du cabinet</p>
        <p class="footer__title footer__title--gap">Horaires</p>
        <ul class="footer__list" data-hours></ul>
      </div>
      <div>
        <p class="footer__title">Soins et rééducation</p>
        <ul class="footer__list">${SOINS.map(s => `<li><a href="${page(s.slug)}">${s.name}</a></li>`).join('')}</ul>
      </div>
      <div>
        <p class="footer__title">Nos spécialités</p>
        <ul class="footer__list">${SPECIALITES.map(s => `<li><a href="${page(s.slug)}">${s.name}</a></li>`).join('')}</ul>
      </div>
      <div>
        <p class="footer__title">Contact</p>
        <p><a href="#" data-phone data-phone-text></a><br /><a href="#" data-email></a></p>
        <p class="footer__title footer__title--gap">Suivez-nous</p>
        <ul class="footer__socials" aria-label="Réseaux sociaux">
          <li><a href="https://www.instagram.com/" data-social="instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle class="footer__social-dot" cx="17.5" cy="6.5" r="1"/></svg>
          </a></li>
          <li><a href="https://www.facebook.com/" data-social="facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h1.7V1.4C17 1.2 15.8 1 14.4 1 11.2 1 9 2.9 9 6.4V9H6v4h3v8z"/></svg>
          </a></li>
          <li><a href="https://www.tiktok.com/" data-social="tiktok" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 6.3a6.4 6.4 0 0 1-4.1-4.1V1h-4.1v14.2a2.8 2.8 0 1 1-2.8-2.8c.4 0 .8.1 1.1.2V8.4a7 7 0 1 0 5.8 6.9V8.1a10.5 10.5 0 0 0 5.1 1.3V5.3c-.4.1-.7.1-1 .1z"/></svg>
          </a></li>
        </ul>
      </div>
    </div>
    <div class="footer__legal">
      <p>© <span data-year></span> Posture Kiné · Yasmine Brini, kinésithérapeute · <span data-city></span></p>
      <p class="footer__motto">Posture <i>●</i> Équilibre <i>●</i> Énergie</p>
    </div>
  </div>
</footer>

<nav class="mobile-bar" aria-label="Actions rapides">
  <a href="#" data-phone aria-label="Appeler">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>
  </a>
  <a href="#" data-whatsapp target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
  </a>
  <a href="${home('#prendre-rendez-vous')}" class="mobile-bar__main">Prendre rendez-vous</a>
</nav>`

document.querySelector('[data-site-header]').outerHTML = headerHTML
document.querySelector('[data-site-footer]').outerHTML = footerHTML

// Pages de soin : déroulé de la prise en charge + bandeau final de rendez-vous
const pageBody = document.querySelector('.page-body')
if (pageBody) {
  // On reprend le motif du bouton "Prendre rendez-vous" du haut de la page
  const heroLink = document.querySelector('.page-hero a[href*="motif="]')
  const motif = encodeURIComponent(heroLink ? new URL(heroLink.href).searchParams.get('motif') : '')
  pageBody.insertAdjacentHTML('afterend', `
  <section class="section page-steps">
    <div class="section__inner">
      <div class="section-head section-head--center reveal">
        <p class="label label--rose"><span class="label__num">→</span>Comment ça se passe&nbsp;?</p>
        <h2>Votre prise en charge,<br /><em>en trois temps.</em></h2>
      </div>
      <ol class="page-steps__list">
        <li class="page-step reveal">
          <span class="page-step__num">01</span>
          <h3>Une évaluation précise</h3>
          <p>Un premier échange et un bilan pour comprendre votre histoire, vos douleurs, votre mobilité et vos objectifs.</p>
        </li>
        <li class="page-step reveal">
          <span class="page-step__num">02</span>
          <h3>Un programme sur mesure</h3>
          <p>Un plan de rééducation construit avec vous, adapté à votre quotidien et expliqué clairement.</p>
        </li>
        <li class="page-step reveal">
          <span class="page-step__num">03</span>
          <h3>Un suivi régulier</h3>
          <p>Des séances progressives et un suivi attentif pour mesurer vos progrès, en confiance.</p>
        </li>
      </ol>
    </div>
  </section>

  <section class="page-cta">
    <div class="page-cta__inner section__inner reveal">
      <div class="page-cta__emblem" aria-hidden="true"><img src="${ROOT}images/logo-emblem.png" alt="" /></div>
      <div class="page-cta__text">
        <p class="page-cta__title">Envie de faire <em>le premier pas&nbsp;?</em></p>
        <p>Posture Kiné vous accueille à Guéliz, Marrakech, ou se déplace à domicile sur demande.</p>
      </div>
      <div class="page-cta__actions">
        <a class="cta cta--rose cta--lg" href="${home(`?motif=${motif}#prendre-rendez-vous`)}">Prendre rendez-vous <span class="cta__arrow" aria-hidden="true">↗</span></a>
        <a class="cta cta--line-light cta--lg" href="#" data-whatsapp target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </div>
  </section>`)
}

// Liens "Autres soins" sur les pages de soin
const related = document.querySelector('[data-related]')
if (related) {
  related.innerHTML = [...SOINS, ...SPECIALITES]
    .filter(s => s.slug !== CURRENT)
    .map(s => `<li><a href="${page(s.slug)}"><span>${s.name}</span><span aria-hidden="true">↗</span></a></li>`)
    .join('')
}
