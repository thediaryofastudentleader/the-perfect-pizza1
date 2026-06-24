
export interface MenuItem {
  id: string;
  category: 'Favourites' | 'Gourmet' | 'Classics';
  name: string;
  base?: 'tomato' | 'white' | 'bbq';
  ingredients: string[];
  price: number;
  description: string;
}

export const PIZZA_MENU: MenuItem[] = [
  // Favourites
  { id: 'triple_cheese', category: 'Favourites', name: 'Triple Cheese', base: 'tomato', ingredients: ['Flatbread', 'Mozzarella', 'Cheddar', 'Danish Feta'], price: 16.00, description: 'Flatbread topped with mozzarella, cheddar and Danish feta' },
  { id: 'margherita', category: 'Favourites', name: 'Margherita', base: 'tomato', ingredients: ['Tomato Sauce', 'Mozzarella', 'Italian Spices'], price: 14.00, description: 'Traditional tomato base topped with mozzarella and Italian spices' },
  { id: 'cheesy_margherita', category: 'Favourites', name: 'Cheesy Margherita', base: 'tomato', ingredients: ['Tomato Sauce', 'Mozzarella', 'Extra Mozzarella'], price: 16.00, description: 'Margherita with extra mozzarella cheese' },
  { id: 'chicken_mayo', category: 'Favourites', name: 'Chicken & Mayo', base: 'white', ingredients: ['Roast Chicken Strips', 'Mayonnaise'], price: 17.00, description: 'Roast chicken strips and tangy mayonnaise' },
  { id: 'sweet_chilli_mayo', category: 'Favourites', name: 'Sweet Chilli Mayo Chicken & Mushroom', base: 'white', ingredients: ['Roast Chicken Strips', 'Mushrooms', 'Sweet Chilli Mayo'], price: 19.00, description: 'Roast chicken strips and mushrooms in a sweet chilli mayo' },
  { id: 'bolognese', category: 'Favourites', name: 'Bolognese', base: 'tomato', ingredients: ['Bolognese Mince', 'Chilli', 'Garlic'], price: 18.00, description: 'Bolognese mince, chilli and garlic' },
  { id: 'bbq_chicken_pineapple', category: 'Favourites', name: 'BBQ Chicken & Pineapple', base: 'bbq', ingredients: ['BBQ Roast Chicken Strips', 'Pineapple'], price: 19.00, description: 'BBQ roast chicken strips and pineapple' },
  { id: 'alfredo', category: 'Favourites', name: 'Alfredo Pizza', base: 'white', ingredients: ['Creamy White Sauce', 'Garlic', 'Parmesan', 'Mushrooms', 'Ham', 'Bacon'], price: 22.00, description: 'Creamy white sauce based margherita with garlic, parmesan, mushrooms, ham and bacon' },
  { id: 'saucy_chicken', category: 'Favourites', name: 'Saucy Chicken Deluxe', base: 'white', ingredients: ['Roast Chicken Strips', 'Bacon', 'Ham', 'Sweet Chilli Mayo'], price: 21.00, description: 'Roast chicken strips, bacon and ham in a sweet chilli mayo' },
  { id: 'regina', category: 'Favourites', name: 'Regina', base: 'tomato', ingredients: ['Ham', 'Mushrooms'], price: 16.00, description: 'Ham and mushrooms' },
  { id: 'hawaiian', category: 'Favourites', name: 'Hawaiian', base: 'tomato', ingredients: ['Ham', 'Pineapple'], price: 16.00, description: 'Ham and pineapple' },

  // Gourmet
  { id: 'sweet_chilli_feta', category: 'Gourmet', name: 'Sweet Chilli Chicken & Feta', base: 'white', ingredients: ['Roast Chicken Strips', 'Danish Feta', 'Sweet Chilli Sauce'], price: 21.00, description: 'Roast chicken strips, Danish feta and sweet chilli sauce' },
  { id: 'chicken_mayo_feta', category: 'Gourmet', name: 'Chicken Mayo, Mushroom & Feta', base: 'white', ingredients: ['Roast Chicken Strips', 'Mayonnaise', 'Mushrooms', 'Danish Feta'], price: 22.00, description: 'Roast chicken strips, mayonnaise, mushrooms and Danish feta' },
  { id: 'spicy_bolognese', category: 'Gourmet', name: 'Spicy Bolognese', base: 'tomato', ingredients: ['Bolognese Mince', 'Assorted Peppers', 'Red Onions', 'Garlic'], price: 21.00, description: 'Bolognese mince, assorted peppers, red onions and garlic' },
  { id: 'bbq_chicken_mushroom', category: 'Gourmet', name: 'BBQ Chicken & Mushroom', base: 'bbq', ingredients: ['BBQ Roast Chicken Strips', 'Mushrooms'], price: 20.00, description: 'BBQ sauce based margherita with BBQ roast chicken strips and mushrooms' },
  { id: 'saucy_meat_deluxe', category: 'Gourmet', name: 'Saucy Meat Deluxe', base: 'bbq', ingredients: ['Bacon', 'Ham', 'Chorizo', 'Bolognese Mince'], price: 24.00, description: 'Bacon, ham, chorizo sausage and bolognese mince in a cheesy BBQ sauce' },
  { id: 'salami_pineapple', category: 'Gourmet', name: 'Salami, Mushroom & Pineapple', base: 'tomato', ingredients: ['Salami', 'Mushrooms', 'Pineapple'], price: 20.00, description: 'Salami, mushrooms and pineapple' },
  { id: 'cheesy_bbq_steak', category: 'Gourmet', name: 'Cheesy BBQ Steak', base: 'white', ingredients: ['White Sauce', 'Steak Strips', 'Mushrooms', 'Red Onions'], price: 25.00, description: 'White sauce-based margherita with steak, mushrooms and red onions in a cheesy BBQ sauce' },

  // Classics
  { id: 'veg_trio', category: 'Classics', name: 'Veg Trio', base: 'tomato', ingredients: ['Mushrooms', 'Pineapple', 'Assorted Peppers'], price: 17.00, description: 'Mushrooms, pineapple and assorted peppers' },
  { id: 'creamy_tikka_chicken', category: 'Classics', name: 'Creamy Tikka Chicken', base: 'white', ingredients: ['White Sauce', 'Tikka Roast Chicken Strips'], price: 19.00, description: 'White sauce based margherita with tikka roast chicken strips' },
  { id: 'bbq_chicken', category: 'Classics', name: 'BBQ Chicken', base: 'tomato', ingredients: ['Roast Chicken Strips', 'Sticky BBQ Basting'], price: 18.00, description: 'Roast chicken strips and sticky BBQ basting' },
  { id: 'peri_peri_chicken', category: 'Classics', name: 'Peri Peri Chicken', base: 'tomato', ingredients: ['Roast Chicken Strips', 'Peri Peri Sauce'], price: 19.00, description: 'Roast chicken strips and peri peri sauce' },
  { id: 'salami_grande', category: 'Classics', name: 'Salami Grande', base: 'tomato', ingredients: ['Salami'], price: 16.00, description: 'Thinly sliced salami' },
  { id: 'bacon_feta', category: 'Classics', name: 'Bacon & Feta', base: 'tomato', ingredients: ['Bacon', 'Danish Feta'], price: 18.00, description: 'Bacon and Danish feta' },
  { id: 'pepperoni', category: 'Classics', name: 'Pepperoni', base: 'tomato', ingredients: ['Pepperoni'], price: 16.00, description: 'Thinly sliced pepperoni' },
];

