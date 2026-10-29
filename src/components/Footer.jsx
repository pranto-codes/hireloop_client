import Link from "next/link";

const footerGroups = [
  {
    title: "Product",
    links: [
      { name: "Job Discovery", href: "/jobs" },
      { name: "Worker AI", href: "/worker-ai" },
      { name: "Companies", href: "/companies" },
      { name: "Salary Data", href: "/salary-data" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Career Library", href: "/career-library" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Brand Guideline", href: "/brand-guideline" },
      { name: "Newsroom", href: "/newsroom" },
    ],
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    label: "f",
    style: "hover:bg-blue-600",
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/",
    label: "P",
    style: "bg-[#3730A3] hover:bg-[#5145EB]",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    label: "in",
    style: "hover:bg-sky-700",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-x-2 border-b-2 border-[#159BFF] bg-black text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0px, transparent 28px, #64748b 29px, transparent 30px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-5 pt-10 sm:px-8 sm:pt-12 lg:px-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-5 md:gap-x-6">
          {/* Logo and description */}
          <div className="col-span-2">
            <Link
              href="/"
              aria-label="HireLoop home"
              className="inline-flex items-center text-2xl font-extrabold tracking-tight sm:text-3xl"
            >
              <span className="text-[#159BFF]">hire</span>
              <span className="text-[#FF7426]">loop</span>
            </Link>

            <p className="mt-4 max-w-xs text-xs leading-6 text-gray-500">
              The AI-native career platform. Built for
              <br className="hidden sm:block" />
              people who take their work seriously.
            </p>

            {/* Social links */}
            <div className="mt-7 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`flex h-8 w-8 items-center justify-center rounded bg-[#171717] text-sm font-bold text-gray-300 transition-colors ${social.style}`}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-4 text-xs font-medium text-[#7565FF]">
                {group.title}
              </h2>

              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-gray-500 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright and legal links */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-4 text-[10px] text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 HireLoop. All rights reserved.</p>

          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/terms" className="transition hover:text-gray-300">
              Terms &amp; Policy
            </Link>

            <Link href="/privacy" className="transition hover:text-gray-300">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
