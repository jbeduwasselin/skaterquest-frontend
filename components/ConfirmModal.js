import { useState } from "react";
import ModalContent from "./ModalContent";
import globalStyle from "../globalStyle";
import { Text, View } from "react-native";
import { Button } from "./Buttons";

/*
Function qui renvoie [setter , component] pour une modale de 
confirmation. 
Usage :

  //appeler le hook
  const [setConfim , Confirm] = useConfirmationModal()

  function handleEvent(){
    setConfirm({
        text : "le text à afficher",
        handle : ()=>{ //ici mettre les actions à réaliser}
   })

   [....]

   return (<>
   ....
   .....
   .....
    <Confirm/>  //Appeler le composant
   </>)

}

*/
export function useConfirmationModal() {
  const [confirmationData, setConfirmationData] = useState();
  return [
    setConfirmationData,
    function ConfirmModal() {
      return (
        <ModalContent
          visibleState={confirmationData}
          closeHandler={() => setConfirmationData(null)}
          containerStyle={globalStyle.confirmationModal}
        >
          <Text style={globalStyle.confirmationText}>
            {confirmationData?.text}
          </Text>
          <View style={globalStyle.flexRow}>
            <Button
              text="Annuler"
              containerStyle={globalStyle.cancelButton}
              onPress={() => setConfirmationData(null)}
            />

            <Button
              text="Confirmer"
              containerStyle={globalStyle.confirmButton}
              onPress={() => {
                confirmationData?.handle && confirmationData.handle();
                setConfirmationData(null);
              }}
            />
          </View>
        </ModalContent>
      );
    },
  ];
}
