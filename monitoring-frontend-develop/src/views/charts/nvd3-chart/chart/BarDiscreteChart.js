import React from 'react';
import NVD3Chart from 'react-nvd3';

const BarDiscreteChart = (products1, products2) => {
  let p1 = {
    label: 'Products 1',
    value: products1.length,
    color: '#1de9b6'
  };
  let p2 = {
    label: 'Products 2',
    value: products2.length,
    color: '#ff8a65'
  }; 
  let data = [p1, p2];
  return <NVD3Chart tooltip={{ enabled: true }} type="discreteBarChart" datum={data} x="label" y="value" height={12} showValues />;
};

export default BarDiscreteChart;
