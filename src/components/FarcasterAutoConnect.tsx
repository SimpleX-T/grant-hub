"use client";

import { useEffect } from "react";
import { useConnect, useAccount } from "wagmi";
import { useMiniApp } from "@neynar/react";
import { useVerification } from "~/contexts/VerificationContext";

/**
 * FarcasterAutoConnect component
 *
 * Automatically connects the wallet when running in a Farcaster mini app environment.
 * This component leverages the Farcaster context from Neynar to detect when a user
 * is authenticated and automatically connects their wallet using the farcasterFrame connector.
 *
 * The auto-connection logic:
 * 1. Checks if we're in a Farcaster client environment
 * 2. Verifies the user has a valid FID (Farcaster ID)
 * 3. Auto-connects using the first available connector (farcasterFrame)
 * 4. Syncs the connected wallet address with the VerificationContext
 * 5. Logs detailed information for debugging
 */
export function FarcasterAutoConnect() {
  const { context } = useMiniApp();
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();
  const { setWalletAddress } = useVerification();

  // Auto-connect wallet when in Farcaster environment
  useEffect(() => {
    // Check if we're in a Farcaster client environment
    const isInFarcasterClient =
      typeof window !== "undefined" &&
      (window.location.href.includes("warpcast.com") ||
        window.location.href.includes("farcaster") ||
        (window as any).ethereum?.isFarcaster ||
        context?.client);

    // Auto-connect when Farcaster context is available and we're not already connected
    if (
      context?.user?.fid &&
      !isConnected &&
      connectors.length > 0 &&
      isInFarcasterClient
    ) {
      console.log("🔗 Farcaster Auto-Connect: Attempting connection...");
      console.log("  - User FID:", context.user.fid);
      console.log("  - Username:", context.user.username);
      console.log(
        "  - Available connectors:",
        connectors.map((c, i) => `${i}: ${c.name}`)
      );
      console.log("  - Using connector:", connectors[0].name);
      console.log("  - In Farcaster client:", isInFarcasterClient);

      // Use the first connector (farcasterFrame) for auto-connection
      try {
        connect({ connector: connectors[0] });
        console.log("✅ Auto-connection initiated");
      } catch (error) {
        console.error("❌ Auto-connection failed:", error);
      }
    } else {
      if (!isConnected) {
        console.log("⏸️ Farcaster Auto-Connect: Conditions not met");
        console.log("  - Has FID:", !!context?.user?.fid);
        console.log("  - Is connected:", isConnected);
        console.log("  - Has connectors:", connectors.length > 0);
        console.log("  - In Farcaster client:", isInFarcasterClient);
      }
    }
  }, [
    context?.user?.fid,
    context?.user?.username,
    context?.client,
    isConnected,
    connectors,
    connect,
  ]);

  // Sync connected wallet address with VerificationContext
  useEffect(() => {
    if (isConnected && address) {
      console.log(
        "💾 Syncing wallet address to verification context:",
        address
      );
      setWalletAddress(address);
    }
  }, [isConnected, address, setWalletAddress]);

  // This component doesn't render anything
  return null;
}
