// src/components/WishlistIcon.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IonIcon, IonBadge, IonItem } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import './WishlistIcon.css';

const WishlistIcon: React.FC = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isWishlistEmpty = wishlistItems.length === 0;


  return (
    <IonItem className="ion-no-padding" slot='end' routerLink={"/wishlist"}>
    <IonIcon className='wsh-icn'icon={ heartOutline}/>
    <IonBadge className='wsh-cnt' color="danger">
      {!isWishlistEmpty && <span>{wishlistItems.length}</span>}
    </IonBadge>
    </IonItem>
  );
};

export default WishlistIcon;
