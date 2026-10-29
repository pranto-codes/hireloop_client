"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/Library/auth-client";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").trim();
    const password = formData.get("password");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setErrorMessage(
          error.message || "Unable to sign in. Please check your credentials.",
        );
        return;
      }

      if (data) {
        setSuccessMessage("Signed in successfully! Redirecting...");

        // Redirect to your dashboard or home page.
        window.location.href = "/";
      }
    } catch (error) {
      setErrorMessage(
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#141416] p-6 text-white shadow-2xl shadow-violet-950/20 sm:p-9">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight text-white"
          >
            Hire<span className="text-violet-400">Loop</span>
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-white">Welcome back</h1>

          <p className="mt-2 text-sm text-white/50">
            Sign in to continue your career journey with HireLoop.
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-4 flex items-start justify-between gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300"
          >
            <p>{errorMessage}</p>

            <button
              type="button"
              onClick={() => setErrorMessage("")}
              aria-label="Dismiss error"
              className="font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div
            role="status"
            className="mb-4 flex items-start justify-between gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300"
          >
            <p>{successMessage}</p>

            <button
              type="button"
              onClick={() => setSuccessMessage("")}
              aria-label="Dismiss success message"
              className="font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Sign-in form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-white/80"
            >
              Email address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-white/10 bg-[#1c1c20] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-white/80"
              >
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-violet-400 hover:text-violet-300 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-white/10 bg-[#1c1c20] px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-violet-400 hover:text-violet-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-lg bg-violet-500 px-4 py-3 font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/35">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Sign-up link */}
        <p className="text-center text-sm text-white/60">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-violet-400 hover:text-violet-300 hover:underline"
          >
            Create an account
          </Link>
        </p>

        {/* Home link */}
        <p className="mt-4 text-center text-sm text-white/45">
          <Link href="/" className="hover:text-violet-300">
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
