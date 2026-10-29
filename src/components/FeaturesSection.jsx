import Link from "next/link";

const features = [
  {
    icon: "⌕",
    title: "Smart Search",
    description:
      "Find opportunities that match your skills, goals, and preferred work style.",
  },
  {
    icon: "↗",
    title: "Salary Insights",
    description:
      "Know your market value and make informed decisions about your next move.",
  },
  {
    icon: "▥",
    title: "Top Companies",
    description:
      "Explore ambitious teams and discover companies worth working for.",
  },
  {
    icon: "♧",
    title: "Saved Jobs",
    description:
      "Keep promising opportunities in one place and revisit them whenever you want.",
  },
  {
    icon: "✳",
    title: "One-Click Apply",
    description:
      "Spend less time filling out forms and more time finding the right fit.",
  },
  {
    icon: "▣",
    title: "Resume Builder",
    description:
      "Create a professional resume that puts your strengths front and center.",
  },
  {
    icon: "◎",
    title: "Skill-Based Matching",
    description:
      "Get matched with opportunities based on your skills and experience.",
  },
  {
    icon: "◇",
    title: "Career Growth Resources",
    description:
      "Build confidence with practical resources for your next career milestone.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#151517] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center sm:mb-20">
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-violet-300">
            ✦ FEATURES THAT MATTER ✦
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Everything you need
            <br /> to succeed
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/50 sm:text-base">
            Your next career move deserves more than another job board. Get the
            tools and insights to make it happen.
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-12">
          {features.map((feature) => (
            <article key={feature.title} className="group">
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-white/10 bg-[#202023] text-xl text-violet-300 transition group-hover:border-violet-400/40 group-hover:bg-violet-400/10">
                {feature.icon}
              </div>

              <h2 className="text-base font-medium">{feature.title}</h2>

              <p className="mt-2 text-sm leading-6 text-white/50">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/auth/signup"
            className="btn h-11 rounded-xl border-0 bg-white px-6 text-sm text-black hover:bg-violet-200"
          >
            Start your journey →
          </Link>
        </div>
      </div>
    </section>
  );
}
