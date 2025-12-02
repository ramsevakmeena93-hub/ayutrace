# 📱 AyuTrace Android APK Build Guide

## Prerequisites

Before building the APK, you need to install:

1. **Node.js** (already installed ✅)
2. **Android Studio** - Download from: https://developer.android.com/studio
3. **Java JDK 17** - Required by Android Studio
4. **Android SDK** - Installed via Android Studio

## Method 1: Build APK Locally (Recommended)

### Step 1: Install Android Studio

1. Download Android Studio from https://developer.android.com/studio
2. Install Android Studio
3. During installation, make sure to install:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (optional, for testing)

### Step 2: Set Up Environment Variables

Add these to your system environment variables:

**Windows:**
```
ANDROID_HOME = C:\Users\YourUsername\AppData\Local\Android\Sdk
JAVA_HOME = C:\Program Files\Android\Android Studio\jbr
```

Add to PATH:
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%JAVA_HOME%\bin
```

### Step 3: Initialize Android Platform

```bash
# If android folder doesn't exist, create it
npm run android:init

# Or manually
npx cap add android
```

### Step 4: Build and Sync

```bash
# Build the web app and sync to Android
npm run android:sync
```

### Step 5: Build APK

**Option A: Debug APK (for testing)**
```bash
npm run android:build
```

The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

**Option B: Release APK (for production)**
```bash
npm run android:release
```

The APK will be at: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

### Step 6: Open in Android Studio (Optional)

```bash
npm run android:open
```

This opens the project in Android Studio where you can:
- Build APK using GUI
- Test on emulator
- Sign the APK
- Generate signed release APK

## Method 2: Build APK Using GitHub Actions (Automated)

I can create a GitHub Actions workflow that automatically builds the APK when you push code.

### Advantages:
- ✅ No need to install Android Studio locally
- ✅ Automatic builds on every push
- ✅ APK available as downloadable artifact
- ✅ Works from any computer

### Setup:

1. I'll create the workflow file
2. Push to GitHub
3. GitHub Actions will build the APK
4. Download APK from Actions artifacts

Would you like me to set this up?

## Method 3: Use Online APK Builders

### Option A: PWABuilder
1. Go to https://www.pwabuilder.com/
2. Enter your website URL: `https://ramsevakmeena93-hub.github.io/ayutrace/`
3. Click "Build My PWA"
4. Select Android
5. Download the generated APK

### Option B: Capacitor Cloud Build (Paid)
- https://ionic.io/appflow

## Signing Your APK (For Production)

### Generate Keystore:

```bash
keytool -genkey -v -keystore ayutrace-release-key.keystore -alias ayutrace -keyalg RSA -keysize 2048 -validity 10000
```

### Update capacitor.config.json:

```json
"android": {
  "buildOptions": {
    "keystorePath": "path/to/ayutrace-release-key.keystore",
    "keystorePassword": "your-password",
    "keystoreAlias": "ayutrace",
    "keystoreAliasPassword": "your-alias-password"
  }
}
```

### Build Signed APK:

```bash
cd android
./gradlew assembleRelease
```

Signed APK: `android/app/build/outputs/apk/release/app-release.apk`

## Testing Your APK

1. **Enable Developer Options** on your Android device:
   - Go to Settings > About Phone
   - Tap "Build Number" 7 times

2. **Enable USB Debugging**:
   - Settings > Developer Options > USB Debugging

3. **Install APK**:
   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

   Or transfer the APK to your phone and install manually.

## Troubleshooting

### Error: ANDROID_HOME not set
- Set the ANDROID_HOME environment variable to your Android SDK location

### Error: Gradle build failed
- Make sure Java JDK 17 is installed
- Run `./gradlew clean` in the android folder

### Error: SDK not found
- Open Android Studio
- Go to Tools > SDK Manager
- Install Android SDK Platform 33 or higher

## Current Configuration

✅ **Capacitor installed** - Version 7.4.4
✅ **Android platform ready** - @capacitor/android installed
✅ **Build scripts added** - npm run android:build
✅ **Config updated** - capacitor.config.json configured

## Quick Commands Reference

```bash
# Initialize Android platform
npm run android:init

# Build and sync
npm run android:sync

# Build debug APK
npm run android:build

# Build release APK
npm run android:release

# Open in Android Studio
npm run android:open
```

## Next Steps

1. Choose your preferred build method
2. Install required tools (if building locally)
3. Run the build commands
4. Test the APK on your device
5. Sign and publish to Google Play Store (optional)

## Need Help?

Let me know which method you'd like to use, and I can guide you through the specific steps!
