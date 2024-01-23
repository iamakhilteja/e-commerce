import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailed } from '../store/reducers/userSlice'; // Import the login action
import axios from 'axios';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton, IonAlert, IonLoading, IonText, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { Redirect, Router, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const { isAuthenticated, userId, token, loginResponse } = useSelector((state: RootState) => state.user)
  const history = useHistory();

  
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setShowLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        mobile,
        password,
      });
     
      if (response.data && response.data.user) {
          
        const userData = {
          userId: response.data.user.userid,
          role: response.data.user.role,
          firstName: response.data.user.firstname,
          lastName: response.data.user.lastname,
          mobile: response.data.user.mobile,
          email: response.data.user.email,
          password: response.data.user.password,
          token: response.data.token,
          loginResponse: response.data.message,
        };
  
       console.log(userData)
  
        if(userData.loginResponse == "Login successful" && userData.role.toLowerCase() == "employee")
      {
       dispatch(loginSuccess(userData));
       setShowLoading(false);
       history.push(`/tabs/tab1`)
       
    }
  
    if(userData.loginResponse == "Login successful" && userData.role.toLowerCase() == "employer")
    {
     dispatch(loginSuccess(userData));
     setShowLoading(false);
     history.push(`/tabs/tab1`)
     
  }
      }
    } 

    catch (error) {
      setShowLoading(false);
      console.log("wrong password")
      console.error('Login failed:', error);
    }
  }

  return (

    <IonPage>
      <IonContent className="ion-padding">
        <form onSubmit={handleLogin}>
          <IonItem className="input-item">
            <IonLabel position="floating" className="input-label">Mobile Number</IonLabel>
            <IonInput
              type='number'
              value={mobile}
              onIonChange={(e) => setMobile(e.detail.value!)}
              className="input-field"
            />
          </IonItem>

          <IonItem className="input-item">
            <IonLabel position="floating" className="input-label">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              className="input-field"
            />
          </IonItem>

          <IonButton expand="full" type="submit" className="login-button" onClick={handleLogin}>Login</IonButton>
        </form>
        {/* <IonLoading isOpen={showLoading} message="Logging in..."/> */}
          
      </IonContent>
    </IonPage>
  );
};

export default Login;