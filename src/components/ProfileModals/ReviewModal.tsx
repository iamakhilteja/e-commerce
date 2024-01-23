import React from 'react';
import { IonModal, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: string[];
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose, reviews }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} trigger="open-modal" initialBreakpoint={0.90} breakpoints={[0, 0.5, 0.90]}>
      <IonContent className='ion-padding'>
        <h2>Reviews</h2>
        <IonList>
          {reviews.map((review, index) => (
            <IonItem key={index}>
              <IonLabel>{review}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default ReviewsModal;
