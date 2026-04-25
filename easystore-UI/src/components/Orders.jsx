import React from "react";
import apiClient from "../api/apiClient";
import { useLoaderData, Link } from "react-router-dom";

export default function Orders() {
  const orders = useLoaderData();

  function formatDate(isoDate) {
    if (!isoDate) return "—";
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-coral mb-3 text-center">
          § Order history
        </p>
        <h1 className="font-display text-5xl sm:text-6xl text-ink dark:text-paper leading-[0.95] text-center mb-12">
          <span className="italic">My</span> Orders
        </h1>

        {orders.length === 0 ? (
          <div className="card-paper shadow-hard p-12 text-center">
            <p className="font-display text-3xl italic text-ink dark:text-paper">No orders yet.</p>
            <Link
              to="/home"
              className="mt-6 inline-block py-3 px-6 border-2 border-ink dark:border-paper bg-ink dark:bg-paper text-paper dark:text-ink font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-coral hover:border-coral hover:text-paper transition-colors"
            >
              Start shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, i) => (
              <article key={order.orderId} className="card-paper shadow-hard p-6 sm:p-8 relative">
                <span className="absolute -top-3 left-6 stamp text-[10px] px-3 py-1 bg-mustard text-ink border-2 border-ink rotate-[-2deg]">
                  № {String(i + 1).padStart(2, "0")}
                </span>

                <header className="flex flex-wrap items-baseline justify-between gap-3 pb-4 mb-4 border-b-2 border-dotted border-ink/30 dark:border-paper/30">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60">
                      Order ID
                    </p>
                    <p className="font-mono text-sm text-ink dark:text-paper break-all">
                      {order.orderId}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60">
                      {formatDate(order.createdAt)}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] mt-1 text-coral">
                      {order.status}
                    </p>
                  </div>
                </header>

                <ul className="space-y-3">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-paper dark:bg-darkbg border-2 border-ink dark:border-paper p-1 shrink-0">
                        <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-lg text-ink dark:text-paper truncate">{item.productName}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sepia dark:text-paper/60 tabular">
                          {item.quantity} × ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-mono text-sm text-ink dark:text-paper tabular">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-4 border-t-2 border-ink dark:border-paper flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink dark:text-paper">
                    Total
                  </span>
                  <span className="font-display text-2xl text-coral tabular">
                    ₹{order.totalPrice.toFixed(2)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function ordersLoader() {
  try {
    const response = await apiClient.get("/orders");
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch orders. Please try again.",
      { status: error.status || 500 }
    );
  }
}
