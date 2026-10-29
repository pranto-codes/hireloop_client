"use client";

import { useState } from "react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    description: "For getting started",
    monthly: 0,
    yearly: 0,
    features: [
      "Create your professional profile",
      "Limited job applications",
      "Save interesting jobs",
      "Basic job recommendations",
    ],
  },
  {
    name: "Growth",
    description: "For serious job seekers",
    monthly: 17,
    yearly: 12,
    popular: true,
    features: [
      "Everything in Starter",
      "Priority job recommendations",
      "Unlimited saved jobs",
      "Advanced salary insights",
      "Enhanced profile visibility",
    ],
  },
  {
    name: "Premium",
    description: "For your next big move",
    monthly: 99,
    yearly: 79,
    features: [
      "Everything in Growth",
      "Advanced career insights",
      "Personalized job matching",
      "Premium career resources",
      "Priority support",
    ],
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="bg-black px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center sm:mb-14">
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-violet-300">
            ✦ PRICING ✦
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Pay for the leverage,
            <br /> not the listings
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/50">
            Choose the tools that help you move forward. Start free and upgrade
            when you are ready.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#171719] p-1.5">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-5 py-2 text-xs font-medium transition ${
                billing === "monthly"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium transition ${
                billing === "yearly"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Yearly
              <span className="rounded-full bg-fuchsia-500 px-2 py-0.5 text-[10px] text-white">
                Save
              </span>
            </button>
          </div>
        </div>

        <div className="grid items-stretch gap-5 md:grid-cols-3 md:gap-4">
          {plans.map((plan) => {
            const price = billing === "monthly" ? plan.monthly : plan.yearly;

            return (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 sm:p-7 ${
                  plan.popular
                    ? "border-violet-400/70 bg-[#19171f] shadow-[0_0_45px_rgba(139,92,246,0.10)]"
                    : "border-white/10 bg-[#101012]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-500 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-medium">{plan.name}</h2>
                    <p className="mt-1 text-xs text-white/45">
                      {plan.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-semibold tracking-tight">
                      ${price}
                      <span className="ml-1 text-xs font-normal text-white/40">
                        /mo
                      </span>
                    </div>
                    {billing === "yearly" && price > 0 && (
                      <p className="mt-1 text-[10px] text-white/40">
                        Billed annually
                      </p>
                    )}
                  </div>
                </div>

                <div className="my-6 h-px bg-white/10" />

                <p className="mb-4 text-xs font-medium text-white/80">
                  What&apos;s included
                </p>

                <ul className="flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-5 text-white/65"
                    >
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-violet-400/15 text-[10px] text-violet-300">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/auth/signup"
                  className={`btn mt-8 h-11 w-full rounded-xl border-0 text-sm ${
                    plan.popular
                      ? "bg-white text-black hover:bg-violet-200"
                      : "bg-[#242426] text-white hover:bg-[#333337]"
                  }`}
                >
                  {plan.monthly === 0
                    ? "Choose Free Plan"
                    : `Choose ${plan.name}`}
                  <span>→</span>
                </Link>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs leading-6 text-white/35">
          Start with the free plan. Upgrade whenever your goals change.
        </p>
      </div>
    </section>
  );
}
