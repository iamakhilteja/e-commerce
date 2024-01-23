// src/components/AddToCartButton.tsx
import React, { useState } from 'react';
import { RootState } from '../store/store';
import { addToCart, minusToCart, removeFromCart } from '../store/reducers/cartSlice';
import { IonButton, IonIcon, IonItem } from '@ionic/react';
import './Addtocart.css';
import { useHistory } from 'react-router';

interface CheckoutProps {
  onClick: () => void;
}


const BuyNowButton: React.FC<CheckoutProps> = ({ onClick }) => {
  
    return (
      <div  className='ion-no-padding' >
        <IonButton expand='block' className='buynow' color= "warning" style={{width: "175px", height:"40px",}} onClick={onClick}>Buy Now</IonButton>
      </div>
    );
  }



export default BuyNowButton;
