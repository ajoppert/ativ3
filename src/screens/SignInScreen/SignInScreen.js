import React, {useState, useEffect} from 'react';
import { View, Image, StyleSheet, useWindowDimensions, ScrollView, Alert } from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import CustomSwitch from '../../components/CustomSwitch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [remenberMe, setRemenberMe] = useState(false);  

  useEffect(()=>{
    getRememberedUser();
  }, [])

  const {
    control,
    handleSubmit,
    formState: {errors}, setValue
  } = useForm();

  const onSignInPressed = async data => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      (remenberMe) ? rememberUser(data.username) : forgetUser(data.username);
      navigation.navigate('Home', { username: data.username });
    } catch (e) {
      Alert.alert('Erro:', e.message);
    }
    setLoading(false);
  };

  const rememberUser = async (username) => {
    try {
      await AsyncStorage.setItem('@username', username);
      Alert.alert('AsyncStorage: usuário salvo!');
    } catch (e) {
      Alert.alert('Erro:', e.message);
    }
  };
  const forgetUser = async (username) => {
    try {
      await AsyncStorage.removeItem('@username');
      Alert.alert('AsyncStorage: usuário removido!');      
    } catch (e) {
      Alert.alert('Erro:', e.message);
    }
  };  
  const getRememberedUser = async () => {
    try {
      const username = await AsyncStorage.getItem('@username');
      if (username !== null) {
        setRemenberMe(true);
        setValue('username', username);
        Alert.alert('AsyncStorage: usuário lido e apresentado na interface!');           
      }
      else{
        Alert.alert('AsyncStorage: usuário não foi salvo para ser lido!');           
      }
    } catch (e) {
      Alert.alert('Erro:', e.message);
    }
  };  
  const onRemenberMePressed = () => {
    setRemenberMe(!remenberMe);
  };  
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };
  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <CustomInput
          name="username"
          placeholder="Usuário"
          control={control}
          rules={{required: 'Usuário é obrigatório'}}
        />

        <CustomInput
          name="password"
          placeholder="Senha"
          secureTextEntry
          control={control}
          rules={{
            required: 'Senha é obrigatório',
            minLength: {
              value: 5,
              message: 'Senha deve conter no mínimo 5 caracteres',
            },
          }}
        />

        <CustomButton
          text={loading ? 'Carregando...' : 'Login'}
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomSwitch
          name="rememberme" 
          text="Lembrar-me"
          value={remenberMe}
          onValueChange={onRemenberMePressed}
         />           

        <CustomButton
          text="Esqueceu a senha?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <CustomButton
          text="Não possui uma conta? Crie uma!"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;