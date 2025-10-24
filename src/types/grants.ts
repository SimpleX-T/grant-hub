export interface GrantProgram {
  _id: { $oid: string };
  profileId: string;
  chainID: number;
  name: string;
  isValid: boolean;
  createdByAddress: string;
  metadata: {
    title: string;
    description: string;
    programBudget: number;
    amountDistributedToDate: number;
    minGrantSize: number;
    maxGrantSize: number;
    grantsToDate: number;
    startsAt?: string;
    endsAt?: string;
    website?: string;
    projectTwitter?: string;
    socialLinks: {
      twitter?: string;
      website?: string;
      discord?: string;
      orgWebsite?: string;
      blog?: string;
      forum?: string;
      grantsSite?: string;
      telegram?: string;
    };
    bugBounty?: string;
    categories: string[];
    ecosystems: string[];
    organizations: string[];
    networks: string[];
    grantTypes: string[];
    platformsUsed: string[];
    logoImg?: string;
    bannerImg?: string;
    status: string;
    type: string;
    tags: string[];
  };
  createdAt: string;
  updatedAt: string;
  programId: string;
  admins: string[];
}

export interface GrantsResponse {
  programs: GrantProgram[];
  count: number;
}

export interface VerificationRequest {
  walletAddress: string;
  verificationType?: string;
}

export interface VerificationResponse {
  status: string;
  walletAddress: string;
  is_over_18: boolean;
  country: string;
  verifiedAt: string;
  cid: string;
  baseTxHash: string;
}

export interface VerificationStatus {
  isVerified: boolean;
  cid?: string;
}

export interface UserVerification {
  isVerified: boolean;
  consented: boolean;
  cid: string;
  verification_type: string;
  status: string;
  verifiedAt: string;
  baseTxHash: string;
}

export interface UserVerificationsResponse {
  walletAddress: string;
  verifications: UserVerification[];
}
