import React, { useMemo } from "react";
import PageTitle from "./PageTitle";
import { Link } from "react-router-dom";
import emptyCartImage from "../assets/stickers/emptycart.png";
import { useCart } from "../store/cart-context";
import CartTable from "./CartTable";
import { useAuth } from "../store/auth-context";

export default function Cart() {
  const { cart, totalPrice, totalQuantity } = useCart();
  const { isAuthenticated, user } = useAuth();

  const isAddressIncomplete = useMemo(() => {
    if (!isAuthenticated) return false;
    if (!user?.address) return true;
    const { street, city, state, postalCode, country } = user.address;
    return !street || !city || !state || !postalCode || !country;
  }, [isAuthenticated, user]);

  const isCartEmpty = cart.length === 0;

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <PageTitle eyebrow="§ Receipt — pending" title="Your Cart" />

        {!isCartEmpty ? (
          <>
            {isAddressIncomplete && (
              <div className="mt-2 mx-auto max-w-2xl border-2 border-coral bg-coral/10 px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-coral">
                Add a shipping address in your profile to check out
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Items column */}
              <div className="lg:col-span-8 card-paper shadow-hard p-6 sm:p-8">
                <div className="flex items-baseline justify-between mb-5 pb-3 border-b-2 border-ink dark:border-paper">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sepia dark:text-paper/60">
                    Items / {cart.length}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sepia dark:text-paper/60">
                    Qty / {totalQuantity}
                  </span>
                </div>
                <CartTable />
              </div>

              {/* Receipt summary */}
              <aside className="lg:col-span-4 card-paper shadow-hard p-6 h-fit lg:sticky lg:top-32 relative">
                {/* Stamped corner badge */}
                <div className="absolute -top-4 -right-4 stamp w-20 h-20 rounded-full bg-mustard text-ink border-2 border-ink shadow-hard-sm rotate-12">
                  <div className="text-center leading-tight">
                    <div className="text-[8px]">TOTAL</div>
                    <div className="text-[9px] mt-0.5">DUE</div>
                  </div>
                </div>

                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-coral mb-2">
                  § Receipt
                </p>
                <h2 className="font-display text-3xl italic text-ink dark:text-paper mb-5">
                  Order Summary
                </h2>

                <dl className="space-y-2 font-mono text-sm tabular border-t-2 border-dotted border-ink/30 dark:border-paper/30 pt-4">
                  <div className="flex justify-between">
                    <dt className="text-sepia dark:text-paper/70 uppercase text-[11px] tracking-widest">Subtotal</dt>
                    <dd className="text-ink dark:text-paper">₹{totalPrice.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sepia dark:text-paper/70 uppercase text-[11px] tracking-widest">Shipping</dt>
                    <dd className="text-sepia dark:text-paper/70 italic">— calc next</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sepia dark:text-paper/70 uppercase text-[11px] tracking-widest">Tax</dt>
                    <dd className="text-sepia dark:text-paper/70 italic">— calc next</dd>
                  </div>
                </dl>

                <div className="border-t-2 border-ink dark:border-paper mt-4 pt-4 flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink dark:text-paper">
                    Total
                  </span>
                  <span className="font-display text-3xl text-coral tabular">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>

                <Link
                  to={isAddressIncomplete ? "#" : "/checkout"}
                  onClick={(e) => isAddressIncomplete && e.preventDefault()}
                  className={`mt-6 block w-full text-center py-3 px-4 border-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-all
                    ${isAddressIncomplete
                      ? "border-sepia/50 text-sepia/60 cursor-not-allowed"
                      : "border-ink dark:border-paper bg-ink dark:bg-paper text-paper dark:text-ink hover:bg-coral hover:border-coral hover:text-paper"
                    }`}
                >
                  Proceed to Checkout →
                </Link>
                <Link
                  to="/home"
                  className="mt-3 block w-full text-center py-3 px-4 border-2 border-ink/30 dark:border-paper/30 text-ink dark:text-paper font-mono text-[11px] uppercase tracking-[0.25em] hover:border-ink dark:hover:border-paper transition-colors"
                >
                  ← Keep shopping
                </Link>
              </aside>
            </div>
          </>
        ) : (
          <div className="mt-8 max-w-xl mx-auto card-paper shadow-hard p-10 text-center relative">
            <span className="absolute -top-4 left-8 stamp text-[10px] px-3 py-1 bg-mustard text-ink border-2 border-ink rotate-[-3deg]">
              Empty
            </span>
            <img
              src={emptyCartImage}
              alt="Empty cart"
              className="max-w-[200px] mx-auto mb-6 dark:bg-paper dark:rounded-md dark:p-2"
            />
            <p className="font-display text-3xl italic text-ink dark:text-paper mb-2">
              Nothing in the basket yet.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sepia dark:text-paper/60 mb-6">
              Pick a sticker or two
            </p>
            <Link
              to="/home"
              className="inline-block py-3 px-6 border-2 border-ink dark:border-paper bg-ink dark:bg-paper text-paper dark:text-ink font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-coral hover:border-coral hover:text-paper transition-colors"
            >
              Browse the catalogue →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
