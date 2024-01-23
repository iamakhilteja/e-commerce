// src/components/ShoppingCartIcon.tsx
import React from 'react';
import { IonIcon, IonBadge, IonItem } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import './Shoppingcarticon.css';

const ShoppingCartIcon: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.count, 0);

  return (
    <IonItem className="cart-sec ion-no-padding"slot='end' routerLink={'/cart'}>
      <IonIcon className="cart-icn" icon={cartOutline}/>
     <IonBadge className="cart-cnt"color="primary">
      {cartCount > 0 && <span>{cartCount}</span>}
    </IonBadge>
    </IonItem>
  );
};

export default ShoppingCartIcon;
