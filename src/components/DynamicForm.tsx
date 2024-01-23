import React, { useState } from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonRadioGroup,
  IonRadio,
  IonCheckbox,
  IonText,
  IonSearchbar,
} from "@ionic/react";

interface Field {
  type: string;
  label: string;
  value: any;
  options?: string[];
  selectoptions?: string[];
}

interface DynamicFormProps {
  fields: Field[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields }) => {
  const [formValues, setFormValues] = useState<any>({});

  const handleInputChange = (field: Field, event: CustomEvent<any>) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [field.label]: event.detail.value,
    }));
  };

  const renderFields = () => {
    return fields.map((field, index) => {
      const { type, label, value, options } = field;

      switch (type) {
        case "text":
          return (
            <IonItem key={index}>
              <IonLabel position="floating">{label}</IonLabel>
              <IonInput
                type="text"
                value={formValues[label] || ""}
                onIonChange={(e) => handleInputChange(field, e)}
              ></IonInput>
            </IonItem>
          );
        case "select":
          return (
            <IonItem key={index}>
              <IonLabel>{label}</IonLabel>
              <IonSelect
                value={formValues[label] || ""}
                onIonChange={(e) => handleInputChange(field, e)}
              >
                {options?.map((option, optionIndex) => (
                  <IonSelectOption key={optionIndex} value={option}>
                    {option}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          );
        case "radio":
          return (
            <IonRadioGroup
              key={index}
              value={formValues[label] || ""}
              onIonChange={(e) => handleInputChange(field, e)}
            >
              <IonLabel>{label}</IonLabel>
              {options?.map((option, optionIndex) => (
                <IonItem key={optionIndex}>
                  <IonLabel>{option}</IonLabel>
                  <IonRadio slot="start" value={option} />
                </IonItem>
              ))}
            </IonRadioGroup>
          );
        case "checkbox":
          return (
            <IonItem key={index}>
              <IonLabel>{label}</IonLabel>
              <IonCheckbox
                slot="start"
                value={label}
                checked={formValues[label] || false}
                onIonChange={(e) => handleInputChange(field, e)}
              />
            </IonItem>
          );
        // Add other cases for additional input types as needed
        case 'multiselect':
            return (
              <IonItem key={index}>
                <IonLabel>{label}</IonLabel>
                <IonSelect multiple value={formValues[label] || []} onIonChange={(e) => handleInputChange(field, e)}>
                  {options?.map((option, optionIndex) => (
                    <IonSelectOption key={optionIndex} value={option}>
                      {option}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            );
          
            case 'searchmultiselect':
                return (
                  <IonItem key={index}>
                    <IonLabel>{label}</IonLabel>
                    <IonSearchbar
                      placeholder="Search"
                      value={formValues[label] || ''}
                      onIonChange={(e) => handleInputChange(field, e)}
                    ></IonSearchbar>
                    <IonItem>
                      <IonLabel>Selected Items:</IonLabel>
                      <IonSelect multiple value={formValues[label] || []} onIonChange={(e) => handleInputChange(field, e)}>
                        {options?.map((option, optionIndex) => (
                          <IonSelectOption key={optionIndex} value={option}>
                            {option}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </IonItem>
                  </IonItem>
                );
        default:
          return null;
      }
    });
  };

  return <div>{renderFields()}</div>;
};

export default DynamicForm;
