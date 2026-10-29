"use server";

import { serverMutation } from "../core/server";

export const createJob = async (newJobData) => {
  return serverMutation("/api/jobs", newJobData);
};

//const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
//
//// Create a new job
//export async function createJob(jobData) {
//  try {
//    const res = await fetch(`${baseUrl}/api/jobs`, {
//      method: "POST",
//      headers: {
//        "Content-Type": "application/json",
//      },
//      body: JSON.stringify(jobData),
//      cache: "no-store",
//    });
//
//    const data = await res.json();
//
//    if (!res.ok) {
//      console.error("Create job API error:", data);
//
//      throw new Error(
//        data.message || `Failed to create job. Status: ${res.status}`,
//      );
//    }
//
//    return data;
//  } catch (error) {
//    console.error("Create job failed:", error);
//
//    throw new Error(
//      error instanceof Error
//        ? error.message
//        : "An unexpected error occurred while creating the job.",
//    );
//  }
//}
