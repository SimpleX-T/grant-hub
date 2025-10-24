# ⚠️ Important: This Static File is NOT Used

The `farcaster.json` file in this directory is **NOT SERVED** to clients.

## Actual Manifest Source

Your Farcaster manifest is **dynamically generated** by:

- **Route Handler**: `src/app/.well-known/farcaster.json/route.ts`
- **Configuration**: `src/lib/constants.ts`
- **Generator**: `getFarcasterDomainManifest()` in `src/lib/utils.ts`

## Why Dynamic Generation?

1. **Environment Variables**: The manifest URLs are built from `process.env.NEXT_PUBLIC_URL`
2. **Single Source of Truth**: All config in one place (`constants.ts`)
3. **Type Safety**: TypeScript ensures manifest is valid
4. **Flexibility**: Easy to add conditional logic

## How to Update the Manifest

1. Edit values in `src/lib/constants.ts`
2. Redeploy your app
3. The manifest will automatically reflect your changes

## This Static File

This file exists as a reference/backup but is never served. The Next.js route handler at `src/app/.well-known/farcaster.json/route.ts` takes precedence over static files in the `public/` directory for this path.

You can safely:

- Keep it as documentation
- Delete it (won't affect anything)
- Update it to match your constants (but it still won't be used)

## Verify Your Live Manifest

After deploying, check:

```
https://your-domain.com/.well-known/farcaster.json
```

You should see the dynamically generated version from your constants, NOT this static file.
