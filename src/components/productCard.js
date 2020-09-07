import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const CHECK_IMAGE = require('../assets/images/check-mark.png');

function ProductCard({product, submit, selected, addProduct}) {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      disabled={submit}
      onPress={() => {
        addProduct(product);
      }}>
      <View
        style={{
          ...styles.item,
          backgroundColor:
            submit && selected.includes(product)
              ? 'rgba(229,233,241,0.3)'
              : '#E5E9F1',
        }}>
        <Text style={styles.productName}>{product.name}</Text>
        {selected.includes(product) ? (
          <View style={{position: 'relative'}}>
            <Image source={CHECK_IMAGE} style={styles.radioButton} />
            <View style={styles.overlay} />
          </View>
        ) : (
          <View style={styles.radioButton} />
        )}
        <Text style={styles.productPrice}>{product.price} kr</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  radioButton: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#F6F3ED',
    borderWidth: 1,
    borderColor: '#F6F3ED',
    borderStyle: 'solid',
    alignSelf: 'flex-end',
  },
  item: {
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingLeft: 16,
    paddingRight: 24,
    fontSize: 23,
    borderRadius: 6,
    height: Dimensions.get('window').height * 0.14,
    width: '100%',
  },
  overlay:{

  },
  productName: {
    fontWeight: '600',
    fontSize: 20,
    color: '#1F2126',
  },
  productPrice: {
    fontWeight: '600',
    fontSize: 16,
    color: '#1F2126',
  },
  wrapper: {
    marginTop: 16,
  },
});

export default ProductCard;
