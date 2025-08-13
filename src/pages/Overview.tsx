import { PageContainer } from '@ant-design/pro-components';
import { Card, DatePicker, Modal } from 'antd';
import type { DatePickerProps } from 'antd';
import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import { Pie } from '@ant-design/plots';

// 月度销售mock数据
const chartData = [
  { month: '1月', totalSales: 12500.50 },
  { month: '2月', totalSales: 15200.75 },
  { month: '3月', totalSales: 18700.20 },
  { month: '4月', totalSales: 16800.40 },
  { month: '5月', totalSales: 21000.80 },
  { month: '6月', totalSales: 23500.30 },
  { month: '7月', totalSales: 25900.60 },
  { month: '8月', totalSales: 28300.90 },
  { month: '9月', totalSales: 22100.50 },
  { month: '10月', totalSales: 24700.70 },
  { month: '11月', totalSales: 27300.20 },
  { month: '12月', totalSales: 31000.40 },
];

// 按月份排序
chartData.sort((a, b) => {
  const monthOrder = { '1月': 1, '2月': 2, '3月': 3, '4月': 4, '5月': 5, '6月': 6, '7月': 7, '8月': 8, '9月': 9, '10月': 10, '11月': 11, '12月': 12 };
  return monthOrder[a.month] - monthOrder[b.month];
});

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
    text: '展示每月产品销售总额的变化趋势',
  },
  data: chartData,
  xField: 'month',
  yField: 'totalSales',
  padding: { top: 'auto', right: 'auto', bottom: 0, left: 'auto' },
  forceFit: true,
  xAxis: {
      type: 'category',
      tickCount: 12,
      title: {
        visible: true,
        text: '月份',
      },
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    },
  yAxis: {
    type: 'value',
    title: {
      visible: true,
      text: '销售总额 (¥)',
    },
  },
  // 使用默认tooltip配置
  tooltip: {},
  legend: {
    visible: true,
    position: 'top-right',
  },
};

const Overview: React.FC = () => {
  // 定义年份状态
  const [year, setYear] = useState<Date | null>(null);

  // 处理年份变化
  const handleYearChange = (date: Date | null) => {
    setYear(date);
  };


  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
          height: '720px',
        }}
      >
        {/* 顶部筛选区 */}
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: 8 }}>选择年份:</span>
              <DatePicker picker="year" onChange={handleYearChange} value={year} />
            </div>
          </div>
        </div>

        {/* 数据概览区 */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <div style={{ flex: 1, padding: 16, backgroundColor: '#f0f2f5', borderRadius: 8 }}>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>销售总额</div>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>¥310,000.40</div>
            <div style={{ fontSize: 12, color: '#52c41a', marginTop: 4 }}>+15.2% 同比</div>
            </div>
            <div style={{ flex: 1, padding: 16, backgroundColor: '#f0f2f5', borderRadius: 8 }}>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>本月销售额</div>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>¥31,000.40</div>
            <div style={{ fontSize: 12, color: '#52c41a', marginTop: 4 }}>+8.7% 环比</div>
          </div>
          <div style={{ flex: 1, padding: 16, backgroundColor: '#f0f2f5', borderRadius: 8 }}>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>产品销量Top1</div>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>产品A</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>销量: 12,500件</div>
          </div>
        </div>

        {/* 图表区域 */}
        <div style={{ height: '480px', marginTop: '20px' }}>
          <Line {...config} />
        </div>
      </Card>
    </PageContainer>
  );
};

export default Overview;
