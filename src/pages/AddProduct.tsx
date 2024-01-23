import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/react';

interface ProductData {
    category: string;
    subcategory: string;
    productName: string;
    
  
    specifications: {
      [key: string]: string;
    };
  }

const AddProductForm: React.FC = () => {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mrp, setMRP] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [specialPrice, setSpecialPrice] = useState('');
  const [specificationKeys, setSpecificationKeys] = useState<string[]>(['']);
  const [specificationValues, setSpecificationValues] = useState<string[]>(['']);

  const handleAddSpecification = () => {
    setSpecificationKeys([...specificationKeys, '']);
    setSpecificationValues([...specificationValues, '']);
  };

  const handleRemoveSpecification = (index: number) => {
    const updatedKeys = [...specificationKeys];
    const updatedValues = [...specificationValues];
    updatedKeys.splice(index, 1);
    updatedValues.splice(index, 1);
    setSpecificationKeys(updatedKeys);
    setSpecificationValues(updatedValues);
  };

  const handleSpecificationKeyChange = (index: number, value: string) => {
    const updatedKeys = [...specificationKeys];
    updatedKeys[index] = value;
    setSpecificationKeys(updatedKeys);
  };

  const handleSpecificationValueChange = (index: number, value: string) => {
    const updatedValues = [...specificationValues];
    updatedValues[index] = value;
    setSpecificationValues(updatedValues);
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., send data to API
    const productData = {
      category,
      subcategory,
      productName,
      productDescription,
      size,
      quantity,
      mrp,
      sellingPrice,
      specialPrice,
      // specifications: specificationKeys.reduce((obj, key, index) => {
      //   obj[key] = specificationValues[index];
      //   return obj;
      // }, {}),
    };
    console.log(productData);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Product</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Category</IonLabel>
            <IonInput value={category} onIonChange={(e) => setCategory(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel>Subcategory</IonLabel>
            <IonInput value={subcategory} onIonChange={(e) => setSubcategory(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel>Product Name</IonLabel>
            <IonInput value={productName} onIonChange={(e) => setProductName(e.detail.value!)} />
          </IonItem>
          {/* ... Repeat for other fields ... */}
          
          {/* Specification keys and values */}
          {specificationKeys.map((key, index) => (
            <IonItem key={index}>
              <IonLabel>Specification</IonLabel>
              <IonInput value={key} onIonChange={(e) => handleSpecificationKeyChange(index, e.detail.value!)} />
              <IonLabel>Value</IonLabel>
              <IonInput value={specificationValues[index]} onIonChange={(e) => handleSpecificationValueChange(index, e.detail.value!)} />
              <IonButton onClick={() => handleRemoveSpecification(index)} color="danger">Remove</IonButton>
            </IonItem>
          ))}
          <IonButton onClick={handleAddSpecification}>Add Specification</IonButton>
          
          <IonButton onClick={handleSubmit}>Submit</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddProductForm;
