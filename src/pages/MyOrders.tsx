import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonImg,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import ComHeader from "../components/Toolbar"; // Assuming you have a Toolbar component
import { useHistory } from "react-router-dom";
import axios from "axios";
import { star, starHalf, starOutline } from "ionicons/icons";
import './MyOrders.css'

interface Order {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
  rating: { rate: number };
}

const MyOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const history = useHistory();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products"); // Replace with your API endpoint
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleOrderDetailsClick = (orderId: number) => {
    // Redirect to Order Details page with orderId as a parameter
    history.push(`/my-orders/${orderId}`);
  };

  return (
    <IonPage className="My-orders">
      <IonHeader>
        <ComHeader />
      </IonHeader>
      <IonContent>
        <IonItem>
          <h3>My Orders</h3>
        </IonItem>
        {orders.length === 0 ? (
          <p>No orders to show.</p>
        ) : (
          orders.map((order) => (
            <IonCard
              key={order.id}
              onClick={() => handleOrderDetailsClick(order.id)}
            >
              <IonCardContent>
                <IonRow>
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
                          ) 
                          : index + 1 >= order.rating.rate && index <= 5 ? (
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
                          )  :null}
                        </span>
                      ))}
                      {order.rating.rate}
                    </div>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default MyOrdersPage;
