# Implementation Plan - Use Exact Club Logo Image

Update all application icons, PWA manifest entries, HTML favicon/apple-touch-icon, and the `ClubLogo` React component to directly use the user's provided `public/club-logo.png` image without any vector distortion or alterations.

## User Request
- The user wants the exact uploaded/provided image (`club-logo.png`) to be used as the official app logo (`وەک وێنەکە بێت`).

## Proposed Changes

### 1. Update `ClubLogo.tsx` Component
- Modify `src/components/ClubLogo.tsx` to use `/club-logo.png` as the default logo source when `logoUrl` is not provided.
- Ensure proper sizing (`object-contain`, padding/aspect ratio) so the circular badge is displayed perfectly without cropping or distortion.

### 2. Update PWA Manifest Icons (`public/manifest.json`)
- Ensure all PWA icons (`192x192`, `512x512`, maskable variants) point to or use processed versions of `/club-logo.png` with correct padding (safe zones) so Android adaptive icons do not clip the edges.

### 3. Update HTML Head Favicon & Icons (`index.html`)
- Update favicon and apple-touch-icon links in `index.html` to reference `/club-logo.png`.

## Verification Plan
- Compile the applet using `compile_applet`.
- Verify no TypeScript or build errors.
