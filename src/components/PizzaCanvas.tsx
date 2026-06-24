
import React from 'react';
import { motion } from 'framer-motion';
import { usePizzaContext } from '../context/PizzaContext';

export const PizzaCanvas: React.FC = () => {
  const { appliedIngredients, addIngredient, removeIngredient, showSuccess, matchedPizza, getHint } = usePizzaContext();
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const ingredient = e.dataTransfer.getData('text/plain');
    if (ingredient) {
      addIngredient(ingredient);
    }
  };

  const handleTouchDrop = (ingredient: string) => {
    addIngredient(ingredient);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (appliedIngredients.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Only remove if clicking near center
      if (Math.hypot(x - rect.width/2, y - rect.height/2) < 100) {
        removeIngredient(appliedIngredients[appliedIngredients.length - 1]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-full max-w-md aspect-square mb-4">
        {/* Hint Banner */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-full text-center">
          <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
            {getHint()}
          </div>
        </div>

        {/* Pizza Base */}
        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleCanvasClick}
          className={`relative w-full h-full rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 shadow-2xl border-8 border-orange-400 transition-all duration-300 ${isDragOver ? 'border-orange-600 bg-orange-100' : ''}`}
          style={{ 
            width: '400px', 
            height: '400px', 
            margin: '0 auto',
            backgroundImage: 'radial-gradient(circle, #fef3c7 0%, #fde68a 100%)'
          }}
        >
          {/* Ingredients Layer */}
          {appliedIngredients.map((ingredient, index) => {
            const positions = Array.from({ length: 5 }, (_, i) => {
              const angle = (i * 72 + index * 15) * (Math.PI / 180);
              const radius = 80 + (index % 2) * 40;
              return {
                left: `calc(50% + ${Math.cos(angle) * radius}px - 20px)`,
                top: `calc(50% + ${Math.sin(angle) * radius}px - 20px)`,
                zIndex: index,
              };
            });

            return (
              <motion.div
                key={ingredient}
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                className="absolute w-10 h-10 flex items-center justify-center text-2xl"
                style={positions[index % positions.length]}
              >
                <IngredientEmoji name={ingredient} />
              </motion.div>
            );
          })}

          {/* Empty State */}
          {appliedIngredients.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl font-medium">
              Drag ingredients here!
            </div>
          )}
        </motion.div>

        {/* Success Banner */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: showSuccess ? 1 : 0, y: showSuccess ? 0 : -50 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg"
        >
          {matchedPizza ? `🎉 Perfect ${matchedPizza}!` : '🍕 Custom Masterpiece!'}
        </motion.div>
      </div>

      {/* Ingredient List */}
      <div className="flex flex-wrap gap-2 justify-center max-w-md">
        {appliedIngredients.map((ingredient, index) => (
          <motion.div
            key={`${ingredient}-${index}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => removeIngredient(ingredient)}
            className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium cursor-pointer hover:bg-red-100 hover:text-red-800 transition-colors"
          >
            <IngredientEmoji name={ingredient} size="small" />
            {ingredient}
            <span className="text-red-500 ml-1">✕</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const IngredientEmoji: React.FC<{ name: string; size?: 'small' }> = ({ name, size = 'large' }) => {
  const emojiMap: Record<string, string> = {
    'Tomato Sauce': '🍅', 'Cheesy BBQ': '🧀', 'Sticky BBQ': '🍯', 'Sweet Chilli Mayo': '🌶️', 
    'Tikka': '🇮🇳', 'Sweet Chilli': '🌶️', 'Peri Peri': '🌶️', 'Creamy White Sauce': '🥛',
    'White Sauce': '🥛', 'BBQ Sauce': '🍯', 'Mayonnaise': '🍯', 'Italian Spices': '🌿',
    'Bolognese Mince': '🥩', 'Roast Chicken Strips': '🍗', 'Steak Strips': '🥩', 
    'BBQ Roast Chicken Strips': '🍗', 'Tikka Roast Chicken Strips': '🍗', 'Chorizo': '🥩',
    'Danish Feta': '🧀', 'Mushrooms': '🍄', 'Olives': '🫒',
    'Cherry Tomatoes': '🍅', 'Assorted Peppers': '🫑', 'Gherkins': '🥒', 'Pineapple': '🍍', 'Red Onions': '🧅',
    'Pepperoni': '🍕', 'Ham': '🥓', 'Bacon': '🥓', 'Salami': '🥓',
    'Vegan Cheese': '🧀', 'Plant-Based Soya': '🌱',
    'Mozzarella': '🧀', 'Cheddar': '🧀', 'Parmesan': '🧀', 'Salt': '🧂', 'Flatbread': '🫓',
    'Extra Mozzarella': '🧀', 'Chilli': '🌶️', 'Garlic': '🧄',
  };

  return <span className={size === 'small' ? 'text-sm' : 'text-xl'}>{emojiMap[name] || '🍕'}</span>;
};
