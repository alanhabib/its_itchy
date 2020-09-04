import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

function ShoppingSlider({subtract, submit, selected, deleteProduct, progress}) {
  let animation = useRef(new Animated.Value(0));
  const [sliderCount, setSliderCount] = useState(5);

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: submit && progress,
      duration: 500,
    }).start();
  }, [submit, progress]);

  const width = animation.current.interpolate({
    inputRange: [0, 5],
    outputRange: ['4%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Shopping cart</Text>
      <View>
        <Text style={{color: '#000'}}>
          Items {submit ? progress : 0}/{sliderCount}
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
              <View key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>{product.name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      deleteProduct(index);
                      subtract();
                    }}>
                    <Text
                      style={{
                        textDecorationStyle: 'solid',
                        textDecorationColor: '#000',
                        textDecorationLine: 'underline',
                      }}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text>{product.price}</Text>
              </View>
            ))
          : null}
      </View>
    </View>
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
    justifyContent: 'space-between',
    backgroundColor: '#FCFAF5',
    width: '100%',
    height: Dimensions.get('window').height * 0.2,
  },
  bigText: {
    color: '#1F2126',
    fontSize: 22,
  },
  progressBar: {
    flexDirection: 'row',
    height: 20,
    width: '100%',
    backgroundColor: '#E0ECFE',
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
});

export default ShoppingSlider;
