import PostJobForm from "./PostJobForm";
import { getLoggedInRecruiterCompany } from "@/Library/api/companies";

export const instant = false;

export default async function PostJobPage() {
  const company = await getLoggedInRecruiterCompany();

  return (
    <div>
      <PostJobForm company={company} />
    </div>
  );
}
