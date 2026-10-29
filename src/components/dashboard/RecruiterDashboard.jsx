import {
  FileText,
  CircleCheck,
  Persons,
  CircleCheckFill,
  Thunderbolt,
  SquareXmark,
} from "@gravity-ui/icons";

import StatCard from "@/components/dashboard/StatCard";

export default function RecruiterDashboard() {
  const stats = [
    {
      title: "Total Job Posts",
      value: "48",
      icon: FileText,
    },
    {
      title: "Total Applicants",
      value: "1,284",
      icon: Persons,
    },
    {
      title: "Active Jobs",
      value: "18",
      icon: Thunderbolt,
    },
    {
      title: "Jobs Closed",
      value: "32",
      icon: SquareXmark,
    },
  ];

  return (
    <section className="min-h-screen bg-[#141414] p-4 text-white sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </section>
  );
}
