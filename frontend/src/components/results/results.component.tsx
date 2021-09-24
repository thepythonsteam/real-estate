import { Tag } from 'antd';
import { memo } from 'react';
import { Card } from '../card/card.component';
import './results.component.scss';

export type ResultsProps = {
    data: {
        price: string;
        factors: {
            positive: { name: string }[];
            negative: { name: string }[];
        };
        mapData: {};
    };
};

export const Results = memo<ResultsProps>(({ data }) => {
    return (
        <div className='results'>
            <Card title='Стоимость'>
                <span className='results__price'>{data.price}</span>
            </Card>
            <Card title='Факторы, влияющие на стоимость'>
                <div className='results__factors'>
                    <ul className='results__factors-list'>
                        <h3 className='results__factors-list-title'>
                            <svg className='results__factors-list-icon' width='24' height='24' viewBox='0 0 24 24'>
                                <path
                                    d='M19.8637 5.3637C20.2152 5.01223 20.785 5.01223 21.1365 5.3637C21.488 5.71517 21.488 6.28502 21.1365 6.63649L9.63649 18.1365C9.28502 18.488 8.71517 18.488 8.3637 18.1365L3.3637 13.1365C3.01223 12.785 3.01223 12.2152 3.3637 11.8637C3.71517 11.5122 4.28502 11.5122 4.63649 11.8637L9.00009 16.2273L19.8637 5.3637Z'
                                    fill='#00bb5b'
                                />
                            </svg>
                            Положительные
                        </h3>
                        {data.factors.positive.map((f) => (
                            <Tag key={f.name} color='green'>
                                {f.name}
                            </Tag>
                        ))}
                    </ul>
                    <ul className='results__factors-list'>
                        <h3 className='results__factors-list-title'>
                            <svg className='results__factors-list-icon' width='24' height='24' viewBox='0 0 24 24'>
                                <path
                                    d='M4.95992 4.95989C5.31139 4.60842 5.88124 4.60842 6.23271 4.95989L11.9987 10.7259L17.7647 4.9599C18.1162 4.60843 18.6861 4.60843 19.0375 4.9599C19.389 5.31138 19.389 5.88122 19.0375 6.2327L13.2715 11.9987L19.0376 17.7647C19.389 18.1162 19.389 18.6861 19.0376 19.0375C18.6861 19.389 18.1162 19.389 17.7648 19.0375L11.9987 13.2715L6.23269 19.0375C5.88121 19.389 5.31136 19.389 4.95989 19.0375C4.60842 18.6861 4.60842 18.1162 4.95989 17.7647L10.7259 11.9987L4.95992 6.23269C4.60844 5.88121 4.60844 5.31136 4.95992 4.95989Z'
                                    fill='#FF5260'
                                />
                            </svg>
                            Отрицательные
                        </h3>
                        {data.factors.negative.map((f) => (
                            <Tag key={f.name} color='volcano'>
                                {f.name}
                            </Tag>
                        ))}
                    </ul>
                </div>
            </Card>
            <Card title='На карте'>
                <span role='img' aria-label='map'>
                    🗺📍
                </span>
            </Card>
        </div>
    );
});

Results.displayName = 'Results';
