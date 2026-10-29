import { getCompanyJobs } from "@/Library/api/jobs";
import JobsTable from "./JobsTable";

export const instant = false;

export default async function RecruiterJobs() {
  const companyId = "comp_123";

  const jobs = await getCompanyJobs(companyId);

  console.log("Jobs from Company", jobs);

  return (
    <div className="min-h-screen flex-1 bg-[#111111] p-4 text-white sm:p-6">
      <JobsTable jobs={Array.isArray(jobs) ? jobs : jobs?.jobs || []} />
    </div>
  );
}
