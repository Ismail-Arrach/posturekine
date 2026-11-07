// ===== Infos du cabinet : modifiez uniquement ce bloc =====
const CABINET = {
  phone: '+212600000000',          // numéro au format international, sans espaces
  phoneDisplay: '06 00 00 00 00',  // numéro tel qu'il s'affiche
  email: 'contact@posturekine.ma',
  // Adresse qui reçoit les demandes de rendez-vous du formulaire (via FormSubmit, gratuit).
  // Au premier envoi, FormSubmit envoie un e-mail « Activate Form » à cette adresse : cliquez dessus une fois.
  formEmail: 'yasminebrini1989@outlook.fr',
  city: 'Marrakech (Guéliz)',
  address: 'Centre d’affaires Farid, Magasin 5, Rue Khalid Ben El Walid, Guéliz, Marrakech 40000',
  // Carte : lieu exact sur Google Maps (recherche pour la carte, lien direct pour l'itinéraire)
  mapsSearch: 'Pilates House By GIGI, Centre d’affaire Farid, Rue Khalid Ben El Walid, Marrakech',
  mapsLink: 'https://maps.google.com/?cid=3456781243184087213',
  hours: ['Lun–Ven : 09h–19h', 'Samedi : 09h–13h', 'Dimanche : fermé'],
  socials: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    tiktok: 'https://www.tiktok.com/',
  },
}
// ==========================================================

const waBase = `https://wa.me/${CABINET.phone.replace('+', '')}`
const mapsQuery = encodeURIComponent(CABINET.mapsSearch || `Posture Kiné, ${CABINET.address}`)

document.querySelectorAll('[data-phone]').forEach(a => { a.href = `tel:${CABINET.phone}` })
document.querySelectorAll('[data-phone-text]').forEach(el => { el.textContent = CABINET.phoneDisplay })
document.querySelectorAll('[data-whatsapp]').forEach(a => { a.href = waBase })
document.querySelectorAll('[data-email]').forEach(a => { a.href = `mailto:${CABINET.email}`; a.textContent = CABINET.email })
document.querySelectorAll('[data-social]').forEach(a => { a.href = CABINET.socials[a.dataset.social] })
document.querySelectorAll('[data-city]').forEach(el => { el.textContent = CABINET.city })
document.querySelectorAll('[data-address]').forEach(el => { el.textContent = CABINET.address })
document.querySelectorAll('[data-hours]').forEach(ul => {
  ul.innerHTML = CABINET.hours.map(h => `<li>${h}</li>`).join('')
})
document.querySelectorAll('[data-maps]').forEach(a => { a.href = CABINET.mapsLink || `https://www.google.com/maps/search/?api=1&query=${mapsQuery}` })
document.querySelectorAll('[data-map-frame]').forEach(f => { f.src = `https://maps.google.com/maps?q=${mapsQuery}&output=embed` })
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear() })

// Photos : si la vraie photo (.jpg) n'est pas encore là, on affiche l'illustration provisoire (.svg)
document.querySelectorAll('.media img').forEach(img => {
  const fallback = () => {
    if (img.src.endsWith('.jpg')) img.src = img.src.replace(/\.jpg$/, '.svg')
    else img.parentElement.classList.add('is-missing')
  }
  img.addEventListener('error', fallback)
  if (img.complete && img.naturalWidth === 0) fallback()
})

// Apparition douce des blocs au défilement
document.documentElement.classList.add('js')
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    entry.target.classList.add('is-visible')
    revealObserver.unobserve(entry.target)
  })
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))

// Défilement : header, colonne de progression, étapes de prise en charge
const header = document.querySelector('[data-header]')
const spineDots = [...document.querySelectorAll('[data-spine-progress] span')]
const steps = document.querySelector('[data-steps]')
const stepsFill = document.querySelector('[data-steps-fill]')

