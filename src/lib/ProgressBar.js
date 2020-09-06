import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';

function ShoppingSlider({subtract, submit, selected, deleteProduct, progress}) {
  const progressBarAnimation = useRef(new Animated.Value(0));
  const animationHeight = useRef(new Animated.Value(0));
  const fadeIn = useRef(new Animated.Value(0));
  const [sliderCount, setSliderCount] = useState(5);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(progressBarAnimation.current, {
        toValue: submit && selected.length,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(animationHeight.current, {
        toValue: submit && selected.length,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(fadeIn.current, {
        toValue: submit && 1,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [submit, progress, selected]);

  const width = progressBarAnimation.current.interpolate({
    inputRange: [0, 5],
    outputRange: ['4%', '100%'],
    extrapolate: 'clamp',
  });
  const heightOfProduct = selected.length * 60 + 160;
  const height = animationHeight.current.interpolate({
    inputRange: [0, 1],
    outputRange: [160, heightOfProduct],
    extrapolate: 'clamp',
  });

  const opacity = fadeIn.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={{
        ...styles.container,
        height: height,
      }}>
      <Text style={styles.bigText}>Shopping cart</Text>
      <View>
        <Text style={styles.shoppingCartItemsTextWrapper}>
          <Text style={styles.itemsTextShoppingCart}>Items</Text>{' '}
          {submit ? selected.length : 0}/{sliderCount}
        </Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={
              ([StyleSheet.absoluteFill],
              {borderRadius: 20, backgroundColor: '#2880EA', width})
            }
          />
        </View>
        {submit && selected.length
          ? selected.map((product, index) => (
              <Animated.View
                style={{...styles.selectedProducts, opacity: opacity}}
                key={index}>
                <View style={styles.selectedProductName}>
                  <Text>{product.name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      deleteProduct(index);
                      subtract();
                    }}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                <Text>{product.price}</Text>
              </Animated.View>
            ))
          : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 6,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#FCFAF5',
    width: '100%',
  },
  deleteText: {
    color: '#E63636',
    textDecorationStyle: 'solid',
    textDecorationColor: '#E63636',
    textDecorationLine: 'underline',
  },
  selectedProducts: {
    height: 60,
  },
  selectedProductName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemsTextShoppingCart: {
    color: 'rgba(31,33,38,0.6)',
  },
  shoppingCartItemsTextWrapper: {
    fontWeight: '500',
    fontSize: 14,
    color: '#1F2126',
  },
  bigText: {
    color: '#1F2126',
    fontSize: 22,
    paddingBottom: 50,
    fontWeight: '600',
  },
  progressBar: {
    flexDirection: 'row',
    height: 20,
    width: '100%',
    backgroundColor: '#E0ECFE',
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 4,
    marginBottom: 30,
    marginTop: 12,
  },
});

export default ShoppingSlider;
