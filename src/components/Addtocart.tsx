// src/components/AddToCartButton.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart, minusToCart, removeFromCart } from '../store/reducers/cartSlice';
import { IonButton, IonIcon, IonItem } from '@ionic/react';
import './Addtocart.css';
import { addToWishlist,removeFromWishlist } from '../store/reducers/wishlistSlice';
import { heart, heartOutline, warning } from 'ionicons/icons';

interface AddToCartButtonProps {
  productId: number;
  Page: "list" | "cart";
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId, Page }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find((item) => item.productId === productId);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isWishlist = wishlistItems.includes(productId)

  const handleAddToCart = () => {
    dispatch(addToCart({ productId, count: 1 }));
  };

  const handleMinusFromCart = () => {
    dispatch(minusToCart({ productId, count: 1 }));
  };


  
    if (cartItem && cartItem.count !== 0) {
    return (
      <IonItem className='cart-btn-actv'>
       
        <IonButton className='Minus' onClick={handleMinusFromCart}>-</IonButton>
        <span className='count'>{cartItem.count}</span>
        <IonButton className='Add' onClick={handleAddToCart}>+</IonButton>
     
      </IonItem>
    );
  }

  if (Page === "cart" && cartItem && cartItem.count === 0) {
    dispatch(removeFromCart(productId));
  }

  if (Page === "list") {
    return (
      <div className='ad2cart ion-no-padding'>
        <IonButton style={{width: "175px", height:"40px",}} color="light" className= "cartadd-btn" onClick={handleAddToCart}>Add to Cart</IonButton>
      </div>
    );
  }

  return null;
};

export default AddToCartButton;
