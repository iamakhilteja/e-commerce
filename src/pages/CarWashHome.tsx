import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonDatetime,
  IonLabel,
  IonList,
  IonItem,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCard,
} from '@ionic/react';
import DateCard from '../components/DateCard';
import './CarWashHome.css'

const CarWashHome: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | string[]>('');
  const [totalCost, setTotalCost] = useState<number>(0);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
const [services, setServices] = useState<string[]>([]);
const [selectedService, setSelectedService] = useState<string>('');
const startDate = new Date(); // Current date
const endDate = new Date();
endDate.setDate(startDate.getDate() + 24); // One week from now

const dateArray: Date[] = [];
const currentDate = new Date(startDate);

while (currentDate <= endDate) {
  dateArray.push(new Date(currentDate));
  currentDate.setDate(currentDate.getDate() + 1);
}

  useEffect(() => {
    // Fetch available time slots and services based on selected date
    // This is a placeholder, you should implement your logic here
    const fetchTimeSlotsAndServices = () => {
      // Simulate fetching time slots and services
      setTimeSlots(['10:00 AM', '12:00 PM', '02:00 PM']);
      setServices(['Basic Car Wash', 'Advanced Car Wash']);
    };

    if (selectedDate) {
      fetchTimeSlotsAndServices();
    }
  }, [selectedDate]);

  useEffect(() => {
    // Calculate total cost based on selected service
    // This is a placeholder, you should implement your logic here
    const calculateTotalCost = () => {
      // Simulate calculating total cost
      setTotalCost(selectedService === 'Basic Car Wash' ? 10 : 20);
    };

    if (selectedService) {
      calculateTotalCost();
    }
  }, [selectedService]);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <IonItem>
              <IonLabel>Current Location:</IonLabel>
              </IonItem>
          </IonRow>
          <IonRow className='ion-no-padding'>
                <div className='Date-Cards'>
          {dateArray.map((date, index) => (
            <IonCol className='ion-no-padding' key={index}>
              <DateCard date={date} /> 
            </IonCol>
          ))}
           </div>
        </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRow>
          <IonCol>
            <IonLabel>Select Date:</IonLabel>
            <IonDatetime
              value={selectedDate}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            ></IonDatetime>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonLabel>Select Time Slot:</IonLabel>
            <IonSelect
              value={selectedTimeSlot}
              placeholder="Select Time Slot"
              onIonChange={(e) => setSelectedTimeSlot(e.detail.value)}
            >
              {timeSlots.map((slot) => (
                <IonSelectOption key={slot} value={slot}>
                  {slot}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonLabel>Select Service:</IonLabel>
            <IonSelect
              value={selectedService}
              placeholder="Select Service"
              onIonChange={(e) => setSelectedService(e.detail.value)}
            >
              {services.map((service) => (
                <IonSelectOption key={service} value={service}>
                  {service}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonLabel>Total Cost: ${totalCost}</IonLabel>
          </IonCol>
        </IonRow>
        <IonButton expand="full" onClick={() => alert('Payment logic goes here')}>
          Make Payment
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CarWashHome;
