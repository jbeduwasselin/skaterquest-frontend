# SkateQuest - FrontApp

Blablabla, trop bien cette app.

Bapt : J'ai créé un dossier "components" avec quelques composants géneriques, et un dossier screens pour nos écrans.

Le fichier globalStyle continent une StyleSheet avec des classes à réutiliser (ex : container, title) et la pallette de couleur.
J'esseyons de nommer les couleurs de manières génériques/utilitaire et non descriptive (pas de COLOR_BLACK plutot COLOR_BACKGROUND). De cette manière si demain le bleu devient rouge on a pas besoin de remplacer COLOR_BLUE par COLOR_RED.

Tips :
 ```<View style = {{...globalStyle.container, ...styles.container}}/>```
prendra d'abbords le style de globalStyle puis va venir écrire les styles de styles par dessus (similaire à StyleSheet.compose https://reactnative.dev/docs/stylesheet#compose )

vous pouvez recuperer globalStyle partout (``` import globalStyle from "../globalStyle.js"  ```)

Ah oui j'ai aussi installé les librairies necessaire pour la la camera, la naviagtion et la géoloc.


Librairie pour la conversion de vidéo : https://www.npmjs.com/package/@config-plugins/ffmpeg-kit-react-native
(On va essayer d'éviter de stocker des videos de 18GB) /!\ ne marche pas sur expo GO à implementer sur les .apk/.app 

Thomas : Création des screens avec les liens entres eux + la stab navigator. Mise en place de la carte avec la géoloc. Du game of Skate. des Settings. des tricks

ce que j'ai installer :
-yarn add @react-native-picker/picker
c'est pour un menu déroulant dans le game of skate
-yarn add react-native-confetti-cannon
c'est pour les confettis quand il y victoire/défaite (trop rigolo ! )
-yarn add react-native-animatable
pour des petites animations sympas.
-expo install @expo/vector-icons
j'en ai besoin pour trouver un icone de "versus" cool.
-yarn add @react-native-async-storage/async-storage
à installer pour pouvoir sauvegarder sa progression dans les tricks même après le redémarrage de l'appli
-npm install @react-native-picker/picker
pour les menus déroulants
-expo install expo-linear-gradient
pour les couleurs dégrader sur les boutons