import { useCart } from '../context/CartContext';
import { ShoppingCart, Plus } from 'lucide-react';

const QuickAddToCart = () => {
  const { addToCart, cart, getCartCount } = useCart();

  const sampleProducts = [
    {
      id: 1,
      name: 'Handwoven Banig Mat',
      price: '850.00',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400',
      vendor: 'Maria Santos',
      rating: '4.9'
    },
    {
      id: 2,
      name: 'Coconut Shell Bowl',
      price: '450.00',
      image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc768?q=80&w=400',
      vendor: 'Juan Dela Cruz',
      rating: '5.0'
    },
    {
      id: 3,
      name: 'Organic Wild Honey',
      price: '350.00',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784acc?q=80&w=400',
      vendor: 'Bulalacao Farms',
      rating: '4.8'
    }
  ];

  const handleQuickAdd = (product) => {
    console.log('Quick adding product:', product);
    addToCart(product);
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="basket-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-forest-green">Quick Add to Cart</h3>
        <div className="flex items-center gap-2 text-dawn-orange">
          <ShoppingCart className="w-5 h-5" />
          <span className="font-bold">{getCartCount()}</span>
        </div>
      </div>
      
      <p className="text-sm text-earth-brown mb-4">
        Click to quickly add sample products to your cart for testing
      </p>

      <div className="space-y-3">
        {sampleProducts.map((product) => (
          <div key={product.id} className="flex items-center gap-3 p-3 bg-soft-white rounded-lg border border-coconut-tan">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <p className="font-semibold text-forest-green text-sm">{product.name}</p>
              <p className="text-dawn-orange font-bold">₱{product.price}</p>
            </div>
            <button
              onClick={() => handleQuickAdd(product)}
              className="btn-organic bg-dawn-orange text-white p-2 rounded-full hover:scale-110 transition-transform"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Current cart:</strong> {cart.length} items
        </p>
        {cart.length > 0 && (
          <ul className="text-xs text-blue-700 mt-2 space-y-1">
            {cart.map((item, index) => (
              <li key={index}>• {item.name} (Qty: {item.quantity})</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuickAddToCart;
