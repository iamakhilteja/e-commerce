import React, { useState } from "react";
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
  IonCardSubtitle,
} from "@ionic/react";
import UserAddressList from "./Addresses";
import ReusableAddressForm from "./AddressComponent";

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
    name: "John Doe",
    houseNo: "123",
    street: "Gubbala Mangamma St",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "12345",
  },
  {
    id: 2,
    name: "Jane Smith",
    houseNo: "456",
    street: "Second St",
    city: "Town",
    state: "State",
    pincode: "54321",
  },
];

const defaultAddress: Address = {
  id: 1,
  name: "John Doe",
  houseNo: "123",
  street: "Main St",
  city: "City",
  state: "State",
  pincode: "12345",
};

// interface DeliveryAddressProps {
//   userId: number;
// }

const DeliveryAddressComponent: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"select" | "add" | "update">(
    "select"
  );
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    defaultAddress
  );
 
  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    setShowModal(false);
 }
  const handleAddressChange = (address: Address) => {
    setSelectedAddress(address);
    setShowModal(false);
  };


  return (
    <div>
      
      <IonCard>
        <IonItem>
        <IonCardTitle>Delivery Address</IonCardTitle> &ensp;
        <div><a
                onClick={() => {
                  setModalType("select");
                  setShowModal(true);
                }}
              >
                Change Address
              </a></div>
        </IonItem>
        <IonCardContent>

          <div>
            <div>
              <IonText>{selectedAddress?.name},</IonText>
              <IonText>{selectedAddress?.houseNo},</IonText>
            </div>
            <div>
              <IonText>{selectedAddress?.street},</IonText>
              <IonText> {selectedAddress?.city},</IonText>
            </div>
            <div>
              <IonText>{selectedAddress?.state},</IonText>
              <IonText>{selectedAddress?.pincode}</IonText>
            </div>
          </div>
        </IonCardContent>
        {/* <IonModal isOpen={showModal}>
        <IonCard>
          <IonCardHeader>
        <IonRow className='align-items-center'>
          <IonCol className='align-items-center' size="7">
           <h5>Select Address</h5>
          </IonCol>
          <IonCol className='align-items-center' size="5">
          <a onClick={() => setShowModal(true)}> 
            Add New Address
          </a>
          </IonCol>
        </IonRow>
        </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonRadioGroup value={selectedAddress?.id}>
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
          <IonButton expand="full" onClick={() => setShowModal(false)}>Close</IonButton>
        </IonCard>
      </IonModal>    */}

        <IonModal isOpen={showModal}>
          <IonItem>
          <IonItem >
              <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
              </IonItem>
            <IonItem slot="end">
            <a
                onClick={() => {
                  setModalType("add");
                  setShowModal(true);
                }}
              >
                Add New Address
              </a>
              </IonItem> 
              </IonItem>

          {modalType === "select" && (
            <UserAddressList
              savedAddresses={savedAddresses}
              onSelectAddress={handleSelectAddress}
            />
          )}
          {modalType === "add" && (
            <ReusableAddressForm onAddAddress={handleAddressChange} />
          )}
          {/* {modalType === 'update' && (
                <ReusableAddressForm
                  onUpdateAddress={(updatedAddress: Address) => {
                    // Handle updating address logic here
                    setShowModal(false);
                  }}
                />
              )} */}
              <div>
          
          </div>
        </IonModal>
        
      </IonCard>
    </div>
  );
};

export default DeliveryAddressComponent;
