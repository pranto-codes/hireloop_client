"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  TextArea,
  Select,
  ListBox,
  Switch,
  Button,
  FieldError,
  Card,
  Chip,
  toast,
} from "@heroui/react";

import {
  Briefcase,
  Globe,
  Xmark,
  ArrowRight,
  ShieldCheck,
  TriangleExclamation,
  MapPinPlus,
} from "@gravity-ui/icons";

import { createJob } from "@/Library/actions/jobs";

// Mock Recruiter & Company Session State
const mockRecruiterData = {
  company: {
    id: "comp_123",
    name: "Acme Corp",
    industry: "Technology",
    logoUrl: "/company-logo.png",
    isApproved: true,
    plan: "Growth",
    activeJobsCount: 4,
  },
};

// Plan Job Posting Limits
const PLAN_LIMITS = {
  Free: 3,
  Growth: 10,
  Enterprise: 50,
};

export default function PostJobForm({ company }) {
  console.log("PostJobForm received company prop", company);

  const router = useRouter();
  //  const company = mockRecruiterData.company;

  const maxAllowed = PLAN_LIMITS[company.plan] || 100;

  const canPostJob = company.isApproved && company.activeJobsCount < maxAllowed;

  const [isRemote, setIsRemote] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "Full-time",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    city: "",
    country: "",
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setServerError("");

    if (!canPostJob) {
      setServerError(
        "Your company has reached its active job posting limit or is not yet approved.",
      );
      return;
    }

    if (
      Number(formData.salaryMin) < 0 ||
      Number(formData.salaryMax) < Number(formData.salaryMin)
    ) {
      setServerError(
        "Maximum salary must be greater than or equal to minimum salary.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const jobPayload = {
        ...formData,
        salaryMin: Number(formData.salaryMin),
        salaryMax: Number(formData.salaryMax),
        isRemote,
        companyId: company.id,
        companyName: company.name,
        status: "active",
        isPublic: true,
        createdAt: new Date().toISOString(),
      };

      const res = await createJob(jobPayload);

      // The backend must return the inserted MongoDB ID.
      if (!res?.insertedId) {
        throw new Error(
          res?.message || "The server did not confirm that the job was saved.",
        );
      }

      toast.success("Job posted successfully!");

      // Navigate only after successful insertion.
      router.push("/dashboard/recruiter");
    } catch (error) {
      console.error("Publish job failed:", error);

      setServerError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while saving the job.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 shadow-2xl rounded-2xl overflow-hidden">
        <Card.Header className="flex justify-between items-start border-b border-neutral-800 p-6 bg-neutral-900/50">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Post a New Job
            </h1>

            <p className="text-sm text-neutral-400 mt-1">
              Publish a job opening for{" "}
              <span className="font-semibold text-neutral-200">
                {company.name}
              </span>
              .
            </p>
          </div>

          <Button
            isIconOnly
            variant="tertiary"
            className="text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full"
            onClick={() => router.back()}
            aria-label="Close"
          >
            <Xmark className="w-5 h-5" />
          </Button>
        </Card.Header>

        <Card.Content className="p-6 md:p-8 space-y-6">
          {/* Company Plan Status */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />

              <span>
                Plan Status:{" "}
                <strong className="text-white">{company.plan}</strong> Tier
              </span>
            </div>

            <Chip
              size="sm"
              variant="soft"
              color={canPostJob ? "success" : "danger"}
            >
              {company.activeJobsCount} / {maxAllowed} Active Jobs Used
            </Chip>
          </div>

          {!company.isApproved && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm flex items-center gap-3">
              <TriangleExclamation className="w-5 h-5 shrink-0" />

              <span>
                Your company registration is pending approval. You can publish
                jobs once it is verified.
              </span>
            </div>
          )}

          <Form onSubmit={handleSubmit} className="space-y-8">
            {/* Job Information */}
            <Fieldset className="space-y-4">
              <legend className="text-lg font-semibold text-neutral-200 border-b border-neutral-800 pb-2 w-full flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-neutral-400" />
                Job Information
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField className="w-full">
                  <Label className="text-sm font-medium text-neutral-300">
                    Job Title *
                  </Label>

                  <Input
                    required
                    placeholder="e.g. Senior Frontend Engineer"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="mt-1 bg-neutral-950 border-neutral-800 focus:border-neutral-500 text-white placeholder:text-neutral-600 rounded-xl px-3 py-2.5 w-full"
                  />

                  <FieldError className="text-xs text-rose-400 mt-1" />
                </TextField>

                <div className="flex flex-col gap-1 w-full">
                  <Select
                    className="w-full"
                    placeholder="Select category"
                    selectedKeys={formData.category ? [formData.category] : []}
                    onSelectionChange={(keys) => {
                      if (!keys) return;

                      handleInputChange("category", Array.from(keys)[0] || "");
                    }}
                  >
                    <Label className="text-sm font-medium text-neutral-300">
                      Job Category *
                    </Label>

                    <Select.Trigger className="mt-1 bg-neutral-950 border border-neutral-800 focus:border-neutral-500 text-white rounded-xl px-3 py-2.5 w-full flex items-center justify-between">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl mt-1 p-1">
                      <ListBox>
                        <ListBox.Item
                          id="engineering"
                          textValue="Engineering & Software"
                        >
                          Engineering & Software
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item id="design" textValue="Design & Creative">
                          Design & Creative
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item
                          id="product"
                          textValue="Product Management"
                        >
                          Product Management
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item
                          id="marketing"
                          textValue="Marketing & Sales"
                        >
                          Marketing & Sales
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item
                          id="customer_support"
                          textValue="Customer Support"
                        >
                          Customer Support
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  <FieldError className="text-xs text-rose-400 mt-1" />
                </div>
              </div>

              {/* Job Type and Deadline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <Select
                    className="w-full"
                    selectedKeys={[formData.type]}
                    onSelectionChange={(keys) => {
                      if (!keys) return;

                      handleInputChange("type", Array.from(keys)[0] || "");
                    }}
                  >
                    <Label className="text-sm font-medium text-neutral-300">
                      Job Type *
                    </Label>

                    <Select.Trigger className="mt-1 bg-neutral-950 border border-neutral-800 focus:border-neutral-500 text-white rounded-xl px-3 py-2.5 w-full flex items-center justify-between">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl mt-1 p-1">
                      <ListBox>
                        <ListBox.Item id="Full-time" textValue="Full-time">
                          Full-time
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item id="Part-time" textValue="Part-time">
                          Part-time
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item id="Remote" textValue="Remote">
                          Remote
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item id="Contract" textValue="Contract">
                          Contract
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item id="Internship" textValue="Internship">
                          Internship
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <TextField className="w-full">
                  <Label className="text-sm font-medium text-neutral-300">
                    Application Deadline *
                  </Label>

                  <Input
                    required
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      handleInputChange("deadline", e.target.value)
                    }
                    className="mt-1 bg-neutral-950 border-neutral-800 focus:border-neutral-500 text-white rounded-xl px-3 py-2.5 w-full"
                  />

                  <FieldError className="text-xs text-rose-400 mt-1" />
                </TextField>
              </div>

              {/* Salary and Currency */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextField className="w-full">
                  <Label className="text-sm font-medium text-neutral-300">
                    Min Salary *
                  </Label>

                  <Input
                    required
                    type="number"
                    min="0"
                    placeholder="e.g. 50000"
                    value={formData.salaryMin}
                    onChange={(e) =>
                      handleInputChange("salaryMin", e.target.value)
                    }
                    className="mt-1 bg-neutral-950 border-neutral-800 focus:border-neutral-500 text-white placeholder:text-neutral-600 rounded-xl px-3 py-2.5 w-full"
                  />
                </TextField>

                <TextField className="w-full">
                  <Label className="text-sm font-medium text-neutral-300">
                    Max Salary *
                  </Label>

                  <Input
                    required
                    type="number"
                    min="0"
                    placeholder="e.g. 80000"
                    value={formData.salaryMax}
                    onChange={(e) =>
                      handleInputChange("salaryMax", e.target.value)
                    }
                    className="mt-1 bg-neutral-950 border-neutral-800 focus:border-neutral-500 text-white placeholder:text-neutral-600 rounded-xl px-3 py-2.5 w-full"
                  />
                </TextField>

                <div className="flex flex-col gap-1 w-full">
                  <Select
                    className="w-full"
                    selectedKeys={[formData.currency]}
                    onSelectionChange={(keys) => {
                      if (!keys) return;

                      handleInputChange("currency", Array.from(keys)[0] || "");
                    }}
                  >
                    <Label className="text-sm font-medium text-neutral-300">
                      Currency
                    </Label>

                    <Select.Trigger className="mt-1 bg-neutral-950 border border-neutral-800 focus:border-neutral-500 text-white rounded-xl px-3 py-2.5 w-full flex items-center justify-between">
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover className="bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl mt-1 p-1">
                      <ListBox>
                        <ListBox.Item id="USD" textValue="USD ($)">
                          USD ($)
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item id="EUR" textValue="EUR (€)">
                          EUR (€)
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item id="GBP" textValue="GBP (£)">
                          GBP (£)
                          <ListBox.ItemIndicator />
                        </ListBox.Item>

                        <ListBox.Item id="BDT" textValue="BDT (৳)">
                          BDT (৳)
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 bg-neutral-950/50 rounded-xl border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-neutral-400" />

                    <span className="text-sm font-medium text-neutral-200">
                      Workplace Mode:{" "}
                      <strong
                        className={
                          isRemote ? "text-emerald-400" : "text-sky-400"
                        }
                      >
                        {isRemote ? "Remote" : "On-site"}
                      </strong>
                    </span>
                  </div>

                  <Switch
                    isSelected={isRemote}
                    onChange={setIsRemote}
                    aria-label="Toggle Remote or On-site"
                  >
                    <Switch.Content>
                      <Switch.Control
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                          isRemote ? "bg-emerald-600" : "bg-neutral-700"
                        }`}
                      >
                        <Switch.Thumb
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                            isRemote ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </Switch.Control>
                    </Switch.Content>
                  </Switch>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <TextField className="w-full">
                    <Label className="text-sm font-medium text-neutral-300">
                      City {isRemote ? "(Optional)" : "*"}
                    </Label>

                    <Input
                      required={!isRemote}
                      placeholder={
                        isRemote
                          ? "e.g. Worldwide / San Francisco"
                          : "e.g. San Francisco"
                      }
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="mt-1 bg-neutral-900 border-neutral-800 focus:border-neutral-500 text-white placeholder:text-neutral-600 rounded-xl px-3 py-2.5 w-full"
                    />
                  </TextField>

                  <TextField className="w-full">
                    <Label className="text-sm font-medium text-neutral-300">
                      Country {isRemote ? "(Optional)" : "*"}
                    </Label>

                    <Input
                      required={!isRemote}
                      placeholder={
                        isRemote ? "e.g. Global / Any region" : "e.g. USA"
                      }
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      className="mt-1 bg-neutral-900 border-neutral-800 focus:border-neutral-500 text-white placeholder:text-neutral-600 rounded-xl px-3 py-2.5 w-full"
                    />
                  </TextField>
                </div>
              </div>
            </Fieldset>

            {/* Details and Requirements */}
            <Fieldset className="space-y-4">
              <legend className="text-lg font-semibold text-neutral-200 border-b border-neutral-800 pb-2 w-full flex items-center gap-2">
                <MapPinPlus className="w-5 h-5 text-neutral-400" />
                Details & Requirements
              </legend>

              <TextField className="w-full">
                <Label className="text-sm font-medium text-neutral-300">
                  Responsibilities *
                </Label>

                <TextArea
                  required
                  rows={4}
                  placeholder="Outline core daily duties, tech stack, and key targets..."
                  value={formData.responsibilities}
                  onChange={(e) =>
                    handleInputChange("responsibilities", e.target.value)
                  }
                  className="mt-1 bg-neutral-950 border-neutral-800 focus:border-neutral-500 text-white placeholder:text-neutral-600 rounded-xl p-3 w-full"
                />

                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              <TextField className="w-full">
                <Label className="text-sm font-medium text-neutral-300">
                  Requirements *
                </Label>

                <TextArea
                  required
                  rows={4}
                  placeholder="Mention years of experience, necessary skills, certifications, and education..."
                  value={formData.requirements}
                  onChange={(e) =>
                    handleInputChange("requirements", e.target.value)
                  }
                  className="mt-1 bg-neutral-950 border-neutral-800 focus:border-neutral-500 text-white placeholder:text-neutral-600 rounded-xl p-3 w-full"
                />

                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              <TextField className="w-full">
                <Label className="text-sm font-medium text-neutral-300">
                  Benefits & Perks (Optional)
                </Label>

                <TextArea
                  rows={3}
                  placeholder="e.g. Health insurance, flexible PTO, remote work setup budget..."
                  value={formData.benefits}
                  onChange={(e) =>
                    handleInputChange("benefits", e.target.value)
                  }
                  className="mt-1 bg-neutral-950 border-neutral-800 focus:border-neutral-500 text-white placeholder:text-neutral-600 rounded-xl p-3 w-full"
                />
              </TextField>
            </Fieldset>

            {/* Error Message */}
            {serverError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm">
                {serverError}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 border-t border-neutral-800 pt-6">
              <Button
                type="button"
                variant="tertiary"
                className="px-5 py-2.5 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-neutral-300 font-medium"
                onClick={() => router.back()}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                isDisabled={!canPostJob || isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold flex items-center gap-2 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Publishing...</span>
                ) : (
                  <>
                    <span>Publish Job</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
