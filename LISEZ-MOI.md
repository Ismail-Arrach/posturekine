# Posture Kiné — site de Yasmine Brini

Site du cabinet **Posture Kiné**, « votre allié en kinésithérapie », à Marrakech (Guéliz). La kinésithérapeute est Yasmine Brini. Le site s'ouvre par un double-clic sur `index.html`, sans installation.

## Contenu du dossier

| Fichier / dossier | Rôle |
|---|---|
| `index.html` | La page d'accueil (textes et sections) |
| `soins/` | Une page par soin (9 pages), avec les textes détaillés |
| `layout.js` | Le menu, le pied de page et la barre mobile, communs à toutes les pages. Les listes `SOINS` et `SPECIALITES` en haut du fichier pilotent le menu |
| `style.css` | Le design : couleurs, typographie, animations, version mobile |
| `script.js` | Les infos du cabinet, le formulaire, la galerie et la vidéo |
| `images/` | Le logo officiel, la photo de Yasmine, les illustrations et la galerie |
| `videos/` | La vidéo de présentation (`presentation.mp4`, à ajouter) |

## Pages de soin

| Menu | Page |
|---|---|
| Soins et rééducation | `soins/reeducation-traumatologique-orthopedique.html` |
| | `soins/reeducation-neurologique.html` |
| | `soins/reeducation-fonctionnelle-posturale.html` |
| | `soins/reeducation-musculosquelettique.html` |
| | `soins/reeducation-pediatrique.html` |
| Nos spécialités | `soins/scoliose-schroth-seas.html` |
| | `soins/reeducation-du-dos.html` |
| | `soins/reeducation-perineale.html` |
| | `soins/kinesitherapie-a-domicile.html` |

Pour ajouter un soin : copiez une page de `soins/`, changez le texte et `data-slug` dans la balise `<body>`, puis ajoutez une ligne dans `SOINS` ou `SPECIALITES` dans `layout.js`.

## Modifier les infos du cabinet

Ouvrez `script.js` et changez uniquement le bloc `CABINET` en haut du fichier. Il contient le téléphone, l'e-mail, la ville, l'adresse, les horaires et les liens des réseaux sociaux. Les valeurs actuelles sont **provisoires**. Remplacez notamment les liens Instagram, Facebook et TikTok par ceux des comptes officiels avant de publier.

## Remplacer les photos et la vidéo

Il n'y a pas de code à modifier : un fichier `.jpg` portant le bon nom remplace automatiquement l'illustration provisoire `.svg`.

| Fichier à ajouter | Emplacement sur le site |
|---|---|
| `images/yasmine-brini.jpg` | Photo de Yasmine : accueil + « Mon parcours » (déjà ajoutée) |
| `images/<nom-de-la-page>.jpg` | Illustration d'un soin, avec le même nom que la page dans `soins/` (ex. `images/reeducation-du-dos.jpg`) |
| `images/galerie-1.jpg` … `galerie-6.jpg` | Les 6 vues 3D du cabinet |
| `videos/presentation.mp4` | La vidéo de la galerie, qui remplace le film animé |

## Identité visuelle

- **Couleurs :** vert forêt `#355b50` / `#294a40`, sauge `#91a99a`, rose terracotta `#c58f86`, ivoire `#f4efe7`.
- **Polices :** Fraunces (titres), Source Sans 3 (texte), DM Mono (petits libellés), Lora (nom « Posture Kiné »).
- **Logo officiel :** `images/logo-posture-kine.png`. L'emblème seul est dans `images/logo-emblem.png`.

## Sections de la page

**Menu :** Soins et rééducation ▾ · Nos spécialités ▾ · Mon parcours · Le cabinet · Contact et accès.

1. **Hero vert :** grand titre animé, photo de Yasmine en arche, badge rond qui tourne, colonne vertébrale dessinée.
2. **Rubans croisés :** les soins défilent, ainsi que « Posture · Équilibre · Énergie ».
3. **01 Soins et rééducation :** 5 cartes colorées qui mènent aux pages de soin, plus « Vous hésitez ? ».
4. **02 Votre prise en charge :** 3 étapes sur une colonne vertébrale qui se remplit au défilement.
5. **03 Nos spécialités :** cartes empilées (scoliose, dos, périnéale, à domicile).
6. **04 Mon parcours :** biographie de Yasmine, chiffre « 14+ ans », frise 2011 → aujourd'hui.
7. **05 Le cabinet :** citation « Derrière chaque douleur… », 4 valeurs, puis la visite 3D (vidéo + 6 vues).
8. **06 Rendez-vous :** formulaire envoyé par e-mail (Netlify) ou WhatsApp.
9. **07 Contact et accès :** adresse, horaires, téléphone, e-mail, carte Google Maps.
10. **Footer :** logo officiel, liens vers tous les soins, réseaux sociaux.

