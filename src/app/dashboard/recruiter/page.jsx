"use client";

import React from "react";
import { useSession } from "@/Library/auth-client";
import StatCard from "@/components/dashboard/StatCard";
import RecruiterDashboard from "@/components/dashboard/RecruiterDashboard";
const RecruiterDashboardPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading.....</div>;
  }

  const user = session?.user;
  console.log("session data in RecruiterDashboardPage", session);

  return (
    <div className="m-3">
      <h2 className="text-2xl border-2 rounded-2xl p-4 bg-gray-800">
        {" "}
        Welcome back,{" "}
        <span className="font-bold text-emerald-600">
          {user?.name || user?.email}
        </span>{" "}
        !!!!
      </h2>
      <RecruiterDashboard></RecruiterDashboard>
    </div>
  );
};

export default RecruiterDashboardPage;
