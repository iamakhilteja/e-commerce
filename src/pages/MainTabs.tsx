import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import Tab1 from "./Home";
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Categories from "./Categories";
import MyOrdersPage from "./MyOrders";
import { ellipse, home, list, personCircleOutline, search, square, triangle } from "ionicons/icons";
import ProfilePage from "./Profile";
import Home from "./Home";

const MainTabs: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/tab1" />
                <Route exact path="/tabs/tab1">
                    <Home />
                </Route>
                <Route exact path="/tabs/tab2">
                    <Categories />
                </Route>
                <Route exact path="/tabs/tab3">
                    <MyOrdersPage />
                </Route>
                <Route exact path="/tabs/tab4">
                    <ProfilePage />
                </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/tabs/tab1">
                    <IonIcon aria-hidden="true" icon={home} />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/tabs/tab2">
                    <IonIcon aria-hidden="true" icon={search} />
                    <IonLabel>Categories</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/tabs/tab3">
                    <IonIcon aria-hidden="true" icon={list} />
                    <IonLabel>My Orders</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab4" href="/tabs/tab4">
                    <IonIcon aria-hidden="true" icon={personCircleOutline} />
                    <IonLabel>Profile</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    );
};

export default MainTabs;