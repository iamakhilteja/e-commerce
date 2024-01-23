// src/pages/ProductDescriptionPage.tsx
import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonBackButton,
  IonButtons,
  IonInput,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { useParams } from "react-router";
import axios from "axios";
import {
  arrowBackOutline,
  caretBack,
  star,
  starHalf,
  starOutline,
} from "ionicons/icons";
import ShoppingCartIcon from "./Shoppingcarticon";
import AddToCartButton from "./Addtocart";
import ComHeader from "./Toolbar";
import BuyNowButton from "./BuynowButton";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { RootState } from "../store/store";
import { addToCart, updateCartItem } from "../store/reducers/cartSlice"; // Import addToCart action
import './Description.css'
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import DeliveryAddressComponent from "./AddressList";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  rating: { rate: number };
  // Add other properties specific to a product
}

interface ProductSpecification {
  key: string;
  value: string | number;
}

interface ProductSpecificationsProps {
  specifications: ProductSpecification[];
}

const productSpecifications = [
  { key: 'Color', value: 'Black' },
  { key: 'Size', value: 'Medium' },
  { key: 'Material', value: 'Cotton' },
  { key: 'Weight', value: '250 grams' },
  { key: 'Dimensions', value: '10" x 12"' },
  { key: 'Brand', value: 'Example Brand' },
  { key: 'Country of Origin', value: 'United States' },
  { key: 'Warranty', value: '1 year' },
];

const ProductDescriptionPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Initialize with 1
  const history = useHistory();
  const dispatch = useDispatch(); // Get the dispatch function

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find(
    (item: any) => item.productId === Number(productId)
  );

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Parse the input value to a number

  const handleSingleCheckout = () => {
    // Dispatch addToCart action to add the product to cart with specified quantity
    history.push(`/product/checkout/${productId}`);
  };

  if (!product) {
    return (
      <IonPage>
        <IonContent>
          <p>...Loading</p>
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
        <IonItem className="desc-img-box"
        >
           <LazyLoadImage
                    src={product.image}
                    alt={product.title}
                    effect="blur" // Add a blur effect while loading
                    visibleByDefault // Make the image initially visible
                    className="desc-img"
                  />
        </IonItem>

        <IonCard>
          <IonCardContent>
              
            <h2>{product.title}</h2>

            <span>
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>
                  {index + 1 <= Math.floor(product.rating.rate) ? (
                    <IonIcon
                      icon={star}
                      style={{
                        color:
                          product.rating.rate < 4
                            ? product.rating.rate < 3
                              ? "red"
                              : "yellow"
                            : "green",
                      }}
                    />
                  ) : index + 0.5 <= product.rating.rate ? (
                    <IonIcon
                      icon={starHalf}
                      style={{
                        color:
                          product.rating.rate < 4
                            ? product.rating.rate < 3
                              ? "red"
                              : "yellow"
                            : "green",
                      }}
                    />
                  ) : index + 1 >= product.rating.rate && index <= 5 ? (
                    <IonIcon
                      icon={starOutline}
                      style={{
                        color:
                          product.rating.rate < 4
                            ? product.rating.rate < 3
                              ? "red"
                              : "yellow"
                            : "green",
                      }}
                    />
                  ) : null}
                </span>
              ))}
              {product.rating.rate}
            </span>
            <h1>Rs. {product.price}</h1>
          </IonCardContent>
        </IonCard>

          <DeliveryAddressComponent />
          
          <IonItem>
          <h3>Product Specifications</h3>
          </IonItem>
          <IonCard>
            <IonCardHeader>
            </IonCardHeader>
            <IonCardContent>
            {productSpecifications.map((spec:ProductSpecification, index:any) => (
            <IonRow key={index}>
              <IonCol size="6">{spec.key}</IonCol>
              <IonCol size="6">{spec.value}</IonCol>
            </IonRow>
          ))}
            </IonCardContent>
          </IonCard>
          
      </IonContent>
      <div className="fx-bottom">
        <IonRow >
            <IonCol className="fx-col" size="6" sizeLg="12">
            <AddToCartButton productId={product.id} Page="list" />
            </IonCol>
            <IonCol className="fx-col" size="6" sizeLg="12">
            <BuyNowButton onClick={handleSingleCheckout} />
            </IonCol>
          </IonRow>
          </div>

    </IonPage>
  );
};

export default ProductDescriptionPage;
