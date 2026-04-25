import React from "react";
import { useCart } from "../store/cart-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function CartTable() {
  const { cart, addToCart, removeFromCart } = useCart();

  const updateCartQuantity = (productId, quantity) => {
    const product = cart.find((item) => item.productId === productId);
    addToCart(product, quantity - (product?.quantity || 0));
  };

  return (
    <ul className="divide-y-2 divide-dotted divide-ink/20 dark:divide-paper/20">
      {cart.map((item, i) => (
        <li key={item.productId} className="py-4 grid grid-cols-[auto_56px_1fr_auto_auto_auto] sm:grid-cols-[auto_64px_1fr_auto_auto_auto] gap-3 sm:gap-4 items-center">
          {/* Line number */}
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-sepia dark:text-paper/50 tabular">
            {String(i + 1).padStart(2, "0")}
          </span>

          {/* Image plate */}
          <Link
            to={`/products/${item.productId}`}
            state={{ product: item }}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-paper dark:bg-darkbg border-2 border-ink dark:border-paper p-1 flex items-center justify-center hover:rotate-3 transition-transform"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Name + unit */}
          <div className="min-w-0">
            <Link
              to={`/products/${item.productId}`}
              state={{ product: item }}
              className="font-display text-lg sm:text-xl text-ink dark:text-paper leading-tight hover:text-coral transition-colors block truncate"
            >
              {item.name}
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sepia dark:text-paper/60 mt-0.5 tabular">
              ₹{item.price.toFixed(2)} ea
            </p>
          </div>

          {/* Qty */}
          <input
            type="number"
            inputMode="numeric"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              updateCartQuantity(
                item.productId,
                parseInt(e.target.value, 10) || 1
              )
            }
            className="w-14 px-2 py-1 border-2 border-ink dark:border-paper bg-paper-light dark:bg-darksurface text-ink dark:text-paper font-mono text-center text-sm tabular focus:outline-none focus:border-coral"
            aria-label="quantity"
          />

          {/* Line total */}
          <span className="hidden sm:inline w-20 text-right font-display text-lg text-ink dark:text-paper tabular">
            ₹{(item.price * item.quantity).toFixed(2)}
          </span>

          {/* Remove */}
          <button
            aria-label="Remove item"
            onClick={() => removeFromCart(item.productId)}
            className="w-8 h-8 grid place-items-center text-sepia hover:text-coral hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="w-3.5 h-3.5" />
          </button>
        </li>
      ))}
    </ul>
  );
}
