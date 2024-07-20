import React, { useState, useEffect } from 'react';
import { Modal, Descriptions } from 'antd';

interface ModelInfoProps {
    size?: 'default' | 'middle' | 'small'
    title?: string
    open?: boolean,
    data: object,
    options: Array<{ label: string, field: any, render?: (item: object) => any }>
}

function AModelInfo(props: ModelInfoProps) {

    const { open = false, options, title, data, size } = props;

    // const [isModalInfoOpen, setIsModalInfoOpen] = useState(open)

    return (<>

        <Modal
            footer={null}
            title={title ?? '详情'}
            // okText='确定' cancelText="取消"
            destroyOnClose={true}
            open={open}
            width='80%'
            bodyStyle={{ maxHeight: '80%' }}
        // onOk={() => { setIsModalInfoOpen(false) }}
        // onCancel={() => { setIsModalInfoOpen(false) }} 
        >
            <Descriptions bordered size={size}>
                {options.map(i => {
                    return <Descriptions.Item label={i.label}>{i.render ? i.render(data[i.field]) : data[i.field]}</Descriptions.Item>
                })}
            </Descriptions>

        </Modal>

    </>)

}

export default AModelInfo;