"use client";

import React, { useMemo, useState } from "react";
import { Button, Table } from "@heroui/react";

const statusClasses = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  draft: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  paused: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  closed: "bg-red-500/10 text-red-400 border-red-500/20",
  pending: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getStatus = (job) => String(job.status || "draft").toLowerCase();

const getSalary = (job) => {
  const min = Number(job.salaryMin);
  const max = Number(job.salaryMax);
  const currency = job.currency || "USD";

  if (min > 0 && max > 0) {
    return `${currency} ${min.toLocaleString()} – ${max.toLocaleString()}`;
  }

  if (min > 0) return `${currency} ${min.toLocaleString()}+`;

  return "Negotiable";
};

function StatusBadge({ status }) {
  const normalizedStatus = statusClasses[status] ? status : "draft";

  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${
        statusClasses[normalizedStatus]
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          normalizedStatus === "active"
            ? "bg-emerald-400"
            : normalizedStatus === "paused"
              ? "bg-amber-400"
              : normalizedStatus === "closed"
                ? "bg-red-400"
                : normalizedStatus === "pending"
                  ? "bg-blue-400"
                  : "bg-zinc-400"
        }`}
      />
      {status}
    </span>
  );
}

export default function JobsTable({ jobs = [] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "title",
    direction: "ascending",
  });

  const safeJobs = Array.isArray(jobs) ? jobs : [];

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return safeJobs
      .filter((job) => {
        const searchableText = [
          job.title,
          job.category,
          job.type,
          job.city,
          job.country,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch = searchableText.includes(query);

        const matchesStatus =
          statusFilter === "all" || getStatus(job) === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const column = sortDescriptor.column;

        let first = a[column] ?? "";
        let second = b[column] ?? "";

        if (column === "createdAt" || column === "deadline") {
          first = new Date(first).getTime() || 0;
          second = new Date(second).getTime() || 0;
        } else if (column === "applications") {
          first = Number(first) || 0;
          second = Number(second) || 0;
        } else {
          first = String(first).toLowerCase();
          second = String(second).toLowerCase();
        }

        let result =
          typeof first === "number" && typeof second === "number"
            ? first - second
            : String(first).localeCompare(String(second));

        if (sortDescriptor.direction === "descending") {
          result *= -1;
        }

        return result;
      });
  }, [safeJobs, search, statusFilter, sortDescriptor]);

  const activeJobs = safeJobs.filter(
    (job) => getStatus(job) === "active",
  ).length;

  const totalApplications = safeJobs.reduce(
    (total, job) => total + (Number(job.applications) || 0),
    0,
  );

  return (
    <section className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#CAEB66]">
            Recruiter workspace
          </p>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Manage your jobs
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Every opportunity, all in one place. Keep your hiring moving.
          </p>
        </div>

        <Button
          className="bg-[#CAEB66] font-semibold text-black"
          onPress={() => {
            window.location.href = "/dashboard/recruiter/jobs/new";
          }}
        >
          + Post a new job
        </Button>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-[#191919] p-5">
          <p className="text-sm text-zinc-400">Total job listings</p>
          <p className="mt-3 text-3xl font-semibold">{safeJobs.length}</p>
          <p className="mt-2 text-xs text-zinc-500">Across your company</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#191919] p-5">
          <p className="text-sm text-zinc-400">Active openings</p>
          <p className="mt-3 text-3xl font-semibold text-emerald-400">
            {activeJobs}
          </p>
          <p className="mt-2 text-xs text-zinc-500">Currently active</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#191919] p-5">
          <p className="text-sm text-zinc-400">Applications received</p>
          <p className="mt-3 text-3xl font-semibold">{totalApplications}</p>
          <p className="mt-2 text-xs text-zinc-500">Across all job listings</p>
        </div>
      </div>

      {/* Jobs table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#191919]">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold">All job listings</h2>
            <p className="mt-1 text-xs text-zinc-500">
              {filteredJobs.length} listings found
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jobs or locations..."
              aria-label="Search jobs"
              className="rounded-lg border border-white/10 bg-[#111111] px-3 py-2.5 text-sm outline-none placeholder:text-zinc-500 focus:border-[#CAEB66]/60"
            />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter jobs by status"
              className="rounded-lg border border-white/10 bg-[#111111] px-3 py-2.5 text-sm text-zinc-300 outline-none focus:border-[#CAEB66]/60"
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <Table>
          <Table.ScrollContainer>
            <Table.Content
              aria-label="Company job listings"
              className="min-w-[1050px]"
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
            >
              <Table.Header>
                <Table.Column id="title" isRowHeader allowsSorting>
                  Job title
                </Table.Column>

                <Table.Column id="type" allowsSorting>
                  Employment
                </Table.Column>

                <Table.Column id="city">Location</Table.Column>

                <Table.Column id="salaryMin">Salary range</Table.Column>

                <Table.Column id="applications" allowsSorting>
                  Applications
                </Table.Column>

                <Table.Column id="createdAt" allowsSorting>
                  Posted / Deadline
                </Table.Column>

                <Table.Column id="status">Status</Table.Column>

                <Table.Column id="actions">Actions</Table.Column>
              </Table.Header>

              <Table.Body
                items={filteredJobs}
                emptyContent="No jobs found. Try another search or post a new job."
              >
                {(job) => (
                  <Table.Row key={String(job._id || job.id)}>
                    <Table.Cell>
                      <div className="flex items-center gap-3 py-1">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#252525] text-lg text-[#CAEB66]">
                          {job.category?.toLowerCase().includes("design")
                            ? "✳"
                            : job.category?.toLowerCase().includes("engine")
                              ? "⌘"
                              : "▦"}
                        </div>

                        <div className="max-w-[220px]">
                          <p className="truncate font-medium text-zinc-100">
                            {job.title || "Untitled position"}
                          </p>
                          <p className="mt-1 truncate text-xs text-zinc-500">
                            {job.category || "General"}
                            {job.isRemote ? " · Remote" : ""}
                          </p>
                        </div>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="whitespace-nowrap text-sm text-zinc-300">
                        {job.type || "Not specified"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="text-sm text-zinc-300">
                        {job.isRemote ? "Remote" : job.city || "—"}
                        {!job.isRemote && job.country && (
                          <p className="mt-1 text-xs text-zinc-500">
                            {job.country}
                          </p>
                        )}
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="whitespace-nowrap text-sm text-zinc-300">
                        {getSalary(job)}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="font-medium">
                        {Number(job.applications) || 0}
                      </span>
                      <span className="ml-1 text-xs text-zinc-500">
                        received
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="whitespace-nowrap text-sm text-zinc-300">
                        {formatDate(job.createdAt)}
                        <p className="mt-1 text-xs text-zinc-500">
                          Due {formatDate(job.deadline)}
                        </p>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <StatusBadge status={getStatus(job)} />
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-zinc-300"
                          onPress={() => {
                            window.location.href = `/dashboard/recruiter/jobs/${encodeURIComponent(String(job._id || job.id))}`;
                          }}
                        >
                          View
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[#CAEB66]"
                          onPress={() => {
                            window.location.href = `/dashboard/recruiter/jobs/${encodeURIComponent(String(job._id || job.id))}/edit`;
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      <p className="text-xs leading-5 text-zinc-500">
        Good hiring starts with organized listings. Review your openings and
        keep each opportunity up to date.
      </p>
    </section>
  );
}
