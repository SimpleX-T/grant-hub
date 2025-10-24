import { type AccountAssociation } from "@farcaster/miniapp-core/src/manifest";

/**
 * Application constants and configuration values.
 *
 * This file contains all the configuration constants used throughout the mini app.
 * These values are either sourced from environment variables or hardcoded and provide
 * configuration for the app's appearance, behavior, and integration settings.
 *
 * NOTE: This file is automatically updated by the init script.
 * Manual changes may be overwritten during project initialization.
 */

// --- App Configuration ---
/**
 * The base URL of the application.
 * Used for generating absolute URLs for assets and API endpoints.
 */
export const APP_URL: string = process.env.NEXT_PUBLIC_URL!;

/**
 * The name of the mini app as displayed to users.
 * Used in titles, headers, and app store listings.
 */
export const APP_NAME: string = "Grant Hub";

/**
 * A brief description of the mini app's functionality.
 * Used in app store listings and metadata.
 */
export const APP_DESCRIPTION: string =
  "Discover Web3 Grants on Base and other EVM networks";

/**
 * Short subtitle displayed under the app name.
 * Max 30 characters, no emojis or special characters.
 */
export const APP_SUBTITLE: string = "Discover Web3 Grants";

/**
 * Detailed description for promotional purposes.
 * Max 170 characters, no emojis or special characters.
 */
export const APP_LONG_DESCRIPTION: string =
  "Explore and apply for grants programs. Browse active opportunities and get verified to unlock exclusive access.";

/**
 * Marketing tagline for the app.
 * Max 30 characters.
 */
export const APP_TAGLINE: string = "Discover Web3 Grant Programs";

/**
 * Open Graph title for social sharing.
 * Max 30 characters.
 */
export const APP_OG_TITLE: string = "Grant Hub";

/**
 * Open Graph description for social sharing.
 * Max 100 characters.
 */
export const APP_OG_DESCRIPTION: string =
  "Discover Web3 Grants on Base and other EVM networks";

/**
 * The primary category for the mini app.
 * Used for app store categorization and discovery.
 */
export const APP_PRIMARY_CATEGORY: string = "finance";

/**
 * Tags associated with the mini app.
 * Used for search and discovery in app stores.
 */
export const APP_TAGS: string[] = [
  "grants",
  "funding",
  "opportunities",
  "web3",
  "builders",
];

// --- Asset URLs ---
/**
 * URL for the app's icon image.
 * Used in app store listings and UI elements.
 */
export const APP_ICON_URL: string = `${APP_URL}/icon.png`;

/**
 * URL for the app's Open Graph image.
 * Used for social media sharing and previews.
 */
export const APP_OG_IMAGE_URL: string = `${APP_URL}/api/opengraph-image`;

/**
 * URL for the app's splash screen image.
 * Displayed during app loading.
 */
export const APP_SPLASH_URL: string = `${APP_URL}/splash.png`;

/**
 * Background color for the splash screen.
 * Used as fallback when splash image is loading.
 */
export const APP_SPLASH_BACKGROUND_COLOR: string = "#9333EA";

/**
 * URL for the app's hero/promotional image.
 * Used in app store and promotional displays (1200 x 630px).
 */
export const APP_HERO_IMAGE_URL: string = `${APP_URL}/api/opengraph-image`;

/**
 * Account association for the mini app.
 * Used to associate the mini app with a Farcaster account.
 * If not provided, the mini app will be unsigned and have limited capabilities.
 */
export const APP_ACCOUNT_ASSOCIATION: AccountAssociation | undefined = {
  header:
    "eyJmaWQiOjgzNDY5NiwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDhEREFlNENDZjVGQjJhY2E4RTdGYWNlNUUyNGJFNzI4NDVBRGYyMkYifQ",
  payload: "eyJkb21haW4iOiJncmFudC1odWItcHNpLnZlcmNlbC5hcHAifQ",
  signature:
    "TbpT5/8pUWoqaHhl/jrV2A6R6rBVB3SpwQzvO1zduztb22Qokluv6SFU5vNnhFlReLxt/hDx/jPXGNhwPPsI5xw=",
};

// --- UI Configuration ---
/**
 * Text displayed on the main action button.
 * Used for the primary call-to-action in the mini app.
 */
export const APP_BUTTON_TEXT: string = "Discover Grants";

// --- Integration Configuration ---
/**
 * Webhook URL for receiving events from Neynar.
 *
 * If Neynar API key and client ID are configured, uses the official
 * Neynar webhook endpoint. Otherwise, falls back to a local webhook
 * endpoint for development and testing.
 */
export const APP_WEBHOOK_URL: string = `${APP_URL}/api/webhook`;

/**
 * Flag to enable/disable wallet functionality.
 *
 * When true, wallet-related components and features are rendered.
 * When false, wallet functionality is completely hidden from the UI.
 * Useful for mini apps that don't require wallet integration.
 */
export const USE_WALLET: boolean = true;

/**
 * Flag to enable/disable analytics tracking.
 *
 * When true, usage analytics are collected and sent to Neynar.
 * When false, analytics collection is disabled.
 * Useful for privacy-conscious users or development environments.
 */
export const ANALYTICS_ENABLED: boolean = true;

/**
 * Required chains for the mini app.
 *
 * Contains an array of CAIP-2 identifiers for blockchains that the mini app requires.
 * If the host does not support all chains listed here, it will not render the mini app.
 * If empty or undefined, the mini app will be rendered regardless of chain support.
 *
 * Supported chains: eip155:1, eip155:137, eip155:42161, eip155:10, eip155:8453,
 * solana:mainnet, solana:devnet
 */
export const APP_REQUIRED_CHAINS: string[] = ["eip155:8453"];

/**
 * Required capabilities for the mini app.
 * Specifies what SDK features the app needs from the host client.
 */
export const APP_REQUIRED_CAPABILITIES: string[] = [
  "actions.signIn",
  "wallet.getEthereumProvider",
];

/**
 * Return URL for the mini app.
 *
 * If provided, the mini app will be rendered with a return URL to be rendered if the
 * back button is pressed from the home page.
 */
export const RETURN_URL: string | undefined = undefined;

// PLEASE DO NOT UPDATE THIS
export const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = {
  name: "Farcaster SignedKeyRequestValidator",
  version: "1",
  chainId: 10,
  verifyingContract:
    "0x00000000fc700472606ed4fa22623acf62c60553" as `0x${string}`,
};

// PLEASE DO NOT UPDATE THIS
export const SIGNED_KEY_REQUEST_TYPE = [
  { name: "requestFid", type: "uint256" },
  { name: "key", type: "bytes" },
  { name: "deadline", type: "uint256" },
];
