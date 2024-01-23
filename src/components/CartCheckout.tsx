// src/pages/CartPage.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateCartItem, removeFromCart } from "../store/reducers/cartSlice";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonImg,
  IonButton,
  IonInput,
  IonCard,
  IonCardContent,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import { getProductDetailsById } from "../data/api"; // Assuming you have a function to fetch product details
import AddToCartButton from "./Addtocart";
import ComHeader from "./Toolbar";

interface ProductDetails {
  image: string;
  title: string;
  price: number;
}

const CartCheckout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState<{
    [key: number]: ProductDetails;
  }>({});
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedPaymentType, setSelectedPaymentType] = useState<string>('Credit Card');

  const handleAddressChange = (event: any) => {
    setSelectedAddress(event.target.value);
  };

  const handlePaymentTypeChange = (event: any) => {
    setSelectedPaymentType(event.target.value);
  };
  
  // const subtotal = calculateSubtotal(cartItems); // Implement this function
  // const tax = calculateTax(subtotal); // Implement this function
  // const total = subtotal + tax;
  const handleProceedToPay = () => {
    // 
  };
  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateCount = (productId: number, count: number) => {
    const updatedItems = cartItems.map((item) =>
      item.productId === productId ? { ...item, count } : item
    );
    dispatch(updateCartItem({ productId, count }));
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details: { [key: number]: ProductDetails } = {};
      await Promise.all(
        cartItems.map(async (item) => {
          const productDetail = await getProductDetailsById(item.productId);
          details[item.productId] = productDetail; // Assuming getProductById returns ProductDetails
        })
      );
      setProductDetails(details);
    };
    fetchProductDetails();
  }, [cartItems]);

  const subTotal = cartItems.reduce((total, item) => {
    const productDetail = productDetails[item.productId];
    if (productDetail) {
      return total + productDetail.price * item.count;
    }
    return total;
  }, 0);

  const tax = subTotal*0.05;
  const GrandTotal = subTotal + tax;

  return (
    <IonPage>
      <IonHeader>
        <ComHeader />
      </IonHeader>
      <IonContent>
        <IonList>
          {cartItems.map((item) => {
            const productDetail = productDetails[item.productId];
            if (!productDetail) {
              return (
                <IonItem key={item.productId}>
                  <IonLabel>{item.productId}</IonLabel>
                  <IonLabel>{item.count}</IonLabel>
                </IonItem>
              ); // Skip rendering if product details are not available yet
            }

            return (
              <IonItem key={item.productId}>
                <IonImg
                  src={productDetail.image}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    objectFit: "contain",
                  }}
                />
                <IonLabel>
                  <h2>{productDetail.title}</h2>
                  <p>Price: ${productDetail.price}</p>

                  <AddToCartButton productId={item.productId} Page= "cart"/>
                  <p>Total: ${productDetail.price * item.count}</p>
                  <IonButton
                    color="danger"
                    onClick={() => handleRemoveFromCart(item.productId)}
                  >
                    Remove
                  </IonButton>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
        <IonItem>
        <IonLabel position="floating">Select Address</IonLabel>
        <IonSelect value={selectedAddress} onIonChange={handleAddressChange}>
          {/* Render address options here */}
        </IonSelect>
      </IonItem>
      
      {/* Payment type selection */}
      <IonItem>
        <IonLabel position="floating">Select Payment Type</IonLabel>
        <IonSelect value={selectedPaymentType} onIonChange={handlePaymentTypeChange}>
          <IonSelectOption value="Credit Card">Credit Card</IonSelectOption>
          <IonSelectOption value="PayPal">PayPal</IonSelectOption>
          {/* Add more payment types */}
        </IonSelect>
      </IonItem>

      {/* Order summary */}
      <IonCard>
        <IonCardContent>
          <IonList>
            <IonItem>
              <IonLabel>Subtotal</IonLabel>
              <IonNote slot="end">${subTotal}</IonNote>
            </IonItem>
            <IonItem>
              <IonLabel>Tax</IonLabel>
              <IonNote slot="end">${tax}</IonNote>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>Total Amount to Pay</IonLabel>
              <IonText slot="end">${GrandTotal}</IonText>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>

      {/* Proceed to Pay button */}
      <IonButton expand="full" color="primary" onClick={handleProceedToPay}>Proceed to Pay</IonButton>
        
      </IonContent>
    </IonPage>
  );
};
export default CartCheckout;
