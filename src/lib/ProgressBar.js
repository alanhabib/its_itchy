import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

function ShoppingSlider() {
  let animation = useRef(new Animated.Value(0));
  const [progress, setProgress] = useState(0);
  const [sliderCount, setSliderCount] = useState(5);
  const add = () => setProgress((prevCount) => Math.min(prevCount + 1, 5));
  const subtract = () => setProgress((prevCount) => Math.max(prevCount - 1, 0));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 500,
    }).start();
  }, [progress]);

  const width = animation.current.interpolate({
    inputRange: [0, 5],
    outputRange: ['4%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Text>Shopping cart</Text>
      <Text style={{color: '#000'}}>
        Items {progress}/{sliderCount}
      </Text>
      <View style={styles.progressBar}>
        <Animated.View
          style={
            ([StyleSheet.absoluteFill],
            {borderRadius: 20, backgroundColor: '#2880EA', width})
          }
        />
      </View>
      <TouchableOpacity onPress={add}>
        <Text>TouchPlus</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={subtract}>
        <Text>TouchMinus</Text>
      </TouchableOpacity>
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
