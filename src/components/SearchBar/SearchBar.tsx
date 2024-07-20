import { DownOutlined, UpOutlined } from '../../until/icon';
import { Button, Col, Form, Input, Row, Select, DatePicker, Radio } from 'antd';
import type { FormRule, SelectProps, RadioGroupProps, ColProps } from 'antd';
import React, { useState } from 'react';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import { CSSProperties } from 'react';

interface SearchItem {
  label: string,
  field: string,
  type?: 'input' | 'select' | 'datePicker' | 'radio',
  placeholder?: string,
  rules?: Array<FormRule>
  options?: SelectProps['options'] | RadioGroupProps['options']
  labelCol?: ColProps,
  // Array<{ label: string, value: any }>
}

interface SearchBarProps {
  style?: CSSProperties,
  defaultVlue?: object,
  items: Array<SearchItem>,
  onSearch: (object) => void;
}

// const { Option } = Select;

const AdvancedSearchForm = (props: SearchBarProps) => {

  const { items, onSearch, defaultVlue } = props;

  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const getInput = (type, item) => {
    switch (type) {

      case 'input':
        return <Input placeholder={item.placeholder || `请输入${item.label}`} />;

      case 'select':
        return <Select placeholder={item.placeholder || `请输入${item.label}`} options={item.options} />;

      case 'datePicker':
        return <DatePicker.RangePicker locale={locale} />;

      case 'radio':
        return <Radio.Group optionType="button" buttonStyle="solid" >
          {item.options.map(i => {
            return <Radio.Button value={i.value} style={{ minWidth: '80px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{i.label}</Radio.Button>
          })}
        </Radio.Group>;

      default:
        break;

    }
  }

  const getFields = () => {
    const children = [];

    items.map((i, o) => {
      children.push(
        <Col span={6} key={o}>
          <Form.Item
            name={i.field}
            label={i.label}
            rules={i.rules}
          // normalize={(e,o,v)=>{
          //   if( i.type == 'datePicker' ) console.log(e[0]._d,o,v)
          // }}
          // getValueFromEvent={(e,o,v)=>{
          //   if( i.type == 'datePicker' ) return o 
          // }}
          >
            {getInput(i.type, i)}
          </Form.Item>
        </Col>,
      );

    })

    return children;
  };

  const onFinish = (values: any) => {
    let searchParm = { ...values }
    for (const x in searchParm) {
      !searchParm[x] ? delete searchParm[x] : null
    }
    onSearch(searchParm)
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      initialValues={defaultVlue}
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      {/* <Row gutter={50} align={'top'}>
        {expand ? getFields() : getFields().slice(0, 8)}
        <Col span={6} style={{ textAlign: 'left' }}>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />} {expand ? '收起' : '展开'}
          </a>

          <Button style={{ margin: '0 8px 25px 24px' }} type="primary" htmlType="submit"> 查询 </Button>
          <Button onClick={() => { form.resetFields(); }} > 重置 </Button>

        </Col>
      </Row> */}
      <Row gutter={50} align={'top'}>
        {expand ? getFields() : getFields().slice(0, 8)}
        <Col span={24} style={{ textAlign: 'right' }}>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            {expand ? <UpOutlined /> : <DownOutlined />} {expand ? '收起' : '展开'}
          </a>

          <Button style={{ margin: '0 8px 30px 24px' }} type="primary" htmlType="submit"> 查询</Button>
          <Button onClick={() => { form.resetFields(); }}> 重置 </Button>

        </Col>
      </Row>
    </Form>
  );
};

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {

  const { style, ...searchProps } = props;
  return <div>

    <div style={style}>
      <AdvancedSearchForm {...searchProps} />
    </div>

  </div>

};

export default SearchBar;