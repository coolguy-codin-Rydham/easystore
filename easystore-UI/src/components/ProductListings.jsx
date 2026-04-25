import { useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import ProductCard from "./ProductCard";
import SearchBox from "./SearchBox";

const sortList = ["Popularity", "Price Low to High", "Price High to Low"];

export default function ProductListings({ products }) {
  const [searchText, setSearchText] = useState("");
  const [selectedSort, setSelectedSort] = useState("Popularity");

  const filteredAndSortedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase()) ||
        p.description.toLowerCase().includes(searchText.toLowerCase())
    );
    return filtered.slice().sort((a, b) => {
      switch (selectedSort) {
        case "Price Low to High":
          return parseFloat(a.price) - parseFloat(b.price);
        case "Price High to Low":
          return parseFloat(b.price) - parseFloat(a.price);
        case "Popularity":
        default:
          return parseInt(b.popularity) - parseInt(a.popularity);
      }
    });
  }, [products, searchText, selectedSort]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Section eyebrow */}
      <div className="flex items-baseline justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-coral">
            §
          </span>
          <h2 className="font-display text-3xl text-ink dark:text-paper">
            The Catalogue
          </h2>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60 hidden sm:inline">
          {filteredAndSortedProducts.length} of {products?.length || 0}
        </span>
      </div>

      {/* Toolbar */}
      <div className="border-y-2 border-ink dark:border-paper py-4 mb-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <SearchBox
          label="Search"
          placeholder="developer, messi, lazy cat…"
          value={searchText}
          handleSearch={setSearchText}
        />
        <Dropdown
          label="Sort"
          options={sortList}
          value={selectedSort}
          handleSort={setSelectedSort}
        />
      </div>

      {/* Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredAndSortedProducts.map((product, i) => (
            <ProductCard key={product.productId} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="font-display text-3xl italic text-ink dark:text-paper">
            Nothing in the drawer
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60 mt-2">
            Try a different word
          </p>
        </div>
      )}
    </div>
  );
}
