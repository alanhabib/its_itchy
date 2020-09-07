import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import ProgressBar from '../lib/progressBar';
import ProductList from '../components/productList';

function User() {
  const [data, setData] = useState();
  const [selected, setSelected] = useState([]);
  const [submit, setSubmit] = useState(false);
  const scrollRef = useRef();

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

  const buttonColor = selected.length ? '#2880EA' : '#E0ECFE';
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <ScrollView ref={scrollRef} style={styles.scrollView}>
          <ProgressBar
            submit={submit}
            selected={selected}
            deleteProduct={deleteProduct}
          />
          <View style={styles.selectedAmountTextWrapper}>
            <Text style={styles.formLabel}>Products</Text>
            <Text style={styles.amountSelectedText}>
              Selected: {submit ? '0' : selected.length}
            </Text>
          </View>
          <ProductList
            data={data}
            addProduct={addProduct}
            submit={submit}
            selected={selected}
          />
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
            marginBottom: PixelRatio.get() === 2 ? 20 : 0,
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,
          }}>
          <Text style={styles.buttonTextStyle}>Add to cart</Text>
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
    backgroundColor: '#FCFAF5',
    paddingHorizontal: 16,
    paddingVertical: 20,
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
});

export default User;
