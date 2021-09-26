import { Badge, Button, Dropdown, Form, Input } from 'antd';
import cn from 'classnames';
import { memo, useCallback, useState } from 'react';
import './data-entry.component.scss';

type DataEntryProps = {
    onSubmit: (data: { address: string; floor?: number; area?: number }) => void;
    className?: string;
};

export const DataEntry = memo<DataEntryProps>(({ className, onSubmit: outerOnSubmit }) => {
    const [params, setParams] = useState<{ floor?: number; area?: number }>();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const onSubmit = useCallback(
        (values) => {
            outerOnSubmit({ address: values.address, ...params });
        },
        [outerOnSubmit, params]
    );

    const onParamsChange = useCallback((_, allValues) => {
        const result: Record<string, any> = {};
        Object.entries(allValues).forEach(([key, value]) => {
            if (value) result[key] = value;
        });
        setParams(result);
    }, []);

    const parametersDropdownContent = (
        <Form
            className='data-entry__parameters-form'
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            onValuesChange={onParamsChange}
        >
            <Form.Item className='data-entry__parameters-input' name='floor' label='Этаж'>
                <Input type='number' size='middle' />
            </Form.Item>
            <Form.Item
                className='data-entry__parameters-input'
                name='area'
                label={
                    <>
                        Площадь м<sup>2</sup>
                    </>
                }
            >
                <Input type='number' size='middle' />
            </Form.Item>
        </Form>
    );

    return (
        <div className={cn('data-entry', className)}>
            <Form className='data-entry__form' onFinish={onSubmit}>
                <Form.Item name='address' className='data-entry__input'>
                    <Input placeholder='Введите адрес' />
                </Form.Item>

                <Dropdown
                    overlay={parametersDropdownContent}
                    visible={dropdownVisible}
                    trigger={['click']}
                    placement='bottomCenter'
                    arrow
                    onVisibleChange={(v) => setDropdownVisible(v)}
                >
                    <Badge count={params && Object.keys(params).length}>
                        <Button
                            className='data-entry__parameters-btn'
                            icon={
                                <span className='anticon'>
                                    <svg
                                        className='data-entry__parameters-icon'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='#626D82'
                                    >
                                        <path
                                            d='M6.0001 8.89999C6.0801 8.89999 6.1591 8.88999 6.2331 8.86999C6.41849 9.4586 6.78674 9.97275 7.28435 10.3377C7.78196 10.7027 8.38299 10.8995 9.0001 10.8995C9.61721 10.8995 10.2182 10.7027 10.7158 10.3377C11.2135 9.97275 11.5817 9.4586 11.7671 8.86999C11.8421 8.88999 11.9201 8.89999 12.0001 8.89999H20.0001C20.1183 8.89999 20.2353 8.87672 20.3445 8.83149C20.4537 8.78626 20.5529 8.71996 20.6365 8.63639C20.7201 8.55282 20.7864 8.4536 20.8316 8.34441C20.8768 8.23522 20.9001 8.11818 20.9001 7.99999C20.9001 7.88181 20.8768 7.76477 20.8316 7.65558C20.7864 7.54639 20.7201 7.44717 20.6365 7.3636C20.5529 7.28003 20.4537 7.21373 20.3445 7.1685C20.2353 7.12327 20.1183 7.09999 20.0001 7.09999H12.0001C11.9201 7.09999 11.8421 7.10999 11.7671 7.12999C11.5817 6.54139 11.2135 6.02724 10.7158 5.66226C10.2182 5.29728 9.61721 5.10049 9.0001 5.10049C8.38299 5.10049 7.78196 5.29728 7.28435 5.66226C6.78674 6.02724 6.41849 6.54139 6.2331 7.12999C6.15708 7.10986 6.07874 7.09977 6.0001 7.09999H4.0001C3.7614 7.09999 3.53248 7.19482 3.3637 7.3636C3.19492 7.53238 3.1001 7.7613 3.1001 7.99999C3.1001 8.23869 3.19492 8.46761 3.3637 8.63639C3.53248 8.80517 3.7614 8.89999 4.0001 8.89999H6.0001ZM9.0001 6.89999C9.29184 6.89999 9.57163 7.01589 9.77792 7.22218C9.98421 7.42847 10.1001 7.70826 10.1001 7.99999C10.1001 8.29173 9.98421 8.57152 9.77792 8.77781C9.57163 8.9841 9.29184 9.1 9.0001 9.1C8.70836 9.1 8.42857 8.9841 8.22228 8.77781C8.01599 8.57152 7.9001 8.29173 7.9001 7.99999C7.9001 7.70826 8.01599 7.42847 8.22228 7.22218C8.42857 7.01589 8.70836 6.89999 9.0001 6.89999ZM3.1001 16C3.1001 15.7613 3.19492 15.5324 3.3637 15.3636C3.53248 15.1948 3.7614 15.1 4.0001 15.1H12.0001C12.0787 15.0998 12.1571 15.1099 12.2331 15.13C12.4185 14.5414 12.7867 14.0272 13.2843 13.6623C13.782 13.2973 14.383 13.1005 15.0001 13.1005C15.6172 13.1005 16.2182 13.2973 16.7158 13.6623C17.2135 14.0272 17.5817 14.5414 17.7671 15.13C17.8431 15.1099 17.9215 15.0998 18.0001 15.1H20.0001C20.2388 15.1 20.4677 15.1948 20.6365 15.3636C20.8053 15.5324 20.9001 15.7613 20.9001 16C20.9001 16.2387 20.8053 16.4676 20.6365 16.6364C20.4677 16.8052 20.2388 16.9 20.0001 16.9H18.0001C17.9215 16.9002 17.8431 16.8901 17.7671 16.87C17.5817 17.4586 17.2135 17.9727 16.7158 18.3377C16.2182 18.7027 15.6172 18.8995 15.0001 18.8995C14.383 18.8995 13.782 18.7027 13.2843 18.3377C12.7867 17.9727 12.4185 17.4586 12.2331 16.87C12.1571 16.8901 12.0787 16.9002 12.0001 16.9H4.0001C3.88191 16.9 3.76488 16.8767 3.65568 16.8315C3.54649 16.7863 3.44727 16.72 3.3637 16.6364C3.28013 16.5528 3.21384 16.4536 3.16861 16.3444C3.12338 16.2352 3.1001 16.1182 3.1001 16ZM13.9001 16C13.9001 16.2917 14.016 16.5715 14.2223 16.7778C14.4286 16.9841 14.7084 17.1 15.0001 17.1C15.2918 17.1 15.5716 16.9841 15.7779 16.7778C15.9842 16.5715 16.1001 16.2917 16.1001 16C16.1001 15.7083 15.9842 15.4285 15.7779 15.2222C15.5716 15.0159 15.2918 14.9 15.0001 14.9C14.7084 14.9 14.4286 15.0159 14.2223 15.2222C14.016 15.4285 13.9001 15.7083 13.9001 16Z'
                                            fill='#626D82'
                                        />
                                    </svg>
                                </span>
                            }
                        />
                    </Badge>
                </Dropdown>

                <Button className='data-entry__btn' type='primary' htmlType='submit'>
                    Рассчитать стоимость
                </Button>
            </Form>
        </div>
    );
});

DataEntry.displayName = 'DataEntry';
