import React, { useState } from 'react';
import { IonItem, IonLabel, IonInput, IonButton, IonCardHeader, IonCardContent, IonCard } from '@ionic/react';

interface Address {
  id: null;
  name: string;
  houseNo: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface ReusableAddressFormProps {
  onAddAddress: (newAddress: Address) => void;
}

const ReusableAddressForm: React.FC<ReusableAddressFormProps> = ({ onAddAddress }) => {
  const [addressForm, setAddressForm] = useState<Address>({
    id: null,
    name: '',
    houseNo: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleInputChange = (field: keyof Address, value: string) => {
    setAddressForm((prevAddress) => ({
      ...prevAddress,
      [field]: value,
    }));
  };

  const handleAddAddress = () => {
    onAddAddress(addressForm);
    setAddressForm({
      id: null,
      name: '',
      houseNo: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
    });
  };

  return (
    
    <IonCard>
      <IonCardHeader>
      </IonCardHeader>
      <IonCardContent>
      <IonItem>
        <IonLabel>Name</IonLabel>
        <IonInput
          value={addressForm.name}
          onIonChange={(e) => handleInputChange('name', e.detail.value!)}
        />
      </IonItem>
      
      <IonItem>
        <IonLabel>Door/HouseNo.</IonLabel>
        <IonInput
          value={addressForm.houseNo}
          onIonChange={(e) => handleInputChange('houseNo', e.detail.value!)}
        />
      </IonItem>
    
      <IonItem>
        <IonLabel>Street</IonLabel>
        <IonInput
          value={addressForm.street}
          onIonChange={(e) => handleInputChange('street', e.detail.value!)}
        />
      </IonItem>

      <IonItem>
        <IonLabel>City</IonLabel>
        <IonInput
          value={addressForm.city}
          onIonChange={(e) => handleInputChange('city', e.detail.value!)}
        />
      </IonItem>
    
      <IonItem>
        <IonLabel>State</IonLabel>
        <IonInput
          value={addressForm.state}
          onIonChange={(e) => handleInputChange('state', e.detail.value!)}
        />
      </IonItem>

      <IonItem>
        <IonLabel>pincode</IonLabel>
        <IonInput
          value={addressForm.pincode}
          onIonChange={(e) => handleInputChange('pincode', e.detail.value!)}
        />
      </IonItem>

      <IonItem>
        <IonButton expand="full" color="primary" onClick={handleAddAddress}>
          Add New Address
        </IonButton>
      </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default ReusableAddressForm;
