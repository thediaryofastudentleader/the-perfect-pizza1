@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar for ingredient list */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #f97316;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #ea580c;
}

.pizza-base {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}

.pizza-base.tomato {
  background: radial-gradient(circle at 30% 30%, #ff6b35, #d4380d);
}

.pizza-base.white {
  background: radial-gradient(circle at 30% 30%, #fff8e7, #f5deb3);
}

.pizza-base.bbq {
  background: radial-gradient(circle at 30% 30%, #8b4513, #5c2e0e);
}

.ingredient-dot {
  position: absolute;
  border-radius: 50%;
  animation: popIn 0.3s ease-out;
}

@keyframes popIn {
  0% { transform: scale(0); opacity: 0; }
  80% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.ingredient-item {
  animation: float 3s ease-in-out infinite;
}

.success-pulse {
  animation: pulse-green 2s ease-in-out;
}

@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
  50% { box-shadow: 0 0 0 20px rgba(34, 197, 94, 0.3); }
}
