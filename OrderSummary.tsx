
import React, { createContext, useContext, useState, useCallback } from 'react';
import { PIZZA_MENU, EXTRA_TOPPINGS, TOPPING_PRICES } from '../data/menu';

interface PizzaState {
  appliedIngredients: string[];
  matchedPizza: string | null;
  isCustom: boolean;
  basePrice: number;
  extrasPrice: number;
  totalPrice: number;
  showSuccess: boolean;
  orderDispatched: boolean;
  customerDetails: { name: string; phone: string; address: string };
}

interface PizzaContextType extends PizzaState {
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  resetPizza: () => void;
  setCustomerDetails: (details: { name: string; phone: string; address: string }) => void;
  placeOrder: () => void;
  getHint: () => string;
}

const PizzaContext = createContext<PizzaContextType | null>(null);

export const usePizzaContext = () => {
  const context = useContext(PizzaContext);
  if (!context) throw new Error('usePizzaContext must be used within PizzaProvider');
  return context;
};

export const PizzaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appliedIngredients, setAppliedIngredients] = useState<string[]>([]);
  const [matchedPizza, setMatchedPizza] = useState<string | null>(null);
  const [isCustom, setIsCustom] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderDispatched, setOrderDispatched] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', address: '' });

  const getHint = useCallback(() => {
    if (appliedIngredients.length === 0) return "Start by dragging an ingredient to the pizza base!";
    
    const matchedItem = PIZZA_MENU.find(item => 
      item.ingredients.every(ing => appliedIngredients.includes(ing)) &&
      appliedIngredients.every(ing => item.ingredients.includes(ing))
    );

    if (matchedItem) {
      return `You've built a ${matchedItem.name}! Add extra toppings from the menu or checkout.`;
    }

    const partialMatches = PIZZA_MENU.filter(item => 
      appliedIngredients.some(ing => item.ingredients.includes(ing))
    );

    if (partialMatches.length > 0) {
      const closestMatch = partialMatches.reduce((prev, curr) => {
        const prevMatchCount = appliedIngredients.filter(ing => prev.ingredients.includes(ing)).length;
        const currMatchCount = appliedIngredients.filter(ing => curr.ingredients.includes(ing)).length;
        return currMatchCount > prevMatchCount ? curr : prev;
      });

      const missingIngredients = closestMatch.ingredients.filter(ing => !appliedIngredients.includes(ing));
      if (missingIngredients.length > 0) {
        return `Keep going! Try adding ${missingIngredients.join(', ')} to make a ${closestMatch.name}.`;
      }
    }

    return "Custom creation! Add more ingredients or checkout.";
  }, [appliedIngredients]);

  const addIngredient = useCallback((ingredient: string) => {
    setAppliedIngredients(prev => {
      const newIngredients = [...prev, ingredient];
      
      // Check for perfect match (case-insensitive)
      const matchedItem = PIZZA_MENU.find(item => 
        item.ingredients.every(ing => 
          newIngredients.some(ni => ni.toLowerCase().includes(ing.toLowerCase()) || ing.toLowerCase().includes(ni.toLowerCase()))
        ) &&
        newIngredients.every(ni => 
          item.ingredients.some(ing => ni.toLowerCase().includes(ing.toLowerCase()) || ing.toLowerCase().includes(ni.toLowerCase()))
        )
      );

      if (matchedItem) {
        setMatchedPizza(matchedItem.name);
        setIsCustom(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setMatchedPizza(null);
        setIsCustom(true);
      }
      
      return newIngredients;
    });
  }, []);

  const removeIngredient = useCallback((ingredient: string) => {
    setAppliedIngredients(prev => prev.filter(ing => ing !== ingredient));
  }, []);

  const resetPizza = useCallback(() => {
    setAppliedIngredients([]);
    setMatchedPizza(null);
    setIsCustom(false);
    setShowSuccess(false);
  }, []);

  const placeOrder = useCallback(() => {
    setOrderDispatched(true);
    resetPizza();
    setTimeout(() => setOrderDispatched(false), 5000);
  }, [resetPizza]);

  const basePrice = matchedPizza ? PIZZA_MENU.find(p => p.name === matchedPizza)?.price || 0 : 0;
  
  const extrasPrice = isCustom || (matchedPizza && appliedIngredients.length > PIZZA_MENU.find(p => p.name === matchedPizza)!.ingredients.length)
    ? appliedIngredients.reduce((sum, ing) => {
        if (matchedPizza) {
          const menuItem = PIZZA_MENU.find(p => p.name === matchedPizza)!;
          if (menuItem.ingredients.includes(ing)) return sum;
        }
        return sum + (TOPPING_PRICES[ing] || 2.00);
      }, 0)
    : 0;

  const totalPrice = basePrice + extrasPrice;

  return (
    <PizzaContext.Provider value={{
      appliedIngredients,
      matchedPizza,
      isCustom,
      basePrice,
      extrasPrice,
      totalPrice,
      showSuccess,
      orderDispatched,
      customerDetails,
      addIngredient,
      removeIngredient,
      resetPizza,
      setCustomerDetails,
      placeOrder,
      getHint
    }}>
      {children}
    </PizzaContext.Provider>
  );
};
