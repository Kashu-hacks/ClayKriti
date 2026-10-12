import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CustomerDetails } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, customizationText?: string) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  updateCustomization: (index: number, note: string) => void;
  clearCart: () => void;
  totalItems: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  customerDetails: CustomerDetails;
  updateCustomerDetails: (details: Partial<CustomerDetails>) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CART_STORAGE_KEY = 'claykriti_cart_v1';

const defaultCustomer: CustomerDetails = {
  fullName: '',
  phoneNumber: '',
  addressLine: '',
  city: '',
  state: '',
  pincode: '',
  deliveryNotes: '',
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(defaultCustomer);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const addItem = (product: Product, quantity = 1, customizationText = '') => {
    setItems((prevItems) => {
      // Check if same product with identical customization exists
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          (item.customizationText || '').trim() === customizationText.trim()
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { product, quantity, customizationText: customizationText.trim() }];
      }
    });

    showToast(`Added "${product.name}" to cart ✨`);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(index);
      return;
    }
    setItems((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], quantity };
      }
      return updated;
    });
  };

  const updateCustomization = (index: number, note: string) => {
    setItems((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = { ...updated[index], customizationText: note };
      }
      return updated;
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const updateCustomerDetails = (details: Partial<CustomerDetails>) => {
    setCustomerDetails((prev) => ({ ...prev, ...details }));
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateCustomization,
        clearCart,
        totalItems,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        customerDetails,
        updateCustomerDetails,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
