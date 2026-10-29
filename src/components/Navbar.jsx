"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/Library/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Company", href: "/companies" },
  { name: "Pricing", href: "/pricing" },
];

function HireLoopLogo() {
  return (
    <Link
      href="/"
      aria-label="HireLoop home"
      className="flex shrink-0 items-center"
    >
      {/* Custom logo mark */}
      <svg
        viewBox="0 0 42 42"
        className="mr-2 h-10 w-10"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hireloop-blue" x1="5" y1="5" x2="35" y2="38">
            <stop stopColor="#19A7FF" />
            <stop offset="1" stopColor="#2864FF" />
          </linearGradient>
          <linearGradient id="hireloop-orange" x1="10" y1="5" x2="36" y2="36">
            <stop stopColor="#FFB52E" />
            <stop offset="1" stopColor="#FF632D" />
          </linearGradient>
        </defs>

        <circle
          cx="17"
          cy="21"
          r="13"
          stroke="url(#hireloop-blue)"
          strokeWidth="6"
        />
        <circle
          cx="25"
          cy="21"
          r="13"
          stroke="url(#hireloop-orange)"
          strokeWidth="6"
        />
        <path
          d="M16 21h10"
          stroke="#222222"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Wordmark */}
      <span className="text-[27px] font-extrabold leading-none tracking-[-1.5px] sm:text-3xl">
        <span className="text-[#159BFF]">hire</span>
        <span className="text-[#FF7426]">loop</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const { data: session, isPending } = useSession();
  console.log("Session data in Navbar:", session, "Is pending:", isPending);
  const user = session?.user;

  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin");
          router.refresh();
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#111111] px-3 py-3 sm:px-5">
      <div className="mx-auto max-w-7xl rounded-2xl bg-[#222222] px-4 sm:px-6">
        <header className="flex min-h-[68px] items-center justify-between gap-4">
          {/* Logo stays on the far left */}
          <HireLoopLogo />

          {/* All desktop options aligned to the right */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            <ul className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`whitespace-nowrap text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-violet-400"
                        : "text-white hover:text-violet-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Vertical divider before Sign In */}
            <span aria-hidden="true" className="h-7 w-px bg-white/25" />
            {user ? (
              <>
                <span className="text-fuchsia-700">Hi, {user.name}</span>
                <Button onClick={handleSignOut} variant="ghost">
                  Sign Out
                </Button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="whitespace-nowrap text-sm font-semibold text-[#7565FF] transition hover:text-violet-300"
              >
                Sign In
              </Link>
            )}

            <Link
              href="/register"
              className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-xl bg-[#6257FF] px-6 text-sm font-semibold text-white shadow-md transition hover:bg-[#5145EB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-violet-400 lg:hidden"
          >
            {isMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </header>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-white/10 py-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`block rounded-lg px-3 py-3 text-sm font-medium ${
                      isActive(link.href)
                        ? "bg-violet-500/10 text-violet-400"
                        : "text-white hover:bg-white/5 hover:text-violet-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="my-3 border-t border-white/10" />

            <div className="grid grid-cols-2 gap-3">
              {user ? (
                <>
                  <span className="text-fuchsia-700">Hi, {user.name}</span>
                  <Button onClick={handleSignOut} variant="ghost">
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={closeMenu}
                  className="flex min-h-11 items-center justify-center rounded-xl border border-white/20 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Sign In
                </Link>
              )}

              <Link
                href="/auth/signin"
                onClick={closeMenu}
                className="flex min-h-11 items-center justify-center rounded-xl bg-[#6257FF] text-sm font-semibold text-white hover:bg-[#5145EB]"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
