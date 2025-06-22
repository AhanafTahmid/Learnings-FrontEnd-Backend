import { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const ShoppingCart = () => {

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add to cart
  const addToCart = (product: Product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item
  const removeFromCart = (id: number) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate total
  const getTotalPrice = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="shopping-cart p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>

      <ul className="space-y-2">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">
                ${item.price} × {item.quantity}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value) || 1)
                }
                className="w-16 p-1 border rounded"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 font-semibold">
        Total: ${getTotalPrice().toFixed(2)}
      </div>
    </div>
  );
};

export default ShoppingCart;
