import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";

import About from "./components/About.jsx";
import Cart from "./components/Cart.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import Contact, { contactAction,contactLoader } from "./components/Contact.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Home, { productsLoader } from "./components/Home.jsx";
import Login, { loginAction } from "./components/Login.jsx";
import Orders, {ordersLoader} from "./components/Orders.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Profile, { profileAction, profileLoader } from "./components/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register, { registerAction } from "./components/Register.jsx";
import Messages,{messagesLoader} from "./components/admin/Messages.jsx";
import AdminOrders,{adminOrdersLoader} from "./components/admin/AdminOrders.jsx";
import { AuthProvider } from "./store/auth-context.jsx";
import { CartProvider } from "./store/cart-context.jsx";
import OrderSuccess from "./components/OrderSuccess.jsx";

const routeDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} loader={contactLoader} />
    <Route path="/login" element={<Login />} action={loginAction} />
    <Route path="/register" element={<Register />} action={registerAction} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/products/:productId" element={<ProductDetail />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<CheckoutForm />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route
        path="/profile"
        element={<Profile />}
        loader={profileLoader}
        action={profileAction}
      />
      <Route path="/orders" element={<Orders />} loader={ordersLoader}/>
      <Route path="/admin/AdminOrders" element={<AdminOrders />} loader={adminOrdersLoader}/>
      <Route path="/admin/messages" element={<Messages />} loader={messagesLoader} />
    </Route>
  </Route>
);

const appRouter = createBrowserRouter(routeDefinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={appRouter} />
      </CartProvider>
    </AuthProvider>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable
      pauseOnHover
      theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
      transition={Bounce}
    />
  </StrictMode>
);
