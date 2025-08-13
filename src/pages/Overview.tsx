import { PageContainer } from '@ant-design/pro-components';
import { Card, Input, DatePicker, Button, Modal } from 'antd';
import type { DatePickerProps } from 'antd';
import React from 'react';
import { Line } from '@ant-design/charts';

// 从Item页面提取的销售数据
const itemData = [
  { key: '1', name: '产品A', quantity: 5, price: 100.00, totalPrice: 500.00, date: '2023-10-15' },
  { key: '2', name: '产品B', quantity: 10, price: 50.50, totalPrice: 505.00, date: '2023-10-15' },
  { key: '3', name: '产品C', quantity: 3, price: 199.99, totalPrice: 599.97, date: '2023-10-16' },
  { key: '4', name: '产品D', quantity: 7, price: 29.99, totalPrice: 209.93, date: '2023-10-16' },
  { key: '5', name: '产品E', quantity: 2, price: 499.00, totalPrice: 998.00, date: '2023-10-17' },
  { key: '6', name: '产品F', quantity: 12, price: 15.50, totalPrice: 186.00, date: '2023-10-17' },
  { key: '7', name: '产品G', quantity: 4, price: 89.99, totalPrice: 359.96, date: '2023-10-18' },
];

// 转换为折线图所需的数据格式
const chartData = itemData.reduce((acc, currentItem) => {
  const existingDate = acc.find(item => item.date === currentItem.date);
  if (existingDate) {
    existingDate.totalSales += currentItem.totalPrice;
  } else {
    acc.push({
      date: currentItem.date,
      totalSales: currentItem.totalPrice,
    });
  }
  return acc;
}, [] as { date: string; totalSales: number; }[]);

// 调试信息
console.log('chartData:', chartData);

// 图表配置
const config = {
  title: {
    visible: true,
    text: '产品销售趋势',
  },
  description: {
    visible: true,
    text: '展示每日产品销售总额的变化趋势',
  },
  forceFit: true,
  data: chartData,
  xField: 'date',
  yField: 'totalSales',
  padding: 'auto',
  xAxis: {
    type: 'category',
    tickCount: 5,
    title: {
      visible: true,
      text: '日期',
    },
  },
  yAxis: {
    type: 'value',
    title: {
      visible: true,
      text: '销售总额 (¥)',
    },
  },
  tooltip: {
    formatter: (value: number) => [`${value.toFixed(2)} 元`, '销售总额'],
  },
  legend: {
    visible: true,
    position: 'top-right',
  },
};

const Overview: React.FC = () => {
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
          height: '520px',
        }}
      >
        <Line {...config} />
      </Card>
    </PageContainer>
  );
};

export default Overview;
