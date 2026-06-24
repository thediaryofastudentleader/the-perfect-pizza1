import React, { useState } from 'react';
import { usePizzaContext } from '../context/PizzaContext';
import { PIZZA_MENU, EXTRA_TOPPINGS } from '../data/menu';

type TabType = 'menu' | 'extras';

export const MenuSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('Favourites');
  const { addIngredient, appliedIngredients, resetPizza } = usePizzaContext();

  const categories = ['Favourites', 'Gourmet', 'Classics'];

  const handleAddIngredient = (ingredient: string) => {
    if (!appliedIngredients.includes(ingredient)) {
      addIngredient(ingredient);
    }
  };

  const handleSelectPizza = (pizza: typeof PIZZA_MENU[0]) => {
    resetPizza();
    pizza.ingredients.forEach((ing: string) => {
      setTimeout(() => addIngredient(ing), 100);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex gap-2 mb-4">
        <button onClick={() => setActiveTab('menu')} className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${activeTab === 'menu' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          📋 Menu
        </button>
        <button onClick={() => setActiveTab('extras')} className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${activeTab === 'extras' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          ➕ Extras
        </button>
      </div>

      {activeTab === 'menu' && (
        <>
          <div className="flex gap-2 mb-4 flex-wrap">
            {categories.map((cat: string) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {PIZZA_MENU.filter((p: typeof PIZZA_MENU[0]) => p.category === selectedCategory).map((pizza: typeof PIZZA_MENU[0]) => (
              <div key={pizza.id} className="border border-gray-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-md transition-all cursor-pointer bg-gray-50" onClick={() => handleSelectPizza(pizza)}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{pizza.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{pizza.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {pizza.ingredients.map((ing: string) => (
                        <span key={ing} className="text-xs bg-white px-2 py-0.5 rounded-full text-gray-600 border">{ing}</span>
                      ))}
                    </div>
                  </div>
                  <span className="font-bold text-orange-600 text-lg">${pizza.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'extras' && (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {Object.entries(EXTRA_TOPPINGS).map(([category, toppings]: [string, string[]]) => (
            <div key={category}>
              <h3 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {toppings.map((topping: string) => {
                  const isAdded = appliedIngredients.includes(topping);
                  return (
                    <button key={topping} onClick={() => handleAddIngredient(topping)} disabled={isAdded} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${isAdded ? 'bg-green-100 text-green-700 cursor-default' : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'}`}>
                      {isAdded ? '✓ ' : '+ '}{topping}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
