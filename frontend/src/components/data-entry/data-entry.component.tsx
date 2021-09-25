import { Button, Form, Input } from 'antd';
import { memo, useCallback } from 'react';
import './data-entry.component.scss';
import cn from 'classnames';

type DataEntryProps = {
    onSubmit: (address: string) => void;
    className?: string;
};

export const DataEntry = memo<DataEntryProps>(({ className, onSubmit }) => {
    const onSubmitAddress = useCallback(
        (values) => {
            onSubmit(values.address);
        },
        [onSubmit]
    );

    return (
        <div className={cn('data-entry', className)}>
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
