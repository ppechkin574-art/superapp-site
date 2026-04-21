# SuperApp Africa — Site & Pitch Deck

Plateforme civique africaine — landing page, démo interactive de l'application mobile
et pitch investisseurs 12 slides, réunis dans un seul serveur Node/Express.

## Contenu

| Fichier / dossier | Description |
|---|---|
| `index.html` | Landing page (présentation du produit, vision, modules) |
| `app.html` | Démo interactive de l'app mobile — 6 écrans navigables (Accueil, Portefeuille, Services, Notifications, Profil, Paramètres) |
| `onboarding.html` | Écran d'onboarding / connexion |
| `presentation/index.html` | Deck 12 slides pour investisseurs (1920×1080, scroll vertical) |
| `presentation/superapp-africa-pitch.pdf` | Version PDF du deck, téléchargeable depuis le site |
| `photos/`, `images/` | Images de fond et illustrations |
| `i18n.js` | Système de bascule FR ↔ EN (appliqué au site ET au pitch deck) |
| `server.js` | Serveur Express (compression gzip + cache headers + routes) |

## Stack

- **Runtime** : Node.js 18+ (compatible avec 16 et 20)
- **Framework** : Express 4 + middleware `compression`
- **Front-end** : HTML / CSS / JavaScript vanilla — pas de build step, pas de framework
- **Dépendances** : 2 paquets npm uniquement (`express`, `compression`)

## Démarrage local

```bash
npm install
npm start
```

Le serveur écoute sur `http://localhost:3000` par défaut. Variable
d'environnement `PORT` pour changer le port.

Routes disponibles :

| URL | Destination |
|---|---|
| `/` | Landing page |
| `/app` | Démo mobile |
| `/onboarding` | Écran d'onboarding |
| `/presentation` | Pitch deck 12 slides |
| `/presentation/pitch.pdf` | PDF à télécharger |

## Déploiement

Le projet se déploie sur n'importe quel hébergeur Node.js sans configuration
supplémentaire — pas de variables d'environnement, pas de base de données.

### Railway (le plus simple)

1. Créer un compte sur [railway.app](https://railway.app)
2. `New Project` → `Deploy from GitHub repo` → sélectionner le dépôt
3. Railway détecte `package.json`, lance `npm install` puis `npm start`
4. Un domaine `*.up.railway.app` est généré automatiquement

### Render

1. [render.com](https://render.com) → `New Web Service` → connecter le repo GitHub
2. **Build Command** : `npm install`
3. **Start Command** : `npm start`
4. Plan gratuit suffit pour la démo

### VPS (DigitalOcean, Hetzner, etc.)

```bash
git clone <repo-url>
cd website
npm install
npm install -g pm2
pm2 start server.js --name superapp
pm2 save
pm2 startup
```

Ajouter un reverse proxy nginx pour HTTPS (certbot + Let's Encrypt).

### Vercel / Netlify

Fonctionne aussi — ces plateformes supportent les fonctions Node serverless.
À noter : la conversion en 100 % statique est possible en ~10 min
(il suffit de renommer les fichiers selon les routes).

## Personnalisation rapide

- **Changer les textes FR** : éditer directement les fichiers `.html`
- **Changer les traductions EN** : éditer le dictionnaire `DICT` dans `i18n.js`
- **Changer les images de fond du pitch** : remplacer les fichiers dans `photos/`
  (les noms sont référencés dans `presentation/index.html`)
- **Changer l'email de contact** : recherche globale de `thunderwind2311@gmail.com`
- **Mettre à jour le PDF du pitch** : remplacer `presentation/superapp-africa-pitch.pdf`

## Performance

Le serveur active la compression gzip et définit des en-têtes de cache :
- Images et polices : cache 7 jours
- HTML / JS / CSS : cache 5 min avec revalidation

Les iframes du pitch deck utilisent un lazy-loading via `IntersectionObserver`
— les 12 slides ne chargent pas toutes en même temps, seulement celles qui
arrivent à l'écran.

## Licence

Tous droits réservés. Projet livré au client pour son usage exclusif.
