import React, { useState } from 'react';
import { usePizzaContext } from '../context/PizzaContext';
import { PIZZA_MENU, TOPPING_PRICES } from '../data/menu';

export const OrderSummary: React.FC = () => {
  const {
    appliedIngredients, matchedPizza, isCustom, basePrice, extrasPrice, totalPrice,
    orderDispatched, customerDetails, removeIngredient, resetPizza,
    setCustomerDetails, placeOrder,
  } = usePizzaContext();

  const [showForm, setShowForm] = useState(false);

  const getIngredientPrice = (ing: string) => {
    if (matchedPizza) {
      const menuItem = PIZZA_MENU.find((p: typeof PIZZA_MENU[0]) => p.name === matchedPizza);
      if (menuItem?.ingredients.includes(ing)) return 0;
    }
    return TOPPING_PRICES[ing] || 2.00;
  };

  const handlePlaceOrder = () => {
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      setShowForm(true);
      return;
    }
    placeOrder();
    setShowForm(false);
  };

  if (appliedIngredients.length === 0 && !orderDispatched) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-500">
        <p className="text-lg">🍕 Start building your pizza to see the order summary!</p>
      </div>
    );
  }

  if (orderDispatched) {
    return (
      <div className="bg-green-50 rounded-2xl shadow-lg p-6 text-center border-2 border-green-200">
        <div className="text-5xl mb-3">🎉</div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Order Dispatched!</h2>
        <p className="text-green-700">Your pizza is on its way! Estimated delivery: 30-45 mins.</p>
      </div>
    );
  }

  const customBasePrice = isCustom && basePrice === 0 ? 12.00 : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">🛒 Order Summary</h2>
        <button onClick={resetPizza} className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors">Clear All</button>
      </div>

      {matchedPizza && (
        <div className="bg-orange-50 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-800">{matchedPizza}</span>
            <span className="font-bold text-orange-600">${basePrice.toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
        {appliedIngredients.map((ing: string, idx: number) => {
          const price = getIngredientPrice(ing);
          const isBaseIngredient = matchedPizza && PIZZA_MENU.find((p: typeof PIZZA_MENU[0]) => p.name === matchedPizza)?.ingredients.includes(ing);
          return (
            <div key={`${ing}-${idx}`} className="flex justify-between items-center py-1 px-2 rounded hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <button onClick={() => removeIngredient(ing)} className="text-red-400 hover:text-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-50" title="Remove">✕</button>
                <span className={`text-sm ${isBaseIngredient ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                  {ing} {isBaseIngredient && <span className="text-xs text-green-600 ml-1">(included)</span>}
                </span>
              </div>
              {price > 0 && <span className="text-sm text-gray-500">+${price.toFixed(2)}</span>}
            </div>
          );
        })}
      </div>

      <div className="border-t pt-4 space-y-2">
        {customBasePrice > 0 && <div className="flex justify-between text-sm text-gray-500"><span>Custom Pizza Base</span><span>${customBasePrice.toFixed(2)}</span></div>}
        {extrasPrice > 0 && <div className="flex justify-between text-sm text-gray-500"><span>Extra Toppings</span><span>+${extrasPrice.toFixed(2)}</span></div>}
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-xl font-bold text-gray-800">Total</span>
          <span className="text-2xl font-bold text-orange-600">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {showForm && (
        <div className="mt-4 space-y-3">
          <input type="text" placeholder="Your Name" value={customerDetails.name} onChange={e => setCustomerDetails({ ...customerDetails, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
          <input type="tel" placeholder="Phone Number" value={customerDetails.phone} onChange={e => setCustomerDetails({ ...customerDetails, phone: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none" />
          <textarea placeholder="Delivery Address" value={customerDetails.address} onChange={e => setCustomerDetails({ ...customerDetails, address: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none resize-none" rows={2} />
        </div>
      )}

      <button onClick={handlePlaceOrder} className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl active:scale-95">
        {showForm ? '🚀 Place Order' : 'Checkout'}
      </button>
    </div>
  );
};
