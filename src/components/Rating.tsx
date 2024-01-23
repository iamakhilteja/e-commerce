// RatingComponent.tsx
import React, { useState } from 'react';
import { IonIcon, IonLabel } from '@ionic/react';
import { star, starOutline } from 'ionicons/icons';

interface RatingProps {
  initialValue?: number;
  onRateChange: (rating: number) => void;
}

const RatingComponent: React.FC<RatingProps> = ({ onRateChange }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    onRateChange(selectedRating);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <IonIcon
          key={index}
          onClick={() => handleStarClick(index)}
          icon={index <= rating ? star : starOutline}
          style={{ cursor: 'pointer', fontSize: '2rem', color: index <= rating ? 'gold' : 'gray' }}
        />
      ))}
    </div>
  );
};

export default RatingComponent;
