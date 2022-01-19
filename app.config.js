
export default {
  "name": "AdLib",
  "slug": "AdLib",
  "version": "2",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "scheme": "adlib",
  "userInterfaceStyle": "automatic",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#000000"
  },
  "updates": {
    "fallbackToCacheTimeout": 0
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "ios": {
    "supportsTablet": true,
    "bundleIdentifier": 'fun.adlib',
    "config": {
      "googleSignIn": {
        // Your REVERSED_CLIENT_ID from the GoogleService-Info.plist
        "reservedClientId": "com.googleusercontent.apps.37621229835-p2mofi2t37ceuokj7qr7ium88oc0rbgc"
      }
    },
    "googleServicesFile": "./GoogleService-Info.plist"
  },
  "android": {
    "googleServicesFile": "./google-services.json",
    "googleMobileAdsAppId": "ca-app-pub-1988165118729553/4568596203",
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#000000"
    },
    "package": "fun.adlib",
    "permissions": [
      "CAMERA",
      "READ_EXTERNAL_STORAGE",
      "WRITE_EXTERNAL_STORAGE"
    ],
    "versionCode": 12
  },
  "web": {
    "favicon": "./assets/favicon.png",
    "config": {
      "apiKey": "AIzaSyB3qzhb5V8Y-L-4R7TO_ocfSPAuKcfMg4k",
      "measurementId": "G-3TF3D9ZPZD"
    }

  },
}