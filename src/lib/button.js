import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';

function Button({
  submitProducts,
  addSelectedData,
  scrollToTop,
  submit,
  selected,
}) {
  const buttonColor = selected.length ? '#2880EA' : '#E0ECFE';
  return (
    <TouchableOpacity
      onPress={() => {
        submitProducts(true);
        addSelectedData();
        scrollToTop();
      }}
      disabled={submit || selected.length > 5 || !selected.length}
      underlayColor="transparent"
      style={{
        width: '100%',
        borderRadius: 20,
        backgroundColor:
          submit || selected.length > 5 ? '#E0ECFE' : buttonColor,
        marginTop: 40,
      }}>
      <View style={styles.addButton}>
        <Text style={styles.buttonTextStyle}>Add to cart</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    height: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
