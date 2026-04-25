import { Link } from "react-router-dom";
import { useCart } from "../store/cart-context.jsx";

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const tilt =
    index % 4 === 0 ? "-rotate-1" :
    index % 4 === 1 ? "rotate-0" :
    index % 4 === 2 ? "rotate-1" :
    "-rotate-0.5";

  const num = String((index % 99) + 1).padStart(2, "0");

  return (
    <article className={`group relative ${tilt} hover:rotate-0 hover:-translate-y-1 transition-transform duration-300`}>
      {/* Edition stamp */}
      <span className="absolute -top-3 -right-3 z-10 stamp text-[9px] w-12 h-12 rounded-full bg-mustard text-ink border-2 border-ink shadow-hard-sm">
        № {num}
      </span>

      <div className="card-paper shadow-hard group-hover:shadow-hard-coral transition-[box-shadow] duration-300">
        <Link
          to={`/products/${product.productId}`}
          state={{ product }}
          className="block"
        >
          {/* Image plate */}
          <div className="relative h-64 bg-paper dark:bg-darkbg border-b-2 border-ink dark:border-paper overflow-hidden flex items-center justify-center p-8">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="block max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-110 transition-transform duration-500"
            />
            {/* Corner mark */}
            <span className="absolute top-2 left-2 font-mono text-[9px] uppercase tracking-[0.2em] text-sepia dark:text-paper/50">
              Vinyl · Matte
            </span>
          </div>

          {/* Title block */}
          <div className="px-5 pt-4 pb-3">
            <h3 className="font-display text-2xl leading-tight text-ink dark:text-paper">
              {product.name}
            </h3>
            <p className="font-primary text-sm text-sepia dark:text-paper/70 mt-1 line-clamp-2 min-h-10">
              {product.description}
            </p>
          </div>
        </Link>

        {/* Price + add */}
        <div className="flex items-stretch border-t-2 border-ink dark:border-paper">
          <div className="flex-1 px-5 py-3 flex items-baseline gap-1 tabular">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-sepia dark:text-paper/60 self-center mr-1">
              INR ₹
            </span>
            <span className="font-display text-2xl text-ink dark:text-paper">
              {Number(product.price).toFixed(2)}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="px-5 bg-ink text-paper dark:bg-paper dark:text-ink hover:bg-coral hover:text-paper font-mono text-[11px] uppercase tracking-[0.22em] transition-colors"
          >
            Add +
          </button>
        </div>
      </div>
    </article>
  );
}
