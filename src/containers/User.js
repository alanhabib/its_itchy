import React, {useState, useEffect} from 'react';
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

  async function filterData() {
    const newData = await data.filter((product) => !selected.includes(product));
    const dataFiltered = await newData.concat(selected);
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

  useEffect(() => {
    fetchData();
  }, []);

  const buttonColor = selected.length ? '#2880EA' : '#E0ECFE';
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <ScrollView style={styles.scrollView}>
          <ProgressBar
            submit={submit}
            selected={selected}
            deleteProduct={deleteProduct}
            progress={progress}
            subtract={subtract}
          />
          <Text style={styles.formLabel}>Products</Text>
          <Text>Selected: {selected.length}</Text>
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
                      <Text>{product.name}</Text>
                      {selected.includes(product) ? (
                        <Image
                          source={CHECK_IMAGE}
                          style={styles.radioButton}
                        />
                      ) : (
                        <View style={styles.radioButton} />
                      )}
                      <Text>{product.price}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })
            : []}
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            submitProducts(true);
            filterData();
          }}
          disabled={submit || selected.length > 5 || !selected.length}
          underlayColor="transparent"
          style={{
            width: '100%',
            height: 60,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
              submit || selected.length > 5 ? '#E0ECFE' : buttonColor,
            marginTop: 40,
          }}>
          <Text style={styles.buttonTextStyle}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 20,
    color: '#535353',
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
    // backgroundColor: '#E5E9F1',
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
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2880EA',
    marginTop: 40,
  },
  buttonTextStyle: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FCFAF5',
    borderRadius: 50,
  },
});

export default User;
