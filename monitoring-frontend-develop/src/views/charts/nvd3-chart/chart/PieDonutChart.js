import React from 'react';
import NVD3Chart from 'react-nvd3';

const PieDonutChart = (products1, products2) => {
  let p1 = {
    key: 'Products 1',
    y: products1.length,
    color: '#1de9b6'
  };
  let p2 = {
    key: 'Products 2',
    y: products2.length,
    color: '#ff8a65'
  }; 
  let data = [p1, p2];

  return <NVD3Chart id="chart" height={300} type="pieChart" datum={data} x="key" y="y" donut labelType="percent" />;
};

export default PieDonutChart;
