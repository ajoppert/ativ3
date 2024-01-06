import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomButton from '../../components/CustomButton';

const HomeScreen = ({ route, navigation }) => {

    const onBackPress = () => {
        navigation.navigate('SignIn');
      };
 
    return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Bem vindo, {route.params.username}!</Text>
      </View>

      <CustomButton
          text="Voltar!"
          onPress={onBackPress}
          type="TERTIARY"
        />      
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

export default HomeScreen;