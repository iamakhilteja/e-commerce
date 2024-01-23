// src/App.tsx
import React, { useState } from 'react';
import { IonApp, IonContent, IonGrid, IonRow, IonCol, IonList, IonItem, IonCard, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonRouterOutlet, IonPage } from '@ionic/react';
import CategoriesSidebar from '../components/CategoriesSidebar';
import SubcategoriesPage from '../components/SubcategoriesPage';


const Categories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Add type annotation for selectedCategory

  const categories: string[] = ['Electronics', 'Fashion', 'Books']; // Add type annotation for categories
  const subcategories:{ [key: string]: { name: string; iconUrl: string }[] } = {
    Electronics: [
      { name: 'Smartphones', iconUrl: 'https://example.com/icons/smartphones.png' },
      { name: 'Laptops', iconUrl: 'https://example.com/icons/laptops.png' },
      { name: 'Cameras', iconUrl: 'https://example.com/icons/cameras.png' },
    ],
    Fashion: [
      { name: 'Men', iconUrl: 'https://img.freepik.com/free-photo/portrait-handsome-smiling-stylish-young-man_158538-19393.jpg?w=740&t=st=1691144268~exp=1691144868~hmac=1c716b18941c29a6aa1b623f6c45c3e42f9559ea5e5b64ce760766e448fa349f' },
      { name: 'Women', iconUrl: 'https://img.freepik.com/free-photo/portrait-pretty-brunette-woman-with-long-hair-bright-make-up-stylish-cozy-sweater-scarf-playful-mood-gray-wall-toned-colors_291049-1233.jpg?w=360&t=st=1691144118~exp=1691144718~hmac=cd3766812b31e9b22aee7dbfaa69eb17171fcb88839374b722dd68dec47b3ff2' },
      { name: 'Kids', iconUrl: 'https://example.com/icons/kids.png' },
    ],
    Books: [
      { name: 'Fiction', iconUrl: 'https://example.com/icons/fiction.png' },
      { name: 'Non-Fiction', iconUrl: 'https://example.com/icons/non-fiction.png' },
    ],
  }; // Add type annotation for subcategories

  const handleCategorySelected = (category: string) => {
    setSelectedCategory(category);
  };

  return (
       <IonPage>
        <IonGrid fixed={true}>
          <IonRow>
            <IonCol size="4">
              <CategoriesSidebar categories={categories} onCategorySelected={handleCategorySelected} />
            </IonCol>
            <IonCol size="8">
                
                  {selectedCategory ? (
      
                        <SubcategoriesPage category={selectedCategory} subcategories={subcategories[selectedCategory]} />
                                 
                  ) : (
                    <IonList>
                      <IonItem>Choose a category from the sidebar</IonItem>
                    </IonList>
                  )}
               
            </IonCol>
          </IonRow>
        </IonGrid>
        </IonPage>
  );
};

export default Categories;
