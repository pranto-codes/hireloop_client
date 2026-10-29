import Link from "next/link";

const jobs = [
  {
    title: "Frontend Developer",
    company: "Nova Labs",
    location: "New York, USA",
    type: "Hybrid",
    salary: "$125k–145k/year",
    tags: ["React", "Next.js"],
  },
  {
    title: "Product Designer",
    company: "Pixel Works",
    location: "Remote, USA",
    type: "Remote",
    salary: "$95k–120k/year",
    tags: ["Figma", "UI/UX"],
  },
  {
    title: "Full Stack Developer",
    company: "Orbit Tech",
    location: "Austin, USA",
    type: "On-site",
    salary: "$130k–160k/year",
    tags: ["Node.js", "MongoDB"],
  },
  {
    title: "Product Manager",
    company: "Northstar",
    location: "London, UK",
    type: "Hybrid",
    salary: "£75k–95k/year",
    tags: ["Strategy", "Agile"],
  },
  {
    title: "Backend Developer",
    company: "CloudNine",
    location: "Remote",
    type: "Remote",
    salary: "$115k–140k/year",
    tags: ["Python", "APIs"],
  },
  {
    title: "Growth Marketer",
    company: "Elevate",
    location: "Toronto, Canada",
    type: "Hybrid",
    salary: "$85k–105k/year",
    tags: ["SEO", "Analytics"],
  },
];

export default function RolesSection() {
  return (
    <section className="bg-black px-5 pb-20 pt-28 text-white sm:px-8 sm:pb-24 sm:pt-36 lg:px-12 lg:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-violet-300">
            DISCOVER YOUR NEXT OPPORTUNITY
          </span>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            The roles you’d never
            <br className="hidden sm:block" /> find by searching
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
            The best opportunities aren’t always the ones you find. Discover
            roles that match your skills, ambitions, and the career you actually
            want.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <article
              key={job.title}
              className="group rounded-2xl border border-white/[0.07] bg-[#141416] p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-[#19191d]"
            >
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-medium">{job.title}</h2>
                  <p className="mt-1 text-xs text-white/45">{job.company}</p>
                </div>

                <span className="rounded-lg bg-violet-400/10 px-2 py-1 text-[10px] text-violet-300">
                  Matched
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 px-2.5 py-1.5 text-[11px] text-white/65"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 space-y-2 border-t border-white/[0.07] pt-4 text-xs text-white/55">
                <p>⌖ {job.location}</p>
                <p>◷ {job.type}</p>
                <p>↗ {job.salary}</p>
              </div>

              <Link
                href="/jobs"
                className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-white/80 transition group-hover:text-violet-300"
              >
                Explore opportunity <span>↗</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/jobs"
            className="btn h-11 rounded-xl border-0 bg-white px-6 text-sm font-medium text-black hover:bg-violet-200"
          >
            View all jobs <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
