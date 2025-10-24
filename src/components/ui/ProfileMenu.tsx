"use client";

import { useState, useRef, useEffect } from "react";
import { useAccount } from "wagmi";
import { useMiniApp } from "@neynar/react";
import { useVerification } from "~/contexts/VerificationContext";
import Link from "next/link";

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { address, isConnected } = useAccount();
  const { context } = useMiniApp();
  const { isVerified } = useVerification();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const user = context?.user;
  const avatarUrl = user?.pfpUrl;
  const username = user?.username;
  const displayName = user?.displayName;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-full"
      >
        <div className="relative">
          {/* Avatar Image */}
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 border-2 border-gray-700">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={username || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Verification Status Indicator */}
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-gray-950 ${
              isVerified ? "bg-green-500" : "bg-gray-500"
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-gray-900 border border-purple-500/30 rounded-lg shadow-xl overflow-hidden z-50">
          {/* User Info Section */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 border-2 border-gray-700 flex-shrink-0">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={username || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                {displayName && (
                  <div className="text-white font-semibold truncate">
                    {displayName}
                  </div>
                )}
                {username && (
                  <div className="text-gray-400 text-sm truncate">
                    @{username}
                  </div>
                )}
                {user?.fid && (
                  <div className="text-gray-500 text-xs">FID: {user.fid}</div>
                )}
              </div>
            </div>

            {/* Verification Status */}
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                isVerified
                  ? "bg-green-900/30 border border-green-500/30"
                  : "bg-gray-800/50 border border-gray-700/50"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isVerified ? "bg-green-500" : "bg-gray-500"
                }`}
              />
              <span
                className={`text-sm font-semibold ${
                  isVerified ? "text-green-300" : "text-gray-400"
                }`}
              >
                {isVerified ? "Verified Student" : "Not Verified"}
              </span>
            </div>
          </div>

          {/* Wallet Section */}
          {isConnected && address && (
            <div className="p-4 border-b border-gray-800">
              <div className="text-xs font-semibold text-gray-400 uppercase mb-2">
                Wallet Address
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
                <code className="text-sm text-gray-300 flex-1 truncate min-w-0 break-all">
                  {address}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                  }}
                  className="text-gray-400 hover:text-white flex-shrink-0"
                  title="Copy address"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="p-2">
            {!isVerified && (
              <Link
                href="/verify"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-white hover:bg-purple-900/50 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Verify Student Status</span>
              </Link>
            )}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="font-medium">View Grants</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
