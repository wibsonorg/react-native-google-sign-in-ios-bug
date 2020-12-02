/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '703350579229-rpu8m3780r9sdmqvdjpl2hrprtkmh05o.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/gmail.metadata'],
      offlineAccess: true,
    });
  }, []);

  return (
    <View style={{ paddingTop: 50 }}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={GoogleSignin.signIn}
      />
      <Button
        title="Is signed in?"
        onPress={async () => Alert.alert(JSON.stringify(await GoogleSignin.isSignedIn()))}
      />
      <Button
        title="Get Current User"
        onPress={async () => Alert.alert(JSON.stringify(await GoogleSignin.getCurrentUser()))}
      />
    </View>
  );
};

export default App;
