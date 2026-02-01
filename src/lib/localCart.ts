import { Product, CartItem } from './supabase';

const LOCAL_CART_KEY = 'urban_cart_local_items';

export const getLocalCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(LOCAL_CART_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addToLocalCart = (product: Product) => {
  const cart = getLocalCart();
  const existingItem = cart.find(item => item.product_id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: `local-${Date.now()}`,
      product_id: product.id,
      quantity: 1,
      user_id: 'guest',
      products: product // Store full product data for display
    });
  }

  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
};

export const updateLocalCartQuantity = (itemId: string, quantity: number) => {
  const cart = getLocalCart();
  const itemIndex = cart.findIndex(item => item.id === itemId);

  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
  }
};

export const removeFromLocalCart = (itemId: string) => {
  const cart = getLocalCart();
  const newCart = cart.filter(item => item.id !== itemId);
  localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(newCart));
};
