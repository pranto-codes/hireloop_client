export default function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#1c1c1c] p-4 transition-colors hover:border-white/20 sm:p-5">
      <div className="mb-5 flex size-7 items-center justify-center rounded-md bg-[#353537] text-white/80">
        {Icon && <Icon className="size-4" />}
      </div>

      <p className="mb-2 text-xs font-normal text-white/50">{title}</p>

      <p className="text-base font-medium tracking-wide text-white">{value}</p>
    </div>
  );
}
