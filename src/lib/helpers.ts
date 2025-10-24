import { GrantProgram } from "~/types/grants";

export const getGrantIcon = (grant: GrantProgram): string => {
  const categories = grant.metadata.categories;
  if (categories.includes("DeFi")) return "DeFi";
  if (categories.includes("Infrastructure")) return "Infra";
  if (categories.includes("AI")) return "AI";
  if (categories.includes("Communities")) return "Community";
  if (categories.includes("Gaming") || categories.includes("GameFi"))
    return "Gaming";
  if (categories.includes("NFT")) return "NFT";
  return "Grant";
};

export const formatBudget = (budget: number): string => {
  if (budget >= 1000000) return `$${(budget / 1000000).toFixed(1)}M`;
  if (budget >= 1000) return `$${(budget / 1000).toFixed(0)}K`;
  if (budget > 0) return `$${budget}`;
  return "Not specified";
};
