import { Button, Form, Input } from 'antd';
import { CSSProperties, memo, useCallback } from 'react';
import './data-entry.component.scss';

type DataEntryProps = {
    onSubmit: (address: string) => void;
    style?: CSSProperties;
};

export const DataEntry = memo<DataEntryProps>(({ style, onSubmit }) => {
    const onSubmitAddress = useCallback(
        (values) => {
            onSubmit(values.address);
        },
        [onSubmit]
    );

    return (
        <div style={style} className='data-entry'>
            <Form className='data-entry__form' onFinish={onSubmitAddress}>
                <Form.Item name='address' className='data-entry__input'>
                    <Input placeholder='Введите адрес' />
                </Form.Item>

                <Button className='data-entry__btn' type='primary' htmlType='submit'>
                    Рассчитать стоимость
                </Button>
            </Form>
        </div>
    );
});

DataEntry.displayName = 'DataEntry';
