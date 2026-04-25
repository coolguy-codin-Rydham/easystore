import { useLoaderData } from "react-router-dom";
import apiClient from "../api/apiClient";
import ProductListings from "./ProductListings";

export default function Home() {
  const products = useLoaderData();
  return (
    <div>
      {/* Editorial hero */}
      <section className="border-b-2 border-ink dark:border-paper">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="stamp text-[10px] px-3 py-1 bg-mustard text-ink border-2 border-ink">
                  Vol. 01 · 2024
                </span>
                <span className="h-px flex-1 bg-ink/40 dark:bg-paper/30" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sepia dark:text-paper/60">
                  {products?.length || 0} designs
                </span>
              </div>
              <h1 className="font-display leading-[0.85] text-ink dark:text-paper">
                <span className="block text-7xl sm:text-8xl lg:text-[10rem]">Stick it</span>
                <span className="block text-7xl sm:text-8xl lg:text-[10rem] italic text-coral">on anything.</span>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="font-primary text-lg leading-relaxed text-ink dark:text-paper/90 max-w-md">
                A small workshop pressing vinyl stickers for laptops, water
                bottles, skateboards, and the inside of your fridge. Browse the
                catalogue below.
              </p>
              <div className="mt-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60">
                <span className="w-8 h-px bg-coral" />
                <span>Scroll for the catalogue</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductListings products={products} />
    </div>
  );
}

export async function productsLoader() {
  try {
    const response = await apiClient.get("/products");
    return response.data;
  } catch (error) {
    throw new Response(
      error.message || "Failed to load Products. Please try again later...",
      { status: error.status || 500 }
    );
  }
}