function onScroll() {
  header.classList.toggle('is-scrolled', window.scrollY > 40)

  const max = document.documentElement.scrollHeight - window.innerHeight
  const progress = max > 0 ? window.scrollY / max : 0
  const lit = Math.round(progress * spineDots.length)
  spineDots.forEach((dot, i) => dot.classList.toggle('is-on', i < lit))

  if (steps) {
    const box = steps.getBoundingClientRect()
    const stepsProgress = (window.innerHeight * 0.6 - box.top) / box.height
    stepsFill.style.setProperty('--progress', Math.min(1, Math.max(0, stepsProgress)))
  }
}
window.addEventListener('scroll', onScroll, { passive: true })
window.addEventListener('resize', onScroll)
onScroll()

// Menu : plein écran sur mobile, sous-menus déroulants
const navToggle = document.querySelector('[data-nav-toggle]')
const subToggles = [...document.querySelectorAll('[data-sub-toggle]')]

function setMenu(open) {
  header.classList.toggle('is-open', open)
  navToggle.setAttribute('aria-expanded', String(open))
  document.body.style.overflow = open ? 'hidden' : ''
}
function closeSubs(except) {
  subToggles.forEach(btn => {
    if (btn === except) return
    btn.setAttribute('aria-expanded', 'false')
    btn.parentElement.classList.remove('is-open')
  })
}
navToggle.addEventListener('click', () => setMenu(!header.classList.contains('is-open')))
subToggles.forEach(btn => btn.addEventListener('click', () => {
  const open = btn.getAttribute('aria-expanded') !== 'true'
  closeSubs(btn)
  btn.setAttribute('aria-expanded', String(open))
  btn.parentElement.classList.toggle('is-open', open)
}))
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => { setMenu(false); closeSubs() }))
document.addEventListener('click', e => { if (!e.target.closest('.has-sub')) closeSubs() })
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return
  setMenu(false)
  closeSubs()
})

// Les boutons d'un soin pré-sélectionnent le motif dans le formulaire
document.querySelectorAll('[data-motif]').forEach(a => {
  a.addEventListener('click', () => {
    const radio = document.querySelector(`input[name="motif"][value="${a.dataset.motif}"]`)
    if (radio) radio.checked = true
  })
})

// Vidéo : si videos/presentation.mp4 existe on l'affiche, sinon le film animé reste visible
const videoWrap = document.querySelector('[data-video-wrap]')
if (videoWrap) {
  const video = videoWrap.querySelector('[data-video]')
  video.addEventListener('loadeddata', () => videoWrap.classList.add('has-video'))
  videoWrap.querySelector('[data-video-toggle]').addEventListener('click', event => {
    const paused = videoWrap.classList.toggle('is-paused')
    if (videoWrap.classList.contains('has-video')) paused ? video.pause() : video.play()
    event.currentTarget.setAttribute('aria-label', paused ? 'Lire' : 'Mettre en pause')
  })
}

// Galerie : agrandissement des photos
const lightbox = document.querySelector('[data-lightbox-dialog]')
if (lightbox) {
  const lightboxImg = lightbox.querySelector('[data-lightbox-img]')
  const lightboxCap = lightbox.querySelector('[data-lightbox-cap]')
  const galleryItems = [...document.querySelectorAll('[data-lightbox]')]
  let current = 0

  const showImage = index => {
    current = (index + galleryItems.length) % galleryItems.length
    const img = galleryItems[current].querySelector('img')
    lightboxImg.src = img.currentSrc || img.src
    lightboxImg.alt = img.alt
    lightboxCap.textContent = `${String(current + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')} — ${img.alt}`
  }
  galleryItems.forEach((item, i) => item.addEventListener('click', () => { showImage(i); lightbox.showModal() }))
  lightbox.querySelector('[data-lightbox-prev]').addEventListener('click', () => showImage(current - 1))
  lightbox.querySelector('[data-lightbox-next]').addEventListener('click', () => showImage(current + 1))
  lightbox.querySelector('[data-lightbox-close]').addEventListener('click', () => lightbox.close())
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close() })
  lightbox.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') showImage(current - 1)
    if (e.key === 'ArrowRight') showImage(current + 1)
  })
}

