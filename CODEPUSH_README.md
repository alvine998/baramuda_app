# 🚀 CodePush Integration with AppsOnAir

## Overview
This React Native app is integrated with **CodePush** from **AppsOnAir** for seamless over-the-air updates without requiring app store submissions.

## 📋 Configuration

### Android Setup ✅
- **Deployment Key:** `eQmDhDN3g7tO4V4778OdbSj7BsaTUFUkylz`
- **Server URL:** `https://codepush.appsonair.com`
- **App Name:** `Baramuda 08`

### iOS Setup
- **Deployment Key:** `YOUR_IOS_DEPLOYMENT_KEY` (Replace with actual iOS key)
- **Server URL:** `https://codepush.appsonair.com`

## 🔧 Integration Details

### App.tsx Configuration
```typescript
import CodePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  deploymentKey: getCodePushConfig().deploymentKey,
  serverUrl: getCodePushConfig().serverUrl,
};

export default CodePush(codePushOptions)(App);
```

### Native Configuration
- **Android:** Configured via `strings.xml`
- **iOS:** Configured via `Info.plist`

## 📦 Deployment Scripts

### Available Commands
```bash
# Staging deployments
npm run codepush:android:staging
npm run codepush:ios:staging

# Production deployments
npm run codepush:android:production
npm run codepush:ios:production
```

## 🚀 Deployment Process

### 1. Create AppsOnAir Account
1. Go to [AppsOnAir](https://appsonair.com)
2. Create an account and organization
3. Create Android and iOS apps in your dashboard

### 2. Get Deployment Keys
1. In AppsOnAir dashboard, go to your app
2. Navigate to CodePush section
3. Copy the deployment keys for Staging and Production

### 3. Update Configuration
- **Android:** Update `android/app/src/main/res/values/strings.xml`
- **iOS:** Update `ios/baramuda_app/Info.plist`

### 4. Deploy Updates
```bash
# For Android Staging
npm run codepush:android:staging

# For Android Production
npm run codepush:android:production

# For iOS (replace YOUR_IOS_DEPLOYMENT_KEY in App.tsx first)
npm run codepush:ios:staging
```

## 🔄 Update Process

### Automatic Updates
- **Check Frequency:** Every app resume
- **Install Mode:** Immediate (no user interaction required)
- **Mandatory Updates:** Force immediate installation

### Update Flow
1. App launches and checks for updates
2. If update available, downloads in background
3. Update installs immediately on next app restart
4. User sees "Update Installed" toast notification

## 🎯 Features

### Status Callbacks
- ✅ Checking for update
- ✅ Downloading package
- ✅ Installing update
- ✅ Update installed notification

### Error Handling
- Fallback to hardcoded keys if native config fails
- Platform-specific configuration handling
- Comprehensive error logging

## 📱 Testing

### Test Update Process
1. Deploy a staging build with a visible change
2. Install on test device
3. Deploy an update via CodePush
4. Verify update installs automatically

### Debugging
```typescript
// Enable CodePush logging
console.log('CodePush Status:', syncStatus);
console.log('CodePush Progress:', progress);
```

## 🔐 Security

- Deployment keys are stored securely in native configuration
- Updates are signed and verified
- Mandatory updates cannot be ignored by users

## 📈 Best Practices

1. **Separate Environments:** Use Staging for testing, Production for releases
2. **Gradual Rollout:** Test on small percentage before full deployment
3. **Version Management:** Keep track of what changes are in each deployment
4. **Rollback Plan:** Always have a rollback strategy ready

## 🆘 Troubleshooting

### Common Issues
- **Update not installing:** Check deployment key configuration
- **Network errors:** Verify server URL and connectivity
- **Build errors:** Ensure CodePush is properly linked

### Debug Commands
```bash
# Check CodePush status
npx react-native-code-push check

# View deployment history
npx react-native-code-push deployment list
```

---

**🎉 Your Baramuda 08 app is now ready for seamless over-the-air updates via AppsOnAir CodePush!**
