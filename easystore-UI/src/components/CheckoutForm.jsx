import React, { useState } from "react";
import apiClient from "../api/apiClient";
import { useCart } from "../store/cart-context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CheckoutForm() {
  const { cart, totalPrice, totalQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (cart.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    setIsProcessing(true);
    try {
      await apiClient.post("/orders", {
        totalPrice,
        items: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      });
      sessionStorage.setItem("skipRedirectPath", "true");
      clearCart();
      toast.success("Order placed!");
      navigate("/order-success");
    } catch (error) {
      console.error("Failed to create order:", error);
      setErrorMessage("Order creation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-xl mx-auto px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-coral mb-3 text-center">
          § Final review
        </p>
        <h1 className="font-display text-5xl sm:text-6xl text-ink dark:text-paper leading-[0.95] text-center mb-8">
          <span className="italic">Confirm</span> & ship
        </h1>

        {isProcessing ? (
          <div className="card-paper shadow-hard p-12 text-center">
            <p className="font-display text-3xl italic text-ink dark:text-paper">
              Pressing the order…
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60 mt-3">
              Please don't refresh
            </p>
          </div>
        ) : (
          <div className="card-paper shadow-hard p-8 relative">
            <div className="absolute -top-4 -right-4 stamp w-16 h-16 rounded-full bg-mustard text-ink border-2 border-ink rotate-12 shadow-hard-sm">
              <div className="text-center">
                <div className="text-[8px]">№</div>
                <div className="font-mono text-xs font-bold tabular">{totalQuantity}</div>
              </div>
            </div>

            <dl className="space-y-3 mb-6 pb-6 border-b-2 border-dotted border-ink/30 dark:border-paper/30">
              <div className="flex justify-between font-mono text-sm">
                <dt className="text-sepia dark:text-paper/70 uppercase text-[11px] tracking-[0.2em]">Items</dt>
                <dd className="text-ink dark:text-paper tabular">{cart.length} designs · {totalQuantity} units</dd>
              </div>
              <div className="flex justify-between font-mono text-sm">
                <dt className="text-sepia dark:text-paper/70 uppercase text-[11px] tracking-[0.2em]">Method</dt>
                <dd className="text-ink dark:text-paper">Cash on stick</dd>
              </div>
            </dl>

            <div className="flex items-baseline justify-between mb-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink dark:text-paper">
                Order Total
              </span>
              <span className="font-display text-4xl text-coral tabular">
                ₹{totalPrice.toFixed(2)}
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              {errorMessage && (
                <p className="text-coral font-mono text-xs uppercase tracking-widest text-center mb-4">
                  {errorMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={cart.length === 0}
                className="w-full py-4 border-2 border-ink dark:border-paper bg-ink dark:bg-paper text-paper dark:text-ink font-mono text-[12px] uppercase tracking-[0.3em] hover:bg-coral hover:border-coral hover:text-paper transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Place Order →
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
