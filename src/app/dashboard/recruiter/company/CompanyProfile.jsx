"use client";

import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

const emptyForm = {
  name: "",
  industry: "Technology",
  website: "",
  location: "",
  employeeCount: "1-10 employees",
  description: "",
};

const industries = [
  "Technology",
  "Software Development",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Marketing & Advertising",
  "Manufacturing",
  "Other",
];

const employeeRanges = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-[#202020] px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/15";

function normalizeCompany(result) {
  if (!result) return null;

  // Supports common API response formats.
  const data = result.company ?? result.data ?? result;

  if (
    !data ||
    typeof data !== "object" ||
    Array.isArray(data) ||
    (!data._id && !data.id && !data.name && !data.companyName)
  ) {
    return null;
  }

  return data;
}

function getCompanyForm(company) {
  return {
    name: company?.name ?? company?.companyName ?? "",
    industry: company?.industry ?? company?.category ?? "Technology",
    website: company?.website ?? "",
    location: company?.location ?? "",
    employeeCount:
      company?.employeeCount ?? company?.employeeRange ?? "1-10 employees",
    description: company?.description ?? "",
  };
}

function StatusBadge({ status }) {
  const normalized = String(status || "pending").toLowerCase();

  const styles = {
    pending: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    approved: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    rejected: "border-rose-400/20 bg-rose-400/10 text-rose-300",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
        styles[normalized] || styles.pending
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {normalized.charAt(0).toUpperCase() + normalized.slice(1)}
    </span>
  );
}

function CompanyField({ label, children }) {
  return (
    <label className="block min-w-0 text-sm font-medium text-neutral-200">
      {label}
      {children}
    </label>
  );
}

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  const initialCompany = normalizeCompany(recruiterCompany);

  const [company, setCompany] = useState(initialCompany);
  const [form, setForm] = useState(() => getCompanyForm(initialCompany));

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(!initialCompany);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Sync when the server provides a different company.
  useEffect(() => {
    const savedCompany = normalizeCompany(recruiterCompany);

    setCompany(savedCompany);
    setForm(getCompanyForm(savedCompany));
    setEditing(!savedCompany);
  }, [recruiterCompany]);

  // Preview a selected company logo.
  useEffect(() => {
    if (!logoFile) {
      setLogoPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(logoFile);
    setLogoPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [logoFile]);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setNotice("");
  };

  const uploadLogo = async () => {
    if (!logoFile) {
      return company?.logoUrl ?? company?.logo ?? "";
    }

    if (!IMGBB_API_KEY) {
      throw new Error(
        "NEXT_PUBLIC_IMGBB_API_KEY is missing from your environment.",
      );
    }

    setUploading(true);

    try {
      const body = new FormData();
      body.append("image", logoFile);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${encodeURIComponent(
          IMGBB_API_KEY,
        )}`,
        {
          method: "POST",
          body,
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success || !result.data?.url) {
        throw new Error(result.error?.message || "Company logo upload failed.");
      }

      return result.data.url;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setNotice("");

    if (!BASE_URL) {
      setError("NEXT_PUBLIC_BASE_URL is not configured.");
      return;
    }

    if (!recruiter?.id) {
      setError("Your recruiter session was not found. Please sign in again.");
      return;
    }

    setSaving(true);

    try {
      const logoUrl = await uploadLogo();

      const payload = {
        ...form,
        name: form.name.trim(),
        website: form.website.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        recruiterId: recruiter.id,
        ...(logoUrl ? { logoUrl } : {}),
      };

      console.log("Submitted Company Data:", payload);

      const companyId = company?._id ?? company?.id;
      const isEditing = Boolean(companyId);

      const endpoint = isEditing
        ? `${BASE_URL}/api/companies/${encodeURIComponent(companyId)}`
        : `${BASE_URL}/api/companies`;

      const response = await fetch(endpoint, {
        method: isEditing ? "PATCH" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.error ||
            `Unable to save company details (${response.status}).`,
        );
      }

      const savedCompany = normalizeCompany(result);

      if (!savedCompany) {
        throw new Error(
          "The server accepted the request but did not return the saved company. Check your backend response.",
        );
      }

      // Update the UI only after the server confirms the save.
      setCompany(savedCompany);
      setForm(getCompanyForm(savedCompany));
      setLogoFile(null);
      setEditing(false);

      setNotice(
        isEditing
          ? "Company details updated successfully."
          : "Company registered successfully and submitted for admin approval.",
      );
    } catch (err) {
      setError(err.message || "Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  const startEditing = () => {
    setForm(getCompanyForm(company));
    setLogoFile(null);
    setError("");
    setNotice("");
    setEditing(true);
  };

  const cancelEditing = () => {
    setForm(getCompanyForm(company));
    setLogoFile(null);
    setError("");
    setNotice("");
    setEditing(false);
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setError("Please select a PNG, JPG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("The company logo must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setLogoFile(file);
    setError("");
    setNotice("");
  };

  const logoSrc = logoPreview || company?.logoUrl || company?.logo || "";

  return (
    <main className="min-h-screen bg-[#111111] px-4 py-7 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <header className="mb-8">
          <p className="mb-3 text-xs text-neutral-500">
            Dashboard / Recruiter / Company
          </p>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            My Company
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-400">
            Manage your company information and build trust with candidates on
            HireLoop.
          </p>
        </header>

        {/* Feedback */}
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-200"
          >
            {error}
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200"
          >
            {notice}
          </div>
        )}

        {/* Empty state */}
        {!company && !editing && (
          <section className="rounded-2xl border border-white/10 bg-[#191919] px-5 py-12 text-center sm:px-10 sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#242424] text-3xl text-indigo-300">
              +
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Introduce your company
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-400">
              Register your company to establish your recruiter profile. An
              administrator will review your registration before your company
              becomes publicly visible.
            </p>

            <button
              type="button"
              onClick={startEditing}
              className="mt-7 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              Register Company
            </button>
          </section>
        )}

        {/* Saved company details */}
        {company && !editing && (
          <div className="space-y-5">
            <section className="rounded-2xl border border-white/10 bg-[#191919] p-5 sm:p-7">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#242424] text-2xl font-semibold text-indigo-300">
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={`${company.name ?? company.companyName ?? "Company"} logo`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      (company.name ?? company.companyName ?? "C")
                        .charAt(0)
                        .toUpperCase()
                    )}
                  </div>

                  <div className="min-w-0">
                    <h2 className="break-words text-xl font-semibold sm:text-2xl">
                      {company.name ?? company.companyName}
                    </h2>

                    <p className="mt-2 text-sm text-neutral-400">
                      {company.industry ??
                        company.category ??
                        "Industry not specified"}
                    </p>

                    <div className="mt-3">
                      <StatusBadge status={company.status} />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startEditing}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium transition hover:bg-white/5"
                >
                  <span>✎</span>
                  Edit company
                </button>
              </div>

              {String(company.status || "pending").toLowerCase() ===
                "pending" && (
                <div className="mt-6 rounded-xl border border-amber-300/15 bg-amber-300/[0.05] p-4">
                  <p className="text-sm font-medium text-amber-200">
                    Your company is awaiting approval
                  </p>

                  <p className="mt-1 text-sm leading-6 text-neutral-400">
                    An administrator will review your registration. Your company
                    will not be publicly listed until it is approved.
                  </p>
                </div>
              )}

              {String(company.status || "").toLowerCase() === "rejected" && (
                <div className="mt-6 rounded-xl border border-rose-300/15 bg-rose-300/[0.05] p-4">
                  <p className="text-sm font-medium text-rose-200">
                    Your company registration was rejected
                  </p>

                  {company.rejectionReason && (
                    <p className="mt-2 text-sm text-neutral-300">
                      Reason: {company.rejectionReason}
                    </p>
                  )}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-white/10 bg-[#191919] p-5 sm:p-7">
              <h3 className="text-lg font-semibold">Company information</h3>

              <p className="mt-1 text-sm text-neutral-400">
                Your registered business details.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {[
                  ["Industry / Category", company.industry ?? company.category],
                  ["Website", company.website],
                  ["Location", company.location],
                  [
                    "Employee count",
                    company.employeeCount ?? company.employeeRange,
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/5 bg-[#202020] p-4"
                  >
                    <p className="text-xs text-neutral-500">{label}</p>
                    {label === "Website" && value ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 block break-words text-sm font-medium text-indigo-300 hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-2 break-words text-sm font-medium text-neutral-200">
                        {value || "Not provided"}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-white/5 bg-[#202020] p-4">
                <p className="text-xs text-neutral-500">Company description</p>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-neutral-300">
                  {company.description || "No description provided yet."}
                </p>
              </div>
            </section>
          </div>
        )}

        {/* Registration and editing form */}
        {editing && (
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#191919]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-7">
              <div>
                <h2 className="text-xl font-semibold">
                  {company ? "Edit Company" : "Register New Company"}
                </h2>

                <p className="mt-1 text-sm text-neutral-400">
                  Enter your business details to build your presence on
                  HireLoop.
                </p>
              </div>

              {company && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  aria-label="Close company form"
                  className="rounded-lg p-2 text-xl text-neutral-400 transition hover:bg-white/5 hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-7">
              <CompanyField label="Company Name">
                <input
                  className={inputClass}
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="e.g. Acme Corp"
                  required
                  maxLength={150}
                />
              </CompanyField>

              <CompanyField label="Industry / Category">
                <select
                  className={inputClass}
                  name="industry"
                  value={form.industry}
                  onChange={updateField}
                  required
                >
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </CompanyField>

              <CompanyField label="Website URL">
                <input
                  className={inputClass}
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={updateField}
                  placeholder="https://www.company.com"
                />
              </CompanyField>

              <CompanyField label="Location">
                <input
                  className={inputClass}
                  name="location"
                  value={form.location}
                  onChange={updateField}
                  placeholder="City, Country"
                  required
                />
              </CompanyField>

              <CompanyField label="Employee Count Range">
                <select
                  className={inputClass}
                  name="employeeCount"
                  value={form.employeeCount}
                  onChange={updateField}
                  required
                >
                  {employeeRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </CompanyField>

              <CompanyField label="Company Logo">
                <input
                  className="mt-2 block w-full cursor-pointer rounded-xl border border-dashed border-white/15 bg-[#202020] p-3 text-xs text-neutral-400 file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-2 file:text-xs file:font-semibold file:text-black"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleLogoChange}
                />

                {logoSrc && (
                  <img
                    src={logoSrc}
                    alt="Company logo preview"
                    className="mt-3 h-14 w-14 rounded-xl border border-white/10 object-cover"
                  />
                )}

                <p className="mt-2 text-xs text-neutral-500">
                  PNG, JPG, or WebP, up to 5 MB.
                </p>
              </CompanyField>

              <div className="sm:col-span-2">
                <CompanyField label="Short Description">
                  <textarea
                    className={`${inputClass} min-h-32 resize-y leading-6`}
                    name="description"
                    value={form.description}
                    onChange={updateField}
                    placeholder="Tell us about your company's mission and culture..."
                    required
                    maxLength={1000}
                  />

                  <p className="mt-2 text-right text-xs text-neutral-500">
                    {form.description.length}/1000
                  </p>
                </CompanyField>
              </div>

              {company && (
                <div className="rounded-xl border border-amber-300/15 bg-amber-300/[0.04] p-4 text-sm leading-6 text-neutral-300 sm:col-span-2">
                  Your approval status is managed by the administrator. Editing
                  this form will not approve your company.
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse justify-end gap-3 border-t border-white/10 bg-[#202020] px-5 py-5 sm:flex-row sm:px-7">
              <button
                type="button"
                onClick={cancelEditing}
                disabled={saving || uploading}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium transition hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving || uploading}
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading
                  ? "Uploading logo..."
                  : saving
                    ? "Saving..."
                    : company
                      ? "Save Changes"
                      : "Register Company"}
              </button>
            </div>
          </form>
        )}

        <p className="mt-6 text-center text-xs leading-5 text-neutral-600">
          Company approval and public visibility are controlled by HireLoop
          administrators.
        </p>
      </div>
    </main>
  );
}
