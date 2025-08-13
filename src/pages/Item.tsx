import { PageContainer } from '@ant-design/pro-components';
import { Card, Input, DatePicker, Space, Tag, Table, Button, Modal } from 'antd';
import type { DatePickerProps } from 'antd';
import type { TableProps } from 'antd';
import React from 'react';

const Item: React.FC = () => {
  // 控制弹窗显示的状态
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // 表单数据状态
  const [formData, setFormData] = React.useState<Partial<DataType>>({
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    date: ''
  });

  // 打开弹窗
  const handleOpen = () => {
    // 重置表单数据
    setFormData({
      name: '',
      category: '',
      quantity: 0,
      price: 0,
      date: ''
    });
    setIsModalOpen(true);
  };

  // 处理表单字段变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value
    }));
  };

  // 处理日期选择
  const handleDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    setFormData(prev => ({
      ...prev,
      date: dateString
    }));
  };

  // 关闭弹窗（确认）
  const handleOk = () => {
    // 验证表单
    if (!formData.name || !formData.category || !formData.date) {
      alert('请填写完整信息');
      return;
    }

    // 计算总价
    const totalPrice = (formData.quantity || 0) * (formData.price || 0);

    // 创建新数据项
    const newItem: DataType = {
      key: String(data.length + 1),
      name: formData.name,
      category: formData.category,
      quantity: formData.quantity || 0,
      price: formData.price || 0,
      totalPrice,
      date: formData.date
    };

    // 添加到数据数组
    data.push(newItem);

    // 关闭弹窗
    setIsModalOpen(false);

    // 强制重新渲染
    setFormData({
      name: '',
      category: '',
      quantity: 0,
      price: 0,
      date: ''
    });
  };

  // 关闭弹窗（取消）
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 搜索处理函数
  const onSearch = (value: string) => {
    console.log('搜索内容:', value);
    // 这里可以添加实际的搜索逻辑
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const { Search } = Input;

interface DataType {
  key: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  totalPrice: number;
  date: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '种类',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '数量',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: '单价',
    dataIndex: 'price',
    key: 'price',
    render: (price) => `¥${price.toFixed(2)}`,
  },
  {
    title: '总价',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    render: (totalPrice) => `¥${totalPrice.toFixed(2)}`,
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: '产品A',
    category: '电子产品',
    quantity: 5,
    price: 100.00,
    totalPrice: 5 * 100.00,
    date: '2023-10-15',
  },
  {
    key: '2',
    name: '产品B',
    category: '办公用品',
    quantity: 10,
    price: 50.50,
    totalPrice: 10 * 50.50,
    date: '2023-10-15',
  },
  {
    key: '3',
    name: '产品C',
    category: '电子产品',
    quantity: 3,
    price: 199.99,
    totalPrice: 3 * 199.99,
    date: '2023-10-16',
  },
  {
    key: '4',
    name: '产品D',
    category: '日用品',
    quantity: 7,
    price: 29.99,
    totalPrice: 7 * 29.99,
    date: '2023-10-16',
  },
  {
    key: '5',
    name: '产品E',
    category: '电子产品',
    quantity: 2,
    price: 499.00,
    totalPrice: 2 * 499.00,
    date: '2023-10-17',
  },
  {
    key: '6',
    name: '产品F',
    category: '办公用品',
    quantity: 12,
    price: 15.50,
    totalPrice: 12 * 15.50,
    date: '2023-10-17',
  },
  {
    key: '7',
    name: '产品G',
    category: '日用品',
    quantity: 4,
    price: 89.99,
    totalPrice: 4 * 89.99,
    date: '2023-10-18',
  },
];

  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
          height: '520px',
        }}
      >
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Search placeholder="输入搜索内容" onSearch={onSearch} style={{ width: 300, marginRight: 16 }} />
            <DatePicker onChange={onChange} />
          </div>
          <Button type="primary" onClick={handleOpen} style={{ marginLeft: 'auto' }}>添加</Button>
        </div>
        
        
        <Table<DataType> columns={columns} dataSource={data} pagination={{ pageSize: 6, position: ['bottomCenter'] }} />

        {/* 添加项目的弹窗 */}
        <Modal
          title="添加新项目"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={400}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>名字</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="输入项目名称"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>种类</label>
              <Input
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="输入项目种类"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>数量</label>
              <Input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="输入项目数量"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>单价</label>
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="输入项目单价"
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>日期</label>
              <DatePicker
                onChange={handleDateChange}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </Modal>
      </Card>
    </PageContainer>
  );
};
export default Item;