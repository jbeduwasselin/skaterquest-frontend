# SquateQuest - FrontApp

Blablabla, trop bien cette app.

Bapt : J'ai créé un dossier "components" avec quelques composants géneriques, et un dossier screens pour nos écrans.

Le fichier globalStyle continent une StyleSheet avec des classes à réutiliser (ex : container, title) et la pallette de couleur.
J'esseyons de nommer les couleurs de manières génériques/utilitaire et non descriptive (pas de COLOR_BLACK plutot COLOR_BACKGROUND). De cette manière si demain le bleu devient rouge on a pas besoin de remplacer COLOR_BLUE par COLOR_RED.

Tips :
 ```<View style = {{...globalStyle.container, ...styles.container}}/>```
prendra d'abbords le style de globalStyle puis va venir écrire les styles de styles par dessus (similaire à StyleSheet.compose https://reactnative.dev/docs/stylesheet#compose )

vous pouvez recuperer globalStyle partout (``` import globalStyle from "../globalStyle.js"  ```)
