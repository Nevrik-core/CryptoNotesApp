import "react-native-gesture-handler";

import * as React from "react";
import Navigation from "./Navigation";
import { Platform } from 'react-native';

import SignInScreen from "./screens/SignInScreen";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "@firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "./firebaseConfig";

WebBrowser.maybeCompleteAuthSession();
const isWeb = Platform.OS === 'web';

export default function App() {
  const [userInfo, setUserInfo] = React.useState();
  const [reauest, response, promptAsync] = Google.useAuthRequest({
    clientId: isWeb ? process.env.EXPO_PUBLIC_WEB_CLIENT_ID : process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    redirectUri: isWeb ? undefined : 'com.nandr.encryptednotes://',
  },
  {
    useProxy: false,
  });

  React.useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch((error) => {
        console.log('Auth Error', error);
      });
      }
  }, [response])

  return <SignInScreen promptAsync={promptAsync}/>
  // return <Navigation/>
}
 