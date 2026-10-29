//import { ServerFetch } from "../core/server";
//
/////const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//export const getRecruiterCompany = async (recruiterId) => {
//  // const res = await fetch(
//  //   `${baseUrl}/api/companies?recruiterId=${recruiterId}`,
//  // );
//  // return res.json();
//
//  return ServerFetch(`/api/my/companies?recruiterId=${recruiterId}`);
//};

import { ServerFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getRecruiterCompany = async (recruiterId) => {
  if (!recruiterId) return null;

  return ServerFetch(
    `/api/my/companies?recruiterId=${encodeURIComponent(recruiterId)}`,
  );
};

export const getLoggedInRecruiterCompany = async () => {
  const user = await getUserSession();
  return getRecruiterCompany(user?.id);
};
