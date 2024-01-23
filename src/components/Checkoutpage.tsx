import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonCard, IonCardContent, IonList, IonNote, IonText, IonButton, IonCol, IonRow, IonCardHeader, IonModal } from '@ionic/react';
import { useParams } from 'react-router';
import { getProductDetailsById } from '../data/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ComHeader from './Toolbar';
import ReusableAddressForm from './AddressComponent';
import DeliveryAddressComponent from './AddressList';

interface ProductDetails {
  image: string;
  title: string;
  price: number;
  quantity: number;
}

interface Address {
    id: any;
    name: string;
    houseNo: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  }



const CheckoutPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState<string>('');
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
  const [shippingAddressId, setShippingAddressId] = useState<number | null>(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'select' | 'add' | 'update'>('select');

  interface Address {
    id: number;
    name: string;
    houseNo: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  }
  
  const savedAddresses: Address[] = [
    {
      id: 1,
      name: 'John Doe',
      houseNo: '123',
      street: 'Main St',
      city: 'City',
      state: 'State',
      pincode: '12345',
    },
    {
      id: 2,
      name: 'Jane Smith',
      houseNo: '456',
      street: 'Second St',
      city: 'Town',
      state: 'State',
      pincode: '54321',
    },
  ];

  const defaultAddress: Address = 
  {
    id: 1,
    name: 'John Doe',
    houseNo: '123',
    street: 'Main St',
    city: 'City',
    state: 'State',
    pincode: '12345',
  }

  const handleSetShippingAddress = (addressId: number) => {
    setShippingAddressId(addressId);
  };

  const selectedAddress = savedAddresses.find((address) => address.id === shippingAddressId) || defaultAddress;


  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await getProductDetailsById(Number(productId));
      setProductDetails(response);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handlePaymentTypeChange = (event: CustomEvent) => {
    setSelectedPaymentType(event.detail.value);
  };

  const handleQuantityChange = (event: CustomEvent) => {
    const newQuantity = Number(event.detail.value);
    if (productDetails && newQuantity > 0 && newQuantity <= productDetails.quantity) {
      setSelectedQuantity(newQuantity);
    }
  };

  const handleProceedToPay = () => {
    // Handle payment logic here
  };

  let subTotal = 0;
  let tax = 0;
  let grandTotal = 0;

  if (productDetails) {
    subTotal = selectedQuantity * productDetails.price;
    tax = subTotal * 0.1; // Assuming tax is 10% of the subtotal
    grandTotal = subTotal + tax;
  }


  if (!productDetails) {
    return (
      <IonPage>
        <IonContent>
          <p>Product not found.</p>
        </IonContent>
      </IonPage>
    );
  }


  return (
    <IonPage>
      <IonHeader>
        <ComHeader />
      </IonHeader>
      <IonContent>
        <IonCard>
      <IonRow>
        <IonCol size="4">
        <IonItem key={productId}>
          <img  
            src={productDetails.image}
            alt={productDetails.title}
            style={{
              maxWidth: "120px",
              maxHeight: "120px",
              objectFit: "contain",
            }}
          />
         </IonItem>
         </IonCol>
         <IonCol size="8">
         <IonItem className='ion-no-padding'>
          <IonLabel className='ion-text-wrap'>{productDetails.title}</IonLabel>
          </IonItem>
          <IonItem>
          <IonLabel position="floating">Select Quantity</IonLabel>
        <IonSelect value={selectedQuantity} onIonChange={handleQuantityChange}>
          {[...Array(productDetails.quantity)].map((_, index) => (
            <IonSelectOption key={index + 1} value={index + 1}>
              {index + 1}
            </IonSelectOption>
          ))}
        </IonSelect>
        </IonItem>
        <IonItem>
            <h5>Price: ${productDetails.price}</h5>
        </IonItem>
        </IonCol>
        </IonRow>
        
      </IonCard>
      <div>
      <DeliveryAddressComponent />
      </div>
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
                <IonText slot="end">${grandTotal}</IonText>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
        <IonButton expand="full" color="primary" onClick={handleProceedToPay}>
          Proceed to Pay
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CheckoutPage;