export interface Pizza {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  ingredients: string[];
}

export const PIZZA_MENU: Pizza[] = [
  {
    id: '1',
    name: 'Margherita',
    category: 'Classics',
    description: 'Classic tomato sauce and mozzarella',
    price: 12.00,
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Italian Spices'],
  },
  {
    id: '2',
    name: 'Pepperoni',
    category: 'Favourites',
    description: 'America\'s favorite with spicy pepperoni',
    price: 14.50,
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Pepperoni'],
  },
  {
    id: '3',
    name: 'BBQ Chicken',
    category: 'Favourites',
    description: 'Sweet BBQ sauce with roast chicken',
    price: 15.00,
    ingredients: ['Cheesy BBQ', 'BBQ Roast Chicken Strips', 'Red Onions'],
  },
  {
    id: '4',
    name: 'Hawaiian',
    category: 'Classics',
    description: 'Ham and pineapple on tomato base',
    price: 13.50,
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Ham', 'Pineapple'],
  },
  {
    id: '5',
    name: 'Meat Lovers',
    category: 'Gourmet',
    description: 'Loaded with all the meats',
    price: 16.00,
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Pepperoni', 'Ham', 'Bacon', 'Salami'],
  },
  {
    id: '6',
    name: 'Veggie Supreme',
    category: 'Gourmet',
    description: 'Fresh vegetables on a crispy base',
    price: 14.00,
    ingredients: ['Tomato Sauce', 'Mozzarella', 'Mushrooms', 'Olives', 'Cherry Tomatoes', 'Assorted Peppers'],
  },
  {
    id: '7',
    name: 'Peri Peri Chicken',
    category: 'Favourites',
    description: 'Spicy peri peri sauce with chicken',
    price: 15.50,
    ingredients: ['Peri Peri', 'Mozzarella', 'Roast Chicken Strips', 'Red Onions'],
  },
  {
    id: '8',
    name: 'Tikka Chicken',
    category: 'Gourmet',
    description: 'Authentic tikka flavor',
    price: 15.50,
    ingredients: ['Tikka', 'Mozzarella', 'Tikka Roast Chicken Strips', 'Red Onions'],
  },
];

export const EXTRA_TOPPINGS: Record<string, string[]> = {
  'Sauces': ['Tomato Sauce', 'Cheesy BBQ', 'Sticky BBQ', 'Sweet Chilli Mayo', 'Tikka', 'Sweet Chilli', 'Peri Peri', 'Creamy White Sauce', 'White Sauce', 'BBQ Sauce', 'Mayonnaise'],
  'Meats': ['Bolognese Mince', 'Roast Chicken Strips', 'Steak Strips', 'BBQ Roast Chicken Strips', 'Tikka Roast Chicken Strips', 'Chorizo', 'Pepperoni', 'Ham', 'Bacon', 'Salami'],
  'Cheeses': ['Danish Feta', 'Vegan Cheese', 'Mozzarella', 'Cheddar', 'Parmesan', 'Extra Mozzarella'],
  'Veggies': ['Mushrooms', 'Olives', 'Cherry Tomatoes', 'Assorted Peppers', 'Gherkins', 'Pineapple', 'Red Onions', 'Chilli', 'Garlic'],
  'Other': ['Italian Spices', 'Salt', 'Flatbread', 'Plant-Based Soya'],
};

export const TOPPING_PRICES: Record<string, number> = {
  'Tomato Sauce': 0, 'Cheesy BBQ': 0, 'Sticky BBQ': 0, 'Sweet Chilli Mayo': 0,
  'Tikka': 0, 'Sweet Chilli': 0, 'Peri Peri': 0, 'Creamy White Sauce': 0,
  'White Sauce': 0, 'BBQ Sauce': 0, 'Mayonnaise': 0, 'Italian Spices': 0,
  'Bolognese Mince': 2.50, 'Roast Chicken Strips': 2.50, 'Steak Strips': 3.00,
  'BBQ Roast Chicken Strips': 2.50, 'Tikka Roast Chicken Strips': 2.50, 'Chorizo': 2.50,
  'Danish Feta': 1.50, 'Mushrooms': 1.00, 'Olives': 1.00,
  'Cherry Tomatoes': 1.00, 'Assorted Peppers': 1.00, 'Gherkins': 1.00, 'Pineapple': 1.00, 'Red Onions': 1.00,
  'Pepperoni': 2.00, 'Ham': 2.00, 'Bacon': 2.00, 'Salami': 2.00,
  'Vegan Cheese': 1.50, 'Plant-Based Soya': 2.00,
  'Mozzarella': 0, 'Cheddar': 1.50, 'Parmesan': 1.50, 'Salt': 0, 'Flatbread': 0,
  'Extra Mozzarella': 1.50, 'Chilli': 0.50, 'Garlic': 0.50,
};
