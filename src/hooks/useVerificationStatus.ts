import { useState, useEffect } from "react";
import { checkVerificationStatus } from "~/services/api";

export function useVerificationStatus(
  walletAddress: string | null | undefined
) {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!walletAddress) {
      setLoading(false);
      return;
    }

    async function checkStatus() {
      try {
        const response = await checkVerificationStatus(walletAddress);
        setIsVerified(response.isVerified);
      } catch (error) {
        console.error("Verification check failed:", error);
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    }

    checkStatus();
  }, [walletAddress]);

  return { isVerified, loading };
}
