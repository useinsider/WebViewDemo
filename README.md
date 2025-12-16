# Insider WebView Demo

<p align="center">
  <img src="assets/insider-logo-readme.jpg" alt="Insider Logo" />
</p>

## 📌 Description

This project is a simple **Android & iOS demo application** showcasing how to integrate and use basic features of the **Insider WebView SDK**.  
The example includes how to set up the WebView, setup **Insider SDK** on it, and load a web page on it. It also includes example implementations of commonly used SDK methods to help you get started quickly.

## 👀 Preview

<p align="center">
  <img src="assets/android-preview.gif" width="250" alt="Android Preview" />
</p>

## 🚀 Installation & Setup

The demo project is pre-configured and ready to run. You'll need to update a few settings specific to your implementation: partner name, app group, and bundle identifier.

For a quick start, Search for `FIXME-INSIDER` throughout the project to locate all required changes. Alternatively, Follow the platform-specific instructions below.

### Android Setup

1. Open the `android` folder in Android Studio
2. Add your `google-services.json` file to the `android/app` directory
3. Copy your keystore file to `android/app` and update the `signingConfigs` section in `android/app/build.gradle` with your keystore details
4. In `android/app/build.gradle.kts`, set the `applicationId` property to match your app's namespace
5. Update `manifestPlaceholders["partner"]` by replacing `insideryour_partner_name` with your actual partner name
6. Build and run the project

### iOS Setup

1. Open `ios/WebViewDemo.xcodeproj` in Xcode
2. Navigate to project settings and configure bundle identifiers and app groups for all three targets:
    - `WebViewDemo`
    - `InsiderNotificationService`
    - `InsiderNotificationContent`
3. In `AppDelegate.swift`, set the correct values for `APP_GROUP` and `INSIDER_PARTNER_NAME`
4. Update `Info.plist` by replacing the URL scheme `insideryour_partner_name` with your partner name
5. Configure app group identifiers in:
    - `InsiderNotificationService/NotificationService.swift`
    - `InsiderNotificationContent/NotificationViewController.swift`
6. Build and run the project

> **Note:** Insider's custom URL scheme must always start with `insider` followed by your partner name. For example, if your partner name is `demo`, the URL scheme should be `insiderdemo`.

## 🔗 Universal Links

### Android Setup

1. Replace the URL in `AndroidManifest.xml` with your domain

**Troubleshooting:** If clicking the URL or scanning its QR code doesn't open the app, verification may be incomplete.

To resolve:
1. Open your device's **Settings** > **Apps** > **[Your App]**
2. Navigate to **Set as default** > **Supported web addresses**
3. Enable the URL you configured

**Reference:** [Verify Android App Links](https://developer.android.com/training/app-links/verify-android-applinks)

### iOS Setup

1. Add your domain to **Associated Domains** for the main target (format: `applinks:yourdomain.com`)

**Troubleshooting:** If clicking the URL or scanning its QR code doesn't open the app, verification may be incomplete.

To resolve:
1. Create an `apple-app-site-association` file
2. Upload it to the root directory of your domain (e.g., `https://yourdomain.com/apple-app-site-association`)
3. Ensure the file is accessible via HTTPS without redirects

**Reference:** [Supporting Associated Domains](https://developer.apple.com/documentation/xcode/supporting-associated-domains)