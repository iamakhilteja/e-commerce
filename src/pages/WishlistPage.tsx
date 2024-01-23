// src/pages/WishlistPage.tsx
import React, { useState, useEffect } from 'react';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { getProductDetailsById } from '../data/api'; // Import your API function to fetch product details
import AddToCartButton from '../components/Addtocart';
import { useHistory } from 'react-router';
import './WishlistPage.css';
import { arrowBackOutline } from 'ionicons/icons';


interface ProductDetails {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  // Other properties
}
const WishlistPage: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<number[]>([]);
  const [productDetailsList, setProductDetailsList] = useState<ProductDetails[]>([]);
  const history = useHistory();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(storedWishlist);

    const fetchProductDetails = async () => {
      const details = await Promise.all(
        storedWishlist.map(async (productId: number) => {
          const productDetail = await getProductDetailsById(productId);
          return productDetail;
        })
      );
      setProductDetailsList(details);
    };

    fetchProductDetails();
  }, []);

  const handleProduct = (productId: number) => {
    history.push(`/products/${productId}`);
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton icon={arrowBackOutline}></IonBackButton>
        </IonButtons>
          <IonTitle>Wishlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {wishlistItems.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
            <IonRow>
            {productDetailsList.map((productDetails, index) => (
               <IonCol key={wishlistItems[index]} className="wish-sec" size='6' sizeMd='4' sizeLg='2' >
            <IonCard className='wish-card'>
            <IonCardHeader className='wish-imgbox' key={productDetails.id} onClick={() => handleProduct(productDetails.id)}>
              <IonImg className="wish-img" src={productDetails.image}  />
            </IonCardHeader>
            <IonCardContent className='wish-cont'>
                <div className='wish-title'>
                <IonLabel>{productDetails.title}</IonLabel>
                </div>
               <div className='wish-price'>
                <IonCardTitle>Rs. {productDetails.price}</IonCardTitle>
                </div> 
                <div className='wishbtn-box'>
                <AddToCartButton productId={productDetails.id} Page = "list" />  
                </div>
            </IonCardContent>
            </IonCard>
            </IonCol>  
           
            ))}
             </IonRow>
        )}
      </IonContent>
    </IonPage>
  );
};

export default WishlistPage;