export const EXTRA_TOPPINGS = {
  'Pizza Sauces': ['Cheesy BBQ', 'Sticky BBQ', 'Sweet Chilli Mayo', 'Tikka', 'Sweet Chilli', 'Peri Peri'],
  'Gourmet': ['Bolognese Mince', 'Roast Chicken Strips', 'Steak Strips'],
  'Deli': ['Danish Feta', 'Mushrooms', 'Olives'],
  'Veggies': ['Cherry Tomatoes', 'Assorted Peppers', 'Gherkins', 'Pineapple', 'Red Onions'],
  'Meat': ['Pepperoni', 'Ham', 'Bacon', 'Salami'],
  'Vegan': ['Vegan Cheese', 'Plant-Based Soya'],
};

export const TOPPING_PRICES: Record<string, number> = {
  // Sauces
  'Cheesy BBQ': 2.00, 'Sticky BBQ': 2.00, 'Sweet Chilli Mayo': 2.00, 'Tikka': 2.00, 'Sweet Chilli': 2.00, 'Peri Peri': 2.00, 'Creamy White Sauce': 2.00, 'BBQ Sauce': 2.00,
  'Mayonnaise': 2.00, 'Italian Spices': 1.50,
  // Gourmet
  'Bolognese Mince': 3.50, 'Roast Chicken Strips': 3.50, 'Steak Strips': 4.50, 'BBQ Roast Chicken Strips': 3.50, 'Tikka Roast Chicken Strips': 3.50, 'Chorizo': 3.50,
  // Deli
  'Danish Feta': 2.50, 'Mushrooms': 2.00, 'Olives': 2.00,
  // Veggies
  'Cherry Tomatoes': 1.50, 'Assorted Peppers': 1.50, 'Gherkins': 1.50, 'Pineapple': 1.50, 'Red Onions': 1.50,
  // Meat
  'Pepperoni': 2.50, 'Ham': 2.50, 'Bacon': 2.50, 'Salami': 2.50, 'Flatbread': 0.00,
  // Vegan
  'Vegan Cheese': 2.50, 'Plant-Based Soya': 2.50,
  // Other
  'Mozzarella': 3.00, 'Cheddar': 2.00, 'Parmesan': 2.00, 'Salt': 0.00, 'Tomato Sauce': 1.00,
  'Chilli': 1.00, 'Garlic': 1.00, 'White Sauce': 2.00, 'Extra Mozzarella': 2.00, 'Sweet Chilli Sauce': 2.00,
  'Peri Peri Sauce': 2.00, 'Sticky BBQ Basting': 2.00,
};
