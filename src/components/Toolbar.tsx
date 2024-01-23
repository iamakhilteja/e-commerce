import { IonBackButton, IonButtons, IonHeader, IonItem, IonToolbar } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import React from "react";
import ShoppingCartIcon from "./Shoppingcarticon";
import WishlistIcon from "./WishlistIcon";


const ComHeader: React.FC = () => {

    return (
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton icon={arrowBackOutline}></IonBackButton>
        </IonButtons>
        <WishlistIcon/>
        <ShoppingCartIcon />
      </IonToolbar>
    );
}

export default ComHeader;