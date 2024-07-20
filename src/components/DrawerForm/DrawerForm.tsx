import React, { useState, useEffect } from 'react';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { PlusOutlined } from '../../until/icon';
import 'moment/locale/zh-cn';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
    Upload,
    Drawer,
} from 'antd';
import type { FormRule, SelectProps, RadioGroupProps } from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface FormItemProps {
    label: string,
    field: string,
    type?: 'input' | 'select' | 'datePicker' | 'rangePicker' | 'radio' | 'checkbox' | 'inputNumber' | 'textArea' | 'switch' | 'upload',
    placeholder?: string,
    rules?: Array<FormRule>
    options?: SelectProps['options'] | RadioGroupProps['options']
}
interface DrawerFormProps {
    mode?: 'edit' | 'add',
    title?: string,
    data?: object,
    open?: boolean,
    fields: Array<FormItemProps>,
    onCancel?: (data: object) => void,
    onConfirm?: (data: object) => void, //自动判别，如果mode有值，且为add，自动触发onConfirm
    onEdit?: (data: object) => void, //自动判别，如果mode有值，且为edit，自动触发onEdit
}

const DrawerForm = (props: DrawerFormProps) => {

    const { mode, open = false, data, fields, title, onCancel = (data) => { }, onConfirm = (data) => { }, onEdit = (data) => { } } = props;

    // const [show, setShow] = useState(open)
    const [form] = Form.useForm();

    const getInput = (type, item) => {
        switch (type) {

            case 'input':
                return <Input placeholder={item.placeholder || `请输入${item.label}`} />;

            case 'select':
                return <Select placeholder={item.placeholder || `请输入${item.label}`} options={item.options} />;

            case 'rangePicker':
                return <DatePicker.RangePicker locale={locale} />;

            case 'datePicker':
                return <DatePicker.RangePicker locale={locale} />;

            case 'checkbox':
                return <Checkbox></Checkbox>

            case 'inputNumber':
                return <InputNumber placeholder={item.placeholder || `请输入${item.label}`} />

            case 'textArea':
                return <TextArea rows={4} placeholder={item.placeholder || `请输入${item.label}`} />

            case 'switch':
                return <Switch />

            case 'upload':
                return <Upload action='' showUploadList={true} listType="picture-card" accept="image/png, image/jpg">
                    {/* {imageUrl.length < 2 ? uploadButton : null} */}
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                </Upload>

            case 'radio':
                return <Radio.Group optionType="button" buttonStyle="solid" >
                    {item.options.map(i => {
                        return <Radio.Button value={i.value} style={{ minWidth: '80px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' }}>{i.label}</Radio.Button>
                    })}
                </Radio.Group>;

            default:
                return <Input placeholder={item.placeholder || `请输入${item.label}`} />;

        }
    }

    const getFields = (fields) => {

        const children = [];

        fields.map(i => {
            i.valuePropName = 'value'
            if (i.type === 'upload') i.valuePropName = 'fileList'
            if (i.type === 'switch') i.valuePropName = 'checked'
            if (i.type === 'checkbox') i.valuePropName = 'checked'
        })

        fields.map((i, o) => {
            children.push(
                <Form.Item
                    key={o}
                    name={i.field}
                    label={i.label}
                    rules={i.rules}
                    valuePropName={i.valuePropName}
                    getValueFromEvent={e => {
                        // console.log(e, 123)
                        if (Array.isArray(e)) {
                            return e;
                        }
                        return e && e.fileList;
                    }}
                >
                    {getInput(i.type, i)}
                </Form.Item>
            );

        })

        return children;
    };

    const onFinish = (values: any) => {

        // let data = { ...values }
        // for (const x in data) {
        //     !data[x] ? delete data[x] : null
        // }
        mode === 'edit' || !data || Object.keys(data).length === 0 ? onConfirm(values) : onEdit(values)

        form.resetFields();
        // setShow(false)
        console.log('Received values of form: ', values);
    };

    return (<>

        <Drawer
            destroyOnClose={true}
            open={open}
            bodyStyle={{ padding: 0 }}
            width="600"
            title={title ?? "编辑信息"}
            placement="right"
            onClose={(e) => {
                // setShow(false)
                onCancel(e)
                form.resetFields();
            }}
        >
            <Form
                form={form}
                initialValues={data ?? {}}
                style={{ margin: '24px' }}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={onFinish}
            >

                {getFields(fields)}

            </Form>
            <div style={{ height: '100px' }}></div>

            <div style={{ textAlign: 'right', marginRight: '30px', position: "absolute", bottom: 0, backgroundColor: '#fff', width: '100%', padding: '24px 0', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>

                <Button style={{ marginRight: '24px' }} type="primary" onClick={() => { form.submit() }}>确定</Button>

                <Button style={{ marginRight: '30px' }} type="default" onClick={(e) => {
                    // setShow(false)
                    onCancel(e)
                    form.resetFields();
                }}>取消</Button>

            </div>

        </Drawer>

    </>)


}

export default DrawerForm;


{/* <Form.Item label="Radio">
    <Radio.Group>
        <Radio value="apple"> Apple </Radio>
        <Radio value="pear"> Pear </Radio>
    </Radio.Group>
</Form.Item> */}


{/* <Form.Item label="TreeSelect">
    <TreeSelect
        treeData={[
            { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
        ]}
    />
</Form.Item>
<Form.Item label="Cascader">
    <Cascader
        options={[
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                    {
                        value: 'hangzhou',
                        label: 'Hangzhou',
                    },
                ],
            },
        ]}
    />
</Form.Item> */}