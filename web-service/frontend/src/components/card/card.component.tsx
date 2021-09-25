import { memo, ReactNode } from 'react';
import './card.component.scss';

type CardProps = {
    title: string;
    children: ReactNode;
};

export const Card = memo<CardProps>(({ title, children }) => {
    return (
        <div className='card'>
            <h2 className='card__title'>{title}</h2>
            <div className='card__inner'>{children}</div>
        </div>
    );
});

Card.displayName = 'Card';
