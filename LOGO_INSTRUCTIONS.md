# AyuTrace Logo Update Instructions

## Steps to Add Your Logo:

1. **Save the logo image** you provided as `ayutrace-logo.png` in the `public` folder
   - The logo should be saved at: `public/ayutrace-logo.png`
   - Recommended size: 500px width (height will auto-adjust)
   - Format: PNG with transparent background (if possible)

2. **Alternative logo names** (if you prefer):
   - You can also save it as `public/logo.png`
   - If you use a different name, update the Header.jsx file accordingly

3. **For best results**:
   - Use a high-resolution version of the logo
   - Ensure the background is transparent (PNG format)
   - The logo will automatically scale to 50px height in the header

4. **The logo is now configured in**:
   - Header component (`src/components/Header.jsx`)
   - It includes a fallback to the text logo if the image fails to load

## Current Implementation:

The Header component now looks for `/ayutrace-logo.png` in the public folder.
If the image is not found, it will automatically fall back to the text-based logo with the leaf icon.

## After adding the logo:

1. Commit the changes:
   ```bash
   git add public/ayutrace-logo.png
   git add src/components/Header.jsx
   git commit -m "Add AyuTrace logo to header"
   git push origin main
   ```

2. The GitHub Actions will automatically deploy the updated site with your new logo!