// Formulaire de rendez-vous
// 1) "Envoyer ma demande" : envoi par e-mail via FormSubmit (adresse : CABINET.formEmail)
// 2) "ou envoyer plutôt sur WhatsApp" : ouvre WhatsApp avec la demande pré-remplie
const rdvForm = document.querySelector('[data-rdv-form]')
if (rdvForm) {
  const rdvSubmit = rdvForm.querySelector('[data-rdv-submit]')
  const rdvStatus = rdvForm.querySelector('[data-rdv-status]')

  const setStatus = (message, type) => {
    rdvStatus.textContent = message
    rdvStatus.className = `rdv-form__status${type ? ` is-${type}` : ''}`
  }

  rdvForm.addEventListener('submit', async event => {
    event.preventDefault()

    // Sans adresse configurée, ou en local, on propose WhatsApp
    if (!CABINET.formEmail || location.protocol === 'file:') {
      setStatus('L’envoi par e-mail n’est pas encore disponible. Utilisez le bouton WhatsApp juste en dessous.', 'error')
      return
    }

    const data = new FormData(rdvForm)
    if (data.get('_honey')) return

    rdvSubmit.disabled = true
    setStatus('Envoi en cours…')
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CABINET.formEmail)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Demande de rendez-vous — ${data.get('nom')}`,
          _template: 'table',
          Nom: data.get('nom'),
          Téléphone: data.get('tel'),
          Motif: data.get('motif'),
          Disponibilités: data.get('dispo') || '—',
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || String(result.success) === 'false') throw new Error(result.message || response.statusText)
      rdvForm.reset()
      setStatus('Merci ! Votre demande a bien été envoyée. Le cabinet vous recontacte très vite.', 'success')
    } catch {
      setStatus('L’envoi n’a pas fonctionné. Réessayez ou envoyez votre demande sur WhatsApp.', 'error')
    } finally {
      rdvSubmit.disabled = false
    }
  })

  rdvForm.querySelector('[data-rdv-whatsapp]').addEventListener('click', () => {
    if (!rdvForm.reportValidity()) return
    const data = new FormData(rdvForm)
    const lines = [
      'Bonjour, je souhaite prendre rendez-vous chez Posture Kiné.',
      `Nom : ${data.get('nom')}`,
      `Téléphone : ${data.get('tel')}`,
      `Motif : ${data.get('motif')}`,
    ]
    if (data.get('dispo')) lines.push(`Disponibilités : ${data.get('dispo')}`)
    window.open(`${waBase}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
  })
}

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

// Chiffres qui défilent jusqu'à leur valeur quand ils apparaissent
const counters = document.querySelectorAll('[data-count]')
if (counters.length && !reduceMotion) {
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      countObserver.unobserve(entry.target)
      const el = entry.target
      const target = Number(el.dataset.count)
      const start = performance.now()
      const tick = now => {
        const t = Math.min(1, (now - start) / 1400)
        el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)))
        if (t < 1) requestAnimationFrame(tick)
      }
      el.textContent = '0'
      requestAnimationFrame(tick)
    })
  }, { threshold: 0.6 })
  counters.forEach(el => countObserver.observe(el))
}

// Effet 3D au survol (ordinateur uniquement) : la carte s'incline vers la souris
if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion) {
  document.querySelectorAll('[data-tilt], .tile, .stack__media, .page-step').forEach(card => {
    const strength = Number(card.dataset.tilt) || 6
    card.addEventListener('pointermove', e => {
      const box = card.getBoundingClientRect()
      const x = (e.clientX - box.left) / box.width
      const y = (e.clientY - box.top) / box.height
      card.style.setProperty('--rx', `${(0.5 - y) * strength}deg`)
      card.style.setProperty('--ry', `${(x - 0.5) * strength}deg`)
      card.style.setProperty('--mx', `${x * 100}%`)
      card.style.setProperty('--my', `${y * 100}%`)
    })
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg')
      card.style.setProperty('--ry', '0deg')
    })
  })
}

// Arrivée depuis une page de soin avec ?motif=... : on pré-sélectionne le motif
const motifParam = new URLSearchParams(location.search).get('motif')
if (motifParam) {
  const radio = document.querySelector(`input[name="motif"][value="${CSS.escape(motifParam)}"]`)
  if (radio) radio.checked = true
}
