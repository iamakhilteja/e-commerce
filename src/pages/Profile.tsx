import { IonButton, IonContent, IonHeader, IonLoading, IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import {logout} from '../store/reducers/userSlice'
import { Redirect, useHistory } from 'react-router';
import ComHeader from '../components/Toolbar';
import axios from 'axios';

// interface Pprop {
//   name: any;
// } 

const Profile: React.FC = () => {
  const { isAuthenticated, userId, token, loginResponse, role } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch();
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);

  
     const fetchProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
         
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
          console.log(userData);
        } catch (error) {
          console.log("wrong password");
          console.error('Fetching profile failed:', error);
        }
      }
 
  
  const logoutHandler = () => {
    setShowLoading(true)
      dispatch(logout());
      history.push('/');
  }

  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent>
    {isAuthenticated === true ? (
    <div className="container">
      <IonLoading isOpen={showLoading} message="Loading Profile..."/>
      <p>Authentication={ isAuthenticated}</p>
      <p>{userId}</p>
      <p>{token}</p>
      <p>{loginResponse}</p>
      <p>{role}</p>
      <IonButton onClick={fetchProfile} color='primary' >Logout</IonButton>
    </div>) : 
    (
    <div>
      <a onClick={logoutHandler}>Go to Login Page</a>
      </div>
      )}
      </IonContent>
      </IonPage>
  );
};

export default Profile;
