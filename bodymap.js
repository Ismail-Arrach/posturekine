// ===== « Où avez-vous mal ? » : carte du corps interactive =====
// Pour modifier une zone, changez son texte ou ses soins ci-dessous.
// "soins" = slugs des pages dans soins/ ; "motif" = valeur pré-sélectionnée dans le formulaire.
;(function () {
  const panel = document.querySelector('[data-douleur-panel]')
  if (!panel) return

  const PAGES = {
    'reeducation-traumatologique-orthopedique': { name: 'Rééducation traumatologique et orthopédique', motif: 'Rééducation traumatologique et orthopédique' },
    'reeducation-neurologique': { name: 'Rééducation neurologique', motif: 'Rééducation neurologique' },
    'reeducation-fonctionnelle-posturale': { name: 'Rééducation fonctionnelle et posturale', motif: 'Rééducation fonctionnelle et posturale' },
    'reeducation-musculosquelettique': { name: 'Rééducation musculosquelettique', motif: 'Rééducation musculosquelettique' },
    'reeducation-pediatrique': { name: 'Rééducation pédiatrique', motif: 'Rééducation pédiatrique' },
    'scoliose-schroth-seas': { name: 'Rééducation de la scoliose — Schroth & SEAS', motif: 'Rééducation de la scoliose' },
    'reeducation-du-dos': { name: 'Rééducation du dos', motif: 'Rééducation du dos' },
    'reeducation-perineale': { name: 'Rééducation périnéale', motif: 'Rééducation périnéale' },
    'kinesitherapie-a-domicile': { name: 'Kinésithérapie à domicile', motif: 'Kinésithérapie à domicile' },
  }

  const ZONES = {
    tete: { title: 'Tête et équilibre', text: 'Vertiges, chutes, suites d’AVC ou maladie de Parkinson : on travaille l’équilibre, la marche et l’autonomie.', tags: ['Vertiges', 'Équilibre', 'AVC', 'Parkinson'], soins: ['reeducation-neurologique', 'reeducation-fonctionnelle-posturale'] },
    nuque: { title: 'Nuque et cou', text: 'Cervicalgie, torticolis, tensions liées aux écrans : thérapie manuelle et exercices pour relâcher et renforcer.', tags: ['Cervicalgie', 'Torticolis', 'Tensions'], soins: ['reeducation-du-dos', 'reeducation-musculosquelettique'] },
    epaule: { title: 'Épaule', text: 'Tendinite, capsulite, luxation ou suites de chirurgie : retrouver l’amplitude et la force de l’épaule.', tags: ['Tendinite', 'Capsulite', 'Luxation', 'Après chirurgie'], soins: ['reeducation-traumatologique-orthopedique', 'reeducation-musculosquelettique'] },
    colonne: { title: 'Colonne et posture', text: 'Scoliose, cyphose, dos voûté : une rééducation posturale ciblée, avec les méthodes Schroth et SEAS.', tags: ['Scoliose', 'Cyphose', 'Posture'], soins: ['scoliose-schroth-seas', 'reeducation-fonctionnelle-posturale'] },
    coude: { title: 'Coude, poignet et main', text: 'Épicondylite, tendinites, suites de fracture : soulager la douleur et retrouver la fonction.', tags: ['Épicondylite', 'Tendinite', 'Fracture'], soins: ['reeducation-musculosquelettique', 'reeducation-traumatologique-orthopedique'] },
    lombaires: { title: 'Bas du dos', text: 'Lombalgie, sciatique, hernie discale : thérapie manuelle, Pilates et physiothérapie pour un dos plus libre.', tags: ['Lombalgie', 'Sciatique', 'Hernie discale'], soins: ['reeducation-du-dos', 'reeducation-musculosquelettique'] },
    hanche: { title: 'Hanche', text: 'Arthrose, prothèse de hanche, douleurs à la marche : une rééducation progressive pour remarcher sereinement.', tags: ['Prothèse', 'Arthrose', 'Marche'], soins: ['reeducation-traumatologique-orthopedique', 'reeducation-fonctionnelle-posturale'] },
    bassin: { title: 'Bassin et périnée', text: 'Après un accouchement, en cas de fuites urinaires ou de prolapsus : une prise en charge douce et confidentielle.', tags: ['Post-partum', 'Fuites', 'Prolapsus'], soins: ['reeducation-perineale'] },
    genou: { title: 'Genou', text: 'Ligaments croisés (LCA, LCP), ménisque, prothèse de genou : récupérer stabilité, mobilité et confiance.', tags: ['LCA · LCP', 'Ménisque', 'Prothèse'], soins: ['reeducation-traumatologique-orthopedique'] },
    cheville: { title: 'Cheville et pied', text: 'Entorses à répétition, fractures, instabilité : renforcer et retrouver un appui sûr.', tags: ['Entorse', 'Fracture', 'Instabilité'], soins: ['reeducation-traumatologique-orthopedique', 'reeducation-fonctionnelle-posturale'] },
    enfant: { title: 'Pour votre enfant', text: 'Retards moteurs, troubles de la posture ou scoliose de l’enfant et de l’adolescent : un suivi ludique et adapté.', tags: ['Développement moteur', 'Posture', 'Scoliose'], soins: ['reeducation-pediatrique', 'scoliose-schroth-seas'] },
    accouchement: { title: 'Après un accouchement', text: 'Rééducation du périnée et de la sangle abdominale, pour une récupération sereine et une reprise sportive adaptée.', tags: ['Périnée', 'Sangle abdominale', 'Reprise sportive'], soins: ['reeducation-perineale'] },
    muscles: { title: 'Douleurs musculaires', text: 'Contractures, douleurs articulaires ou chroniques : on cherche la cause et on soulage durablement.', tags: ['Contractures', 'Articulations', 'Chronique'], soins: ['reeducation-musculosquelettique', 'reeducation-du-dos'] },
    domicile: { title: 'Séances à domicile', text: 'Si vous ne pouvez pas vous déplacer, les séances se font chez vous, sur demande, pour toutes les pathologies.', tags: ['Sur demande', 'Toutes pathologies'], soins: ['kinesitherapie-a-domicile'] },
  }

  const cta = document.querySelector('[data-douleur-cta]')
  const triggers = [...document.querySelectorAll('.body-map [data-zone], .douleur__chip[data-zone]')]
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

  function select(key, focusPanel) {
    const z = ZONES[key]
    if (!z) return
    triggers.forEach(t => {
      const on = t.dataset.zone === key
      t.classList.toggle('is-active', on)
      if (t.matches('[role="button"], button')) t.setAttribute('aria-pressed', String(on))
    })
    panel.innerHTML = `
      <div class="douleur__result">
        <p class="douleur__kicker">Zone choisie</p>
        <p class="douleur__title">${esc(z.title)}</p>
        <p class="douleur__text">${esc(z.text)}</p>
        <ul class="douleur__tags">${z.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        <p class="douleur__kicker douleur__kicker--gap">Prise en charge conseillée</p>
        <ul class="douleur__soins">${z.soins.map((s, i) => `
          <li style="--i:${i}"><a href="soins/${s}.html"><span>${esc(PAGES[s].name)}</span><span aria-hidden="true">↗</span></a></li>`).join('')}
        </ul>
      </div>`
    if (cta) {
      cta.dataset.motif = PAGES[z.soins[0]].motif
      cta.classList.add('is-ready')
    }
    if (focusPanel && window.innerWidth < 900) panel.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  triggers.forEach(t => {
    t.addEventListener('click', () => select(t.dataset.zone, true))
    t.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(t.dataset.zone, true) }
    })
  })

  // Le bouton pré-sélectionne le motif du formulaire (même si script.js l'a déjà lié)
  if (cta) cta.addEventListener('click', () => {
    const radio = document.querySelector(`input[name="motif"][value="${CSS.escape(cta.dataset.motif)}"]`)
    if (radio) radio.checked = true
  })
})()
