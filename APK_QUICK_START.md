# 🚀 Quick Start: Get Your AyuTrace APK

## Easiest Method: GitHub Actions (Automated Build)

I've set up automatic APK building! Here's how to get your APK:

### Step 1: Push the Changes

```bash
git add .
git commit -m "Add Android APK build configuration"
git push origin main
```

### Step 2: Wait for Build (5-10 minutes)

1. Go to your GitHub repository: https://github.com/ramsevakmeena93-hub/ayutrace
2. Click on "Actions" tab
3. You'll see "Build Android APK" workflow running
4. Wait for it to complete (green checkmark ✅)

### Step 3: Download Your APK

**Option A: From Artifacts**
1. Click on the completed workflow run
2. Scroll down to "Artifacts" section
3. Download "ayutrace-debug-apk"
4. Extract the ZIP file
5. You'll get `app-debug.apk`

**Option B: From Releases**
1. Go to "Releases" section in your GitHub repo
2. Find the latest release
3. Download `app-debug.apk` directly

### Step 4: Install on Your Phone

1. Transfer the APK to your Android phone
2. Enable "Install from Unknown Sources":
   - Settings > Security > Unknown Sources (enable)
   - Or Settings > Apps > Special Access > Install Unknown Apps
3. Tap the APK file to install
4. Open AyuTrace app!

## Alternative: Use PWABuilder (No Code Required)

If you want an APK right now without waiting:

1. Go to: https://www.pwabuilder.com/
2. Enter your URL: `https://ramsevakmeena93-hub.github.io/ayutrace/`
3. Click "Start"
4. Click "Build My PWA"
5. Select "Android" platform
6. Click "Generate"
7. Download your APK!

## What's Included in the APK?

✅ Full AyuTrace application
✅ Offline support (PWA features)
✅ Native Android app experience
✅ Home screen icon
✅ Splash screen
✅ All features working

## Build Status

After pushing, you can check build status at:
https://github.com/ramsevakmeena93-hub/ayutrace/actions

## Troubleshooting

### Build Failed?
- Check the Actions logs for errors
- Make sure all files are committed
- Try triggering the workflow manually (Actions > Build Android APK > Run workflow)

### APK Won't Install?
- Enable "Install from Unknown Sources"
- Make sure you have enough storage space
- Try uninstalling any previous version first

### App Crashes?
- This is a debug build for testing
- Check if your Android version is 5.0 or higher
- Clear app data and try again

## Next Steps

1. **Test the APK** on your device
2. **Share with team** for testing
3. **Build signed APK** for production (see APK_BUILD_GUIDE.md)
4. **Publish to Google Play Store** (optional)

## Need a Signed APK for Production?

For publishing to Google Play Store, you'll need a signed release APK. See the full guide in `APK_BUILD_GUIDE.md` for instructions on:
- Generating a keystore
- Building signed APK
- Publishing to Play Store

---

**Ready to build?** Just push the changes and GitHub Actions will do the rest! 🎉
