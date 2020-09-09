import React from 'react';
import {PixelRatio, Text, TouchableOpacity, StyleSheet} from 'react-native';

function Button({onPress, disabled, text, style}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      underlayColor="transparent"
      style={[
        styles.button,
        {backgroundColor: disabled ? '#E0ECFE' : '#2880EA'},
        style,
      ]}>
      <Text style={styles.buttonTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 20,
    marginTop: 40,
    marginBottom: PixelRatio.get() === 2 ? 20 : 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  buttonTextStyle: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FCFAF5',
    borderRadius: 50,
  },
});

export default Button;
