#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "${script_dir}/.." && pwd)"

is_azure_static_export() {
  [[ "${NEXT_OUTPUT_EXPORT:-}" == "1" ]] && return 0
  [[ "${IS_STATIC_EXPORT:-}" == "true" || "${IS_STATIC_EXPORT:-}" == "True" || "${IS_STATIC_EXPORT:-}" == "1" ]] && return 0
  [[ "${GITHUB_WORKFLOW:-}" == *"Azure Static Web Apps"* ]] && return 0
  [[ -n "${ORYX_ENV_TYPE:-}" ]] && return 0
  return 1
}

if is_azure_static_export; then
  cd "${project_root}"
  export NEXT_OUTPUT_EXPORT=1
  export NEXT_TELEMETRY_DISABLED="${NEXT_TELEMETRY_DISABLED:-1}"
  echo "Building static Next.js export for Azure Static Web Apps..."
  exec npx next build
fi

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec bash "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

command -v timeout >/dev/null || {
  echo "build-verified.sh requires GNU timeout." >&2
  exit 69
}

vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
if [[ ! -x "${vinext}" ]]; then
  echo "vinext is unavailable. Run npm run install:ci and wait for it to finish before building." >&2
  exit 69
fi

echo "Running bounded vinext build..."
timeout \
  --signal=TERM \
  --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
  "${SITES_BUILD_TIMEOUT:-3m}" \
  "${vinext}" build

bash "${script_dir}/validate-artifact.sh"
