import Link from "next/link";

export default function GetStartedSection() {
  return (
    <section className="relative isolate overflow-hidden bg-black px-5 pb-24 pt-24 text-white sm:px-8 sm:pb-32 sm:pt-32 lg:pb-40 lg:pt-36">
      {/* Purple glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[-200px] -z-10 mx-auto h-[480px] max-w-5xl rounded-[50%] bg-violet-700/30 blur-[100px]" />

      {/* Perspective grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-30%] bottom-[-360px] -z-10 h-[650px] origin-top rounded-[50%] border border-violet-400/20 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.55),transparent_65%)]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(167,139,250,0.20) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.20) 1px, transparent 1px),
            radial-gradient(ellipse at top, rgba(99,102,241,0.55), transparent 65%)
          `,
          backgroundSize: "36px 36px, 36px 36px, 100% 100%",
          transform: "perspective(400px) rotateX(52deg)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/[0.07] px-4 py-2 text-xs text-violet-200">
          <span className="size-1.5 rounded-full bg-violet-300" />
          YOUR NEXT CHAPTER STARTS HERE
        </span>

        <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Your next role is
          <br />
          already looking for you
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/auth/signup"
            className="btn h-12 w-full rounded-xl border-0 bg-white px-6 text-sm font-semibold text-black shadow-lg shadow-white/5 hover:bg-violet-200 sm:w-auto"
          >
            Create a free account <span>→</span>
          </Link>

          <Link
            href="/pricing"
            className="btn h-12 w-full rounded-xl border border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
          >
            View pricing
          </Link>
        </div>

        <p className="mt-6 text-xs text-white/35">
          No pressure. Start free and see where it takes you.
        </p>
      </div>
    </section>
  );
}
