import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();

  const onRegisterPressed = async data => {
    const {username, password, email, name} = data;
    try {
      navigation.navigate('ConfirmEmail', {username});
    } catch (e) {
      Alert.alert('Erro: ', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

 
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Criar uma conta</Text>

        <CustomInput
          name="name"
          control={control}
          placeholder="Nome"
          rules={{
            required: 'Nome é obrigatório',
            minLength: {
              value: 3,
              message: 'Nome deve ter no mínimo 3 caracteres',
            },
            maxLength: {
              value: 30,
              message: 'Nome deve ter no máximo 30 caracteres',
            },
          }}
        />

        <CustomInput
          name="username"
          control={control}
          placeholder="Usuário"
          rules={{
            required: 'Usuário é obrigatório',
            minLength: {
              value: 3,
              message: 'Usuário deve ter no mínimo 3 caracteres',
            },
            maxLength: {
              value: 15,
              message: 'Usuário deve ter no máximo 15 caracteres',
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email é obrigatório',
            pattern: {value: EMAIL_REGEX, message: 'Email é inválido'},
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Senha"
          secureTextEntry
          rules={{
            required: 'Senha é obrigatório',
            minLength: {
              value: 5,
              message: 'Senha deve ter no mínimo 5 caracteres',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Confirmação da senha"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'As senhas devem ser iguais',
          }}
        />

        <CustomButton
          text="Criar"
          onPress={handleSubmit(onRegisterPressed)}
        />

        <CustomButton
          text="Já possui uma conta? Login"
          onPress={onSignInPress}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUpScreen;