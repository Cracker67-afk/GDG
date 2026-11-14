function validateAccess(input) {
  if (
    typeof input !== "object" ||
    input === null ||
    Array.isArray(input) ||
    typeof input.user !== "object" ||
    input.user === null ||
    Array.isArray(input.user) ||
    typeof input.required_region !== "string" ||
    input.required_region.length === 0 ||
    typeof input.user.status !== "string" ||
    typeof input.user.region !== "string" ||
    typeof input.user.clearance !== "number" ||
    !Number.isFinite(input.user.clearance) ||
    typeof input.user.revoked !== "boolean"
  ) {
    return { authorized: false, reason: "INVALID_INPUT" };
  }

  if (input.user.revoked === true) {
    return { authorized: false, reason: "REVOKED" };
  }

  if (input.user.status !== "ACTIVE") {
    return { authorized: false, reason: "INACTIVE" };
  }

  if (input.user.clearance < 5) {
    return { authorized: false, reason: "LOW_CLEARANCE" };
  }

  if (input.user.region !== input.required_region) {
    return { authorized: false, reason: "REGION_MISMATCH" };
  }

  return { authorized: true, reason: "OK" };
}