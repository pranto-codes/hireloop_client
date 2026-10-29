//import CompanyProfile from "./CompanyProfile";
//import { getUserSession } from "@/Library/core/session";
//import { getRecruiterCompany } from "@/Library/api/companies";
//
//export default async function CompanyPage() {
//  const user = await getUserSession();
//
//  if (!user) {
//    return {/** <div>Please sign in to continue.</div>; */}
//  }
//
//  const company = await getRecruiterCompany(user.id);
//
//  return (

//    {/**
// <div>
//      <CompanyProfile
//        recruiter={user}
//        recruiterCompany={company?.company ?? company}
//      />
//    </div> */}
//  );
//}
//

//updated code

import CompanyProfile from "./CompanyProfile";
import { getUserSession } from "@/Library/core/session";
import { getRecruiterCompany } from "@/Library/api/companies";

export const instant = false;

export default async function CompanyPage() {
  const user = await getUserSession();

  if (!user) {
    return <div>Please sign in to continue.</div>;
  }

  const company = await getRecruiterCompany(user.id);

  return (
    <div>
      <CompanyProfile
        recruiter={user}
        recruiterCompany={company?.company ?? company}
      />
    </div>
  );
}
