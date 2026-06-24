import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { PIZZA_MENU } from '../data/menu';

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
}

interface PizzaContextType {
  appliedIngredients: string[];
  matchedPizza: string | null;
  isCustom: boolean;
  basePrice: number;
  extrasPrice: number;
  totalPrice: number;
  orderDispatched: boolean;
  customerDetails: CustomerDetails;
  showSuccess: boolean;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  resetPizza: () => void;
  setCustomerDetails: (details: CustomerDetails) => void;
  placeOrder: () => void;
  getHint: () => string;
}

const PizzaContext = createContext<PizzaContextType | null>(null);

export const usePizzaContext = () => {
  const context = useContext(PizzaContext);
  if (!context) {
    throw new Error('usePizzaContext must be used within a PizzaProvider');
  }
  return context;
};

export const PizzaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appliedIngredients, setAppliedIngredients] = useState<string[]>([]);
  const [orderDispatched, setOrderDispatched] = useState(false);
  const [customerDetails, setCustomerDetailsState] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const matchedPizza = useMemo(() => {
    return PIZZA_MENU.find(p => 
      p.ingredients.length === appliedIngredients.length &&
      p.ingredients.every(ing => appliedIngredients.includes(ing))
    )?.name || null;
  }, [appliedIngredients]);

  const isCustom = !matchedPizza && appliedIngredients.length > 0;

  const basePrice = useMemo(() => {
    if (matchedPizza) {
      const pizza = PIZZA_MENU.find(p => p.name === matchedPizza);
      return pizza?.price || 0;
    }
    return appliedIngredients.length > 0 ? 12.00 : 0;
  }, [matchedPizza, appliedIngredients.length]);

  const extrasPrice = useMemo(() => {
    if (matchedPizza) return 0;
    return appliedIngredients.length * 1.50;
  }, [matchedPizza, appliedIngredients.length]);

  const totalPrice = basePrice + extrasPrice;

  const addIngredient = useCallback((ingredient: string) => {
    setAppliedIngredients(prev => {
      if (prev.includes(ingredient)) return prev;
      return [...prev, ingredient];
    });
    setOrderDispatched(false);
  }, []);

  const removeIngredient = useCallback((ingredient: string) => {
    setAppliedIngredients(prev => prev.filter(i => i !== ingredient));
    setOrderDispatched(false);
  }, []);

  const resetPizza = useCallback(() => {
    setAppliedIngredients([]);
    setOrderDispatched(false);
    setShowSuccess(false);
  }, []);

  const setCustomerDetails = useCallback((details: CustomerDetails) => {
    setCustomerDetailsState(details);
  }, []);

  const placeOrder = useCallback(() => {
    if (appliedIngredients.length === 0) return;
    setOrderDispatched(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, [appliedIngredients.length]);

  const getHint = useCallback(() => {
    if (appliedIngredients.length === 0) return 'Start by selecting a pizza from the menu or adding ingredients!';
    if (matchedPizza) return `Perfect! You've made a ${matchedPizza}. Add extras or place your order!`;
    if (appliedIngredients.length < 3) return 'Add more ingredients to match a menu pizza or create your own!';
    return 'Keep adding ingredients or click Checkout when ready!';
  }, [appliedIngredients, matchedPizza]);

  const value: PizzaContextType = {
    appliedIngredients,
    matchedPizza,
    isCustom,
    basePrice,
    extrasPrice,
    totalPrice,
    orderDispatched,
    customerDetails,
    showSuccess,
    addIngredient,
    removeIngredient,
    resetPizza,
    setCustomerDetails,
    placeOrder,
    getHint,
  };

  return (
    <PizzaContext.Provider value={value}>
      {children}
    </PizzaContext.Provider>
  );
};
