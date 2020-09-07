import React from 'react';
import {View} from 'react-native';
import ProductCard from './productCard';

function ProductList({data, ...props}) {
  return (
    <View>
      {data
        ? data.map((product, index) => (
            <ProductCard key={index} product={product} {...props} />
          ))
        : []}
    </View>
  );
}

export default ProductList;
