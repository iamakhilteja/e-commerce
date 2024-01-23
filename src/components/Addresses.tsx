import React, { useState } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonCol,
  IonRow,
} from '@ionic/react';

interface Address {
  id: number | null;
  name: string;
  houseNo: string | null;
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

interface UserAddressProps {
  savedAddresses: Address[]
  onSelectAddress: (address: Address) => void;
}

const UserAddressList: React.FC<UserAddressProps> = ({savedAddresses,onSelectAddress}) => {

  const handleAddressChange = (address: Address) => {
    onSelectAddress(address)
  };

  return (
        <IonCard>
          <IonCardHeader>
        <IonRow className='align-items-center'>
          <IonCol className='align-items-center' size="7">
           <h5>Select Address</h5>
          </IonCol>
          <IonCol className='align-items-center' size="5">
          
          </IonCol>
        </IonRow>
        </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonRadioGroup>
                {savedAddresses.map((address) => (
                  <IonItem key={address.id}>
                    <IonLabel>{address.name}</IonLabel>
                    <IonRadio
                      value={address.id}
                      onClick={() => handleAddressChange(address)}
                    />
                  </IonItem>
                ))}
              </IonRadioGroup>
            </IonList>
          </IonCardContent>
        </IonCard>
  );
};

export default UserAddressList;
