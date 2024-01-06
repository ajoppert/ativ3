import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

const NewPasswordScreen = () => {
  
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  const onSubmitPressed = async data => {
    try {
      navigation.navigate('SignIn');
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
        <Text style={styles.title}>Atualizar senha</Text>

        <CustomInput
          placeholder="Usuário"
          name="username"
          control={control}
          rules={{required: 'Usuário é obrigatório'}}
        />

        <CustomInput
          placeholder="Código"
          name="code"
          control={control}
          rules={{required: 'Código é obrigatório'}}
        />

        <CustomInput
          placeholder="Informa a nova senha"
          name="password"
          control={control}
          secureTextEntry
          rules={{
            required: 'Senha é obrigatório',
            minLength: {
              value: 5,
              message: 'Senha deve conter o mínimo de 5 caracteres',
            },
          }}
        />

        <CustomButton text="Gravar" onPress={handleSubmit(onSubmitPressed)} />

        <CustomButton
          text="Voltar para o login"
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

export default NewPasswordScreen;