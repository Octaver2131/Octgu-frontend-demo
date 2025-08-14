import { PageContainer } from '@ant-design/pro-components';
import { Card, Input, DatePicker, Table, Button, Modal } from 'antd';
import type { DatePickerProps } from 'antd';
import type { TableProps } from 'antd';
import React from 'react';
import moment from 'moment';

const Item: React.FC = () => {
  // 控制添加弹窗显示的状态
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // 控制编辑弹窗显示的状态
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  // 当前编辑的记录
  const [currentEditRecord, setCurrentEditRecord] = React.useState<DataType | null>(null);

  // 表单数据状态
  const [formData, setFormData] = React.useState<Partial<DataType>>({
    name: '',
    ip: '',
    category: '',
    quantity: 0,
    price: 0,
    date: '',
    description: ''
  });

  // 打开弹窗
  const handleOpen = () => {
    // 重置表单数据
    setFormData({
      name: '',
      ip: '',
      category: '',
      quantity: 0,
      price: 0,
      date: '',
      description: ''
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
    if (!formData.name || !formData.ip || !formData.category || !formData.date) {
      alert('请填写完整信息');
      return;
    }

    // 计算总价
    const totalPrice = (formData.quantity || 0) * (formData.price || 0);

    // 创建新数据项
    const newItem: DataType = {
      key: String(data.length + 1),
      name: formData.name,
      ip: formData.ip,
      category: formData.category,
      quantity: formData.quantity || 0,
      price: formData.price || 0,
      totalPrice,
      date: formData.date,
      description: formData.description
    };

    // 添加到数据数组
    data.push(newItem);

    // 关闭弹窗
    setIsModalOpen(false);

    // 强制重新渲染
    setFormData({
      name: '',
      ip: '',
      category: '',
      quantity: 0,
      price: 0,
      date: '',
      description: ''
    });
  };

  // 关闭弹窗（取消）
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 处理删除按钮点击
  const handleDelete = (record: DataType) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除项目 ${record.name} 吗？`,
      okText: '确定',
      cancelText: '取消',
      centered: true,
      onOk() {
        const index = data.findIndex(item => item.key === record.key);
        if (index !== -1) {
          data.splice(index, 1);
          // 强制重新渲染
          setFormData(prev => ({ ...prev }));
        }
      },
    });
  };

  // 处理编辑按钮点击
  const handleEdit = (record: DataType) => {
    setCurrentEditRecord(record);
    setFormData({
      name: record.name,
      ip: record.ip,
      category: record.category,
      quantity: record.quantity,
      price: record.price,
      date: record.date,
      description: record.description || ''
    });
    setIsEditModalOpen(true);
  };

  // 编辑弹窗确认
  const handleEditOk = () => {
    // 验证表单
    if (!formData.name || !formData.ip || !formData.category || !formData.date) {
      alert('请填写完整信息');
      return;
    }

    // 计算总价
    const totalPrice = (formData.quantity || 0) * (formData.price || 0);

    // 更新数据
    if (currentEditRecord) {
      const index = data.findIndex(item => item.key === currentEditRecord.key);
      if (index !== -1) {
        data[index] = {
            ...currentEditRecord,
            name: formData.name,
            ip: formData.ip,
            category: formData.category,
            quantity: formData.quantity || 0,
            price: formData.price || 0,
            totalPrice,
            date: formData.date,
            description: formData.description
          };
      }
    }

    // 关闭弹窗
    setIsEditModalOpen(false);
    setCurrentEditRecord(null);
  };

  // 编辑弹窗取消
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setCurrentEditRecord(null);
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
    ip: string;
    category: string;
    quantity: number;
    price: number;
    totalPrice: number;
    date: string;
    description?: string;
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
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
    {      
      title: '操作',     
       key: 'action',     
       width: 150,      
       render: (_, record) => (        
        <div style={{ display: 'flex', gap: 8 }}>          
          <Button type="primary" onClick={() => handleEdit(record)}>编辑</Button>         
          <Button type="default" onClick={() => handleDelete(record)}>删除</Button>        
        </div>      
      ),    
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: '产品A',
      ip: '1',
      category: '电子产品',
      quantity: 5,
      price: 100.00,
      totalPrice: 5 * 100.00,
      date: '2023-10-15',
    },
    {
      key: '2',
      name: '产品B',
      ip: '2',
      category: '办公用品',
      quantity: 10,
      price: 50.50,
      totalPrice: 10 * 50.50,
      date: '2023-10-15',
    },
    {
      key: '3',
      name: '产品C',
      ip: '3',
      category: '电子产品',
      quantity: 3,
      price: 199.99,
      totalPrice: 3 * 199.99,
      date: '2023-10-16',
    },
    {
      key: '4',
      name: '产品D',
      ip: '4',
      category: '日用品',
      quantity: 7,
      price: 29.99,
      totalPrice: 7 * 29.99,
      date: '2023-10-16',
    },
    {
      key: '5',
      name: '产品E',
      ip: '5',
      category: '电子产品',
      quantity: 2,
      price: 499.00,
      totalPrice: 2 * 499.00,
      date: '2023-10-17',
    },
    {
      key: '6',
      name: '产品F',
      ip: '6',
      category: '办公用品',
      quantity: 12,
      price: 15.50,
      totalPrice: 12 * 15.50,
      date: '2023-10-17',
    },
    {
      key: '7',
      name: '产品G',
      ip: '7',
      category: '日用品',
      quantity: 4,
      price: 89.99,
      totalPrice: 4 * 89.99,
      date: '2023-10-18',
    },
    {
      key: '8',
      name: '产品H',
      ip: '8',
      category: '日用品',
      quantity: 4,
      price: 89.99,
      totalPrice: 4 * 89.99,
      date: '2023-10-18',
    },
    {
      key: '9',
      name: '产品II',
      ip: '9',
      category: '日用品',
      quantity: 4,
      price: 89.99,
      totalPrice: 4 * 89.99,
      date: '2023-10-18',
    },
    {
      key: '10',
      name: '产品J',
      ip: '10',
      category: '日用品',
      quantity: 4,
      price: 89.99,
      totalPrice: 4 * 89.99,
      date: '2023-10-18',
    },
    {
      key: '11',
      name: '产品K',
      ip: '11',
      category: '日用品',
      quantity: 4,
      price: 89.99,
      totalPrice: 4 * 89.99,
      date: '2023-10-18',
    },
    {
      key: '12',
      name: '产品L',
      ip: '12',
      category: '日用品',
      quantity: 4,
      price: 89.99,
      totalPrice: 4 * 89.99,
      date: '2023-10-18',
    },
    {
      key: '13',
      name: '产品M',
      ip: '13',
      category: '日用品',
      quantity: 4,
      price: 89.99,
      totalPrice: 4 * 89.99,
      date: '2023-10-18',
    },
    {
      key: '14',
      name: '产品N',
      ip: '14',
      category: '日用品',
      quantity: 4,
      price: 89.99,
      totalPrice: 4 * 89.99,
      date: '2023-10-18',
    },
    {
      key: '15',
      name: '产品O',
      ip: '15',
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
          height: '720px',
        }}
      >
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Search placeholder="输入搜索内容" onSearch={onSearch} style={{ width: 300, marginRight: 16 }} />
            <DatePicker onChange={onChange} />
          </div>
          <Button type="primary" onClick={handleOpen} style={{ marginLeft: 'auto' }}>添加</Button>
        </div>


        <Table<DataType> columns={columns} dataSource={data} pagination={{ pageSize: 8, position: ['bottomCenter'] }} />

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
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>IP</label>
            <Input
              name="ip"
              value={formData.ip}
              onChange={handleInputChange}
              placeholder="输入IP地址"
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
              value={formData.date ? moment(formData.date) : null}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>描述</label>
            <Input.TextArea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="输入项目描述"
              style={{ width: '100%' }}
              rows={4}
            />
          </div>
        </div>
      </Modal>

      {/* 编辑弹窗 */}
      <Modal
        title="编辑项目"
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
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
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>IP</label>
            <Input
              name="ip"
              value={formData.ip}
              onChange={handleInputChange}
              placeholder="输入IP"
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
              value={formData.date ? moment(formData.date) : null}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>描述</label>
            <Input.TextArea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="输入项目描述"
              style={{ width: '100%' }}
              rows={4}
            />
          </div>
        </div>
      </Modal>
      </Card>
    </PageContainer>
  );
};
export default Item;
