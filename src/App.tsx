import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import MainTabs from './pages/MainTabs';
import ProductsListPage from './components/ListingCard';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/customnavbar.css';
import Details from './pages/Details';
import CartPage from './components/Shoppingcart';
import ProductDescriptionPage from './components/Description';
import ListingPage from './components/ListingCard';
import store from './store/store';
import { Provider } from 'react-redux';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './components/Checkoutpage';
import OrderDetails from './pages/MyOrderDetail';
import CartCheckout from './components/CartCheckout';
import AddProductForm from './pages/AddProduct';
import CarWashHome from './pages/CarWashHome';

setupIonicReact();

const App: React.FC = () => (
  <Provider store={store}>
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/">
          <CarWashHome />
        </Route>
        <Route path="/tabs">
          <MainTabs />
        </Route>
        <Route path="/details/:id" exact component={Details}/>
        {/* <Redirect exact path="/" to="/tabs/tab1" /> */}
        <Route path="/list/:category/:subcategoryName" exact component={ListingPage}/>
        <Route path="/products/:productId" component={ProductDescriptionPage}/> 
        <Route path="/cart">
          <CartPage />
        </Route>
        <Route path="/wishlist" component={WishlistPage} exact />
        <Route path="/product/checkout/:productId" component={CheckoutPage} exact />
        <Route path="/my-orders/:productId" component={OrderDetails} exact />
        <Route path="/cartcheckout" component={CartCheckout} exact />
        <Route path="/AddProduct" component={AddProductForm} />
      
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  </Provider>
);

export default App;
