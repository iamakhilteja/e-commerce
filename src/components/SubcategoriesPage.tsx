// src/components/SubcategoriesPage.tsx
import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonCardSubtitle,
  IonAvatar,
  IonImg,
} from "@ionic/react";

import './Subcategories.css';
import { Link } from "react-router-dom";

interface SubcategoriesPageProps {
  category: string;
  subcategories: { name: string; iconUrl: string }[];
}

const SubcategoriesPage: React.FC<SubcategoriesPageProps> = ({
  category,
  subcategories,
}) => {
  return (
    <>
      <IonToolbar>
        <IonItem>{category}</IonItem>
      </IonToolbar>
      <IonGrid>
        <IonRow className="rw">
          {subcategories.map((subcategory) => (
            <Link key={subcategory.name} to={`/list/${category}/${subcategory.name}`}>
            <IonCol className="cat-page" key={subcategory.name} size="6" size-md="4" size-lg="2" >
                      <div className="outline">
                      <div className="scimg">
                      <IonAvatar>
                      <IonImg  src={subcategory.iconUrl} alt={subcategory.name} />
                     </IonAvatar>
                      </div>
                      <div className="ca-text">
                      <IonCardSubtitle>{subcategory.name}</IonCardSubtitle>
                      </div>
                      </div>
            </IonCol>
            </Link>
          ))}
          
        </IonRow>
      </IonGrid>
    </>
  );
};

export default SubcategoriesPage;
