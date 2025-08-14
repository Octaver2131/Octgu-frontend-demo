import { PageContainer } from '@ant-design/pro-components';
import { Card, DatePicker } from 'antd';
import React, { useState } from 'react';
import { Line } from '@ant-design/charts';

// 月度销售mock数据
const chartData = [
  { '月份': '1月', '支出': 12500.50 },
  { '月份': '2月', '支出': 15200.75 },
  { '月份': '3月', '支出': 18700.20 },
  { '月份': '4月', '支出': 16800.40 },
  { '月份': '5月', '支出': 21000.80 },
  { '月份': '6月', '支出': 23500.30 },
  { '月份': '7月', '支出': 25900.60 },
  { '月份': '8月', '支出': 28300.90 },
  { '月份': '9月', '支出': 22100.50 },
  { '月份': '10月', '支出': 24700.70 },
  { '月份': '11月', '支出': 27300.20 },
  { '月份': '12月', '支出': 31000.40 },
];

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
  xField: '月份',
  yField: '支出',
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
        {/* 数据概览区 */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <div style={{ flex: 1, padding: 16, backgroundColor: '#f0f2f5', borderRadius: 8 }}>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>本年支出</div>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>¥310,000.40</div>
            <div style={{ fontSize: 12, color: '#52c41a', marginTop: 4 }}>+15.2% 同比</div>
          </div>
          <div style={{ flex: 1, padding: 16, backgroundColor: '#f0f2f5', borderRadius: 8 }}>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>本月支出</div>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>¥31,000.40</div>
            <div style={{ fontSize: 12, color: '#52c41a', marginTop: 4 }}>+8.7% 环比</div>
          </div>
          <div style={{ flex: 1, padding: 16, backgroundColor: '#f0f2f5', borderRadius: 8 }}>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>最喜欢的IP</div>
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>产品A</div>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>数量: 12,500件</div>
          </div>
        </div>

        {/* 顶部筛选区 */}
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: 8 }}>选择年份:</span>
              <DatePicker picker="year" onChange={handleYearChange} value={year} />
            </div>
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
