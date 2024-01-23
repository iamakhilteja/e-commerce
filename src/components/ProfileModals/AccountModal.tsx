import React, { useRef, useState } from "react";
import {
  IonModal,
  IonButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonPage,
} from "@ionic/react";
import { caretBack } from "ionicons/icons";

interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail: string;
  initialUsername: string;
  initialMobileNumber: string;
}



const AccountDetailsModal: React.FC<AccountDetailsModalProps> = ({
  isOpen,
  onClose,
  initialEmail,
  initialUsername,
  initialMobileNumber,
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [username, setUsername] = useState(initialUsername);
  const [mobileNumber, setMobileNumber] = useState(initialMobileNumber);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  

  const handleSaveChanges = () => {
    // Perform save changes logic here
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Mobile Number:", mobileNumber);
    console.log("Password:", password);

    onClose(); // Close the modal after saving changes
  };

  const isPasswordValid = () => {
    // Password must be at least 8 characters long and have at least one uppercase, lowercase, and special character
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const isConfirmPasswordValid = () => {
    return password === confirmPassword;
  };

  const isEmailValid = () => {
    // Email validation using regex pattern
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    if (!isPasswordValid()) {
      setPasswordError(
        "Password must be at least 8 characters long and have letters and numbers"
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isConfirmPasswordValid()) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!isEmailValid()) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const handleSaveChangesClicked = () => {
    if (validateForm()) {
      handleSaveChanges();
    }
  };
  
  const modal = useRef<HTMLIonModalElement>(null);
  
  return (
    <IonModal ref={modal} isOpen={isOpen} onDidDismiss={onClose} trigger="open-modal" initialBreakpoint={0.90} breakpoints={[0, 0.5, 0.75]}>
        <IonHeader>
          <IonToolbar>
            <IonLabel className="ion-padding">Edit Profile Information</IonLabel>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>
                    <IonInput
                      label="Name"
                      labelPlacement="stacked"
                      value={username}
                    ></IonInput>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <IonInput
                      disabled
                      label="Mobile"
                      labelPlacement="stacked"
                      value={mobileNumber}
                    ></IonInput>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <IonInput
                      label="Email"
                      labelPlacement="stacked"
                      value={email}
                      onIonChange={(e) => setEmail(e.detail.value!)}
                    ></IonInput>
                    {emailError && (
                      <IonText color="danger">{emailError}</IonText>
                    )}
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <IonInput
                      label="Password"
                      labelPlacement="stacked"
                      type="password"
                      value={password}
                      onIonChange={(e) => setPassword(e.detail.value!)}
                    ></IonInput>
                    {passwordError && (
                      <IonText color="danger">{passwordError}</IonText>
                    )}
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <IonInput
                      label="Confirm Password"
                      labelPlacement="stacked"
                      type="password"
                      value={confirmPassword}
                      onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                    ></IonInput>
                    {confirmPasswordError && (
                      <IonText color="danger">{confirmPasswordError}</IonText>
                    )}
                  </IonLabel>
                </IonItem>
                <div className="ion-padding">
                  <IonButton expand="full" onClick={handleSaveChangesClicked}>
                    Save Changes
                  </IonButton>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
    </IonModal>
  );
};

export default AccountDetailsModal;
