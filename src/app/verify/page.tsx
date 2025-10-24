"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useVerification } from "~/contexts/VerificationContext";
import { startVerification } from "~/services/api";

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    setIsVerified,
    setWalletAddress,
    setVerificationCid,
    checkUserVerification,
  } = useVerification();
  const router = useRouter();
  const { address, isConnected } = useAccount();

  const handleVerify = async () => {
    if (!address) {
      setError("Wallet not detected. Please try again.");
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      // Call the real Keystone verification API
      const response = await startVerification({
        walletAddress: address,
        verificationType: "student",
      });

      // Update context with verification data
      setIsVerified(true);
      setWalletAddress(address);
      setVerificationCid(response.cid);

      // Show success and redirect
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      console.error("Verification failed:", err);
      setError(err.message || "Verification failed. Please try again later.");
      setIsVerifying(false);
    }
  };

  const handleCheckExisting = async () => {
    if (!address) {
      setError("Wallet not detected. Please try again.");
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      await checkUserVerification(address);
      router.push("/");
    } catch (err: any) {
      setError("Failed to check verification status");
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Main Card */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-purple-500/20 p-8 md:p-12">
          <div className="text-center">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Student Verification
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto">
              Verify your student status to unlock exclusive grants and
              opportunities
            </p>

            {/* Wallet Status */}
            {isConnected && address && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/50 border border-purple-500/30 rounded-lg mb-8">
                <span className="text-sm font-semibold text-purple-300">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-8 max-w-md mx-auto">
                <p className="text-red-300 text-sm font-semibold">{error}</p>
              </div>
            )}

            {/* What You Get */}
            <div className="space-y-3 mb-8 text-left max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Secure Verification
                  </h3>
                  <p className="text-sm text-gray-400">
                    Protected KYC service integration
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Instant Access
                  </h3>
                  <p className="text-sm text-gray-400">
                    Unlock all grant programs immediately
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    Blockchain Verified
                  </h3>
                  <p className="text-sm text-gray-400">
                    Attestation stored on Base network
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white text-lg font-bold rounded-lg hover:bg-purple-700 border border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[240px]"
              >
                {isVerifying ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Start Verification</span>
                )}
              </button>

              <button
                onClick={handleCheckExisting}
                disabled={isVerifying}
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 text-white text-lg font-bold rounded-lg hover:bg-gray-700 border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed min-w-[240px]"
              >
                Check Existing Status
              </button>
            </div>

            {/* API Notice */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-gray-400 font-medium">
                Powered by Keystone Verification API
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
