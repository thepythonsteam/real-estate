import { Button, Form, Input } from 'antd';
import { CSSProperties, memo } from 'react';
import './data-entry.component.scss';

type DataEntryProps = {
    onSubmit: () => void;
    style?: CSSProperties;
};

export const DataEntry = memo<DataEntryProps>(({ style, onSubmit }) => {
    return (
        <div style={style} className='data-entry'>
            <Form className='data-entry__form' onFinish={onSubmit}>
                <Form.Item className='data-entry__input'>
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
