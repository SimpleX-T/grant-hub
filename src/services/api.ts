import {
  GrantsResponse,
  VerificationRequest,
  VerificationResponse,
  VerificationStatus,
  UserVerificationsResponse,
} from "~/types/grants";

const KARMA_API_BASE = "https://gapapi.karmahq.xyz";
const KEYSTONE_API_BASE = "https://keystone-hqwu.onrender.com";

// Grants API Functions
export async function fetchGrants(
  limit: number = 12,
  offset: number = 0,
  status: string = "Active"
): Promise<GrantsResponse> {
  const response = await fetch(
    `${KARMA_API_BASE}/registry?limit=${limit}&offset=${offset}&status=${status}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch grants");
  }

  return response.json();
}

// Verification API Functions
export async function startVerification(
  data: VerificationRequest
): Promise<VerificationResponse> {
  const response = await fetch(`${KEYSTONE_API_BASE}/start-verification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to start verification");
  }

  return response.json();
}

export async function checkVerificationStatus(
  address: string
): Promise<VerificationStatus> {
  const response = await fetch(
    `${KEYSTONE_API_BASE}/simple-status?address=${address}`
  );

  if (!response.ok) {
    throw new Error("Failed to check verification status");
  }

  return response.json();
}

export async function getUserVerifications(
  address: string,
  requestedBy?: string
): Promise<UserVerificationsResponse> {
  const url = requestedBy
    ? `${KEYSTONE_API_BASE}/verifications?address=${address}&requestedBy=${requestedBy}`
    : `${KEYSTONE_API_BASE}/verifications?address=${address}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch user verifications");
  }

  return response.json();
}

// Check if user has specific verification type with consent
export async function checkStudentStatus(
  address: string,
  appId?: string
): Promise<boolean> {
  try {
    const data = await getUserVerifications(address, appId);
    const studentVerification = data.verifications.find(
      (v) => v.verification_type === "student"
    );
    return !!(
      studentVerification?.isVerified && studentVerification?.consented
    );
  } catch (error) {
    console.error("Failed to check student status:", error);
    return false;
  }
}

export async function checkStatusWithSignature(
  address: string,
  signature: string
): Promise<VerificationStatus> {
  const response = await fetch(
    `${KEYSTONE_API_BASE}/check-status?address=${address}&signature=${signature}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to verify signature");
  }

  return response.json();
}
