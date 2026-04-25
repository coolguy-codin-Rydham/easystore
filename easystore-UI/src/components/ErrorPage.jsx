import React from "react";
import Header from "./Header";
import Footer from "./Footer/Footer";
import errorImage from "../assets/stickers/error.png";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const routeError = useRouteError();
  let errorTitle = "Something snapped";
  let errorMessage = "An unexpected error occurred. Please try again later.";
  if (routeError) {
    errorTitle = routeError.status ? String(routeError.status) : errorTitle;
    errorMessage = routeError.data || errorMessage;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-coral mb-3">
            § Detour
          </p>
          <h1 className="font-display text-7xl sm:text-9xl text-ink dark:text-paper leading-[0.9] mb-6">
            <span className="italic">{errorTitle}</span>
          </h1>
          <p className="font-primary text-lg text-sepia dark:text-paper/70 mb-8 max-w-md mx-auto">
            {errorMessage}
          </p>
          <img
            src={errorImage}
            alt="Error"
            className="w-full max-w-[400px] mx-auto mb-8"
          />
          <Link
            to="/home"
            className="inline-block py-3 px-6 border-2 border-ink dark:border-paper bg-ink dark:bg-paper text-paper dark:text-ink font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-coral hover:border-coral hover:text-paper transition-colors"
          >
            Back to catalogue →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
