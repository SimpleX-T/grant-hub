"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useVerification } from "~/contexts/VerificationContext";
import Link from "next/link";

const promoDetails: Record<
  string,
  {
    title: string;
    description: string;
    emoji: string;
    discount: string;
    code: string;
    instructions: string[];
    validUntil: string;
  }
> = {
  "cafe-deal": {
    title: "☕ Student Cafe Deal",
    description: "Get 50% off on all beverages at participating coffee shops",
    emoji: "☕",
    discount: "50% OFF",
    code: "STUDENT-CAFE-50",
    instructions: [
      "Visit any participating coffee shop",
      "Show this promo code at checkout",
      "Enjoy your 50% discount on all beverages",
      "Valid for one use per day",
    ],
    validUntil: "December 31, 2025",
  },
  textbooks: {
    title: "📚 Discounted Textbooks",
    description: "Save up to 40% on your textbooks this semester",
    emoji: "📚",
    discount: "40% OFF",
    code: "BOOKS-2025-40",
    instructions: [
      "Browse our online textbook store",
      "Add items to your cart",
      "Enter this promo code at checkout",
      "Discount will be applied automatically",
    ],
    validUntil: "June 30, 2026",
  },
  streaming: {
    title: "🎵 Music Streaming Premium",
    description:
      "Enjoy ad-free music streaming with 6 months free premium subscription",
    emoji: "🎵",
    discount: "6 Months Free",
    code: "MUSIC-STUDENT-6M",
    instructions: [
      "Sign up or log in to the streaming service",
      "Go to subscription settings",
      "Enter this promo code",
      "Enjoy 6 months of premium features",
    ],
    validUntil: "December 31, 2025",
  },
  "tech-gear": {
    title: "💻 Tech Gear Discount",
    description: "Get exclusive discounts on laptops, tablets, and accessories",
    emoji: "💻",
    discount: "30% OFF",
    code: "TECH-EDU-30",
    instructions: [
      "Visit our tech store or website",
      "Select your desired products",
      "Apply this promo code at checkout",
      "Student verification may be required",
    ],
    validUntil: "August 31, 2026",
  },
};

export default function PromoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { isVerified } = useVerification();
  const router = useRouter();
  const promoId = params.id;
  const promo = promoDetails[promoId];

  useEffect(() => {
    if (!isVerified) {
      router.push("/verify");
    }
  }, [isVerified, router]);

  // If not verified, return null while redirecting
  if (!isVerified) {
    return null;
  }

  // If promo not found
  if (!promo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-3xl opacity-20 blur-2xl" />
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-gray-200/50">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl flex items-center justify-center text-5xl">
                ❌
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-red-800 bg-clip-text text-transparent mb-4">
                Promo Not Found
              </h1>
              <p className="text-gray-600 mb-8 text-lg">
                The promo you're looking for doesn't exist.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>Back to Promos</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-8 animate-bounce">
          <div className="inline-block">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-300">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-3xl opacity-20 blur-2xl" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
            {/* Success Banner */}
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white text-center">
              <h1 className="text-4xl font-bold mb-2">🎉 Congratulations!</h1>
              <p className="text-emerald-50 text-lg">
                You've unlocked this exclusive student deal
              </p>
            </div>

            {/* Promo Content */}
            <div className="p-8 md:p-12">
              {/* Icon and Title */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl text-6xl mb-6 shadow-lg">
                  {promo.emoji}
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-3">
                  {promo.title}
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  {promo.description}
                </p>
              </div>

              {/* Promo Code Card */}
              <div className="relative group/code mb-10">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-2xl opacity-50 blur group-hover/code:blur-lg transition-all" />
                <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-8 shadow-xl">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm font-bold text-emerald-800 uppercase tracking-wide">
                      Your Exclusive Code
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-6 mb-4 shadow-inner border border-emerald-100">
                    <p className="text-4xl font-black text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent tracking-wider font-mono">
                      {promo.code}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(promo.code);
                      alert("✅ Promo code copied to clipboard!");
                    }}
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5 group-hover:scale-110 transition-transform"
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
                    <span>Copy Code to Clipboard</span>
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-sm">
                    ℹ️
                  </span>
                  How to Use This Promo
                </h3>
                <div className="space-y-4">
                  {promo.instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-shadow"
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 font-medium pt-1">
                        {instruction}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid md:grid-cols-2 gap-4 mb-10">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-xl">💰</span>
                    </div>
                    <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                      Discount Value
                    </span>
                  </div>
                  <p className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {promo.discount}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-xl">📅</span>
                    </div>
                    <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">
                      Valid Until
                    </span>
                  </div>
                  <p className="text-xl font-bold text-gray-800">
                    {promo.validUntil}
                  </p>
                </div>
              </div>

              {/* Back Button */}
              <div className="text-center">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <svg
                    className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span>Browse More Deals</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
