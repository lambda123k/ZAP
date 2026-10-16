# Zap — règles et décisions de Naim (à respecter dans toute nouvelle conversation)

## Travail
- Ne JAMAIS envoyer l'appli sur la branche `main` (l'appli installée, GitHub Pages) sans que Naim dise « fais la mise à jour ».
- L'aperçu de travail est l'artifact Claude https://claude.ai/artifact/5AjD3fZF3zmukZWw2cafmK (le republier au même lien).
  Avant de republier : relire l'artifact en ligne et récupérer son bloc `/*ZAPPEUR-CATALOGUE-AUTO:START*/ … END*/` (mis à jour chaque lundi par une tâche planifiée) dans `src/auto_live.js`.
- Tâche planifiée hebdo (lundi 07:54 Paris) : met à jour le bloc AUTO du catalogue (+ SUITES) dans l'artifact et pousse ce bloc seul sur GitHub.
- Firebase : projet `zap-app-cb57c` (règles publiées, connexion anonyme activée) → à brancher pour les vrais potes / votes / conseils lors de « fais la mise à jour ».
- Prévenir Naim quand la conversation devient trop longue et qu'il vaut mieux continuer dans une nouvelle (après avoir tout sauvegardé ici).
- Naim parle français, souvent en vocal, depuis un iPhone. Réponses claires, pas de jargon. Liens directs quand il doit faire une manip.

## Construction
- Le code est découpé dans `src/` ; `src/build.sh` assemble `build_out.html` (l'appli complète, un seul fichier).
- Tests : Playwright avec `NODE_PATH=$(npm root -g)` ; scripts `src/tests/*.js` (lancer depuis `src/` après `bash build.sh`).
- Chaque fichier `part8*.js` = une couche de l'easter egg (voir BIBLE.md). Les fonctions sont surchargées par réassignation (`renderList=function(){…}`), les états sont dans `S.ac` (localStorage `zappeur.v1`).

## L'easter egg « Dossier 0417 » (voir BIBLE.md pour l'histoire complète)
- Il ne doit JAMAIS gêner ceux qui ne jouent pas : pas de texte, pas de message visible pour un utilisateur normal. Au 1er « Pas pour moi », seulement un tout petit tremblement de la liste.
- Le bouton s'appelle « Pas pour moi » (plus « Pas ici »).
- Indice permanent : dans Profil > « Ce que l'algo a appris », une ligne écrite à la main « MIRE · N refus d'affilée », visible dès le début (0), devient « N refus / 15 » à partir de 5.
- Entrée : barre de couleurs qui grésille → 3 petits tapotements → « MIRE · signal faible » → carte fantôme (seulement « Pas pour moi ») → escalier de refus (5/15, bouton qui résiste, badge Têtu à 10, compte à rebours, plantage à 15).
- Appui long sur la barre de couleurs : si la Régie n'a jamais été débloquée → un indice écrit à la main selon l'étape ; sinon → ouvre la Régie.
- Régie (menu caché pour Naim) : débloquée en tapant `regie.0417` dans la recherche de Zap ; puis appui long sur la barre. Contient des raccourcis vers chaque étape de chaque acte + « traces illimitées ».
- Écriture : enquête non linéaire, tout doit être devinable (niveau 3 : deux indices qui se croisent), pas de longs textes, pas de narration, documents courts avec les mots importants en jaune.
- Les recherches doivent souvent se faire DANS l'appli (Potes, Journal, Vote, recherche, Rewind, Profil…), pas seulement dans l'index / la console.
- Rien ne doit « pop » sans raison : chaque outil, personnage, document a une justification dans l'histoire.
- Effet « L'Attaque des Titans » : chaque acte agrandit le monde et redonne un sens à un détail du début ; graines posées très tôt.
- Perdre (5 traces) : l'appli se ferme, écran « TU AS PERDU » clair ; reprise au checkpoint de l'acte ou tout recommencer.
- Checkpoints à chaque acte ; indices « Je bloque » progressifs.
- Musique : Naim fait des morceaux Suno (un par acte + thème + écran de défaite, motif de 4 notes commun) → à intégrer quand il les envoie (fichiers `theme.mp3`, `acte1.mp3`…`acte6.mp3`), en boucle avec fondus, à la place de l'ambiance générée.

## À faire / idées en attente
- Intégrer les musiques Suno.
- « Fais la mise à jour » : brancher Firebase (vrais potes, demandes d'amis, votes en direct, conseils) puis pousser sur `main`.
- Mesurer temps / erreurs / indices par énigme pour régler la difficulté.
- Panne 2 de l'Acte I un peu moins guidée.
- Plus d'indices cachés dans l'appli elle-même (voir la liste d'idées dans BIBLE.md).
