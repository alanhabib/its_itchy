import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import ProgressBar from '../lib/ProgressBar';

function User() {
  const [data, setData] = useState();

  function fetchData() {
    return fetch('https://mock.itsitchy.com/products')
      .then((res) => res.json())
      .then((mockData) => {
        console.log('## mockdata', mockData);
        return setData(mockData);
      })
      .catch((error) => console.log('error from fetch', error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <ScrollView style={styles.scrollView}>
          <ProgressBar />
          <Text style={styles.formLabel}>Products</Text>
          {data
            ? data.map((product, index) => {
                return (
                  <View style={styles.item} key={index}>
                    <Text>{product.name}</Text>
                    <Text>{product.price}</Text>
                  </View>
                );
              })
            : []}
        </ScrollView>
        {/*<FlatList*/}
        {/*  style={{width: '100%'}}*/}
        {/*  data={data}*/}
        {/*  renderItem={({item}) => (*/}
        {/*    <View style={styles.item}>*/}
        {/*      <Text>{item.name}</Text>*/}
        {/*      <Text>{item.price}</Text>*/}
        {/*    </View>*/}
        {/*  )}*/}
        {/*  keyExtractor={(item) => item.index}*/}
        {/*/>*/}
        <TouchableHighlight
          underlayColor="transparent"
          style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Submit</Text>
        </TouchableHighlight>
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
    marginTop: 24,
    paddingVertical: 14,
    paddingLeft: 16,
    paddingRight: 24,
    backgroundColor: '#E5E9F1',
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
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 40,
  },
  buttonTextStyle: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    color: '#535353',
    borderRadius: 50,
  },
});

export default User;
