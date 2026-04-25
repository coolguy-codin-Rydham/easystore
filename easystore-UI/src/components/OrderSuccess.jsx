import React from "react";
import { Link } from "react-router-dom";
import orderSuccessImg from "../assets/stickers/order-confirmed.png";

export default function OrderSuccess() {
  return (
    <div className="py-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="card-paper shadow-hard p-10 text-center relative">
          {/* Big delivered stamp */}
          <div className="absolute -top-6 -right-6 stamp w-28 h-28 rounded-full border-4 border-coral text-coral bg-paper-light dark:bg-darksurface rotate-12">
            <div className="text-center leading-tight">
              <div className="text-[10px]">★ ★ ★</div>
              <div className="font-display italic text-xl mt-1">Stuck</div>
              <div className="text-[9px] tracking-[0.2em]">2024</div>
            </div>
          </div>

          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-coral mb-3">
            § Confirmation
          </p>
          <h1 className="font-display text-5xl sm:text-6xl text-ink dark:text-paper leading-[0.95] mb-4">
            <span className="italic">Order</span> placed.
          </h1>
          <p className="font-primary text-base text-sepia dark:text-paper/70 max-w-md mx-auto mb-8 leading-relaxed">
            Your stickers are now in the queue. Most orders ship within 48
            hours. We'll send tracking info as soon as the package leaves the
            workshop.
          </p>

          <img
            src={orderSuccessImg}
            alt="Order placed"
            className="w-full max-w-[300px] mx-auto mb-8"
          />

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/home"
              className="py-3 px-6 border-2 border-ink dark:border-paper bg-ink dark:bg-paper text-paper dark:text-ink font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-coral hover:border-coral hover:text-paper transition-colors"
            >
              Back to catalogue →
            </Link>
            <Link
              to="/orders"
              className="py-3 px-6 border-2 border-ink dark:border-paper text-ink dark:text-paper font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors"
            >
              View my orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
