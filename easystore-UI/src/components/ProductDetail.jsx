import {
  faArrowLeft,
  faShoppingBasket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../store/cart-context.jsx";

export default function ProductDetail() {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-3xl italic text-ink dark:text-paper">No product selected.</p>
        <Link to="/home" className="mt-4 inline-block underline decoration-2 underline-offset-4 decoration-coral font-mono text-[11px] uppercase tracking-[0.25em]">
          Back to catalogue
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (quantity < 1) return;
    addToCart(product, quantity);
  };

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60 hover:text-coral transition-colors mb-8"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
          Back to catalogue
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Image plate */}
          <div className="lg:col-span-7 relative">
            <div className="card-paper shadow-hard h-[480px] bg-paper dark:bg-darkbg flex items-center justify-center p-12 -rotate-1 hover:rotate-0 transition-transform duration-500 overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="block max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
            <span className="absolute -top-4 -right-4 stamp w-16 h-16 rounded-full bg-mustard text-ink border-2 border-ink rotate-12 shadow-hard-sm">
              <span className="text-[10px]">★ 2024</span>
            </span>
          </div>

          {/* Detail */}
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-coral mb-3">
              § Vinyl · matte
            </p>
            <h1 className="font-display text-5xl sm:text-6xl text-ink dark:text-paper leading-[0.95]">
              {product.name}
            </h1>
            <p className="font-primary text-lg text-sepia dark:text-paper/70 mt-4 leading-relaxed">
              {product.description}
            </p>

            <div className="my-8 flex items-baseline gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60">
                INR
              </span>
              <span className="font-display text-6xl text-ink dark:text-paper tabular">
                ₹{Number(product.price).toFixed(2)}
              </span>
            </div>

            <div className="border-t-2 border-dotted border-ink/30 dark:border-paper/30 pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-20 px-3 py-2 border-2 border-ink dark:border-paper bg-paper-light dark:bg-darksurface text-ink dark:text-paper font-mono text-center tabular focus:outline-none focus:border-coral"
                />
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 border-2 border-ink dark:border-paper bg-ink dark:bg-paper text-paper dark:text-ink font-mono text-[11px] uppercase tracking-[0.3em] hover:bg-coral hover:border-coral hover:text-paper transition-colors flex items-center justify-center gap-3"
              >
                Add to Cart <FontAwesomeIcon icon={faShoppingCart} className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full py-3 border-2 border-ink dark:border-paper text-ink dark:text-paper font-mono text-[11px] uppercase tracking-[0.3em] hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors flex items-center justify-center gap-3"
              >
                View Cart <FontAwesomeIcon icon={faShoppingBasket} className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
