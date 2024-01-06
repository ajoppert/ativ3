import React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';

const CustomSwitch = ({onValueChange, text, value}) => {

  //https://medium.com/@webcore1/react-native-login-remember-me-checkbox-solution-a16efdfdf056
  //https://dev.to/alanrmachado/criando-seu-proprio-componente-checkbox-no-react-native-3np6

  return (
    <View style={[
      styles.container,
    ]}>
      <Switch
        thumbColor={value ? '#3B71F3' : '#f4f3f4'}
        ios_backgroundColor="#3B71F3"        
        value={value}
        onValueChange={onValueChange} />
      <Text>{text}</Text>
    </View>    
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
});

export default CustomSwitch;