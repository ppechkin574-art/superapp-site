/* SuperApp i18n — FR ↔ EN
   Walks all text nodes once, snapshots originals (FR), then on toggle
   swaps to EN translations from DICT. Persists choice in localStorage. */
(function(){
  if (window.__superI18N) return;
  window.__superI18N = true;

  // Strings that must NOT be auto-translated (codes, numbers, brand)
  const SKIP = new Set([
    'SuperApp','VISA','NGN','EUR','GBP','KES','GHS','PayPal','MoMo','Airtel',
    'YouTube','Netflix','Spotify','Starbucks','Uber','Jumia','Konga',
    'NEW','LIVE','ECP','PDI','EI','TVA','HA','YO','IG','WCAG','SMS','FAQ',
    'iOS','Android','USSD','API','KYC','ID','FX','TV','QR','N','U','M','XL','VAT',
    'Lagos, Nigeria','Lagos','Vio Dada','Jean Ubabu','jean.ubabu@superapp.africa',
    'partners@superapp.africa','superapp.africa','v2.4.1 — à jour','v2.4.1 — up to date',
    'Maint.','Auj.','Hier','21 mar','1 avr','2 avr','5 avr','7 avr','17 avr., 20:10',
    '17 avr., 09:00','Aujourd\u2019hui, 14:32','Aujourd\u2019hui, 11:05','Aujourd\u2019hui, 09:18',
    'il y a 2 heures','hier','il y a 2 jours','il y a 3 jours',
    '7J','1M','3M','6M','1A','24h','1,2K','4,8K','2,1K','3,3K','+$3,2k','+$24,50',
    'Solde · $742,45','$240,00','215 $ ce mois','Scan reçu · 215 $ ce mois',
    '50','7,5','7.5','12','60+','40','54','1','2','3','5','6','9','10','11','12'
  ]);

  // FR → EN dictionary (covers app.html + presentation/index.html)
  const DICT = {
    // ---- app.html ----
    'Retour':'Back',
    'Aperçu de l\u2019app':'App preview',
    'Aperçu de l’app':'App preview',
    'Fil':'Feed',
    'Portefeuille':'Wallet',
    'Services':'Services',
    'Notifications':'Notifications',
    'Notifs':'Notifs',
    'Profil':'Profile',
    'Sombre':'Dark',
    'Rechercher un service, un document\u2026':'Search a service, a document…',
    'Rechercher un service, un document…':'Search a service, a document…',
    'Demande active':'Active request',
    'Permis de conduire — renouvellement':'Driving license — renewal',
    'Envoyée':'Sent',
    'En examen':'Under review',
    'Décision':'Decision',
    'Nouveau':'New',
    'ID Numérique':'Digital ID',
    'Disponible':'Available',
    'Demande en 2 minutes · Gratuit':'Apply in 2 minutes · Free',
    'Services populaires':'Popular services',
    'Tout voir':'See all',
    'DÛ':'DUE',
    'Impôts':'Taxes',
    'Justice':'Justice',
    'Mariage':'Marriage',
    'Chômage':'Unemployment',
    'Domicile':'Residence',
    'Sondages':'Surveys',
    'Certificats':'Certificates',
    'Permis':'Licenses',
    'Annonces officielles':'Official announcements',
    'Ministère des Finances':'Ministry of Finance',
    'Ministère de la Justice':'Ministry of Justice',
    'Agence Numérique':'Digital Agency',
    'Ministère du Travail':'Ministry of Labor',
    'Ministère des Transports':'Ministry of Transport',
    'Ministères & services':'Ministries & services',
    'Ministères en direct':'Ministries live',
    'Fiscalité':'Taxation',
    'Numérique':'Digital',
    'Aide sociale':'Social aid',
    'Partager':'Share',
    '📋 Déclaration d\u2019impôts 2026 ouverte. Déposez votre déclaration directement depuis l\u2019app — calcul automatique pour les particuliers, EI et organisations. Échéance : 30 juin.':
      '📋 2026 tax filing is open. File directly from the app — automatic calculation for individuals, sole traders and organizations. Deadline: June 30.',
    '📋 Déclaration d’impôts 2026 ouverte. Déposez votre déclaration directement depuis l’app — calcul automatique pour les particuliers, EI et organisations. Échéance : 30 juin.':
      '📋 2026 tax filing is open. File directly from the app — automatic calculation for individuals, sole traders and organizations. Deadline: June 30.',
    '⚖️ Le tribunal en ligne est lancé. Audiences par visioconférence, registre électronique des décisions et cabinet personnel pour chaque partie au procès — désormais accessibles dans l\u2019app.':
      '⚖️ The online court is live. Video hearings, electronic ruling registry and a personal case room for every party — all now in the app.',
    '⚖️ Le tribunal en ligne est lancé. Audiences par visioconférence, registre électronique des décisions et cabinet personnel pour chaque partie au procès — désormais accessibles dans l’app.':
      '⚖️ The online court is live. Video hearings, electronic ruling registry and a personal case room for every party — all now in the app.',
    '🚀 Signature électronique (ECP) disponible pour tous. Signez vos contrats, déclarations et actes juridiques depuis votre téléphone — valeur légale équivalente à la signature manuscrite.':
      '🚀 Electronic signature (ECP) available for everyone. Sign contracts, filings and legal acts from your phone — legally equivalent to handwritten signature.',
    '🤝 Aide au chômage en 3 jours : déposez votre demande en ligne, recevez la décision et le versement directement sur votre carte sociale. 50 000 bénéficiaires depuis janvier.':
      '🤝 Unemployment aid in 3 days: apply online, receive the decision and payment directly on your social card. 50,000 beneficiaries since January.',
    'Vidéos publiques':'Public videos',
    'ID Numérique en 2 min':'Digital ID in 2 min',
    'Tribunal en ligne':'Online court',
    'Aide sociale en 3 jours':'Social aid in 3 days',
    'Mariage en ligne — 1ère union':'Online marriage — 1st union',
    'Taux de change':'Exchange rates',
    'Achat':'Buy',
    'Vente':'Sell',
    'Naira nigérian':'Nigerian Naira',
    'Livre sterling':'Pound Sterling',
    'Shilling kenyan':'Kenyan Shilling',
    'Cedi ghanéen':'Ghanaian Cedi',
    'Opérations':'Operations',
    'Dollar US':'US Dollar',
    'Votre solde':'Your balance',
    'Bloquer':'Block',
    'Nouvelle Carte':'New Card',
    'Limites':'Limits',
    'Paramètres':'Settings',
    'Transferts':'Transfers',
    'Carte à Carte':'Card to Card',
    'Vers Client':'To Client',
    'Par Téléphone':'By Phone',
    'Mes Comptes':'My Accounts',
    'International':'International',
    'Par QR':'By QR',
    'Dépenses':'Expenses',
    'Dépensé':'Spent',
    'Économisé':'Saved',
    'Activité':'Activity',
    'Tout':'All',
    'Salaire':'Salary',
    'Paiements':'Payments',
    'Paiements QR':'QR Payments',
    'Scanner & payer en caisse':'Scan & pay at checkout',
    'Service Mobile':'Mobile Service',
    'Recharges & forfaits data':'Top-ups & data plans',
    'Internet & TV':'Internet & TV',
    'Internet, câble, téléphone':'Internet, cable, phone',
    'Services publics':'Public services',
    'Électricité, eau & gaz':'Electricity, water & gas',
    'Éducation':'Education',
    'Frais scolaires & universitaires':'School & university fees',
    'Portefeuilles élec.':'E-wallets',
    'Divertissement':'Entertainment',
    'Netflix, Spotify & plus':'Netflix, Spotify & more',
    'Boutiques en ligne':'Online stores',
    'Jumia, Konga & e-commerce':'Jumia, Konga & e-commerce',
    'Investissements & garanties':'Investments & guarantees',
    'Obligations d\u2019État':'Government bonds',
    'Obligations d’État':'Government bonds',
    'Rendement 7,5% · à partir de $50':'Yield 7.5% · from $50',
    'Garantie des dépôts':'Deposit guarantee',
    'Récupérer fonds — banque en faillite':'Recover funds — failed bank',
    'Aide au logement':'Housing aid',
    'Subvention pour 1er achat':'Subsidy for 1st purchase',
    'Cashback national':'National cashback',
    'Scan reçu · 215 $ ce mois':'Receipt scan · $215 this month',
    'Rechercher un service\u2026':'Search a service…',
    'Rechercher un service…':'Search a service…',
    'Actualité':'News',
    'Aide alimentaire pour 200+ familles':'Food aid for 200+ families',
    'SuperApp soutient l\u2019Orphelinat Vio Dada — avril 2026':'SuperApp supports the Vio Dada Orphanage — April 2026',
    'SuperApp soutient l’Orphelinat Vio Dada — avril 2026':'SuperApp supports the Vio Dada Orphanage — April 2026',
    'Déclarer ses impôts en 5 min':'File your taxes in 5 min',
    'Audience en visioconférence':'Video hearing',
    'Demande de chômage en ligne':'Online unemployment claim',
    'État civil':'Civil registry',
    'Premier mariage en ligne':'First online marriage',
    'Personnes déplacées internes':'Internally displaced persons',
    'Mes documents':'My documents',
    'ID, passeport, permis':'ID, passport, license',
    'Aides sociales':'Social benefits',
    'Soutien & prestations':'Support & benefits',
    'Impôt revenu':'Income tax',
    'Chat fisc':'Tax chat',
    'Mes affaires':'My cases',
    'Visio audience':'Video hearing',
    'Registre':'Registry',
    'Exécution':'Enforcement',
    'Mariage en ligne':'Online marriage',
    'Envoyer une demande à votre partenaire':'Send a request to your partner',
    'État civil & famille':'Civil registry & family',
    'Divorce':'Divorce',
    'Naissance':'Birth',
    'Logement':'Housing',
    'Carte sociale':'Social card',
    'Sondage':'Survey',
    'Votre avis compte':'Your opinion matters',
    '3 sondages publics ouverts':'3 public surveys open',
    'Certificats & extraits':'Certificates & extracts',
    'Pension':'Pension',
    'Sécu. sociale':'Social security',
    'Arme':'Weapon',
    'Casier':'Criminal record',
    'Famille':'Family',
    'Sans dette':'Debt-free',
    'Santé':'Health',
    'Carnet':'Health record',
    'RDV médecin':'Doctor appt.',
    'Ordonnances':'Prescriptions',
    'Vaccins':'Vaccines',
    'Notes':'Grades',
    'Inscription':'Enrollment',
    'Diplômes':'Diplomas',
    'Bourse':'Scholarship',
    'Transport':'Transport',
    'Auto':'Car',
    'Amendes':'Fines',
    'Assurance':'Insurance',
    'Défense & service militaire':'Defense & military service',
    'Livret':'Service booklet',
    'Convocations':'Summons',
    'Réserve':'Reserve',
    'Vétérans':'Veterans',
    'Finance & garanties':'Finance & guarantees',
    'Obligations':'Bonds',
    'Garantie':'Guarantee',
    'Cashback':'Cashback',
    'Pour les institutions':'For institutions',
    'Espace agents publics':'Public agents space',
    'Cabinets : juges, greffiers, fisc, ZAGS, services sociaux':'Workspaces: judges, clerks, tax, ZAGS, social services',
    'Tribunaux':'Courts',
    'Fisc':'Tax',
    'ZAGS':'ZAGS',
    'Social':'Social',
    'Demandes en cours':'Requests in progress',
    'N° 2026-04231 · Ministère des Transports':'No. 2026-04231 · Ministry of Transport',
    '⏱ Décision estimée :':'⏱ Estimated decision:',
    '3–5 jours ouvrés':'3–5 business days',
    'Aide chômage — demande mensuelle':'Unemployment aid — monthly claim',
    'N° 2026-08812 · Services sociaux':'No. 2026-08812 · Social services',
    'Approuvée':'Approved',
    '✓ Versement effectué :':'✓ Payment issued:',
    'Épinglé':'Pinned',
    'Assistance SuperApp':'SuperApp Support',
    'Disponible 24/7 — chat & vidéo':'Available 24/7 — chat & video',
    'En ligne':'Online',
    'Important':'Important',
    'Service des impôts':'Tax service',
    'Impôt T2 dû le 30 juin — $240,00':'Q2 tax due June 30 — $240.00',
    'Tribunal de district':'District court',
    'Audience #4521 — demain à 10h00 (visio)':'Hearing #4521 — tomorrow at 10:00 (video)',
    'Service social':'Social service',
    'Aide chômage approuvée — versement le 25 avril':'Unemployment aid approved — payment April 25',
    'Mariage en ligne — choisir une date':'Online marriage — choose a date',
    'Service du domicile':'Residence service',
    'Nouvelle adresse confirmée — Lagos':'New address confirmed — Lagos',
    'Sécurité':'Security',
    'Nouvelle connexion depuis Lagos ✓':'New sign-in from Lagos ✓',
    'Actualités SuperApp':'SuperApp News',
    'Aide alimentaire : 200+ familles ce mois':'Food aid: 200+ families this month',
    'Reçu scanné — +$24,50 reçus':'Receipt scanned — +$24.50 received',
    'Modifier le profil':'Edit profile',
    'Mode d\u2019identification':'Identification mode',
    'Mode d’identification':'Identification mode',
    'Particulier':'Individual',
    'Organisation':'Organization',
    'Identité & Signature':'Identity & Signature',
    'Vérifié — Niveau 3':'Verified — Level 3',
    'Vérifié':'Verified',
    'Signature électronique (ECP)':'Electronic signature (ECP)',
    'Active · expire 2028':'Active · expires 2028',
    'Historique des signatures':'Signature history',
    '12 documents signés':'12 documents signed',
    'Authentification':'Authentication',
    'SMS · Biométrie · ECP':'SMS · Biometrics · ECP',
    'Biométrie':'Biometrics',
    'Connexion par reconnaissance faciale':'Sign-in via facial recognition',
    'Empreinte digitale':'Fingerprint',
    'Voix':'Voice',
    'Authentification vocale':'Voice authentication',
    'Passeport / CNI':'Passport / ID Card',
    'Expire 2028':'Expires 2028',
    'Actif':'Active',
    'Permis de conduire':'Driving license',
    'Catégorie B · Valide':'Category B · Valid',
    'Titre de séjour':'Residence permit',
    'Permanent':'Permanent',
    'Justificatif de domicile':'Proof of residence',
    'Acte de mariage':'Marriage certificate',
    'Enregistré 2019':'Registered 2019',
    'Acte de naissance':'Birth certificate',
    'Document original':'Original document',
    'Attestation PDI':'IDP attestation',
    'Personne déplacée interne':'Internally displaced person',
    'Diplômes & certificats':'Diplomas & certificates',
    'Finances & avantages':'Finances & benefits',
    'Investissement perspectif':'Forward-looking investment',
    'Scanner reçu · gagner':'Scan receipt · earn',
    'Aide à l\u2019achat immobilier':'Property purchase support',
    'Aide à l’achat immobilier':'Property purchase support',
    'Sécurité & paramètres':'Security & settings',
    'Thème · Notifications':'Theme · Notifications',
    'Langue':'Language',
    'Accessibilité':'Accessibility',
    'Police XL · Voix · Lecteur d\u2019écran · Contraste':'XL Font · Voice · Screen reader · Contrast',
    'Police XL · Voix · Lecteur d’écran · Contraste':'XL Font · Voice · Screen reader · Contrast',
    'Sessions':'Sessions',
    '2 appareils actifs':'2 active devices',
    'Mise à jour':'Update',
    'Aide & support':'Help & support',
    'Se déconnecter':'Sign out',
    'All Screens':'All Screens',
    'Scroll to browse each screen as a standalone interactive phone':'Scroll to browse each screen as a standalone interactive phone',
    'SuperApp — Interactive Preview':'SuperApp — Interactive Preview',

    // ---- presentation/index.html ----
    'SuperApp — Pitch Investisseurs':'SuperApp — Investor Pitch',
    '← Retour':'← Back',
    '⬇ Télécharger PDF':'⬇ Download PDF',
    'Pitch Investisseurs':'Investor Pitch',
    'Une app.':'One app.',
    'Tout l\u2019':'The whole ',
    'Tout l’':'The whole ',
    'État.':'State.',
    'Identité, services publics, paiements, justice et sécurité sociale — réunis dans une plateforme unique pour 40\u00a0millions de citoyens.':
      'Identity, public services, payments, justice and social security — united on a single platform for 40\u00a0million citizens.',
    'Identité, services publics, paiements, justice et sécurité sociale — réunis dans une plateforme unique pour 40 millions de citoyens.':
      'Identity, public services, payments, justice and social security — united on a single platform for 40 million citizens.',
    'Produit en ligne · Tour de table 2026':'Live product · 2026 funding round',
    'Ministères':'Ministries',
    'iOS · Android · Web':'iOS · Android · Web',
    'Plateformes':'Platforms',
    '01 · Problème':'01 · Problem',
    'Le problème':'The problem',
    'L\u2019État reste':'The State remains',
    'L’État reste':'The State remains',
    'fragmenté.':'fragmented.',
    'Les citoyens jonglent entre guichets, papiers et applications. Les administrations ne partagent pas leurs bases — aucune source unique pour l\u2019identité, la fiscalité ou la justice.':
      'Citizens juggle counters, paper and apps. Administrations don\u2019t share their databases — no single source for identity, tax or justice.',
    'Les citoyens jonglent entre guichets, papiers et applications. Les administrations ne partagent pas leurs bases — aucune source unique pour l’identité, la fiscalité ou la justice.':
      'Citizens juggle counters, paper and apps. Administrations don\u2019t share their databases — no single source for identity, tax or justice.',
    '01 · CITOYEN':'01 · CITIZEN',
    'Cinq guichets pour un acte':'Five counters for one act',
    'Renouveler un permis, déclarer un impôt, enregistrer un mariage — chaque démarche exige un déplacement, des formulaires papier et des heures perdues.':
      'Renew a license, file a tax, register a marriage — every step requires a trip, paper forms and lost hours.',
    '≈ 4,2 h par démarche':'≈ 4.2 h per process',
    '02 · IDENTITÉ':'02 · IDENTITY',
    'Pas d\u2019identité numérique':'No digital identity',
    'Pas d’identité numérique':'No digital identity',
    'Sans documents vérifiés sur le téléphone, impossible d\u2019accéder au crédit, aux aides ou aux services trans\u00adfrontaliers — et l\u2019État ne peut pas les joindre.':
      'Without verified documents on the phone, no access to credit, benefits or cross-border services — and the State can\u2019t reach them.',
    'Sans documents vérifiés sur le téléphone, impossible d’accéder au crédit, aux aides ou aux services trans\u00adfrontaliers — et l’État ne peut pas les joindre.':
      'Without verified documents on the phone, no access to credit, benefits or cross-border services — and the State can\u2019t reach them.',
    '1 citoyen sur 4 a un ID numérique':'1 in 4 citizens has a digital ID',
    '03 · INSTITUTIONS':'03 · INSTITUTIONS',
    'Bases qui ne se parlent pas':'Databases that don\u2019t talk',
    'Fisc, justice, ZAGS, sécurité sociale — chaque institution gère ses propres dossiers. Aucun back-office unifié pour les agents publics.':
      'Tax, justice, ZAGS, social security — each institution runs its own records. No unified back-office for public agents.',
    '12+ silos institutionnels':'12+ institutional silos',
    '02 · Solution':'02 · Solution',
    'La solution':'The solution',
    'Le premier':'The first',
    'SuperApp civique.':'civic SuperApp.',
    'Un compte vérifié unique qui réunit identité, services publics, portefeuille civique et communication État-citoyen — un renouvellement de passeport, un paiement d\u2019impôt et une audience judiciaire au même endroit.':
      'A single verified account uniting identity, public services, civic wallet and State-citizen communication — a passport renewal, a tax payment and a court hearing in one place.',
    'Un compte vérifié unique qui réunit identité, services publics, portefeuille civique et communication État-citoyen — un renouvellement de passeport, un paiement d’impôt et une audience judiciaire au même endroit.':
      'A single verified account uniting identity, public services, civic wallet and State-citizen communication — a passport renewal, a tax payment and a court hearing in one place.',
    'Expérience':'Experience',
    'iOS · Android · Web · USSD':'iOS · Android · Web · USSD',
    'Noyau SuperApp':'SuperApp Core',
    'ID · ECP · Portefeuille · Services':'ID · ECP · Wallet · Services',
    'Institutions':'Institutions',
    '12 ministères · Tribunaux · Fisc · ZAGS':'12 ministries · Courts · Tax · ZAGS',
    'Vérifié une fois':'Verified once',
    'KYC + ID + ECP à l\u2019inscription — valable partout.':'KYC + ID + ECP on signup — valid everywhere.',
    'KYC + ID + ECP à l’inscription — valable partout.':'KYC + ID + ECP on signup — valid everywhere.',
    'Un portefeuille':'One wallet',
    'Carte civique, aides sociales, obligations, cashback.':'Civic card, social benefits, bonds, cashback.',
    'État intégré':'Integrated State',
    '60+ services de 12 ministères, API publique.':'60+ services from 12 ministries, public API.',
    '03 · Fil d\u2019accueil':'03 · Home feed',
    '03 · Fil d’accueil':'03 · Home feed',
    'Produit — Accueil':'Product — Home',
    'Un fil qui':'A feed that',
    'informe vraiment.':'truly informs.',
    'Pas une liste de chats. Pas une app bancaire. Un fil vivant : annonces officielles de chaque ministère, scan QR, carte sociale, services populaires — à l\u2019ouverture de l\u2019app.':
      'Not a chat list. Not a banking app. A live feed: official announcements from every ministry, QR scan, social card, popular services — the moment you open the app.',
    'Pas une liste de chats. Pas une app bancaire. Un fil vivant : annonces officielles de chaque ministère, scan QR, carte sociale, services populaires — à l’ouverture de l’app.':
      'Not a chat list. Not a banking app. A live feed: official announcements from every ministry, QR scan, social card, popular services — the moment you open the app.',
    'Annonces officielles du Ministère des Finances, Justice, Numérique — vérifiées.':'Official announcements from Ministry of Finance, Justice, Digital — verified.',
    'Impôts, Justice, Mariage, Domicile, Sondages, Certificats, Permis — un tap.':'Taxes, Justice, Marriage, Residence, Surveys, Certificates, Licenses — one tap.',
    'Recherche unifiée':'Unified search',
    'Une barre — services, documents, démarches, agents publics. Tout indexé.':'One bar — services, documents, processes, public agents. All indexed.',
    '04 · Portefeuille':'04 · Wallet',
    'Produit — Portefeuille':'Product — Wallet',
    'civique.':'civic.',
    'Carte sociale, aides, obligations d\u2019État, garantie des dépôts, cashback national, aide au logement — un seul écran réunit tous les flux financiers liés à l\u2019État.':
      'Social card, benefits, government bonds, deposit guarantee, national cashback, housing aid — one screen for every State-linked financial flow.',
    'Carte sociale, aides, obligations d’État, garantie des dépôts, cashback national, aide au logement — un seul écran réunit tous les flux financiers liés à l’État.':
      'Social card, benefits, government bonds, deposit guarantee, national cashback, housing aid — one screen for every State-linked financial flow.',
    'Carte civique':'Civic card',
    'Visa officielle, multi-devises':'Official Visa, multi-currency',
    'Rendement 7,5 %':'Yield 7.5%',
    'Banque en faillite — recours':'Failed bank — recourse',
    'Scan reçu · récompense':'Scan receipt · reward',
    'Subvention 1ᵉʳ achat':'1st-purchase subsidy',
    'Transferts internationaux':'International transfers',
    '54 pays, FX intégré':'54 countries, FX built-in',
    '05 · Services publics':'05 · Public services',
    'Produit — Services publics':'Product — Public services',
    '60+ services.':'60+ services.',
    'Zéro file.':'Zero queue.',
    'Chaque service de l\u2019État — du renouvellement de passeport à la déclaration d\u2019impôt — remplacé par un parcours intégré qui s\u2019achève en minutes, pas en jours.':
      'Every State service — from passport renewal to tax filing — replaced by an integrated journey that completes in minutes, not days.',
    'Chaque service de l’État — du renouvellement de passeport à la déclaration d’impôt — remplacé par un parcours intégré qui s’achève en minutes, pas en jours.':
      'Every State service — from passport renewal to tax filing — replaced by an integrated journey that completes in minutes, not days.',
    'Documents':'Documents',
    'Certificats & extraits':'Certificates & extracts',
    'Place de résidence':'Place of residence',
    'Finance & garanties':'Finance & guarantees',
    'Impôts & déclarations':'Taxes & filings',
    'Justice & social':'Justice & social',
    'Tribunaux & visio-audiences':'Courts & video hearings',
    'Exécution judiciaire':'Court enforcement',
    'Aide chômage':'Unemployment aid',
    'Services aux PDI':'IDP services',
    'Vie quotidienne':'Daily life',
    'Santé · RDV · vaccins':'Health · appts · vaccines',
    'Éducation · diplômes':'Education · diplomas',
    'Transport · amendes':'Transport · fines',
    '06 · Identité':'06 · Identity',
    'Produit — Profil & documents':'Product — Profile & documents',
    'Votre vie,':'Your life,',
    'sur une page.':'on one page.',
    'Passeport, permis, certificat de mariage, diplômes, attestation PDI — chaque document délivré par l\u2019État, vérifié et accessible depuis l\u2019onglet Profil.':
      'Passport, license, marriage certificate, diplomas, IDP attestation — every State-issued document, verified and accessible from the Profile tab.',
    'Passeport, permis, certificat de mariage, diplômes, attestation PDI — chaque document délivré par l’État, vérifié et accessible depuis l’onglet Profil.':
      'Passport, license, marriage certificate, diplomas, IDP attestation — every State-issued document, verified and accessible from the Profile tab.',
    'Biométrique · scan frontalier':'Biometric · border scan',
    'Éducation & certificats':'Education & certificates',
    'Permanent · vérifié':'Permanent · verified',
    'Niveau 3 · vérifié':'Level 3 · verified',
    '07 · Notifications':'07 · Notifications',
    'Produit — Notifications & suivi':'Product — Notifications & tracking',
    'Un canal pour':'A channel for',
    'chaque démarche.':'every process.',
    'Notifications push, canal dédié par ministère, suivi temps-réel des demandes (envoyée → en examen → décision) — tout dans une seule boîte qui remplace SMS, e-mail et courrier papier.':
      'Push notifications, a dedicated channel per ministry, real-time tracking (sent → review → decision) — all in one inbox that replaces SMS, email and paper mail.',
    'Suivi demandes':'Request tracking',
    'Barre de progression visuelle pour chaque dossier — du dépôt à la décision.':'Visual progress bar for every case — from filing to decision.',
    'Canaux officiels':'Official channels',
    'Échéances fiscales, mises à jour d\u2019aides, annonces civiques — directement de la source.':'Tax deadlines, benefit updates, civic announcements — straight from the source.',
    'Échéances fiscales, mises à jour d’aides, annonces civiques — directement de la source.':'Tax deadlines, benefit updates, civic announcements — straight from the source.',
    'Support 24/7':'24/7 Support',
    'Chat & vidéo avec agents humains. Temps de réponse moyen < 2 minutes.':'Chat & video with human agents. Avg response < 2 minutes.',
    'Alertes sécurité':'Security alerts',
    'Notifications de fraude temps-réel et contrôles de connexion d\u2019appareil.':'Real-time fraud alerts and device sign-in controls.',
    'Notifications de fraude temps-réel et contrôles de connexion d’appareil.':'Real-time fraud alerts and device sign-in controls.',
    '08 · Sécurité':'08 · Security',
    'Produit — Sécurité & signature':'Product — Security & signature',
    'Signer,':'Sign,',
    'en deux secondes.':'in two seconds.',
    'Signature électronique (ECP) à valeur juridique équivalente au manuscrit. Authentification biométrique multi-modale. Historique complet des signatures et sessions actives.':
      'Electronic signature (ECP) with legal weight equivalent to handwritten. Multi-modal biometric authentication. Full signature history and active sessions.',
    'Reconnaissance faciale':'Facial recognition',
    'ECP active':'ECP active',
    'Historique':'History',
    'Sessions actives':'Active sessions',
    'Multi-appareils':'Multi-device',
    '09 · Inclusion':'09 · Inclusion',
    'Produit — IA & accessibilité':'Product — AI & accessibility',
    'Compris par':'Understood by',
    'chaque citoyen.':'every citizen.',
    'Recherche unifiée. Assistant IA pour répondre aux « Comment obtenir X ? ». Multi-langue (FR / EN / langues locales). Conformité WCAG : police XL, voix, lecteur d\u2019écran, contraste élevé.':
      'Unified search. AI Assistant to answer "How do I get X?". Multi-language (FR / EN / local). WCAG compliance: XL font, voice, screen reader, high contrast.',
    'Recherche unifiée. Assistant IA pour répondre aux « Comment obtenir X ? ». Multi-langue (FR / EN / langues locales). Conformité WCAG : police XL, voix, lecteur d’écran, contraste élevé.':
      'Unified search. AI Assistant to answer "How do I get X?". Multi-language (FR / EN / local). WCAG compliance: XL font, voice, screen reader, high contrast.',
    'Services, documents, agents':'Services, documents, agents',
    'Assistant IA':'AI Assistant',
    '« Demander à l\u2019État »':'"Ask the State"',
    '« Demander à l’État »':'"Ask the State"',
    'Multi-langue':'Multi-language',
    'FR · EN · HA · YO · IG':'FR · EN · HA · YO · IG',
    'Accessibilité WCAG':'WCAG accessibility',
    'Police XL, voix, lecteur':'XL font, voice, reader',
    'Suivi temps-réel':'Real-time tracking',
    'Barre progression demandes':'Request progress bar',
    'Support humain':'Human support',
    'Chat & visio 24/7':'Chat & video 24/7',
    '10 · Institutions':'10 · Institutions',
    'Produit — Back-office':'Product — Back-office',
    'Les':'The',
    'institutions':'institutions',
    'aussi.':'too.',
    'Pas seulement une app citoyen. Un back-office sécurisé pour les juges, greffiers, inspecteurs fiscaux, agents ZAGS et services sociaux — la même plateforme, l\u2019autre côté du guichet.':
      'Not just a citizen app. A secure back-office for judges, clerks, tax inspectors, ZAGS officers and social services — same platform, other side of the counter.',
    'Pas seulement une app citoyen. Un back-office sécurisé pour les juges, greffiers, inspecteurs fiscaux, agents ZAGS et services sociaux — la même plateforme, l’autre côté du guichet.':
      'Not just a citizen app. A secure back-office for judges, clerks, tax inspectors, ZAGS officers and social services — same platform, other side of the counter.',
    'Cabinets juridiques':'Legal chambers',
    'Juges & greffiers : registre judiciaire, audiences visio, dossiers, signatures.':'Judges & clerks: court registry, video hearings, files, signatures.',
    'Inspecteurs fiscaux':'Tax inspectors',
    'Contrôle des paiements, notifications, dialogue contribuable, statistiques.':'Payment audits, notifications, taxpayer dialogue, statistics.',
    'Agents ZAGS':'ZAGS officers',
    'Mariages, naissances, décès — traitement des actes, planning, archive.':'Marriages, births, deaths — record processing, scheduling, archive.',
    'Services sociaux':'Social services',
    'Examen des demandes d\u2019aide, décisions, retours aux bénéficiaires.':'Aid request review, decisions, beneficiary feedback.',
    'Examen des demandes d’aide, décisions, retours aux bénéficiaires.':'Aid request review, decisions, beneficiary feedback.',
    '11 · Rejoindre':'11 · Join',
    'Rejoignez-nous — trois phases, trois ans':'Join us — three phases, three years',
    'Bâtir la première':'Building the first',
    'nation numérique.':'digital nation.',
    'Nous levons un tour d\u2019amorçage pour passer à l\u2019échelle dans le marché ancre et préparer l\u2019expansion régionale — de 1 M d\u2019utilisateurs en 2026 à 54 marchés africains d\u2019ici 2028.':
      'We\u2019re raising a seed round to scale in the anchor market and prepare regional expansion — from 1M users in 2026 to 54 African markets by 2028.',
    'Nous levons un tour d’amorçage pour passer à l’échelle dans le marché ancre et préparer l’expansion régionale — de 1 M d’utilisateurs en 2026 à 54 marchés africains d’ici 2028.':
      'We\u2019re raising a seed round to scale in the anchor market and prepare regional expansion — from 1M users in 2026 to 54 African markets by 2028.',
    'Phase I · 2026 — Maintenant':'Phase I · 2026 — Now',
    'Marché ancre':'Anchor market',
    '1 M téléchargements · 12 ministères · ECP & biométrie · 60+ services · tour d\u2019amorçage':
      '1M downloads · 12 ministries · ECP & biometrics · 60+ services · seed round',
    '1 M téléchargements · 12 ministères · ECP & biométrie · 60+ services · tour d’amorçage':
      '1M downloads · 12 ministries · ECP & biometrics · 60+ services · seed round',
    'Phase II · 2027':'Phase II · 2027',
    'Expansion régionale':'Regional expansion',
    '6 marchés ouest & est · USSD · IA conversationnelle · Série A':'6 west & east markets · USSD · conversational AI · Series A',
    'Phase III · 2028':'Phase III · 2028',
    'Plateforme pan-africaine':'Pan-African platform',
    '54 pays · 40 M utilisateurs · API publique du Catalogue de services · Série B':
      '54 countries · 40M users · public Service Catalog API · Series B',
    'Contact':'Contact',

    // ---- presentation round 2 (shortened copy) ----
    'Identité, services publics, paiements et justice — une plateforme unique pour 40\u00a0millions de citoyens.':
      'Identity, public services, payments and justice — one platform for 40\u00a0million citizens.',
    'Identité, services publics, paiements et justice — une plateforme unique pour 40 millions de citoyens.':
      'Identity, public services, payments and justice — one platform for 40 million citizens.',
    'Guichets, papiers, applis dispersées. Aucune source unique pour l\u2019identité, la fiscalité ou la justice.':
      'Counters, paper, scattered apps. No single source for identity, tax or justice.',
    'Guichets, papiers, applis dispersées. Aucune source unique pour l’identité, la fiscalité ou la justice.':
      'Counters, paper, scattered apps. No single source for identity, tax or justice.',
    'Permis, impôts, mariage — chaque démarche : déplacement, papier, heures perdues.':
      'License, taxes, marriage — every step: trip, paper, lost hours.',
    'Sans ID vérifié : pas de crédit, pas d\u2019aides, pas d\u2019accès transfrontalier.':
      'No verified ID: no credit, no benefits, no cross-border access.',
    'Sans ID vérifié : pas de crédit, pas d’aides, pas d’accès transfrontalier.':
      'No verified ID: no credit, no benefits, no cross-border access.',
    'Fisc, justice, ZAGS, social — chacun son dossier. Aucun back-office unifié.':
      'Tax, justice, ZAGS, social — each its own records. No unified back-office.',
    'Un compte vérifié unique : identité, services publics, portefeuille civique et dialogue État-citoyen. Passeport, impôt, audience — au même endroit.':
      'One verified account: identity, public services, civic wallet and State-citizen dialogue. Passport, tax, hearing — in one place.',
    'Annonces officielles de chaque ministère, scan QR, carte sociale, services populaires — dès l\u2019ouverture.':
      'Official announcements from every ministry, QR scan, social card, popular services — right on open.',
    'Annonces officielles de chaque ministère, scan QR, carte sociale, services populaires — dès l’ouverture.':
      'Official announcements from every ministry, QR scan, social card, popular services — right on open.',
    'Finances, Justice, Numérique — annonces vérifiées.':'Finance, Justice, Digital — verified announcements.',
    'Impôts, Justice, Mariage, Permis — en un tap.':'Taxes, Justice, Marriage, License — in one tap.',
    'Services, documents, agents — une seule barre.':'Services, documents, agents — a single bar.',
    'Carte, aides, obligations, cashback, logement — tous les flux financiers liés à l\u2019État, un seul écran.':
      'Card, benefits, bonds, cashback, housing — every State-linked financial flow, one screen.',
    'Carte, aides, obligations, cashback, logement — tous les flux financiers liés à l’État, un seul écran.':
      'Card, benefits, bonds, cashback, housing — every State-linked financial flow, one screen.',
    'Du passeport à la déclaration d\u2019impôt : un parcours intégré, en minutes, pas en jours.':
      'From passport to tax filing: an integrated journey, in minutes, not days.',
    'Du passeport à la déclaration d’impôt : un parcours intégré, en minutes, pas en jours.':
      'From passport to tax filing: an integrated journey, in minutes, not days.',
    'Passeport, permis, mariage, diplômes, PDI — chaque document d\u2019État, vérifié, dans l\u2019onglet Profil.':
      'Passport, license, marriage, diplomas, IDP — every State document, verified, in the Profile tab.',
    'Passeport, permis, mariage, diplômes, PDI — chaque document d’État, vérifié, dans l’onglet Profil.':
      'Passport, license, marriage, diplomas, IDP — every State document, verified, in the Profile tab.',
    'Push, canal par ministère, suivi temps-réel (envoyée → examen → décision). Une boîte unique remplace SMS, e-mail et papier.':
      'Push, one channel per ministry, real-time tracking (sent → review → decision). One inbox replaces SMS, email and paper.',
    'Progression visuelle du dépôt à la décision.':'Visual progress from filing to decision.',
    'Échéances fiscales, aides, annonces — à la source.':'Tax deadlines, benefits, announcements — from the source.',
    'Chat & vidéo humains. Réponse < 2 min.':'Human chat & video. Reply < 2 min.',
    'Fraude temps-réel, contrôle des sessions.':'Real-time fraud alerts, session controls.',
    'ECP à valeur juridique. Biométrie multi-modale. Historique et sessions actives.':
      'ECP with legal weight. Multi-modal biometrics. History and active sessions.',
    'Recherche unifiée. Assistant IA « Comment obtenir X ? ». Multi-langue. WCAG : voix, police XL, lecteur d\u2019écran.':
      'Unified search. AI Assistant "How do I get X?". Multi-language. WCAG: voice, XL font, screen reader.',
    'Recherche unifiée. Assistant IA « Comment obtenir X ? ». Multi-langue. WCAG : voix, police XL, lecteur d’écran.':
      'Unified search. AI Assistant "How do I get X?". Multi-language. WCAG: voice, XL font, screen reader.',
    'Back-office sécurisé pour juges, fisc, ZAGS et services sociaux — l\u2019autre côté du guichet.':
      'Secure back-office for judges, tax, ZAGS and social services — the other side of the counter.',
    'Back-office sécurisé pour juges, fisc, ZAGS et services sociaux — l’autre côté du guichet.':
      'Secure back-office for judges, tax, ZAGS and social services — the other side of the counter.',
    'Registre, audiences visio, dossiers, signatures.':'Registry, video hearings, files, signatures.',
    'Paiements, notifications, dialogue, stats.':'Payments, notifications, dialogue, stats.',
    'Actes, planning, archive — mariages, naissances, décès.':'Records, scheduling, archive — marriages, births, deaths.',
    'Demandes d\u2019aide, décisions, retours bénéficiaires.':'Aid requests, decisions, beneficiary feedback.',
    'Demandes d’aide, décisions, retours bénéficiaires.':'Aid requests, decisions, beneficiary feedback.',
    'Tour d\u2019amorçage pour scaler le marché ancre et préparer l\u2019expansion régionale — de 1 M en 2026 à 54 marchés d\u2019ici 2028.':
      'Seed round to scale the anchor market and prepare regional expansion — from 1M in 2026 to 54 markets by 2028.',
    'Tour d’amorçage pour scaler le marché ancre et préparer l’expansion régionale — de 1 M en 2026 à 54 marchés d’ici 2028.':
      'Seed round to scale the anchor market and prepare regional expansion — from 1M in 2026 to 54 markets by 2028.',
    'Tour d\'amorçage pour scaler le marché ancre et préparer l\'expansion régionale — de 1 M en 2026 à 54 marchés d\'ici 2028.':
      'Seed round to scale the anchor market and prepare regional expansion — from 1M in 2026 to 54 markets by 2028.',
    '1 M téléchargements · 12 ministères · 60+ services · ECP & biométrie':
      '1M downloads · 12 ministries · 60+ services · ECP & biometrics',
    '6 marchés · USSD · IA · Série A':'6 markets · USSD · AI · Series A',
    '54 pays · 40 M utilisateurs · API publique · Série B':'54 countries · 40M users · public API · Series B',

    // misc
    'Bienvenue':'Welcome',
    'Continuer':'Continue'
  };

  // Auto-expand DICT: any key containing curly ’ also gets a straight '
  // variant (and vice-versa) so source text works regardless of quote style.
  Object.keys(DICT).slice().forEach(k => {
    const v = DICT[k];
    if (k.indexOf('\u2019') !== -1) {
      const alt = k.replace(/\u2019/g, "'");
      if (!(alt in DICT)) DICT[alt] = v;
    }
    if (k.indexOf("'") !== -1) {
      const alt = k.replace(/'/g, '\u2019');
      if (!(alt in DICT)) DICT[alt] = v;
    }
  });

  // Build reverse EN→FR
  const REV = {};
  Object.keys(DICT).forEach(k => { REV[DICT[k]] = k; });

  // Snapshot of every text node + its original FR text (taken once on init)
  const NODES = [];
  function walk(node){
    if (!node) return;
    if (node.nodeType === 3) {
      const t = node.nodeValue;
      if (t && /\S/.test(t)) NODES.push({ n: node, fr: t });
      return;
    }
    if (node.nodeType !== 1) return;
    const tag = node.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return;
    if (node.hasAttribute && node.hasAttribute('data-i18n-skip')) return;
    for (let c = node.firstChild; c; c = c.nextSibling) walk(c);
  }

  function snapshotTitleAndPlaceholders(){
    if (document.title) {
      const orig = document.title;
      window.__superI18N_title = orig;
    }
    const phs = document.querySelectorAll('input[placeholder],textarea[placeholder]');
    phs.forEach(el => { el.dataset.i18nPh = el.getAttribute('placeholder'); });
  }

  function applyLang(lang){
    const useEN = lang === 'en';
    NODES.forEach(rec => {
      const fr = rec.fr;
      const trimmed = fr.trim();
      if (!trimmed || SKIP.has(trimmed)) return;
      if (useEN) {
        const en = DICT[trimmed];
        if (en) {
          // preserve surrounding whitespace
          rec.n.nodeValue = fr.replace(trimmed, en);
        }
      } else {
        rec.n.nodeValue = fr;
      }
    });
    // title
    if (window.__superI18N_title) {
      const tt = window.__superI18N_title.trim();
      document.title = useEN && DICT[tt] ? DICT[tt] : window.__superI18N_title;
    }
    // placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const orig = el.dataset.i18nPh;
      const en = DICT[orig.trim()];
      el.setAttribute('placeholder', useEN && en ? en : orig);
    });
    document.documentElement.lang = useEN ? 'en' : 'fr';
    try { localStorage.setItem('superapp.lang', lang); } catch(e){}
    // Update toggle button label
    const btns = document.querySelectorAll('[data-i18n-toggle]');
    btns.forEach(b => {
      b.querySelectorAll('[data-lang]').forEach(s => {
        s.classList.toggle('active', s.dataset.lang === lang);
      });
    });
    // Notify embed iframes
    document.querySelectorAll('iframe').forEach(f => {
      try { f.contentWindow.postMessage({ type:'superapp.lang', lang }, '*'); } catch(e){}
    });
  }

  function initToggle(){
    // Inject minimal CSS once
    if (!document.getElementById('i18n-toggle-css')) {
      const st = document.createElement('style');
      st.id = 'i18n-toggle-css';
      st.textContent = `
        .lang-toggle{position:fixed;top:14px;right:14px;z-index:9999;display:inline-flex;
          background:rgba(20,20,22,.86);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
          border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:4px;gap:2px;
          font:600 12px/1 -apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Arial,sans-serif;
          letter-spacing:.04em;box-shadow:0 6px 24px rgba(0,0,0,.35)}
        .lang-toggle [data-lang]{padding:7px 12px;border-radius:999px;color:rgba(255,255,255,.72);cursor:pointer;
          transition:all .2s ease;user-select:none}
        .lang-toggle [data-lang].active{background:#F2C94C;color:#0B0B0C}
        .lang-toggle [data-lang]:not(.active):hover{color:#fff}
        html.embed-mode .lang-toggle{display:none!important}
      `;
      document.head.appendChild(st);
    }
    if (!document.querySelector('[data-i18n-toggle]')) {
      const wrap = document.createElement('div');
      wrap.className = 'lang-toggle';
      wrap.setAttribute('data-i18n-toggle','');
      wrap.innerHTML = '<span data-lang="fr">FR</span><span data-lang="en">EN</span>';
      wrap.addEventListener('click', e => {
        const t = e.target.closest('[data-lang]');
        if (t) applyLang(t.dataset.lang);
      });
      document.body.appendChild(wrap);
    }
  }

  function init(){
    snapshotTitleAndPlaceholders();
    walk(document.body);
    initToggle();
    let lang = 'fr';
    try {
      const qs = new URLSearchParams(location.search);
      lang = qs.get('lang') || localStorage.getItem('superapp.lang') || 'fr';
    } catch(e){}
    if (lang !== 'fr' && lang !== 'en') lang = 'fr';
    applyLang(lang);
  }

  // Listen for parent-frame language sync
  window.addEventListener('message', e => {
    const d = e.data;
    if (d && d.type === 'superapp.lang' && (d.lang === 'fr' || d.lang === 'en')) {
      applyLang(d.lang);
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
