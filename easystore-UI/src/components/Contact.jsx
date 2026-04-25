import React, { useEffect, useRef } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
  useLoaderData,
} from "react-router-dom";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

export default function Contact() {
  const contactInfo = useLoaderData();
  const actionData = useActionData();
  const formRef = useRef(null);
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      toast.success("Message sent.");
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (window.confirm("Send this message?")) {
      const formData = new FormData(formRef.current);
      submit(formData, { method: "post" });
    }
  };

  const labelStyle = "block font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60 mb-1";
  const errorStyle = "text-coral text-xs font-mono mt-1";

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-coral mb-3 text-center">
          § Send a postcard
        </p>
        <h1 className="font-display text-5xl sm:text-6xl text-ink dark:text-paper leading-[0.95] text-center mb-12">
          <span className="italic">Get</span> in touch.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <aside className="lg:col-span-2">
            <div className="card-paper shadow-hard p-8 relative">
              <span className="absolute -top-3 left-6 stamp text-[10px] px-3 py-1 bg-mustard text-ink border-2 border-ink rotate-[-2deg]">
                The Workshop
              </span>
              <div className="space-y-5 mt-2">
                {contactInfo && (
                  <>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60 mb-1">Phone</p>
                      <p className="font-display text-2xl text-ink dark:text-paper">{contactInfo.phone}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60 mb-1">Email</p>
                      <p className="font-display text-xl text-ink dark:text-paper break-all">{contactInfo.email}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60 mb-1">Address</p>
                      <p className="font-display text-lg text-ink dark:text-paper leading-snug">{contactInfo.address}</p>
                    </div>
                  </>
                )}
                <div className="pt-4 border-t-2 border-dotted border-ink/30 dark:border-paper/30">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sepia dark:text-paper/60">
                    Mon — Fri · 9 am to 6 pm
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="card-paper shadow-hard p-8 relative">
              <span className="absolute -top-3 left-6 stamp text-[10px] px-3 py-1 bg-coral text-paper-light border-2 border-coral rotate-[-2deg]">
                A note for us
              </span>
              <Form
                method="POST"
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6 mt-2"
              >
                <div>
                  <label htmlFor="name" className={labelStyle}>Name</label>
                  <input id="name" name="name" type="text" required minLength={5} maxLength={30} className="field-atelier" />
                  {actionData?.errors?.name && <p className={errorStyle}>{actionData.errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className={labelStyle}>Email</label>
                    <input id="email" name="email" type="email" required className="field-atelier" />
                    {actionData?.errors?.email && <p className={errorStyle}>{actionData.errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="mobileNumber" className={labelStyle}>Mobile</label>
                    <input id="mobileNumber" name="mobileNumber" type="tel" required pattern="^\d{10}$" className="field-atelier" />
                    {actionData?.errors?.mobileNumber && <p className={errorStyle}>{actionData.errors.mobileNumber}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelStyle}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    minLength={5}
                    maxLength={500}
                    className="field-atelier resize-none"
                    placeholder="Tell us what's on your mind…"
                  />
                  {actionData?.errors?.message && <p className={errorStyle}>{actionData.errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 border-2 border-ink dark:border-paper bg-ink dark:bg-paper text-paper dark:text-ink font-mono text-[11px] uppercase tracking-[0.3em] hover:bg-coral hover:border-coral hover:text-paper transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Sending…" : "Send Message →"}
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function contactAction({ request }) {
  const data = await request.formData();
  const contactData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    message: data.get("message"),
  };
  try {
    await apiClient.post("/contacts", contactData);
    return { success: true };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to submit your message. Please try again.",
      { status: error.status || 500 }
    );
  }
}

export async function contactLoader() {
  try {
    const response = await apiClient.get("/contacts");
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch contact details. Please try again.",
      { status: error.status || 500 }
    );
  }
}
