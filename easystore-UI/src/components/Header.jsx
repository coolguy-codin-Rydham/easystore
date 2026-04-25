import {
  faAngleDown,
  faMoon,
  faShoppingBasket,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth-context";
import { useCart } from "../store/cart-context";

export default function Header() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef();
  const navigate = useNavigate();

  const { totalQuantity } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    setAdminMenuOpen(false);
    setUserMenuOpen(false);
    const onClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
        setAdminMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [theme, location.pathname]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    toast.success("Logged out");
    navigate("/home");
  };

  const navLink =
    "font-mono text-[11px] uppercase tracking-[0.18em] text-ink dark:text-paper hover:text-coral transition-colors";
  const navLinkActive = "text-coral";

  return (
    <header className="sticky top-0 z-30 bg-paper/85 dark:bg-darkbg/85 backdrop-blur-sm border-b-2 border-ink dark:border-paper">
      {/* Marquee ticker bar */}
      <div className="bg-ink dark:bg-paper text-paper dark:text-ink overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker font-mono text-[11px] uppercase tracking-[0.25em] py-1.5">
          {Array.from({ length: 2 }).map((_, group) => (
            <div key={group} className="flex shrink-0 [&>span]:px-6 [&>span]:flex [&>span]:items-center [&>span]:gap-2">
              <span>★ Free shipping on orders over ₹2000</span>
              <span>✦ 30 designs in stock</span>
              <span>※ Print-on-demand · vinyl · matte</span>
              <span>✱ Made by humans, stuck on by you</span>
              <span>✦ New drops weekly</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main header row */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <NavLink to="/" className="group shrink-0">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl sm:text-4xl italic leading-none text-ink dark:text-paper group-hover:text-coral transition-colors">
              Eazy
            </span>
            <span className="font-display text-3xl sm:text-4xl text-ink dark:text-paper leading-none">
              Stickers
            </span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-sepia dark:text-paper/60 mt-0.5">
            № EST · MMXXIV
          </div>
        </NavLink>

        <nav className="flex items-center gap-6 sm:gap-8">
          <ul className="hidden md:flex items-center gap-7">
            <li>
              <NavLink to="/home" className={({ isActive }) => `${navLink} ${isActive ? navLinkActive : ""}`}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `${navLink} ${isActive ? navLinkActive : ""}`}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `${navLink} ${isActive ? navLinkActive : ""}`}>
                Contact
              </NavLink>
            </li>
          </ul>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 grid place-items-center border-2 border-ink dark:border-paper hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors"
          >
            <FontAwesomeIcon icon={theme === "dark" ? faMoon : faSun} className="w-3.5 h-3.5" />
          </button>

          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className={`${navLink} flex items-center gap-1`}
              >
                {user?.name?.length > 8 ? `${user.name.slice(0, 8)}…` : user?.name || "Account"}
                <FontAwesomeIcon icon={faAngleDown} className="w-3 h-3" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-52 card-paper shadow-hard-sm py-2 z-30">
                  <Link to="/profile" className="block px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-coral hover:text-paper-light">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-coral hover:text-paper-light">
                    Orders
                  </Link>
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => setAdminMenuOpen((v) => !v)}
                        className="w-full text-left px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-coral hover:text-paper-light flex items-center justify-between"
                      >
                        Admin <FontAwesomeIcon icon={faAngleDown} className="w-2.5 h-2.5" />
                      </button>
                      {isAdminMenuOpen && (
                        <div className="border-t-2 border-ink/20 dark:border-paper/20">
                          <Link to="/admin/AdminOrders" className="block px-6 py-2 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-coral hover:text-paper-light">
                            Orders
                          </Link>
                          <Link to="/admin/messages" className="block px-6 py-2 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-coral hover:text-paper-light">
                            Messages
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                  <Link to="/home" onClick={handleLogout} className="block px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] border-t-2 border-ink/20 dark:border-paper/20 hover:bg-coral hover:text-paper-light">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `${navLink} ${isActive ? navLinkActive : ""}`}>
              Login
            </NavLink>
          )}

          <Link to="/cart" className="relative group">
            <FontAwesomeIcon icon={faShoppingBasket} className="w-5 h-5 text-ink dark:text-paper group-hover:text-coral transition-colors" />
            <span className="absolute -top-2 -right-3 stamp text-[9px] w-5 h-5 bg-coral text-paper-light rounded-full">
              {totalQuantity}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
