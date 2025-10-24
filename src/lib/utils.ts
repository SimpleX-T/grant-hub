import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type AccountAssociation } from "@farcaster/miniapp-core/src/manifest";
import {
  APP_BUTTON_TEXT,
  APP_DESCRIPTION,
  APP_ICON_URL,
  APP_NAME,
  APP_OG_IMAGE_URL,
  APP_PRIMARY_CATEGORY,
  APP_SPLASH_BACKGROUND_COLOR,
  APP_SPLASH_URL,
  APP_TAGS,
  APP_URL,
  APP_WEBHOOK_URL,
  APP_ACCOUNT_ASSOCIATION,
  APP_SUBTITLE,
  APP_LONG_DESCRIPTION,
  APP_TAGLINE,
  APP_OG_TITLE,
  APP_OG_DESCRIPTION,
  APP_HERO_IMAGE_URL,
  APP_REQUIRED_CAPABILITIES,
} from "./constants";

/**
 * Extended Manifest type with modern Farcaster Mini App fields.
 * The @farcaster/miniapp-core package has outdated types, so we define the complete spec here.
 */
type ModernManifest = {
  accountAssociation: AccountAssociation;
  miniapp: {
    version: "1";
    name: string;
    homeUrl: string;
    iconUrl: string;
    splashImageUrl?: string;
    splashBackgroundColor?: string;
    webhookUrl?: string;
    subtitle?: string;
    description?: string;
    primaryCategory?: string;
    tags?: string[];
    tagline?: string;
    ogTitle?: string;
    ogDescription?: string;
    heroImageUrl?: string;
    ogImageUrl?: string;
    screenshotUrls?: string[];
    requiredCapabilities?: string[];
    requiredChains?: string[];
    canonicalDomain?: string;
    noindex?: boolean;
  };
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMiniAppEmbedMetadata(ogImageUrl?: string) {
  return {
    version: "next",
    imageUrl: ogImageUrl ?? APP_OG_IMAGE_URL,
    ogTitle: APP_NAME,
    ogDescription: APP_DESCRIPTION,
    ogImageUrl: ogImageUrl ?? APP_OG_IMAGE_URL,
    button: {
      title: APP_BUTTON_TEXT,
      action: {
        type: "launch_frame",
        name: APP_NAME,
        url: APP_URL,
        splashImageUrl: APP_SPLASH_URL,
        iconUrl: APP_ICON_URL,
        splashBackgroundColor: APP_SPLASH_BACKGROUND_COLOR,
        description: APP_DESCRIPTION,
        primaryCategory: APP_PRIMARY_CATEGORY,
        tags: APP_TAGS,
      },
    },
  };
}

export async function getFarcasterDomainManifest(): Promise<ModernManifest> {
  return {
    accountAssociation: APP_ACCOUNT_ASSOCIATION!,
    miniapp: {
      version: "1",
      name: APP_NAME ?? "Grant Hub",
      homeUrl: APP_URL,
      iconUrl: APP_ICON_URL,
      splashImageUrl: APP_SPLASH_URL,
      splashBackgroundColor: APP_SPLASH_BACKGROUND_COLOR,
      webhookUrl: APP_WEBHOOK_URL,
      subtitle: APP_SUBTITLE,
      description: APP_LONG_DESCRIPTION,
      primaryCategory: APP_PRIMARY_CATEGORY,
      tags: APP_TAGS,
      tagline: APP_TAGLINE,
      ogTitle: APP_OG_TITLE,
      ogDescription: APP_OG_DESCRIPTION,
      heroImageUrl: APP_HERO_IMAGE_URL,
      ogImageUrl: APP_OG_IMAGE_URL,
      requiredCapabilities: APP_REQUIRED_CAPABILITIES,
    },
  };
}
