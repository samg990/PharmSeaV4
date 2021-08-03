import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';

import { Auth } from 'aws-amplify';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider
} from 'native-base';






export default function ConfirmSignUp({ navigation }) {

   const [username, setUsername] = useState('');

  const [authCode, setAuthCode] = useState('');


  async function confirmSignUp() {

    try {

      await Auth.confirmSignUp(username, authCode);

      console.log(' Code confirmed');

      navigation.navigate('SignIn');

    } catch (error) {

      console.log(

        ' Verification code does not match. Please enter a valid verification code.',

        error.code

      );

    }

  }


  return (

     <NativeBaseProvider>
     <Box
        flex={1}
        p={2}
        w="90%"
        marginTop={20}
        mx='auto'
      >

       <Heading size="lg" color='primary.500'>
          Please Enter Confirmation Code
        </Heading>
        

        <VStack space={2} mt={5}>

             
            <Input placeholder="Enter Email" value={username} onChangeText={text => setUsername(text)} />           
        
          
            <Input placeholder="Enter Code" value={authCode} onChangeText={text => setAuthCode(text)} keyboardType="numeric"/>

            
          
            <Button  onPress={() => confirmSignUp()}>
                Confirm
            </Button>
        </VStack>
      </Box>
    </NativeBaseProvider>

  );

}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15
  }
});