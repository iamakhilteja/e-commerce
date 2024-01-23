import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonImg,
  IonCardTitle,
  IonCol,
  IonRow,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonBadge,
  IonGrid,
} from "@ionic/react";
import axios from "axios";
import { useHistory } from "react-router";
import { arrowBackOutline, caretBack, star } from "ionicons/icons";
import ComHeader from "./Toolbar";
import "./ListingCard.css";
import WishlistButton from "./WishlistButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: { rate: number; count: number };
  // Add other properties specific to a product
}

export interface Image {
  id: number; // Assuming you have a property like 'id' to match with products
  image: string; // Adjust this based on your actual image data structure
}

const ListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const history = useHistory();
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);
  const [page, setPage] = useState(1);
  const contentRef = useRef<HTMLIonContentElement>(null);

  useEffect(() => {
    fetchProductsWithImages();
  }, [page]);

  const fetchProductsWithImages = async () => {
    setLoadingProducts(true);
    setLoadingImages(true);

    try {
      const [productsResponse, imagesResponse] = await Promise.all([
        axios.get(`https://fakestoreapi.com/products?limit=5`),
        axios.get(`https://fakestoreapi.com/products?limit=5`), // Replace with the actual image API URL
      ]);

      const productsData = productsResponse.data;
      const imagesData = imagesResponse.data;

      setProducts(prevProducts => [...prevProducts, ...productsData]);
      setImages(prevImages => [...prevImages, ...imagesData]);

      setLoadingProducts(false);
      setLoadingImages(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoadingProducts(false);
      setLoadingImages(false);
    }
  };

  const combinedData = useMemo(() => {
    return products.map(product => {
      const image = images.find(image => image.id === product.id)?.image || '';
      return { ...product, image };
    });
  }, [products, images]);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(prevPage => prevPage + 1);
    }
  };


  const handleProductClick = useMemo(
    () => (productId: number) => {
      history.push(`/products/${productId}`);
    },
    [history]
  );

  return (
    <IonPage className="listing-card">
      <IonHeader>
        <ComHeader />
      </IonHeader>
      <IonContent className="list-cont-sec" ref={contentRef}>
        <IonGrid>
        <IonRow className="list-row">
          {combinedData.map((product) => (
            <IonCol
              key={product.id}
              className="list-sec"
              size="6"
              sizeMd="4"
              sizeLg="2"
            >
              <IonCard className="list-card"
                  onClick={() => handleProductClick(product.id)}>
                <div className="wishicon">
                  <WishlistButton productId={product.id} />
                </div>
                <IonCardHeader
                  className="list-imgbox"
                >
                  <LazyLoadImage
                    src={product.image}
                    alt={product.title}
                    effect="blur" // Add a blur effect while loading
                    visibleByDefault // Make the image initially visible
                    className="list-img"
                  />
                </IonCardHeader>
                <IonCardContent className="list-cont">
                  <div className="list-title">
                    <IonLabel>{product.title}</IonLabel>
                  </div>
                  <div className="rating-div">
                    <span>
                      <IonBadge
                        className={`${
                          product.rating.rate < 4
                            ? product.rating.rate < 3
                              ? "red-badge"
                              : "yellow-badge"
                            : "green-badge"
                        }`}
                      >
                        <IonIcon icon={star} color="white" />
                        <span>{product.rating.rate}</span>
                      </IonBadge>
                    </span>
                    <span>({product.rating.count})</span>
                  </div>
                  <div className="list-price">
                    <h2 className="price-text">Rs. {product.price} </h2>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ListingPage;
