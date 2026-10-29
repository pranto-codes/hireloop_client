const stats = [
  {
    value: "50K",
    label: "Active Jobs",
    icon: "jobs",
  },
  {
    value: "12K",
    label: "Companies",
    icon: "companies",
  },
  {
    value: "2M",
    label: "Job Seekers",
    icon: "seekers",
  },
  {
    value: "97%",
    label: "Satisfaction Rate",
    icon: "rating",
  },
];

function StatIcon({ type }) {
  const paths = {
    jobs: (
      <>
        <rect x="4" y="7" width="16" height="13" rx="2" />
        <path d="M9 7V5h6v2M4 12h16M10 12v2h4v-2" />
      </>
    ),
    companies: (
      <>
        <rect x="4" y="4" width="7" height="16" rx="1" />
        <rect x="14" y="9" width="6" height="11" rx="1" />
        <path d="M7 7h1M7 10h1M7 13h1M7 16h1M16 12h2M16 15h2" />
      </>
    ),
    seekers: (
      <>
        <circle cx="10" cy="8" r="4" />
        <path d="M3 20v-2a7 7 0 0 1 14 0v2M17 4a4 4 0 0 1 0 8M19 15a5 5 0 0 1 2 4" />
      </>
    ),
    rating: (
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-4 w-4"
      aria-hidden="true"
    >
      {paths[type]}
    </svg>
  );
}

export default function GlobeStats() {
  return (
    <section className="relative isolate overflow-hidden bg-black px-4 pb-10 text-white sm:px-6">
      {/* Globe image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 aspect-square w-[115%] max-w-[1100px] -translate-x-1/2 rounded-full bg-cover bg-top bg-no-repeat opacity-90 sm:w-[100%] md:w-[85%] lg:w-[75%]"
        style={{
          backgroundImage: "url('/globe.png')",
          filter: "drop-shadow(0 -8px 45px rgba(91, 70, 255, 0.7))",
        }}
      />

      {/* Main globe message */}
      <div className="relative mx-auto flex min-h-[340px] max-w-5xl items-center justify-center pt-10 sm:min-h-[390px] md:min-h-[430px]">
        <h2 className="max-w-xl text-center text-xl font-medium leading-relaxed tracking-tight text-gray-200 sm:text-2xl md:text-3xl">
          Assisting over <span className="text-white">15,000</span> job seekers
          <br className="hidden sm:block" /> find their dream positions.
        </h2>
      </div>

      {/* Statistics cards */}
      <div className="relative z-10 mx-auto -mt-1 grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="min-h-32 rounded-xl border border-white/10 bg-gradient-to-b from-black to-[#111111]/95 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.45)] sm:min-h-36 sm:p-5"
          >
            <div className="text-gray-200">
              <StatIcon type={stat.icon} />
            </div>

            <p className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {stat.value}
            </p>

            <p className="mt-2 text-xs text-gray-300 sm:text-sm">
              {stat.label}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
