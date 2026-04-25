import React, { useEffect } from "react";
import {
  Link,
  Form,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth-context";

export default function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();
  const from = sessionStorage.getItem("redirectPath") || "/home";

  useEffect(() => {
    if (actionData?.success) {
      loginSuccess(actionData.jwtToken, actionData.user);
      sessionStorage.removeItem("redirectPath");
      setTimeout(() => navigate(from), 100);
    } else if (actionData?.errors) {
      toast.error(actionData.errors.message || "Login failed.");
    }
  }, [actionData]);

  return (
    <div className="py-16">
      <div className="max-w-md mx-auto px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-coral mb-3 text-center">
          § Members only
        </p>
        <h1 className="font-display text-5xl text-ink dark:text-paper leading-[0.95] text-center mb-8">
          <span className="italic">Welcome</span> back.
        </h1>

        <div className="card-paper shadow-hard p-8 relative">
          <span className="absolute -top-3 left-6 stamp text-[10px] px-3 py-1 bg-mustard text-ink border-2 border-ink rotate-[-2deg]">
            Sign in
          </span>

          <Form method="POST" className="space-y-6 mt-2">
            <div>
              <label htmlFor="username" className="block font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60 mb-1">
                Username / email
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="you@stickerland"
                autoComplete="username"
                required
                className="field-atelier"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                minLength={4}
                maxLength={20}
                className="field-atelier"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 border-2 border-ink dark:border-paper bg-ink dark:bg-paper text-paper dark:text-ink font-mono text-[11px] uppercase tracking-[0.3em] hover:bg-coral hover:border-coral hover:text-paper transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Signing in…" : "Sign In →"}
            </button>
          </Form>
        </div>

        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-sepia dark:text-paper/60 mt-6">
          New here?{" "}
          <Link to="/register" className="underline decoration-2 underline-offset-4 decoration-coral text-ink dark:text-paper hover:text-coral transition-colors">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function loginAction({ request }) {
  const data = await request.formData();
  const loginData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  try {
    const response = await apiClient.post("/auth/login", loginData);
    const { message, user, jwtToken } = response.data;
    return { success: true, message, user, jwtToken };
  } catch (error) {
    if (error.response?.status === 401) {
      return {
        success: false,
        errors: { message: "Invalid username or password" },
      };
    }
    throw new Response(
      error.response?.data?.message ||
        error.message ||
        "Failed to login. Please try again.",
      { status: error.response?.status || 500 }
    );
  }
}
