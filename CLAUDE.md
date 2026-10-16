# Zap — reprise du travail (branche `dev`)

Cette branche contient le code source de travail de Zap et de son easter egg « Dossier 0417 ».
La branche `main` = l'appli installée (GitHub Pages) : n'y pousser QUE si Naim dit « fais la mise à jour ».

À lire en premier, dans cet ordre :
1. `docs/REGLES.md` — toutes les décisions de Naim (à respecter).
2. `docs/BIBLE.md` — l'histoire complète, la vérité cachée, les graines, l'état de chaque acte.
3. `docs/CONCEPT.md` — le concept narratif d'origine écrit par Naim.

Construire : `cd src && bash build.sh` → `src/build_out.html` (appli complète en un fichier).
Tester : `cd src && NODE_PATH=$(npm root -g) node tests/ta1.js` (etc.), après avoir construit.
Aperçu publié : https://claude.ai/artifact/5AjD3fZF3zmukZWw2cafmK (le republier au même lien, après avoir récupéré son bloc catalogue AUTO).
`docs/apercu-zappeur.html` = la dernière version publiée de l'aperçu.
