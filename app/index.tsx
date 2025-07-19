import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import { usePathname, useRouter } from 'expo-router';
import SendSMS from 'react-native-sms'
import '../global.css'

globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true; // suppress firebase migration warnings

const index = () => {
  const pathname = usePathname();
  const router = useRouter();
  console.log('auth', auth().currentUser)
  useEffect(() => {
    console.log('auth', auth().currentUser)
  }, [])

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  function sendSMS() {
	SendSMS.send({
		body: 'The default body of the SMS!',
		recipients: ['6507033432'],
		successTypes: ['sent', 'queued'],
		allowAndroidSendWithoutReadPermission: true
	}, (completed, cancelled, error) => {

		console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

	});
  }

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (pathname == "/firebaseauth/link") router.back();
  }, [pathname]);

  async function signInWithPhoneNumber(phoneNumber: string) {
    console.log('phoneNumber', phoneNumber);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    sendSMS();
    console.log('confirmation', confirmation);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (initializing) return null;

  if (!user) {
    if (!confirm) {
      return (
        <SafeAreaView style={{marginBottom: 30}}>
          <TouchableOpacity
            onPress={() => signInWithPhoneNumber('+1 111-222-3333')}
            style={{ borderColor: 'red', borderWidth: 1, marginTop: 100}}
          >
            <Text className='text-xl font-bold text-blue-500'>Sign In</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView>
        <TextInput value={code} onChangeText={text => setCode(text)} style={{ borderColor: 'red', borderWidth: 1 }} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Text>Welcome! UID: {user.uid} Phone #: {user.phoneNumber}</Text>
      <Button title="Sign Out" onPress={() => auth().signOut()} />
    </SafeAreaView>
  );
}

export default index