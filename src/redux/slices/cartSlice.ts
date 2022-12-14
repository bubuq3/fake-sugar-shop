import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import toast from 'react-hot-toast';

interface ICartState {
  title: string;
  brand: string;
  price: number;
  coverImage: string;
  id: string;
  slug: string;
  stock: number;
  isOnDiscount: boolean;
  discountValue: number;
  quantity: number;
}

interface ICartStateData {
  cart: ICartState[];
}

const initialState: ICartStateData = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      ); // if the item in cart is the same
      const item = action.payload;
      if (itemInCart) {
        if (itemInCart.quantity >= itemInCart.stock) {
          toast.error(
            `Nie można dodać produktu. Nie ma wystarczającej ilości ${item.title} na stanie magazynu.`,
            { duration: 5000 }
          );
          itemInCart.stock;
        } else {
          itemInCart.quantity++;
          toast.success(`Dodano ${item.title} do koszyka`);
        }
      } else if (item.stock === 0) {
        toast.error(
          `Nie można dodać produktu. Nie ma wystarczającej ilości ${item.title} na stanie magazynu.`,
          { duration: 5000 }
        );
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        toast.success(`Dodano ${item.title} do koszyka`);
      }
    },
    incrementQuantity: (state, action) => {
      const item = action.payload;
      const findItem = state.cart.find((i) => i.id === item.id);

      if (findItem.quantity >= findItem.stock) {
        findItem.quantity = findItem.stock;
      } else {
        findItem.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const itemData = action.payload;
      const removeItem = state.cart.filter((item) => item.id !== itemData.id);
      state.cart = removeItem;
      toast.error(`Usunieto ${itemData.title} z koszyka`);
    },
    clearCart: (state) => {
      return { ...state, cart: [] };
    },
  },
});

// action creators are genereated for each case reducer function
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

// selector
export const selectAllDataFromStore = (state: RootState) => state.cart.cart;

// gotta export out created slice
export default cartSlice.reducer;
