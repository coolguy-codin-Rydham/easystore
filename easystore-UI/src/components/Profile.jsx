import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import {
  Form,
  useLoaderData,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth-context";

export default function Profile() {
  const initialProfileData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const { loginSuccess, logout } = useAuth();
  const [profileData, setProfileData] = useState(initialProfileData);

  useEffect(() => {
    if (actionData?.success) {
      if (actionData.profileData.emailUpdated) {
        sessionStorage.setItem("skipRedirectPath", "true");
        logout();
        toast.success("Email updated. Please log in again.");
        navigate("/login");
      } else {
        toast.success("Profile saved.");
        setProfileData(actionData.profileData);
        if (actionData.profileData) {
          loginSuccess(localStorage.getItem("jwtToken"), {
            ...profileData,
            ...actionData.profileData,
          });
        }
      }
    }
  }, [actionData]);

  const labelStyle = "block font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60 mb-1";
  const errorStyle = "text-coral text-xs font-mono mt-1";

  const setAddressField = (key, val) =>
    setProfileData((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: val },
    }));

  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-coral mb-3 text-center">
          § Account
        </p>
        <h1 className="font-display text-5xl sm:text-6xl text-ink dark:text-paper leading-[0.95] text-center mb-10">
          <span className="italic">My</span> Profile
        </h1>

        <Form method="PUT" className="space-y-10">
          {/* Personal */}
          <section className="card-paper shadow-hard p-8 relative">
            <span className="absolute -top-3 left-6 stamp text-[10px] px-3 py-1 bg-mustard text-ink border-2 border-ink rotate-[-2deg]">
              Personal
            </span>
            <div className="space-y-6 mt-2">
              <div>
                <label htmlFor="name" className={labelStyle}>Name</label>
                <input
                  id="name" name="name" type="text" required minLength={5} maxLength={30}
                  value={profileData.name}
                  onChange={(e) => setProfileData((p) => ({ ...p, name: e.target.value }))}
                  className="field-atelier"
                />
                {actionData?.errors?.name && <p className={errorStyle}>{actionData.errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className={labelStyle}>Email</label>
                  <input
                    id="email" name="email" type="email" required
                    value={profileData.email}
                    onChange={(e) => setProfileData((p) => ({ ...p, email: e.target.value }))}
                    className="field-atelier"
                  />
                  {actionData?.errors?.email && <p className={errorStyle}>{actionData.errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="mobileNumber" className={labelStyle}>Mobile</label>
                  <input
                    id="mobileNumber" name="mobileNumber" type="tel" required pattern="^\d{10}$"
                    value={profileData.mobileNumber}
                    onChange={(e) => setProfileData((p) => ({ ...p, mobileNumber: e.target.value }))}
                    className="field-atelier"
                  />
                  {actionData?.errors?.mobileNumber && <p className={errorStyle}>{actionData.errors.mobileNumber}</p>}
                </div>
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="card-paper shadow-hard p-8 relative">
            <span className="absolute -top-3 left-6 stamp text-[10px] px-3 py-1 bg-mustard text-ink border-2 border-ink rotate-[-2deg]">
              Shipping
            </span>
            <div className="space-y-6 mt-2">
              <div>
                <label htmlFor="street" className={labelStyle}>Street</label>
                <input
                  id="street" name="street" type="text" required minLength={5} maxLength={30}
                  value={profileData.address?.street || ""}
                  onChange={(e) => setAddressField("street", e.target.value)}
                  className="field-atelier"
                />
                {actionData?.errors?.street && <p className={errorStyle}>{actionData.errors.street}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="city" className={labelStyle}>City</label>
                  <input
                    id="city" name="city" type="text" required minLength={3} maxLength={30}
                    value={profileData.address?.city || ""}
                    onChange={(e) => setAddressField("city", e.target.value)}
                    className="field-atelier"
                  />
                  {actionData?.errors?.city && <p className={errorStyle}>{actionData.errors.city}</p>}
                </div>
                <div>
                  <label htmlFor="state" className={labelStyle}>State</label>
                  <input
                    id="state" name="state" type="text" required minLength={2} maxLength={30}
                    value={profileData.address?.state || ""}
                    onChange={(e) => setAddressField("state", e.target.value)}
                    className="field-atelier"
                  />
                  {actionData?.errors?.state && <p className={errorStyle}>{actionData.errors.state}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="postalCode" className={labelStyle}>Postal code</label>
                  <input
                    id="postalCode" name="postalCode" type="text" required pattern="^\d{5}$"
                    value={profileData.address?.postalCode || ""}
                    onChange={(e) => setAddressField("postalCode", e.target.value)}
                    className="field-atelier"
                  />
                  {actionData?.errors?.postalCode && <p className={errorStyle}>{actionData.errors.postalCode}</p>}
                </div>
                <div>
                  <label htmlFor="country" className={labelStyle}>Country (2 letter)</label>
                  <input
                    id="country" name="country" type="text" required minLength={2} maxLength={2}
                    value={profileData.address?.country || ""}
                    onChange={(e) => setAddressField("country", e.target.value)}
                    className="field-atelier uppercase"
                  />
                  {actionData?.errors?.country && <p className={errorStyle}>{actionData.errors.country}</p>}
                </div>
              </div>
            </div>
          </section>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 border-2 border-ink dark:border-paper bg-ink dark:bg-paper text-paper dark:text-ink font-mono text-[11px] uppercase tracking-[0.3em] hover:bg-coral hover:border-coral hover:text-paper transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Saving…" : "Save Profile →"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function profileLoader() {
  try {
    const response = await apiClient.get("/profile");
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch profile details. Please try again.",
      { status: error.status || 500 }
    );
  }
}

export async function profileAction({ request }) {
  const data = await request.formData();
  const profileData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    street: data.get("street"),
    city: data.get("city"),
    state: data.get("state"),
    postalCode: data.get("postalCode"),
    country: data.get("country"),
  };
  try {
    const response = await apiClient.put("/profile", profileData);
    return { success: true, profileData: response.data };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to save profile details. Please try again.",
      { status: error.status || 500 }
    );
  }
}
