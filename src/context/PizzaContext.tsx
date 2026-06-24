import React from 'react';
import { PIZZA_MENU } from '../data/menu';

const INGREDIENT_COLORS: Record<string, string> = {
  'Mozzarella': '#fffbe6',
  'Extra Mozzarella': '#fffbe6',
  'Cheddar': '#ffb347',
  'Danish Feta': '#f0f0f0',
  'Parmesan': '#ffe4b5',
  'Vegan Cheese': '#e8f5e9',
  'Tomato Sauce': '#c0392b',
  'Creamy White Sauce': '#fff8e7',
  'White Sauce': '#fff8e7',
  'BBQ Sauce': '#5c2e0e',
  'Mayonnaise': '#fffff0',
  'Sweet Chilli Mayo': '#ffcc80',
  'Sweet Chilli Sauce': '#ff7043',
  'Peri Peri Sauce': '#d32f2f',
  'Sticky BBQ Basting': '#3e2723',
  'Cheesy BBQ': '#8b4513',
  'Sticky BBQ': '#5d4037',
  'Tikka': '#ff8a65',
  'Sweet Chilli': '#ffab40',
  'Peri Peri': '#e53935',
  'Italian Spices': '#2e7d32',
  'Garlic': '#fff9c4',
  'Chilli': '#e53935',
  'Salt': '#ffffff',
  'Flatbread': '#deb887',
  'Bolognese Mince': '#5d4037',
  'Roast Chicken Strips': '#ffcc80',
  'BBQ Roast Chicken Strips': '#a1887f',
  'Tikka Roast Chicken Strips': '#ff8a65',
  'Steak Strips': '#795548',
  'Chorizo': '#bf360c',
  'Mushrooms': '#d7ccc8',
  'Olives': '#212121',
  'Cherry Tomatoes': '#e53935',
  'Assorted Peppers': '#ffeb3b',
  'Gherkins': '#689f38',
  'Pineapple': '#ffeb3b',
  'Red Onions': '#9c27b0',
  'Pepperoni': '#b71c1c',
  'Ham': '#ffab91',
  'Bacon': '#bf360c',
  'Salami': '#c62828',
  'Plant-Based Soya': '#c8e6c9',
};

const INGREDIENT_SIZES: Record<string, number> = {
  'Mozzarella': 18, 'Extra Mozzarella': 18, 'Cheddar': 16, 'Danish Feta': 14,
  'Parmesan': 12, 'Vegan Cheese': 16, 'Tomato Sauce': 280, 'Creamy White Sauce': 280,
  'White Sauce': 280, 'BBQ Sauce': 280, 'Mayonnaise': 14, 'Sweet Chilli Mayo': 14,
  'Sweet Chilli Sauce': 14, 'Peri Peri Sauce': 14, 'Sticky BBQ Basting': 280,
  'Cheesy BBQ': 280, 'Sticky BBQ': 280, 'Tikka': 14, 'Sweet Chilli': 14,
  'Peri Peri': 14, 'Italian Spices': 8, 'Garlic': 10, 'Chilli': 8, 'Salt': 6,
  'Flatbread': 280, 'Bolognese Mince': 16, 'Roast Chicken Strips': 20,
  'BBQ Roast Chicken Strips': 20, 'Tikka Roast Chicken Strips': 20, 'Steak Strips': 22,
  'Chorizo': 16, 'Mushrooms': 18, 'Olives': 12, 'Cherry Tomatoes': 14,
  'Assorted Peppers': 16, 'Gherkins': 14, 'Pineapple': 18, 'Red Onions': 14,
  'Pepperoni': 22, 'Ham': 20, 'Bacon': 18, 'Salami': 20, 'Plant-Based Soya': 16,
};

function getBaseType(ingredients: string[]): 'tomato' | 'white' | 'bbq' {
  const matched = PIZZA_MENU.find(p => 
    p.ingredients.every(ing => ingredients.includes(ing)) &&
    ingredients.every(ing => p.ingredients.includes(ing))
  );
  return matched?.base || 'tomato';
}

function generatePositions(count: number, seed: number): { x: number; y: number }[] {
  const positions: { x: number; y: number }[] = [];
  const rng = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  for (let i = 0; i < count; i++) {
    const angle = rng(seed + i * 7.3) * Math.PI * 2;
    const radius = rng(seed + i * 13.7) * 100;
    positions.push({
      x: 140 + Math.cos(angle) * radius,
      y: 140 + Math.sin(angle) * radius,
    });
  }
  return positions;
}

export const PizzaCanvas: React.FC = () => {
  const { appliedIngredients, matchedPizza, showSuccess, getHint } = usePizzaContext();
  const baseType = getBaseType(appliedIngredients);
  const hint = getHint();

  const renderIngredient = (ingredient: string, index: number) => {
    const color = INGREDIENT_COLORS[ingredient] || '#888';
    const size = INGREDIENT_SIZES[ingredient] || 16;

    if (size >= 200) {
      // Sauce/base layer - render once
      if (index > 0 && appliedIngredients.slice(0, index).includes(ingredient)) return null;
      return (
        <div
          key={`${ingredient}-${index}`}
          className="ingredient-dot"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            left: 0,
            top: 0,
            borderRadius: '50%',
            opacity: 0.9,
          }}
        />
      );
    }

    const positions = generatePositions(6, index * 31 + ingredient.length);

    return positions.map((pos, posIndex) => (
      <div
        key={`${ingredient}-${index}-${posIndex}`}
        className="ingredient-dot"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          left: pos.x - size / 2,
          top: pos.y - size / 2,
          border: ingredient.includes('Sauce') || ingredient.includes('Basting') ? 'none' : '1px solid rgba(0,0,0,0.1)',
        }}
      />
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Pizza</h2>

      <div className="flex justify-center mb-4">
        <div 
          className={`pizza-base ${baseType} ${showSuccess ? 'success-pulse' : ''}`}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {appliedIngredients.map((ing, idx) => renderIngredient(ing, idx))}

          {appliedIngredients.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm font-medium">
              Drag ingredients here!
            </div>
          )}
        </div>
      </div>

      {matchedPizza && (
        <div className="text-center mb-3">
          <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-lg">
            ✨ {matchedPizza} Matched!
          </span>
        </div>
      )}

      <div className="bg-orange-50 rounded-lg p-3 text-center">
        <p className="text-sm text-gray-700 font-medium">💡 {hint}</p>
      </div>
    </div>
  );
};
