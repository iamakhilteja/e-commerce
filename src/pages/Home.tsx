import React, { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonText,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonList,
  IonModal,
  IonSearchbar,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import "./Tab1.css";
import cities from "../data/citiesdata";
import {
  arrowBackOutline,
  arrowDown,
  arrowDownCircleOutline,
  arrowDownOutline,
  arrowDownSharp,
  chevronDownOutline,
  list,
  play,
  searchCircleOutline,
  searchOutline,
} from "ionicons/icons";
import ShoppingCartIcon from "../components/Shoppingcarticon";

interface City {
  value?: string;
  country?: string;
}

const Home: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City>({});
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<City[]>([]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearch = (e: CustomEvent) => {
    const query = e.detail.value;
    // Perform search logic here
    const results = query
      ? cities.filter((city) =>
          city.value.toLowerCase().includes(query.toLowerCase())
        )
      : [];
    setSearchText(query);
    setSearchResults(results);
  };

  const handleLocationSelect = (city: City) => {
    setSelectedCity(city);
    handleCloseModal();
  };

  const handleDone = () => {
    // Perform any additional logic when the location is updated
    setShowModal(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem
            lines="none"
            slot="end"
            className="city"
            onClick={handleOpenModal}
          >
            <IonIcon aria-hidden="true" icon={searchOutline} />
          </IonItem>
          <ShoppingCartIcon />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          <h2>
            Search Results for {selectedCity ? selectedCity.value : "Not Selected"}
          </h2>
        </div>
        
      </IonContent>
      <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Change Location</IonTitle>
            <IonButton slot="end" onClick={handleDone}>
              Done
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSearchbar
            value={searchText}
            onIonInput={handleSearch}
            placeholder="Search for a Category or Product"
          ></IonSearchbar>
          <IonList>
            {searchResults.map((result) => (
              <IonItem
                key={result.value}
                button
                onClick={() => handleLocationSelect(result)}
              >
                <IonLabel>{result.value}</IonLabel>
              </IonItem>
            ))}
          </IonList>
          <IonList>
            {cities.map((data) => (
              <IonItem
                key={data.value}
                button
                onClick={() => handleLocationSelect(data)}
              >
                <IonLabel>{data.value}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Home;
