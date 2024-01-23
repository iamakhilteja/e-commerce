// DateCard.tsx
import React from 'react';
import { IonCard, IonCardContent, IonLabel } from '@ionic/react';
import './DateCard.css';

interface DateCardProps {
  date: Date;
}

const DateCard: React.FC<DateCardProps> = ({ date }) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);

  return (
    <IonCard className='date-card'>
      <IonCardContent>
        <IonLabel>{formattedDate}</IonLabel>
      </IonCardContent>
    </IonCard>
  );
};

export default DateCard;
