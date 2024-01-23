import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { IonButton, IonIcon, IonItem } from '@ionic/react';
import './Addtocart.css';
import { addToWishlist,removeFromWishlist } from '../store/reducers/wishlistSlice';
import { heart, heartOutline } from 'ionicons/icons';

interface WishlistButtonProps {
  productId: number;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ productId }) => {
    
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    const isWishlist = wishlistItems.includes(productId)
    const dispatch = useDispatch();

    const handleWishlistToggle = async (e:any) => {
      e.stopPropagation();
        if (isWishlist) {
          await dispatch(removeFromWishlist(productId));
        } else {
          await dispatch(addToWishlist(productId));
        }
      };

    return (
        <div className='ion-no-padding'>
          <IonIcon className='wish-icn'
            onClick={handleWishlistToggle}
            icon={isWishlist ? heart : heartOutline}
            style={{ fill: isWishlist ? 'var(--ion-color-danger)' : 'var(--ion-color-medium)' }}
          />
  
        </div>

    )}

    export default WishlistButton