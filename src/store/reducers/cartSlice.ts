// src/store/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface CartItem {
  productId: number;
  count: number;
}

interface ProductDetails {
  image: string;
  title: string;
  price: number;
}

interface CartState {
  items: CartItem[];
}

const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : [];
};

const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { productId } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.count++;
      } else {
        state.items.push(action.payload);
      }
      saveCartToLocalStorage(state.items);
    },
    minusToCart: (state, action: PayloadAction<CartItem>) => {
      const { productId } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);
      if (existingItem) { 
        existingItem.count--;
      } else {
        state.items.push(action.payload);
      }
      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      saveCartToLocalStorage(state.items);
    },
    updateCartItem: (state, action: PayloadAction<CartItem>) => {
      const { productId, count } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      if (item) {
        item.count = count;
      }
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addToCart,minusToCart, removeFromCart, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
