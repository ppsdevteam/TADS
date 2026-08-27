import type { NextConfig } from "next";

const isStaticExport =
  process.env.NEXT_OUTPUT_EXPORT === "1" ||
  process.env.IS_STATIC_EXPORT === "true" ||
  process.env.IS_STATIC_EXPORT === "True" ||
  process.env.IS_STATIC_EXPORT === "1" ||
  Boolean(process.env.ORYX_ENV_TYPE) ||
  (process.env.GITHUB_WORKFLOW ?? "").includes("Azure Static Web Apps");

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export" as const,
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
