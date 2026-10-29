"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

export default function HeroSection() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) params.set("q", keyword.trim());
    if (location.trim()) params.set("location", location.trim());

    router.push(`/jobs${params.toString() ? `?${params}` : ""}`);
  };

  const selectTrending = (position) => {
    setKeyword(position);
  };

  return (
    <section className="relative overflow-hidden bg-[#101010] px-4 pb-12 pt-10 text-white sm:pt-14">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.09),transparent_65%)]"
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Monthly job badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-1.5 text-[10px] tracking-wide text-gray-400 shadow-lg sm:text-xs">
          <span aria-hidden="true">💼</span>
          <span className="font-bold text-white">50,000+</span>
          <span>NEW JOBS THIS MONTH</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-7 flex max-w-2xl flex-col gap-2 rounded-xl border border-white/10 bg-[#151515] p-2 shadow-xl sm:flex-row sm:items-center"
        >
          {/* Job keyword */}
          <label className="flex min-w-0 flex-1 items-center gap-2 px-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-4 w-4 shrink-0 text-gray-400"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>

            <span className="sr-only">Job title, skill or company</span>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title, skill or company"
              className="h-8 min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-gray-500"
            />
          </label>

          <div className="hidden h-6 w-px bg-white/15 sm:block" />

          {/* Location */}
          <label className="flex min-w-0 flex-1 items-center gap-2 px-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-4 w-4 shrink-0 text-gray-400"
              aria-hidden="true"
            >
              <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>

            <span className="sr-only">Location or remote</span>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location or Remote"
              className="h-8 min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-gray-500"
            />
          </label>

          {/* Search button */}
          <button
            type="submit"
            aria-label="Search jobs"
            className="flex h-10 shrink-0 items-center justify-center rounded-lg bg-[#6257FF] px-4 text-white transition hover:bg-[#5145EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 sm:w-10 sm:px-0"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
            <span className="ml-2 text-sm sm:hidden">Search Jobs</span>
          </button>
        </form>

        {/* Trending positions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 text-[10px] text-gray-400">
            Trending Position
          </span>

          {trendingPositions.map((position) => (
            <button
              key={position}
              type="button"
              onClick={() => selectTrending(position)}
              className="rounded-full border border-white/10 bg-[#1c1c1c] px-3 py-1.5 text-[10px] text-gray-300 transition hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white"
            >
              {position}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
