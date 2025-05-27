# SkaterQuest - Frontend

Partie frontend de l'application mobile SkaterQuest, développée par Julien Bédu, Thomas Poillion et Baptiste Zuber.

Librairie pour la conversion de vidéo : https://www.npmjs.com/package/@config-plugins/ffmpeg-kit-react-native
(éviter de stocker des videos trop lourdes) /!\ ne marche pas sur expo GO, à implémenter sur les .apk/.app

---

**Résumé des dossiers :**
*(NB : Je décris seulement ceux partagés sur GitHub)*

- **assets** : 

- **component** : Composants importés dans les composants-écrans

- **data** : Contient les données des tricks (non en BDD car données fixes)

- **lib** (library) : Contient les fichiers utilitaires suivants :
  - **config.js** : Contient et exporte les variables suivantes utilisées dans les fetch du front :
    - BACK_URL : URL utilisée dans les fetch, à choisir entre sa version locale et distante
    - headers : infos envoyés dans les fetch
  - **request.js** : Fichier passerelle gérant la communication du front vers le back
  - **request.test.js** : Fichier de TDD pour tester la communication front-back et les routes
  - **util.js** : Regroupe des fonctions utilitaires et regex pour gérer des calculs, des tirages aléatoires, de la mise en forme de dates, et la validation d’inputs

- **reducers** : Contient les états du store de Redux

- **screens** : Composants-écrans de l'appli