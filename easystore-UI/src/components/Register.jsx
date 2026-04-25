import React, { useRef, useEffect } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

export default function Register() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      navigate("/login");
      toast.success("Welcome to the workshop. Sign in to continue.");
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    if (formData.get("password") !== formData.get("confirmPwd")) {
      toast.error("Passwords do not match");
      return;
    }
    submit(formData, { method: "post" });
  };

  const labelStyle = "block font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60 mb-1";

  return (
    <div className="py-16">
      <div className="max-w-md mx-auto px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-coral mb-3 text-center">
          § Open the door
        </p>
        <h1 className="font-display text-5xl text-ink dark:text-paper leading-[0.95] text-center mb-8">
          <span className="italic">Join</span> the shop.
        </h1>

        <div className="card-paper shadow-hard p-8 relative">
          <span className="absolute -top-3 left-6 stamp text-[10px] px-3 py-1 bg-mustard text-ink border-2 border-ink rotate-[-2deg]">
            New member
          </span>

          <Form method="POST" ref={formRef} onSubmit={handleSubmit} className="space-y-6 mt-2">
            <div>
              <label htmlFor="name" className={labelStyle}>Name</label>
              <input id="name" name="name" type="text" placeholder="Your full name" required minLength={5} maxLength={30} className="field-atelier" />
              {actionData?.errors?.name && <p className="text-coral text-xs font-mono mt-1">{actionData.errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className={labelStyle}>Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required className="field-atelier" />
                {actionData?.errors?.email && <p className="text-coral text-xs font-mono mt-1">{actionData.errors.email}</p>}
              </div>
              <div>
                <label htmlFor="mobileNumber" className={labelStyle}>Mobile</label>
                <input id="mobileNumber" name="mobileNumber" type="tel" required pattern="^\d{10}$" placeholder="10 digits" className="field-atelier" />
                {actionData?.errors?.mobileNumber && <p className="text-coral text-xs font-mono mt-1">{actionData.errors.mobileNumber}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className={labelStyle}>Password</label>
              <input id="password" name="password" type="password" placeholder="At least 8 characters" required autoComplete="new-password" minLength={8} maxLength={20} className="field-atelier" />
              {actionData?.errors?.password && <p className="text-coral text-xs font-mono mt-1">{actionData.errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPwd" className={labelStyle}>Confirm password</label>
              <input id="confirmPwd" name="confirmPwd" type="password" placeholder="••••••••" required autoComplete="new-password" minLength={8} maxLength={20} className="field-atelier" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 border-2 border-ink dark:border-paper bg-ink dark:bg-paper text-paper dark:text-ink font-mono text-[11px] uppercase tracking-[0.3em] hover:bg-coral hover:border-coral hover:text-paper transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Stamping…" : "Create Account →"}
            </button>
          </Form>
        </div>

        <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-sepia dark:text-paper/60 mt-6">
          Already a member?{" "}
          <Link to="/login" className="underline decoration-2 underline-offset-4 decoration-coral text-ink dark:text-paper hover:text-coral transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export async function registerAction({ request }) {
  const data = await request.formData();
  const registerData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    password: data.get("password"),
  };
  try {
    await apiClient.post("/auth/register", registerData);
    return { success: true };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to register. Please try again.",
      { status: error.status || 500 }
    );
  }
}
