import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonButton,
  IonCol,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
  IonInput,
  IonText,
} from "@ionic/react";
import {
  star,
  starHalf,
  checkmarkDoneOutline,
  chevronForwardOutline,
  starOutline,
} from "ionicons/icons";
import axios from "axios";
// import './OrderDetails.css';
import { useParams } from "react-router";
import ComHeader from "../components/Toolbar";
import RatingComponent from "../components/Rating";
import { kMaxLength } from "buffer";

interface Order {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
  rating: { rate: number };
}

interface Address {
  id: number;
  name: string;
  houseNo: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}
const selectedAddress: Address = {
  id: 1,
  name: "John Doe",
  houseNo: "123",
  street: "Main St",
  city: "City",
  state: "State",
  pincode: "12345",
};

const OrderDetails: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const { productId } = useParams<{ productId: string }>();
  const [selectedRating, setSelectedRating] = useState<number>(0);


  useEffect(() => {
    fetchProductDetails(productId);
  }, []);

  useEffect(() => {
    console.log('Current Rating:', selectedRating);
  }, [selectedRating]);

  const handleRateChange = (newRating: number) => {
    setSelectedRating(newRating);
  };

  const fetchProductDetails = async (productId: string) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      setOrder(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <ComHeader />
      </IonHeader>
      <IonContent>
        {/* Product Information Card */}
        <IonItem>
        <h2>Order Details</h2>
        </IonItem>
        <IonCard>
          <IonCardContent>
            {/* <IonItem>
          <h3>My Orders</h3>
        </IonItem> */}
            {order === null ? (
              <p>No orders to show.</p>
            ) : (
              <IonRow key={order.id}>
                <IonCol
                  size="4"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "clip",
                  }}
                >
                  <IonImg
                    src={order.image}
                    alt={order.title}
                    style={{
                      maxWidth: "80px",
                      maxHeight: "80px",
                      objectFit: "contain",
                    }}
                  />
                </IonCol>
                <IonCol size="8">
                  <IonItem className="ion-no-padding">
                    <IonLabel>{order.title}</IonLabel>
                  </IonItem>
                  <p>Quantity: {order.quantity}</p>
                  <p>Price: ${order.price}</p>

                  <div>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index}>
                        {index + 1 <= Math.floor(order.rating.rate) ? (
                          <IonIcon
                            icon={star}
                            style={{
                              color:
                                order.rating.rate < 4
                                  ? order.rating.rate < 3
                                    ? "red"
                                    : "yellow"
                                  : "green",
                            }}
                          />
                        ) : index + 0.5 <= order.rating.rate ? (
                          <IonIcon
                            icon={starHalf}
                            style={{
                              color:
                                order.rating.rate < 4
                                  ? order.rating.rate < 3
                                    ? "red"
                                    : "yellow"
                                  : "green",
                            }}
                          />
                        ) : index + 1 >= order.rating.rate && index <= 5 ? (
                          <IonIcon
                            icon={starOutline}
                            style={{
                              color:
                                order.rating.rate < 4
                                  ? order.rating.rate < 3
                                    ? "red"
                                    : "yellow"
                                  : "green",
                            }}
                          />
                        ) : null}
                      </span>
                    ))}
                    {order.rating.rate}
                  </div>
                </IonCol>
              </IonRow>
            )}
          </IonCardContent>
        </IonCard>

        {/* Shipping Address Card */}
        <IonItem>
        <h2>Shipping Address</h2>
        </IonItem>
        <IonCard>
          <IonCardContent>
            <p>Name: {selectedAddress.name}</p>
            <span>House No: {selectedAddress.houseNo}</span>
            <span>Street: {selectedAddress.street}</span> <br />
            <span>City: {selectedAddress.city}</span>
            <span>State: {selectedAddress.state}</span>
            <p>Pincode: {selectedAddress.pincode}</p>
          </IonCardContent>
        </IonCard>
        
        {/* Review Card */}
        <IonItem>
        <h2>Write a Review</h2>
        </IonItem>
        <IonCard>
          <IonCardContent>
            <IonRow>
              <IonCol>
                <div>
                <IonText>
                  Rate this Product: 
                </IonText>   
                <RatingComponent onRateChange={handleRateChange} />
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonInput type="text" maxlength={100} counter={true} counterFormatter={(inputLength, maxlength) => `${maxlength-inputLength}/100 remaining`} >
               Write a detailed Review
              </IonInput>
            </IonRow>
            <IonRow>
              <IonCol>
              <IonButton color="primary">
                Submit
              </IonButton>
              </IonCol>
             
            </IonRow>
          </IonCardContent>
        </IonCard>
       
        
        {/* Order Tracking Card */}
        <IonItem>
        <h2>Order Tracking Details</h2>
        </IonItem>
        <IonCard>
          <IonCardContent>
            <IonRow>
              <IonCol>
                <p>Status: Shipped</p>
                <p>Estimated Delivery: 5 Aug </p>
                <p>Tracking Id: BXDDOSS123 </p>
              </IonCol>
              <IonCol>
                <IonButton color="primary">
                  <IonIcon icon={chevronForwardOutline} /> Track Order
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>

        {/* Payment Information Card */}
        <IonItem>
            <h2>Payment Information</h2>
            </IonItem>
        <IonCard>
          <IonCardContent>
            <IonRow>
              <IonCol>
                <span>Payment Type: Credit Card</span>
              </IonCol>
              <IonCol>
                <p>Subtotal: Rs. 600</p>
                <p>Tax: Rs. 150 </p>
                <p>Total: Rs. 750</p>
                <IonButton color="success">
                  <IonIcon icon={checkmarkDoneOutline} /> Payment Done
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default OrderDetails;
