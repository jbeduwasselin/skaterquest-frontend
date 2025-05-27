import { useState } from "react";
import ModalContent from "./ModalContent";
import globalStyle from "../globalStyle";
import { Text } from "react-native";
import { Button } from "./Buttons";

/*
Fonction qui renvoie [setter , component] pour une modale d'affichage d'erreur.

Usage :

  // Appeler le hook
  const [setError , Error] = useConfirmationModal()

  function handleEvent(){
  try {
    myDodgyFunction()
  }catch (error){
    setError("It failed") // Ici mettre le texte de l'error
  }

   [....]

   return (<>
   ....
   .....
   .....
    <Error/>  // Appeler le composant
   </>)

}
   */
export function useErrorModal() {
  const [errorText, setErrorText] = useState();
  return [
    setErrorText,
    function ErrorModal() {
      return (
        <ModalContent
          visibleState={errorText}
          containerStyle={globalStyle.errorModal}
          closeHandler={() => setErrorText(null)}
        >
          <Text style={globalStyle.errorText}>{errorText}</Text>
          <Button
            onPress={() => setErrorText(null)}
            text="OK"
            containerStyle={globalStyle.errorButton}
            textStyle={globalStyle.errorButtonText}
          />
        </ModalContent>
      );
    },
  ];
}
