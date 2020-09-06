import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import ProgressBar from '../lib/ProgressBar';

const CHECK_IMAGE = require('../assets/images/check-mark.png');

function User() {
  const [data, setData] = useState();
  const [selected, setSelected] = useState([]);
  const [progress, setProgress] = useState(0);
  const [submit, setSubmit] = useState(false);
  const scrollRef = useRef();

  const addToProgress = (key, number) =>
    setProgress((prevCount) => Math.min(prevCount + key, number));

  const subtract = () => setProgress((prevCount) => Math.max(prevCount - 1, 0));

  function fetchData() {
    return fetch('https://mock.itsitchy.com/products')
      .then((res) => res.json())
      .then((mockData) => {
        return setData(mockData);
      })
      .catch((error) => console.log('error from fetch', error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function filterData() {
    return new Promise((resolve, reject) => {
      if (data) {
        const newData = data.filter((product) => !selected.includes(product));
        resolve(newData);
      } else {
        reject('Found no data to filter');
      }
    });
  }

  async function addSelectedData() {
    const filteredData = await filterData();
    const dataFiltered = filteredData.concat(selected);
    return setData(dataFiltered);
  }

  function addProduct(item) {
    return setSelected((prevState) => {
      const array = selected.includes(item)
        ? selected.filter((product) => product !== item)
        : [...prevState, item];
      return Array.from(new Set(array));
    });
  }

  function submitProducts(show) {
    setSubmit(show);
  }

  function deleteProduct(key) {
    const newList = selected.filter((product, index) => key !== index);
    return setSelected(newList);
  }

  function scrollToTop() {
    scrollRef.current.scrollTo({
      y: 0,
      animated: true,
    });
  }

  console.log('scroll', scrollRef);

  const buttonColor = selected.length ? '#2880EA' : '#E0ECFE';
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <ScrollView ref={scrollRef} style={styles.scrollView}>
          <ProgressBar
            submit={submit}
            selected={selected}
            deleteProduct={deleteProduct}
            progress={progress}
            subtract={subtract}
          />
          <View style={styles.selectedAmountTextWrapper}>
            <Text style={styles.formLabel}>Products</Text>
            <Text style={styles.amountSelectedText}>
              Selected: {selected.length}
            </Text>
          </View>
          {data
            ? data.map((product, index) => {
                return (
                  <TouchableOpacity
                    disabled={submit}
                    onPress={async () => {
                      await addProduct(product);
                      addToProgress(selected.length, 5);
                    }}
                    key={index}>
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
                        <Image
                          source={CHECK_IMAGE}
                          style={styles.radioButton}
                        />
                      ) : (
                        <View style={styles.radioButton} />
                      )}
                      <Text style={styles.productPrice}>
                        {product.price} kr
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            : []}
        </ScrollView>
        <TouchableOpacity
          onPress={async () => {
            submitProducts(true);
            await addSelectedData();
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  amountSelectedText: {
    color: 'rgba(31,33,38,0.61)',
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 50,
    backgroundColor: '#FCFAF5',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
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
  formLabel: {
    fontSize: 22,
    color: '#1F2126',
    fontWeight: '600',
  },
  mainView: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textStyle: {
    width: '100%',
    height: 20,
    textAlign: 'left',
    marginTop: 10,
    fontSize: 15,
  },
  item: {
    justifyContent: 'space-between',
    marginTop: 24,
    paddingVertical: 14,
    paddingLeft: 16,
    paddingRight: 24,
    fontSize: 23,
    borderRadius: 6,
    height: Dimensions.get('window').height * 0.14,
    width: '100%',
  },
  scrollView: {
    width: '100%',
  },
  mainTextStyle: {
    width: '100%',
    height: 40,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  buttonStyle: {
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2880EA',
    marginTop: 40,
  },
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
  selectedAmountTextWrapper: {
    marginTop: 45,
    marginBottom: 24,
    marginLeft: 16,
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
});

export default User;
