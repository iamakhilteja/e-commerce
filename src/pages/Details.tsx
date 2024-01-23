import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Details.css';
import { RouteComponentProps, useParams } from 'react-router';
import Description from '../components/Description';
import { chevronBackOutline } from 'ionicons/icons';
import { ListingInterface } from '../data/listingModel';
import { RootState } from '../store/store';


interface RouteParams {
  id: string;
}

const Details: React.FC<RouteComponentProps> = () => {
  const { id } = useParams<RouteParams>();
  // const { data , loading, error } = useFetch('https://mocki.io/v1/efd216d3-d8eb-4bc4-9d53-6cb8a054d20d');
  // const result = data.filter((eve: ListingInterface) => eve.postid === Number(id));
  // const postData = useSelector((state: RootState) =>
  //   getSelectedPost(state, Number(id))
  // );


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBackOutline}></IonBackButton>
          </IonButtons>
          {/* <IonTitle>{postData?.post_title}</IonTitle> */}
        </IonToolbar>
      </IonHeader>
        
    </IonPage>
  );
};

export default Details;