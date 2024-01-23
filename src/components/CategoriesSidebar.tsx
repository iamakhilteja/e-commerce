// src/components/CategoriesSidebar.tsx
import React from 'react';
import { IonContent, IonList, IonItem, IonApp, IonTitle, IonToolbar, IonPage, IonGrid } from '@ionic/react';

interface CategoriesSidebarProps {
  categories: string[];
  onCategorySelected: (category: string) => void;
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({ categories, onCategorySelected }) => {
  return (
    <>
      <IonToolbar>
        <IonItem>
          Category List
        </IonItem>
        </IonToolbar>
      <IonList>
        {categories.map((category) => (
          <IonItem key={category} onClick={() => onCategorySelected(category)}>
            {category}
          </IonItem>
        ))}
      </IonList>

      </>
     
  );
};

export default CategoriesSidebar;
