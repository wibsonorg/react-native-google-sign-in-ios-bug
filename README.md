# Bug

## The Problem

On iOS, the user session is lost after closing the app.

## Expected Behavior

User session is kept alive after closing and re-opening the app. Google Sign In library shows the current user and can read current tokens.

## Actual Behavior

`getTokens` throws exception, `getCurrentUser` returns `null` **BUT** `isSignedIn` returns `true`❗ 
Firebase Auth still shows the user.

## Steps to Reproduce

1. `git clone https://github.com/wibsonorg/react-native-google-sign-in-ios-bug.git`
3. Download `GoogleService-Info.plist` file from Firebase and add it at `ios/GoogleService-Info.plist`.
4. Add the `REVERSED_CLIENT_ID` as an URL Type.
5. Run `yarn && yarn ios`
6. Sign in with any google account.
7. Force the app to close (see https://support.apple.com/en-us/HT201330 for specific instructions on how to do it in your model).
8. Re-open app.
9. Tap on the "Is Signed In?" and "Get Current User" buttons.

## More Insights
`getTokens` and `getCurrentUser` depend on reading the user by doing:
```
GIDGoogleUser *currentUser = [GIDSignIn sharedInstance].currentUser;
```
But `currentUser` is null since the app was closed and it does not restore it automatically from keychain.
I tried calling the following right before getting the user:
```
[[GIDSignIn sharedInstance] restorePreviousSignIn];
```
This should restore the user using the keychain, but it did nothing.
Docs: https://developers.google.com/identity/sign-in/ios/reference/Classes/GIDSignIn#-restoreprevioussignin

## Environment

- react-native version: 0.63.3
- @react-native-community/google-signin version: 5.0.0
- cocoapods version: 1.10.0
- iOS version: 14

Pod Install output:
```
Auto-linking React Native module for target `example`: RNGoogleSignin
Analyzing dependencies
Fetching podspec for `DoubleConversion` from `../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec`
Fetching podspec for `Folly` from `../node_modules/react-native/third-party-podspecs/Folly.podspec`
Fetching podspec for `glog` from `../node_modules/react-native/third-party-podspecs/glog.podspec`
Downloading dependencies
Installing AppAuth (1.4.0)
Installing CocoaAsyncSocket (7.6.4)
Installing CocoaLibEvent (1.0.0)
Installing DoubleConversion (1.1.6)
Installing FBLazyVector (0.63.3)
Installing FBReactNativeSpec (0.63.3)
Installing Flipper (0.54.0)
Installing Flipper-DoubleConversion (1.1.7)
Installing Flipper-Folly (2.2.0)
Installing Flipper-Glog (0.3.6)
Installing Flipper-PeerTalk (0.0.4)
Installing Flipper-RSocket (1.1.0)
Installing FlipperKit (0.54.0)
Installing Folly (2020.01.13.00)
Installing GTMAppAuth (1.1.0)
Installing GTMSessionFetcher (1.4.0)
Installing GoogleSignIn (5.0.2)
Installing OpenSSL-Universal (1.0.2.19)
Installing RCTRequired (0.63.3)
Installing RCTTypeSafety (0.63.3)
Installing RNGoogleSignin (5.0.0)
Installing React (0.63.3)
Installing React-Core (0.63.3)
Installing React-CoreModules (0.63.3)
Installing React-RCTActionSheet (0.63.3)
Installing React-RCTAnimation (0.63.3)
Installing React-RCTBlob (0.63.3)
Installing React-RCTImage (0.63.3)
Installing React-RCTLinking (0.63.3)
Installing React-RCTNetwork (0.63.3)
Installing React-RCTSettings (0.63.3)
Installing React-RCTText (0.63.3)
Installing React-RCTVibration (0.63.3)
Installing React-callinvoker (0.63.3)
Installing React-cxxreact (0.63.3)
Installing React-jsi (0.63.3)
Installing React-jsiexecutor (0.63.3)
Installing React-jsinspector (0.63.3)
Installing ReactCommon (0.63.3)
Installing Yoga (1.14.0)
Installing YogaKit (1.18.1)
Installing boost-for-react-native (1.63.0)
Installing glog (0.3.5)
Generating Pods project
Integrating client project
Pod installation complete! There are 49 dependencies from the Podfile and 43 total pods installed.
```
