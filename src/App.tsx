import React from 'react';
import './App.css';
import { PizzaProvider } from './context/PizzaContext';
import { PizzaCanvas } from './components/PizzaCanvas';
import { MenuSelector } from './components/MenuSelector';
import { OrderSummary } from './components/OrderSummary';

export const App: React.FC = () => {
  return (
    <PizzaProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
            🍕 The Perfect Pizza
          </h1>
          <p className="text-gray-600 text-lg">Build your dream pizza!</p>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <MenuSelector />
          </div>
          <div className="lg:col-span-1">
            <PizzaCanvas />
          </div>
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </div>
      </div>
    </PizzaProvider>
  );
};