Sur mobile, une barre en bas de l'écran propose Appeler / WhatsApp / Prendre rendez-vous, et le menu s'ouvre en plein écran avec des sous-menus dépliables.

## Historique des modifications

1. Première version reprenant la structure de cabinetkanzaizarane.com, avec ses polices (Fraunces + Source Sans 3), des textes réécrits et sans les photos de ce site.
2. Passage aux couleurs de la marque, avec des illustrations provisoires.
3. Typographie revue et premiers éléments créatifs.
4. Refonte créative : hero vert, rubans, cartes colorées, parcours « vertèbre par vertèbre », cartes empilées.
5. Ajout du logo officiel, de la galerie, de la vidéo (film animé provisoire) et d'une lightbox.
6. Nom du site : **Posture Kiné**. La propriétaire présentée sur le site est **Yasmine Brini**.
7. Les demandes de rendez-vous passent par Netlify Forms et arrivent par e-mail. WhatsApp reste proposé en option.
8. Restructuration selon les textes de Yasmine : nouveau menu à sous-menus, 9 pages de soin (Marrakech, Guéliz), section « Mon parcours », nouvelle citation, galerie 3D du cabinet. L'amincissement et les soins esthétiques sont retirés. Le sous-titre devient « Votre allié en kinésithérapie ».

## Avant de publier

- [ ] Remplacer les infos provisoires dans `script.js`
- [ ] Ajouter les vraies photos (et la vidéo si disponible)
- [ ] Faire valider par Yasmine la citation qui lui est attribuée (section « Le cabinet »)

## Hébergement : GitHub Pages (depuis le 7 novembre 2026)

Le site est hébergé gratuitement sur **GitHub Pages**, sans badge « Powered by Netlify ». Il est publié depuis le dépôt `Ismail-Arrach/posturekine`, branche `main`. Le fichier `CNAME` contient le domaine `posturekine.com`, et `.nojekyll` sert les fichiers tels quels.

Le domaine `posturekine.com` a été acheté sur Netlify ; seuls ses enregistrements DNS y restent :

| Type | Nom | Valeur |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | ismail-arrach.github.io |

## Recevoir les rendez-vous par e-mail

Le formulaire « Demande de rendez-vous » envoie les demandes via **FormSubmit** (gratuit, sans compte).

1. Dans `script.js`, bloc `CABINET`, renseignez l'adresse de réception dans `formEmail`.
2. Publiez le site, puis envoyez une première demande de test depuis le site en ligne.
3. FormSubmit envoie un e-mail « Activate Form » à cette adresse. Cliquez sur le lien une seule fois (vérifiez aussi les **Spam**).
4. Ensuite, chaque demande arrive directement dans la boîte mail, sous forme de tableau.

Tant que `formEmail` est vide, le formulaire invite à utiliser le bouton WhatsApp.
## « Où avez-vous mal ? » et transitions (7 novembre 2026)

- **Carte du corps interactive** (section après « Soins et rééducation ») : le visiteur touche une zone de la silhouette (dos, genou, épaule…) ou une situation (« Mon enfant », « Après un accouchement »…). Le site affiche la prise en charge conseillée, avec les liens vers les pages de soin. Le bouton « Prendre rendez-vous » pré-remplit le motif du formulaire.
  - Les textes et les soins de chaque zone se modifient dans **`bodymap.js`** (liste `ZONES`).
- **Transitions fluides entre les pages** (View Transitions) : passer de l'accueil à une page de soin se fait en fondu. Cela fonctionne sur Chrome, Edge et Safari récents ; les autres navigateurs changent de page normalement.

## Mettre à jour le site en ligne

Après chaque modification : ouvrez **GitHub Desktop**, écrivez un résumé, cliquez sur **Commit to main** puis sur **Push origin**. GitHub Pages publie la nouvelle version en une à deux minutes.