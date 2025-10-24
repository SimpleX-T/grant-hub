"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { checkVerificationStatus } from "~/services/api";

interface VerificationContextType {
  isVerified: boolean;
  walletAddress: string | null;
  verificationCid: string | null;
  setIsVerified: (verified: boolean) => void;
  setWalletAddress: (address: string | null) => void;
  setVerificationCid: (cid: string | null) => void;
  checkUserVerification: (address: string) => Promise<void>;
}

const VerificationContext = createContext<VerificationContextType | undefined>(
  undefined
);

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [verificationCid, setVerificationCid] = useState<string | null>(null);

  // Load verification status from localStorage on mount
  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress");
    const storedVerification = localStorage.getItem("isVerified");
    const storedCid = localStorage.getItem("verificationCid");

    if (storedAddress) {
      setWalletAddress(storedAddress);
      if (storedVerification === "true") {
        setIsVerified(true);
      }
      if (storedCid) {
        setVerificationCid(storedCid);
      }
    }
  }, []);

  // Check verification status from API
  const checkUserVerification = async (address: string) => {
    try {
      const status = await checkVerificationStatus(address);
      setIsVerified(status.isVerified);
      if (status.cid) {
        setVerificationCid(status.cid);
        localStorage.setItem("verificationCid", status.cid);
      }
      localStorage.setItem("isVerified", status.isVerified.toString());
    } catch (error) {
      console.error("Failed to check verification:", error);
    }
  };

  // Update localStorage when verification changes
  useEffect(() => {
    if (walletAddress) {
      localStorage.setItem("walletAddress", walletAddress);
    } else {
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("isVerified");
      localStorage.removeItem("verificationCid");
    }
  }, [walletAddress]);

  useEffect(() => {
    localStorage.setItem("isVerified", isVerified.toString());
  }, [isVerified]);

  return (
    <VerificationContext.Provider
      value={{
        isVerified,
        walletAddress,
        verificationCid,
        setIsVerified,
        setWalletAddress,
        setVerificationCid,
        checkUserVerification,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerification() {
  const context = useContext(VerificationContext);
  if (context === undefined) {
    throw new Error(
      "useVerification must be used within a VerificationProvider"
    );
  }
  return context;
}
